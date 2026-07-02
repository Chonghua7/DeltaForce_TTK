(function() {
  'use strict';

  var OVERRIDES_KEY = 'ttk_weapon_overrides';
  var CUSTOM_WEAPONS_KEY = 'ttk_custom_weapons';
  var CUSTOM_MUZZLES_KEY = 'ttk_custom_muzzles';
  var EDITOR_HISTORY_KEY = 'ttk_editor_open';

  // ─── 核心：覆盖数据系统 ───────────────────────────────────────

  function loadOverrides() {
    try {
      var raw = localStorage.getItem(OVERRIDES_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('武器覆盖数据加载失败:', e);
      return {};
    }
  }

  function saveOverrides(overrides) {
    try {
      localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
    } catch (e) {
      console.error('武器覆盖数据保存失败:', e);
      throw e;
    }
  }

  /** 将 localStorage 中的覆盖应用到真实武器对象上 */
  function applyOverridesToWeapons(overrides, weapons) {
    if (!overrides || !weapons) return 0;
    var count = 0;
    Object.keys(overrides).forEach(function(idx) {
      var wep = weapons[idx];
      if (!wep) return;
      var ov = overrides[idx];
      Object.keys(ov).forEach(function(key) {
        if (key === 'barrels' && Array.isArray(ov.barrels) && Array.isArray(wep.barrels)) {
          ov.barrels.forEach(function(bov, bi) {
            if (wep.barrels[bi]) Object.assign(wep.barrels[bi], bov);
          });
        } else if (key === 'fireControls' && Array.isArray(ov.fireControls) && Array.isArray(wep.fireControls)) {
          ov.fireControls.forEach(function(fov, fi) {
            if (wep.fireControls[fi]) Object.assign(wep.fireControls[fi], fov);
          });
        } else if (key === 'mult' && typeof ov.mult === 'object') {
          Object.assign(wep.mult, ov.mult);
        } else if (key === 'allowedBullets' && Array.isArray(ov.allowedBullets)) {
          wep.allowedBullets = ov.allowedBullets.slice();
        } else {
          wep[key] = ov[key];
        }
      });
      count++;
    });
    return count;
  }

  /** 读取武器的当前实际值（考虑覆盖后的） */
  function readWeaponValues(weapon) {
    return {
      flesh: weapon.flesh,
      armor: weapon.armor,
      rof: weapon.rof,
      velocity: weapon.velocity,
      triggerDelay: weapon.triggerDelay || 0,
      ranges: (weapon.ranges || []).slice(),
      decays: (weapon.decays || []).slice(),
      mult: weapon.mult ? { head: weapon.mult.head, chest: weapon.mult.chest, stomach: weapon.mult.stomach, limbs: weapon.mult.limbs } : {},
      allowedBullets: (weapon.allowedBullets || []).slice(),
      barrels: (weapon.barrels || []).map(function(b) { return Object.assign({}, b); }),
      fireControls: (weapon.fireControls || []).map(function(f) { return Object.assign({}, f); }),
    };
  }

  /** 计算覆盖数据：比较当前值与原始值的差异 */
  function computeOverrides(originalValues, currentWeapon) {
    var ov = {};
    if (currentWeapon.flesh !== originalValues.flesh) ov.flesh = currentWeapon.flesh;
    if (currentWeapon.armor !== originalValues.armor) ov.armor = currentWeapon.armor;
    if (currentWeapon.rof !== originalValues.rof) ov.rof = currentWeapon.rof;
    if (currentWeapon.velocity !== originalValues.velocity) ov.velocity = currentWeapon.velocity;
    if ((currentWeapon.triggerDelay || 0) !== originalValues.triggerDelay) ov.triggerDelay = currentWeapon.triggerDelay || 0;

    // ranges
    if (diffArray(originalValues.ranges, currentWeapon.ranges)) ov.ranges = currentWeapon.ranges.slice();
    // decays
    if (diffArray(originalValues.decays, currentWeapon.decays)) ov.decays = currentWeapon.decays.slice();
    // mult
    if (originalValues.mult && currentWeapon.mult) {
      var multDiff = {};
      var hasMultDiff = false;
      ['head','chest','stomach','limbs'].forEach(function(p) {
        if (currentWeapon.mult[p] !== originalValues.mult[p]) {
          multDiff[p] = currentWeapon.mult[p];
          hasMultDiff = true;
        }
      });
      if (hasMultDiff) ov.mult = multDiff;
    }
    // allowedBullets
    if (diffArray(originalValues.allowedBullets, currentWeapon.allowedBullets)) {
      ov.allowedBullets = currentWeapon.allowedBullets.slice();
    }
    // barrels
    var barrelDiff = diffBarrels(originalValues.barrels, currentWeapon.barrels);
    if (barrelDiff) ov.barrels = barrelDiff;
    // fireControls
    var fcDiff = diffFireControls(originalValues.fireControls, currentWeapon.fireControls);
    if (fcDiff) ov.fireControls = fcDiff;

    return Object.keys(ov).length > 0 ? ov : null;
  }

  function diffArray(a, b) {
    if (!a || !b) return true;
    if (a.length !== b.length) return true;
    for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return true; }
    return false;
  }

  function diffBarrels(orig, curr) {
    if (!orig || !curr) return null;
    var result = [];
    var hasDiff = false;
    for (var i = 0; i < Math.max(orig.length, curr.length); i++) {
      if (!orig[i] || !curr[i]) { hasDiff = true; break; }
      var od = {};
      var d = false;
      ['rangeMult','rangeAdd','velocityAdd','damageBonus','armorDamageBonus','rofMult','rofAdd','triggerDelayDelta','fireMode','burstCount','burstInternalROF','burstInterval'].forEach(function(k) {
        if (curr[i][k] !== orig[i][k]) { od[k] = curr[i][k]; d = true; }
      });
      if (curr[i].ranges && diffArray(orig[i].ranges, curr[i].ranges)) { od.ranges = curr[i].ranges.slice(); d = true; }
      if (curr[i].decays && diffArray(orig[i].decays, curr[i].decays)) { od.decays = curr[i].decays.slice(); d = true; }
      if (curr[i].partMultAdd && JSON.stringify(curr[i].partMultAdd) !== JSON.stringify(orig[i].partMultAdd)) { od.partMultAdd = Object.assign({}, curr[i].partMultAdd); d = true; }
      if (d) { od.name = curr[i].name; result.push(od); hasDiff = true; }
      else result.push(null);
    }
    return hasDiff ? result : null;
  }

  function diffFireControls(orig, curr) {
    if (!orig || !curr) return null;
    var result = [];
    var hasDiff = false;
    for (var i = 0; i < Math.max(orig.length, curr.length); i++) {
      if (!orig[i] || !curr[i]) { hasDiff = true; break; }
      if (curr[i].rof !== orig[i].rof || curr[i].initialRof !== orig[i].initialRof || curr[i].initialRofShots !== orig[i].initialRofShots) {
        var od = { name: curr[i].name };
        if (curr[i].rof !== orig[i].rof) od.rof = curr[i].rof;
        if (curr[i].initialRof !== orig[i].initialRof) od.initialRof = curr[i].initialRof;
        if (curr[i].initialRofShots !== orig[i].initialRofShots) od.initialRofShots = curr[i].initialRofShots;
        result.push(od); hasDiff = true;
      } else result.push(null);
    }
    return hasDiff ? result : null;
  }

  // ─── UI ─────────────────────────────────────────────────────

  var app, weapons, originalValues = {}, overrides = {}, currentIdx = null,
      builtinCount = 0, customWeapons = [], customMuzzles = [];

  function init() {
    if (!window.app || !window.app.weaponManager) {
      setTimeout(init, 200);
      return;
    }
    app = window.app;
    weapons = app.weaponManager.weapons;
    builtinCount = weapons.length;

    // 保存原始值（用于计算 diff）
    weapons.forEach(function(w, i) { originalValues[i] = readWeaponValues(w); });

    // 加载并应用覆盖
    overrides = loadOverrides();
    var n = applyOverridesToWeapons(overrides, weapons);
    if (n > 0) console.log('已应用 ' + n + ' 条武器覆盖数据');

    // 加载自定义武器
    customWeapons = loadCustomWeapons();
    customMuzzles = loadCustomMuzzles();
    mergeCustomWeapons();
    mergeCustomMuzzles();
    if (customWeapons.length > 0) console.log('已加载 ' + customWeapons.length + ' 把自定义武器');

    bindUI();
  }

  // ── 自定义武器 CRUD ──

  function loadCustomWeapons() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_WEAPONS_KEY) || '[]'); }
    catch(e) { return []; }
  }
  function saveCustomWeapons() {
    try { localStorage.setItem(CUSTOM_WEAPONS_KEY, JSON.stringify(customWeapons)); }
    catch(e) { console.error('自定义武器保存失败:', e); }
  }
  function loadCustomMuzzles() {
    try { return JSON.parse(localStorage.getItem(CUSTOM_MUZZLES_KEY) || '[]'); }
    catch(e) { return []; }
  }
  function saveCustomMuzzles() {
    try { localStorage.setItem(CUSTOM_MUZZLES_KEY, JSON.stringify(customMuzzles)); }
    catch(e) { console.error('自定义枪口保存失败:', e); }
  }

  function mergeCustomWeapons() {
    // 先移除之前添加的自定义武器（防重复）
    while (weapons.length > builtinCount) weapons.pop();
    customWeapons.forEach(function(cw) {
      var w = JSON.parse(JSON.stringify(cw)); // 深拷贝
      w._custom = true;
      weapons.push(w);
    });
  }
  function mergeCustomMuzzles() {
    var muzzles = app.weaponManager.muzzles;
    // 移除之前添加的自定义枪口（保留内置的）
    while (muzzles.length > 4) muzzles.pop();
    customMuzzles.forEach(function(cm) {
      muzzles.push(JSON.parse(JSON.stringify(cm)));
    });
  }

  function createDefaultWeapon() {
    return {
      name: '新武器',
      type: '步枪',
      ranges: [40, 70, 1/0, 1/0],
      decays: [1, 0.85, 0.7, 0.7, 0.7],
      velocity: 575,
      flesh: 30,
      armor: 30,
      rof: 700,
      triggerDelay: 0,
      barrels: [{ name: '默认枪管', rangeMult: 1, rofMult: 1 }],
      mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
      allowedBullets: [3, 4, 5],
      _custom: true,
    };
  }

  function addCustomWeapon() {
    var cw = createDefaultWeapon();
    customWeapons.push(JSON.parse(JSON.stringify(cw)));
    saveCustomWeapons();
    mergeCustomWeapons();
    // 更新原始值对照
    originalValues[weapons.length - 1] = readWeaponValues(weapons[weapons.length - 1]);
    renderWeaponList();
    selectWeapon(weapons.length - 1);
    setStatus('已添加新武器「' + cw.name + '」，填写数据后保存', 'info');
  }

  function deleteCustomWeapon(idx) {
    if (idx < builtinCount) return; // 不允许删除内置武器
    var cwIdx = idx - builtinCount;
    var name = weapons[idx].name;
    if (!confirm('确定要删除自定义武器「' + name + '」？')) return;
    customWeapons.splice(cwIdx, 1);
    saveCustomWeapons();
    // 从原始值中移除
    delete originalValues[idx];
    mergeCustomWeapons();
    renderWeaponList();
    currentIdx = null;
    document.getElementById('editorProps').innerHTML = '<div class="editor-empty">从左侧选择一个武器开始编辑</div>';
    setStatus('已删除「' + name + '」', 'info');
  }

  function bindUI() {
    var openBtn = document.getElementById('dataEditorBtn');
    var modal = document.getElementById('weaponDataEditor');
    var closeBtn = document.getElementById('weaponEditorCloseBtn');

    if (!openBtn || !modal) return;

    openBtn.addEventListener('click', function() { openEditor(); });

    closeBtn && closeBtn.addEventListener('click', function() { closeEditor(); });
    modal.addEventListener('click', function(e) {
      if (e.target.dataset && e.target.dataset.close === 'weapon-data-editor') closeEditor();
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeEditor();
    });

    // 搜索
    var searchInput = document.getElementById('editorSearch');
    searchInput && searchInput.addEventListener('input', function() {
      renderWeaponList(this.value);
    });

    // 工具栏按钮
    document.getElementById('editorSaveBtn').addEventListener('click', saveChanges);
    document.getElementById('editorExportBtn').addEventListener('click', exportJSON);
    document.getElementById('editorImportBtn').addEventListener('click', function() {
      document.getElementById('editorFileInput').click();
    });
    document.getElementById('editorFileInput').addEventListener('change', importJSON);
    document.getElementById('editorResetBtn').addEventListener('click', resetAll);
    document.getElementById('editorAddBtn').addEventListener('click', addCustomWeapon);

    // 事件委托：删除自定义武器 + 添加/删除枪管 + 添加/删除导气箍
    document.getElementById('editorProps').addEventListener('click', function(e) {
      var target = e.target;
      var delBtn = target.closest('#deleteCustomWeaponBtn');
      if (delBtn) { deleteCustomWeapon(parseInt(delBtn.dataset.idx)); return; }
      var rmBarrel = target.closest('.remove-barrel-btn');
      if (rmBarrel && currentIdx !== null && weapons[currentIdx]) {
        var bi = parseInt(rmBarrel.dataset.barrelIdx);
        if (weapons[currentIdx].barrels.length > 1 || currentIdx >= builtinCount) {
          weapons[currentIdx].barrels.splice(bi, 1);
          markModified(currentIdx);
          renderProps(weapons[currentIdx], currentIdx);
        } else alert('至少保留一个枪管');
        return;
      }
      var rmFc = target.closest('.remove-fc-btn');
      if (rmFc && currentIdx !== null && weapons[currentIdx]) {
        var fi = parseInt(rmFc.dataset.fcIdx);
        weapons[currentIdx].fireControls.splice(fi, 1);
        markModified(currentIdx);
        renderProps(weapons[currentIdx], currentIdx);
        return;
      }
      if (target.id === 'addBarrelBtn' && currentIdx !== null && weapons[currentIdx]) {
        var n = weapons[currentIdx].barrels.length + 1;
        weapons[currentIdx].barrels.push({ name: '新枪管' + n, rangeMult: 1, rofMult: 1 });
        markModified(currentIdx);
        renderProps(weapons[currentIdx], currentIdx);
        return;
      }
      if (target.id === 'addFcBtn' && currentIdx !== null && weapons[currentIdx]) {
        var n2 = (weapons[currentIdx].fireControls || []).length + 1;
        if (!weapons[currentIdx].fireControls) weapons[currentIdx].fireControls = [];
        weapons[currentIdx].fireControls.push({ name: '新导气箍' + n2, rof: 700 });
        markModified(currentIdx);
        renderProps(weapons[currentIdx], currentIdx);
        return;
      }
    });
  }

  function openEditor() {
    var modal = document.getElementById('weaponDataEditor');
    if (!modal) return;

    renderWeaponList();
    modal.classList.remove('hidden');
    if (weapons.length > 0) selectWeapon(0);

    var bar = document.getElementById('editorStatusBar');
    if (bar) { bar.textContent = '已加载 ' + weapons.length + ' 把武器 · 已修改: ' + Object.keys(loadOverrides()).length + ' 条'; bar.className = 'editor-status-bar info'; }
  }

  function closeEditor() {
    var modal = document.getElementById('weaponDataEditor');
    if (modal) modal.classList.add('hidden');
  }

  function renderWeaponList(filter) {
    var list = document.getElementById('editorWeaponList');
    if (!list) return;
    list.innerHTML = '';
    weapons.forEach(function(w, i) {
      if (filter && w.name.indexOf(filter) === -1) return;
      var isCustom = i >= builtinCount;
      var item = document.createElement('div');
      item.className = 'editor-weapon-item' + (i === currentIdx ? ' active' : '');
      if (!isCustom && overrides[i]) item.className += ' modified';
      if (isCustom) item.className += ' custom';
      item.dataset.idx = i;
      var badge = isCustom ? '自定义' : w.type;
      item.innerHTML = '<span>' + w.name + '</span><span class="weapon-type-badge">' + badge + '</span>';
      item.addEventListener('click', function() { selectWeapon(i); });
      list.appendChild(item);
    });
    var c = list.children.length;
    document.getElementById('editorWeaponCount').textContent = '共 ' + c + ' 把武器' + (customWeapons.length ? ' (其中 ' + customWeapons.length + ' 把自定义)' : '');
  }
  function selectWeapon(idx) {
    var w = weapons[idx];
    if (!w) return;

    // 更新列表高亮
    var items = document.querySelectorAll('#editorWeaponList .editor-weapon-item');
    items.forEach(function(it) {
      it.className = 'editor-weapon-item';
      if (parseInt(it.dataset.idx) === idx) it.className += ' active';
      if (overrides[parseInt(it.dataset.idx)]) it.className += ' modified';
    });

    renderProps(w, idx);
  }

  function renderProps(w, idx) {
    var container = document.getElementById('editorProps');
    if (!container) return;

    var isCustom = idx >= builtinCount;
    var mult = w.mult || {};
    var html = '';

    // 标题 + 删除按钮（仅自定义武器）
    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
    html += '<h3 style="margin:0;font-size:1.1rem">' + w.name + '</h3>';
    if (isCustom) {
      html += '<button id="deleteCustomWeaponBtn" class="editor-action-btn danger" data-idx="' + idx + '">🗑 删除此武器</button>';
    }
    html += '</div>';

    // ── 基础属性 ──
    html += '<div class="editor-prop-group">';
    html += '<div class="editor-prop-group-title">基础属性</div>';
    html += '<div class="editor-prop-group-body">';
    html += field('名称', 'wpn_name', w.name, 'text');
    html += field('类型', 'wpn_type', w.type, 'text');
    html += field('肉伤', 'wpn_flesh', w.flesh, 'number');
    html += field('甲伤', 'wpn_armor', w.armor, 'number');
    html += field('射速', 'wpn_rof', w.rof, 'number');
    html += field('初速', 'wpn_velocity', w.velocity, 'number');
    html += field('扳机延迟', 'wpn_triggerDelay', w.triggerDelay || 0, 'number');
    html += '</div></div>';

    // ── 射程衰减 ──
    html += '<div class="editor-prop-group">';
    html += '<div class="editor-prop-group-title">射程衰减</div>';
    html += '<div class="editor-prop-group-body">';
    html += '<div class="editor-field" style="flex-direction:row;align-items:center;gap:4px;width:100%;flex-wrap:wrap;">';
    html += '<label>射程断点 (m):</label>';
    (w.ranges || []).forEach(function(r, i) {
      html += '<input type="number" class="arr-val" data-key="ranges" data-idx="' + i + '" value="' + (r === 1/0 ? 9999 : r) + '" min="0" style="width:60px">';
      if (i < 3) html += '<span style="color:#aaa">→</span>';
    });
    html += '</div>';
    html += '<div class="editor-field" style="flex-direction:row;align-items:center;gap:4px;width:100%;flex-wrap:wrap;">';
    html += '<label>伤害衰减系数:</label>';
    (w.decays || []).forEach(function(d, i) {
      html += '<input type="number" class="arr-val" data-key="decays" data-idx="' + i + '" value="' + d + '" step="0.05" min="0" max="1" style="width:55px">';
      if (i < 4) html += '<span style="color:#aaa">→</span>';
    });
    html += '</div>';
    html += '</div></div>';

    // ── 部位倍率 ──
    html += '<div class="editor-prop-group">';
    html += '<div class="editor-prop-group-title">部位倍率</div>';
    html += '<div class="editor-prop-group-body">';
    html += field('头部', 'wpn_mult_head', mult.head || 1, 'number', '0.1');
    html += field('胸部', 'wpn_mult_chest', mult.chest || 1, 'number', '0.1');
    html += field('腹部', 'wpn_mult_stomach', mult.stomach || 1, 'number', '0.1');
    html += field('四肢', 'wpn_mult_limbs', mult.limbs || 0.4, 'number', '0.05');
    html += '</div></div>';

    // ── 可用子弹 ──
    html += '<div class="editor-prop-group">';
    html += '<div class="editor-prop-group-title">可用子弹（逗号分隔）</div>';
    html += '<div class="editor-prop-group-body">';
    html += '<input type="text" id="wpn_allowedBullets" value="' + (w.allowedBullets || []).join(',') + '" style="min-width:400px;padding:6px 10px;border:1px solid #ddd;border-radius:4px;font-size:0.85rem">';
    html += '</div></div>';

    // ── 枪管列表 ──
    if (w.barrels && w.barrels.length > 0) {
      html += '<div class="editor-prop-group">';
      html += '<div class="editor-prop-group-title">枪管</div>';
      html += '<div class="editor-prop-group-body" style="flex-direction:column">';
      w.barrels.forEach(function(b, bi) {
        html += '<div class="editor-barrel-item">';
        html += '<div class="barrel-header">#' + (bi+1) + ' ' + b.name;
html += ' <button class="remove-barrel-btn editor-action-btn danger" style="float:right;padding:1px 8px;font-size:0.75rem" data-barrel-idx="' + bi + '">✕ 删除</button>';
html += '</div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
        html += field('射程倍率', 'bar_rangeMult_' + bi, b.rangeMult !== void 0 ? b.rangeMult : '', 'number', '0.1');
        html += field('射程加成', 'bar_rangeAdd_' + bi, b.rangeAdd !== void 0 ? b.rangeAdd : '', 'number');
        html += field('初速加成', 'bar_velocityAdd_' + bi, b.velocityAdd !== void 0 ? b.velocityAdd : '', 'number');
        html += field('肉伤加值', 'bar_damageBonus_' + bi, b.damageBonus !== void 0 ? b.damageBonus : 0, 'number');
        html += field('甲伤加值', 'bar_armorDamageBonus_' + bi, b.armorDamageBonus !== void 0 ? b.armorDamageBonus : 0, 'number');
        html += field('射速倍率', 'bar_rofMult_' + bi, b.rofMult !== void 0 ? b.rofMult : 1, 'number', '0.01');
        html += field('射速加成', 'bar_rofAdd_' + bi, b.rofAdd !== void 0 ? b.rofAdd : 0, 'number');
        html += '</div></div>';
      });
      html += '<div style="padding:8px 0 0"><button id="addBarrelBtn" class="editor-action-btn" style="border-color:#6b4c9a;color:#6b4c9a">＋ 添加枪管</button></div>';
      html += '</div></div>';
    }

    // ── 射速配件 ──
    html += '<div class="editor-prop-group">';
    html += '<div class="editor-prop-group-title">射速配件（导气箍）</div>';
    html += '<div class="editor-prop-group-body" style="flex-direction:column">';
    if (w.fireControls) {
      w.fireControls.forEach(function(f, fi) {
        html += '<div class="editor-barrel-item">';
        html += '<div class="barrel-header">#' + (fi+1) + ' ' + f.name;
        html += ' <button class="remove-fc-btn editor-action-btn danger" style="float:right;padding:1px 8px;font-size:0.75rem" data-fc-idx="' + fi + '">✕ 删除</button>';
        html += '</div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
        html += field('射速', 'fc_rof_' + fi, f.rof || '', 'number');
        html += field('首发射速', 'fc_initialRof_' + fi, f.initialRof !== void 0 ? f.initialRof : '', 'number');
        html += field('首发弹数', 'fc_initialRofShots_' + fi, f.initialRofShots !== void 0 ? f.initialRofShots : '', 'number');
        html += '</div></div>';
      });
    }
    html += '<div style="padding:8px 0 0"><button id="addFcBtn" class="editor-action-btn" style="border-color:#6b4c9a;color:#6b4c9a">＋ 添加导气箍</button></div>';
    html += '</div></div>';
    html += '<div class="editor-prop-group">';

    container.innerHTML = html;

    // 绑定 array 字段的 change 事件
    container.querySelectorAll('.arr-val').forEach(function(el) {
      el.addEventListener('change', function() {
        var key = this.dataset.key;
        var idx = parseInt(this.dataset.idx);
        if (!weapons[currentIdx]) return;
        if (key === 'ranges' || key === 'decays') {
          if (!weapons[currentIdx][key]) weapons[currentIdx][key] = [];
          var val = key === 'ranges' ? (parseInt(this.value) >= 9999 ? 1/0 : parseFloat(this.value)) : parseFloat(this.value);
          weapons[currentIdx][key][idx] = val;
        }
        markModified(currentIdx);
      });
    });

    // 绑定名称修改
    var nameInput = document.getElementById('wpn_name');
    if (nameInput) {
      nameInput.addEventListener('change', function() {
        if (weapons[currentIdx]) weapons[currentIdx].name = this.value;
        markModified(currentIdx);
        // 刷新列表中的名称
        var items = document.querySelectorAll('#editorWeaponList .editor-weapon-item');
        items.forEach(function(it) {
          if (parseInt(it.dataset.idx) === currentIdx) {
            it.querySelector('span:first-child').textContent = weapons[currentIdx].name;
          }
        });
      });
    }
    // 类型
    var typeInput = document.getElementById('wpn_type');
    typeInput && typeInput.addEventListener('change', function() { if (weapons[currentIdx]) { weapons[currentIdx].type = this.value; markModified(currentIdx); } });
    // 简单数字字段
    ['wpn_flesh','wpn_armor','wpn_rof','wpn_velocity','wpn_triggerDelay'].forEach(function(id) {
      var key = id.replace('wpn_', '');
      var el = document.getElementById(id);
      el && el.addEventListener('change', function() { if (weapons[currentIdx]) { weapons[currentIdx][key] = parseFloat(this.value) || 0; markModified(currentIdx); } });
    });
    // 部位倍率
    ['head','chest','stomach','limbs'].forEach(function(p) {
      var el = document.getElementById('wpn_mult_' + p);
      el && el.addEventListener('change', function() { if (weapons[currentIdx]) { if (!weapons[currentIdx].mult) weapons[currentIdx].mult = {}; weapons[currentIdx].mult[p] = parseFloat(this.value) || 0; markModified(currentIdx); } });
    });
    // 子弹列表
    var btEl = document.getElementById('wpn_allowedBullets');
    btEl && btEl.addEventListener('change', function() {
      if (weapons[currentIdx]) {
        weapons[currentIdx].allowedBullets = this.value.split(',').map(function(s) { return s.trim(); }).filter(Boolean).map(function(s) { return isNaN(s) ? s : Number(s); });
        markModified(currentIdx);
      }
    });
    // 枪管字段
    if (w.barrels) {
      w.barrels.forEach(function(b, bi) {
        ['rangeMult','rangeAdd','velocityAdd','damageBonus','armorDamageBonus','rofMult','rofAdd'].forEach(function(k) {
          var el = document.getElementById('bar_' + k + '_' + bi);
          el && el.addEventListener('change', function() {
            if (weapons[currentIdx] && weapons[currentIdx].barrels && weapons[currentIdx].barrels[bi]) {
              var v = this.value === '' ? void 0 : parseFloat(this.value);
              weapons[currentIdx].barrels[bi][k] = v;
              markModified(currentIdx);
            }
          });
        });
      });
    }
    // 射速配件
    if (w.fireControls) {
      w.fireControls.forEach(function(f, fi) {
        ['rof','initialRof','initialRofShots'].forEach(function(k) {
          var el = document.getElementById('fc_' + k + '_' + fi);
          el && el.addEventListener('change', function() {
            if (weapons[currentIdx] && weapons[currentIdx].fireControls && weapons[currentIdx].fireControls[fi]) {
              var v = this.value === '' ? void 0 : parseFloat(this.value);
              weapons[currentIdx].fireControls[fi][k] = v;
              markModified(currentIdx);
            }
          });
        });
      });
    }
  }

  function field(label, id, value, type, step) {
    var st = step ? ' step="' + step + '"' : '';
    return '<div class="editor-field"><label for="' + id + '">' + label + '</label><input type="' + type + '" id="' + id + '" value="' + (value ?? '') + '"' + st + '></div>';
  }

  function stripCustomFlag(w) {
    var copy = JSON.parse(JSON.stringify(w));
    delete copy._custom;
    return copy;
  }

  function syncCustomWeaponsToStorage() {
    customWeapons = [];
    for (var i = builtinCount; i < weapons.length; i++) {
      customWeapons.push(stripCustomFlag(weapons[i]));
    }
    saveCustomWeapons();
  }

  function markModified(idx) {
    if (idx >= builtinCount) {
      // 自定义武器直接标记未保存
      setStatus('有未保存的修改', 'info');
      return;
    }
    overrides = loadOverrides();
    var vals = readWeaponValues(weapons[idx]);
    var ov = computeOverrides(originalValues[idx], vals);
    if (ov) overrides[idx] = ov;
    else delete overrides[idx];

    // 更新列表标记
    var items = document.querySelectorAll('#editorWeaponList .editor-weapon-item');
    items.forEach(function(it) {
      var i = parseInt(it.dataset.idx);
      it.className = 'editor-weapon-item' + (i === currentIdx ? ' active' : '') + (overrides[i] ? ' modified' : '');
    });

    setStatus('有未保存的修改', 'info');
  }

  function setStatus(msg, type) {
    var bar = document.getElementById('editorStatusBar');
    if (!bar) return;
    bar.textContent = msg;
    bar.className = 'editor-status-bar' + (type ? ' ' + type : '');
  }

  // ── 保存 / 导出 / 导入 / 重置 ──

  function saveChanges() {
    try {
      saveOverrides(overrides);
      syncCustomWeaponsToStorage();
      var total = Object.keys(overrides).length + customWeapons.length;
      setStatus('✅ 已保存 ' + total + ' 条修改（覆盖 ' + Object.keys(overrides).length + ' 条，自定义 ' + customWeapons.length + ' 把）', 'success');
      // 更新原始值对照
      weapons.forEach(function(w, i) { originalValues[i] = readWeaponValues(w); });
    } catch(e) {
      setStatus('❌ 保存失败: ' + e.message, 'error');
    }
  }

  function exportJSON() {
    var exportData = {
      version: 2,
      exportedAt: new Date().toISOString(),
      overrides: overrides,
      customWeapons: customWeapons,
    };
    var data = JSON.stringify(exportData, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'ttk_data_' + new Date().toISOString().slice(0, 10) + '.json';
    a.click();
    URL.revokeObjectURL(url);
    setStatus('📤 已导出（覆盖 ' + Object.keys(overrides).length + ' 条 + 自定义 ' + customWeapons.length + ' 把）', 'info');
  }

  function importJSON(e) {
    var file = e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      try {
        var data = JSON.parse(ev.target.result);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error('数据格式错误');

        // 支持 v2 格式（含自定义武器）和 v1 格式（纯 overrides）
        var importOverrides = data.overrides || data;
        var importCustom = data.customWeapons || [];

        // 验证 overrides
        if (importOverrides !== data) {
          // v2 格式
          Object.keys(data).forEach(function(k) {
            if (['version','exportedAt','overrides','customWeapons'].indexOf(k) === -1) throw new Error('未知字段: ' + k);
          });
        }

        // 恢复内置武器到原始值
        overrides = {};
        weapons.forEach(function(w, i_) { if (originalValues[i_]) Object.assign(w, originalValues[i_]); });

        // 应用导入的覆盖
        var valid = 0;
        Object.keys(importOverrides).forEach(function(k) {
          var idx = parseInt(k);
          if (!isNaN(idx) && weapons[idx]) {
            var ov = importOverrides[k];
            Object.keys(ov).forEach(function(key) {
              if (key === 'mult' && typeof ov.mult === 'object' && weapons[idx].mult) {
                Object.assign(weapons[idx].mult, ov.mult);
              } else if (key === 'barrels' && Array.isArray(ov.barrels)) {
                ov.barrels.forEach(function(bov, bi) { if (weapons[idx].barrels[bi]) Object.assign(weapons[idx].barrels[bi], bov); });
              } else if (key === 'fireControls' && Array.isArray(ov.fireControls)) {
                ov.fireControls.forEach(function(fov, fi) { if (weapons[idx].fireControls[fi]) Object.assign(weapons[idx].fireControls[fi], fov); });
              } else {
                weapons[idx][key] = ov[key];
              }
            });
            overrides[idx] = ov;
            valid++;
          }
        });

        // 应用导入的自定义武器
        if (importCustom.length > 0) {
          customWeapons = importCustom.map(function(cw) { return JSON.parse(JSON.stringify(cw)); });
          saveCustomWeapons();
          mergeCustomWeapons();
        }

        saveOverrides(overrides);
        renderWeaponList();
        if (currentIdx !== null) renderProps(weapons[currentIdx], currentIdx);
        setStatus('📥 已导入 ' + valid + ' 条覆盖 + ' + importCustom.length + ' 把自定义武器', 'success');
      } catch(e) {
        setStatus('❌ 导入失败: ' + e.message, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  function resetAll() {
    if (!confirm('确定要重置所有武器数据到原始值？（自定义武器也会被删除，此操作不可撤销）')) return;

    // 重置内置武器
    overrides = {};
    weapons.forEach(function(w, i) {
      if (i >= builtinCount) return;
      var ov = originalValues[i];
      if (!ov) return;
      w.flesh = ov.flesh;
      w.armor = ov.armor;
      w.rof = ov.rof;
      w.velocity = ov.velocity;
      w.triggerDelay = ov.triggerDelay;
      w.ranges = ov.ranges.slice();
      w.decays = ov.decays.slice();
      if (w.mult && ov.mult) Object.assign(w.mult, ov.mult);
      w.allowedBullets = ov.allowedBullets.slice();
      if (w.barrels && ov.barrels) {
        ov.barrels.forEach(function(b, bi) { if (w.barrels[bi]) Object.assign(w.barrels[bi], b); });
      }
      if (w.fireControls && ov.fireControls) {
        ov.fireControls.forEach(function(f, fi) { if (w.fireControls[fi]) Object.assign(w.fireControls[fi], f); });
      }
    });

    // 删除自定义武器
    customWeapons = [];
    saveCustomWeapons();
    mergeCustomWeapons();

    saveOverrides({});
    renderWeaponList();
    currentIdx = null;
    document.getElementById('editorProps').innerHTML = '<div class="editor-empty">已重置所有数据，从左侧选择一个武器开始编辑</div>';
    setStatus('↺ 已重置所有武器数据', 'success');
  }

  // ── 启动 ──
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
