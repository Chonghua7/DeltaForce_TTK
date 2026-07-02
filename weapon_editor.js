(function() {
  'use strict';

  var OVERRIDES_KEY = 'ttk_weapon_overrides';
  var CUSTOM_WEAPONS_KEY = 'ttk_custom_weapons';
  var CUSTOM_MUZZLES_KEY = 'ttk_custom_muzzles';
  var PER_WEAPON_MUZZLES_KEY = 'ttk_per_weapon_muzzles';

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
    try { localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides)); } catch (e) { console.error('武器覆盖数据保存失败:', e); throw e; }
  }

  function applyOverridesToWeapons(overrides, weapons) {
    if (!overrides || !weapons) return 0;
    var count = 0;
    Object.keys(overrides).forEach(function(idx) {
      var wep = weapons[idx]; if (!wep) return;
      var ov = overrides[idx];
      Object.keys(ov).forEach(function(key) {
        if (key === 'barrels' && Array.isArray(ov.barrels) && Array.isArray(wep.barrels)) {
          ov.barrels.forEach(function(bov, bi) { if (bov._new) { var nb = Object.assign({}, bov); delete nb._new; wep.barrels.push(nb); } else if (wep.barrels[bi]) Object.assign(wep.barrels[bi], bov); });
        } else if (key === 'fireControls' && Array.isArray(ov.fireControls) && Array.isArray(wep.fireControls)) {
          ov.fireControls.forEach(function(fov, fi) { if (fov._new) { var nf = Object.assign({}, fov); delete nf._new; wep.fireControls.push(nf); } else if (wep.fireControls[fi]) Object.assign(wep.fireControls[fi], fov); });
        } else if (key === 'mult' && typeof ov.mult === 'object') { Object.assign(wep.mult, ov.mult);
        } else if (key === 'allowedBullets' && Array.isArray(ov.allowedBullets)) { wep.allowedBullets = ov.allowedBullets.slice();
        } else { wep[key] = ov[key]; }
      });
      count++;
    });
    return count;
  }

  function readWeaponValues(weapon) {
    return {
      flesh: weapon.flesh, armor: weapon.armor, rof: weapon.rof, velocity: weapon.velocity,
      triggerDelay: weapon.triggerDelay || 0,
      ranges: (weapon.ranges || []).slice(), decays: (weapon.decays || []).slice(),
      mult: weapon.mult ? { head: weapon.mult.head, chest: weapon.mult.chest, stomach: weapon.mult.stomach, limbs: weapon.mult.limbs } : {},
      allowedBullets: (weapon.allowedBullets || []).slice(),
      barrels: (weapon.barrels || []).map(function(b) { return Object.assign({}, b); }),
      fireControls: (weapon.fireControls || []).map(function(f) { return Object.assign({}, f); }),
    };
  }

  function computeOverrides(originalValues, currentWeapon) {
    var ov = {};
    if (currentWeapon.flesh !== originalValues.flesh) ov.flesh = currentWeapon.flesh;
    if (currentWeapon.armor !== originalValues.armor) ov.armor = currentWeapon.armor;
    if (currentWeapon.rof !== originalValues.rof) ov.rof = currentWeapon.rof;
    if (currentWeapon.velocity !== originalValues.velocity) ov.velocity = currentWeapon.velocity;
    if ((currentWeapon.triggerDelay || 0) !== originalValues.triggerDelay) ov.triggerDelay = currentWeapon.triggerDelay || 0;
    if (diffArray(originalValues.ranges, currentWeapon.ranges)) ov.ranges = currentWeapon.ranges.slice();
    if (diffArray(originalValues.decays, currentWeapon.decays)) ov.decays = currentWeapon.decays.slice();
    if (originalValues.mult && currentWeapon.mult) {
      var multDiff = {}, hasMultDiff = false;
      ['head','chest','stomach','limbs'].forEach(function(p) {
        if (currentWeapon.mult[p] !== originalValues.mult[p]) { multDiff[p] = currentWeapon.mult[p]; hasMultDiff = true; }
      });
      if (hasMultDiff) ov.mult = multDiff;
    }
    if (diffArray(originalValues.allowedBullets, currentWeapon.allowedBullets)) ov.allowedBullets = currentWeapon.allowedBullets.slice();
    var barrelDiff = diffBarrels(originalValues.barrels, currentWeapon.barrels); if (barrelDiff) ov.barrels = barrelDiff;
    var fcDiff = diffFireControls(originalValues.fireControls, currentWeapon.fireControls); if (fcDiff) ov.fireControls = fcDiff;
    return Object.keys(ov).length > 0 ? ov : null;
  }

  function diffArray(a, b) { if (!a || !b) return true; if (a.length !== b.length) return true; for (var i = 0; i < a.length; i++) { if (a[i] !== b[i]) return true; } return false; }

  function diffBarrels(orig, curr) {
    if (!orig || !curr) return null;
    var result = [], hasDiff = false;
    for (var i = 0; i < Math.max(orig.length, curr.length); i++) {
      if (!orig[i] && curr[i]) {
        // 新增枪管：保存完整数据
        var nd = Object.assign({}, curr[i]); nd._new = true;
        result.push(nd); hasDiff = true;
        continue;
      }
      if (!orig[i] || !curr[i]) { hasDiff = true; break; }
      var od = {}, d = false;
      ['rangeMult','damageBonus','armorDamageBonus','rofMult','rofAdd','triggerDelayDelta','fireMode','burstCount','burstInternalROF','burstInterval'].forEach(function(k) { if (curr[i][k] !== orig[i][k]) { od[k] = curr[i][k]; d = true; } });
      if (curr[i].ranges && diffArray(orig[i].ranges, curr[i].ranges)) { od.ranges = curr[i].ranges.slice(); d = true; }
      if (curr[i].decays && diffArray(orig[i].decays, curr[i].decays)) { od.decays = curr[i].decays.slice(); d = true; }
      if (curr[i].partMultAdd && JSON.stringify(curr[i].partMultAdd) !== JSON.stringify(orig[i].partMultAdd)) { od.partMultAdd = Object.assign({}, curr[i].partMultAdd); d = true; }
      if (d) { od.name = curr[i].name; result.push(od); hasDiff = true; } else result.push(null);
    }
    return hasDiff ? result : null;
  }

  function diffFireControls(orig, curr) {
    if (!orig || !curr) return null;
    var result = [], hasDiff = false;
    for (var i = 0; i < Math.max(orig.length, curr.length); i++) {
      if (!orig[i] && curr[i]) {
        // 新增导气箍：保存完整数据
        var nd = Object.assign({}, curr[i]); nd._new = true;
        result.push(nd); hasDiff = true;
        continue;
      }
      if (!orig[i] || !curr[i]) { hasDiff = true; break; }
      if (curr[i].rof !== orig[i].rof || curr[i].initialRof !== orig[i].initialRof || curr[i].initialRofShots !== orig[i].initialRofShots) {
        var od = { name: curr[i].name }; if (curr[i].rof !== orig[i].rof) od.rof = curr[i].rof; if (curr[i].initialRof !== orig[i].initialRof) od.initialRof = curr[i].initialRof; if (curr[i].initialRofShots !== orig[i].initialRofShots) od.initialRofShots = curr[i].initialRofShots; result.push(od); hasDiff = true;
      } else result.push(null);
    }
    return hasDiff ? result : null;
  }

  // ─── 武器专属枪口系统 ────────────────────

  var GLOBAL_MUZZLE_COUNT = 4; // 无、寂寞、先进、冲锋枪回声消音器
  var perWeaponMuzzleMap = {}; // { globalIndex: weaponIdx }

  function loadPerWeaponMuzzles() {
    try { return JSON.parse(localStorage.getItem(PER_WEAPON_MUZZLES_KEY) || '{}'); } catch(e) { return {}; }
  }
  function savePerWeaponMuzzles(data) {
    try { localStorage.setItem(PER_WEAPON_MUZZLES_KEY, JSON.stringify(data)); } catch(e) {}
  }

  /** 将武器专属枪口注入全局 muzzles 数组，记录映射关系 */
  function mergePerWeaponMuzzles() {
    var data = loadPerWeaponMuzzles();
    var muzzles = app.weaponManager.muzzles;
    perWeaponMuzzleMap = {};
    // 只移除之前注入的专属枪口（带 _weaponSpecific 标记的），保留自定义枪口
    for (var mi = muzzles.length - 1; mi >= GLOBAL_MUZZLE_COUNT; mi--) {
      if (muzzles[mi] && muzzles[mi]._weaponSpecific) muzzles.splice(mi, 1);
    }
    // 注入专属枪口
    Object.keys(data).forEach(function(wIdx) {
      var list = data[wIdx];
      if (!Array.isArray(list)) return;
      list.forEach(function(m) {
        var idx = muzzles.length;
        muzzles.push({ name: m.name, mult: m.mult, _weaponSpecific: true });
        perWeaponMuzzleMap[idx] = parseInt(wIdx);
      });
    });
  }

  /** 获取某把武器的专属枪口列表 */
  function getPerWeaponMuzzlesFor(wIdx) {
    var data = loadPerWeaponMuzzles();
    return data[String(wIdx)] || [];
  }

  /** 设置某把武器的专属枪口列表 */
  function setPerWeaponMuzzlesFor(wIdx, list) {
    var data = loadPerWeaponMuzzles();
    if (list && list.length > 0) data[String(wIdx)] = list;
    else delete data[String(wIdx)];
    savePerWeaponMuzzles(data);
  }

  /** 修改主页面表格的枪口下拉框：全局枪口全显示，专属枪口只显示给对应武器 */
  function patchMainTableMuzzles() {
    var sels = document.querySelectorAll('.muzzleSel');
    if (!sels.length) return;
    sels.forEach(function(sel) {
      var wIdx = parseInt(sel.dataset.weapon);
      if (isNaN(wIdx)) return;
      for (var i = 0; i < sel.options.length; i++) {
        if (i < GLOBAL_MUZZLE_COUNT) {
          sel.options[i].style.display = '';
        } else {
          var owner = perWeaponMuzzleMap[i];
          sel.options[i].style.display = (owner === wIdx) ? '' : 'none';
        }
      }
    });
  }

  // ─── 口径工具 ────────────────────────────────────────────
  function getWeaponCaliber(w) {
    if (!w || !w.allowedBullets) return '';
    var cb = window.__caliber || {};
    for (var i = 0; i < w.allowedBullets.length; i++) {
      var b = String(w.allowedBullets[i]);
      if (cb[b]) return cb[b];
    }
    // 根据可用特殊弹反向推断
    var map = {
      'RIP': '9×19', 'R37.F': '5.7×28', 'RIP45': '.45', 'ACP SUPER': '.45',
      'M61': '7.62×51', 'AP': '6.8×51', 'Double': '12.7×55',
      'BT +P': '5.45×39', 'M855A1 APC': '5.56×45', 'M855A1 APC+': '5.56×45',
      '7.62×39 BP SUB': '7.62×39', '7.62×39 AP SUB': '7.62×39',
      '.300BLK V SUB': '.300 BLK', '.300BLK BCP SUB': '.300 BLK',
      '45-70 Govt FMJ': '45-70 Govt', '45-70 Govt FTX': '45-70 Govt',
    };
    for (var j = 0; j < w.allowedBullets.length; j++) {
      var b2 = String(w.allowedBullets[j]);
      if (map[b2]) return map[b2];
    }
    // 根据武器名推断口径
    var nameMap = {
      'MK4': '4.6×30', '腾龙': '5.8×42', 'QJB201': '5.8×42',
      'SVCH': '7.62×54', 'SVD': '7.62×54', 'PKM': '7.62×54',
    };
    return nameMap[w.name] || '';
  }

  function applyAmmoOverrides() {
    try {
      var ov = loadAmmoOverrides();
      var ammo = window.__ammo;
      if (!ov || !ammo) return;
      Object.keys(ov).forEach(function(k) {
        // 自定义弹药（以 _custom_ 开头）
        if (k.indexOf('_custom_') === 0) {
          var d = ov[k];
          if (d._data) {
            var ck = d._name || k;
            d._data._isCustom = true;
            d._data._sourceKey = k;
            ammo[ck] = d._data;
            // 将新弹药加入匹配口径武器的 allowedBullets
            if (d._caliber && weapons) {
              for (var wi = 0; wi < weapons.length; wi++) {
                if (getWeaponCaliber(weapons[wi]) === d._caliber && weapons[wi].allowedBullets.indexOf(ck) < 0)
                  weapons[wi].allowedBullets.push(ck);
              }
            }
          }
          return;
        }
        // 覆盖现有弹药
        if (!ammo[k]) return;
        var o = ov[k];
        if (o.base !== undefined) ammo[k].base = o.base;
        if (o.armorBase !== undefined) ammo[k].armorBase = o.armorBase;
        if (o.armor) {
          Object.keys(o.armor).forEach(function(lv) {
            if (!ammo[k].armor[lv]) ammo[k].armor[lv] = {};
            if (o.armor[lv].armorMult !== undefined) ammo[k].armor[lv].armorMult = o.armor[lv].armorMult;
            if (o.armor[lv].pen !== undefined) ammo[k].armor[lv].pen = o.armor[lv].pen;
          });
        }
      });
      // 刷新 caliberMap
      Object.keys(ov).forEach(function(k) {
        if (k.indexOf('_custom_') === 0) {
          var d = ov[k];
          if (d._caliber && window.__caliber) window.__caliber[d._name || k] = d._caliber;
        }
      });
    } catch(e) { console.warn('弹药覆盖加载失败:', e); }
  }

  // ─── UI ─────────────────────────────────────────────────────

  var app, weapons, originalValues = {}, overrides = {}, currentIdx = null,
      builtinCount = 0, customWeapons = [], customMuzzles = [];

  function init() {
    if (!window.app || !window.app.weaponManager) { setTimeout(init, 200); return; }
    app = window.app;
    weapons = app.weaponManager.weapons;
    builtinCount = weapons.length;

    weapons.forEach(function(w, i) { originalValues[i] = readWeaponValues(w); });

    // 1. 先应用固化数据（永久版）
    applyBakedPatch();

    // 2. 再加载临时覆盖（编辑器修改，优先级更高）
    overrides = loadOverrides();
    var n = applyOverridesToWeapons(overrides, weapons);
    if (n > 0) console.log('已应用 ' + n + ' 条临时覆盖');

    // 弹药覆盖
    applyAmmoOverrides();

    // 3. 自定义武器 + 枪口（临时）
    customWeapons = loadCustomWeapons();
    customMuzzles = loadCustomMuzzles();
    mergeCustomWeapons();
    mergeCustomMuzzles();
    // 4. 武器专属枪口
    mergePerWeaponMuzzles();

    if (customWeapons.length > 0 || customMuzzles.length > 0 || Object.keys(loadPerWeaponMuzzles()).length > 0) {
      if (app.domController) {
        app.domController.renderAttachmentTable();
        app.domController.updateGlobalBarrelSelections();
      }
    }

    // 修改枪口下拉框
    setTimeout(function() { patchMainTableMuzzles(); }, 100);

    // 自动检测并加载 weapon_patch.js（如果存在）
    tryLoadExternalPatch();

    if (customWeapons.length > 0) console.log('已加载 ' + customWeapons.length + ' 把自定义武器');
    bindUI();
  }

  // ── 自定义武器 CRUD ──

  function loadCustomWeapons() { try { return JSON.parse(localStorage.getItem(CUSTOM_WEAPONS_KEY) || '[]'); } catch(e) { return []; } }
  function saveCustomWeapons() { try { localStorage.setItem(CUSTOM_WEAPONS_KEY, JSON.stringify(customWeapons)); } catch(e) { console.error('自定义武器保存失败:', e); } }
  function loadCustomMuzzles() { try { return JSON.parse(localStorage.getItem(CUSTOM_MUZZLES_KEY) || '[]'); } catch(e) { return []; } }
  function saveCustomMuzzles() { try { localStorage.setItem(CUSTOM_MUZZLES_KEY, JSON.stringify(customMuzzles)); } catch(e) { console.error('自定义枪口保存失败:', e); } }

  function mergeCustomWeapons() {
    while (weapons.length > builtinCount) weapons.pop();
    customWeapons.forEach(function(cw) { var w = JSON.parse(JSON.stringify(cw)); w._custom = true; weapons.push(w); });
  }
  function mergeCustomMuzzles() {
    var muzzles = app.weaponManager.muzzles;
    while (muzzles.length > GLOBAL_MUZZLE_COUNT) muzzles.pop();
    customMuzzles.forEach(function(cm) { muzzles.push(JSON.parse(JSON.stringify(cm))); });
  }

  function createDefaultWeapon() {
    return {
      name: '新武器', type: '步枪',
      ranges: [40, 70, 1/0, 1/0], decays: [1, 0.85, 0.7, 0.7, 0.7],
      velocity: 575, flesh: 30, armor: 30, rof: 700, triggerDelay: 0,
      barrels: [{ name: '默认枪管', rangeMult: 1, rofMult: 1 }],
      mult: { head: 1.9, chest: 1, stomach: 0.9, limbs: 0.4 },
      allowedBullets: [3, 4, 5], _custom: true,
    };
  }

  function addCustomWeapon() {
    var cw = createDefaultWeapon();
    customWeapons.push(JSON.parse(JSON.stringify(cw)));
    saveCustomWeapons();
    mergeCustomWeapons();
    originalValues[weapons.length - 1] = readWeaponValues(weapons[weapons.length - 1]);
    renderWeaponList();
    selectWeapon(weapons.length - 1);
    setStatus('已添加新武器「' + cw.name + '」，填写数据后保存', 'info');
  }

  function deleteCustomWeapon(idx) {
    if (idx < builtinCount) return;
    var cwIdx = idx - builtinCount, name = weapons[idx].name;
    if (!confirm('确定要删除自定义武器「' + name + '」？')) return;
    customWeapons.splice(cwIdx, 1); saveCustomWeapons();
    setPerWeaponMuzzlesFor(idx, null);
    delete originalValues[idx];
    mergeCustomWeapons(); mergePerWeaponMuzzles();
    renderWeaponList();
    currentIdx = null;
    document.getElementById('editorProps').innerHTML = '<div class="editor-empty">从左侧选择一个武器开始编辑</div>';
    setStatus('已删除「' + name + '」', 'info');
  }

  function bindUI() {
    var openBtn = document.getElementById('dataEditorBtn'), modal = document.getElementById('weaponDataEditor'), closeBtn = document.getElementById('weaponEditorCloseBtn');
    if (!openBtn || !modal) return;
    openBtn.addEventListener('click', function() { openEditor(); });
    closeBtn && closeBtn.addEventListener('click', function() { closeEditor(); });
    modal.addEventListener('click', function(e) { if (e.target.dataset && e.target.dataset.close === 'weapon-data-editor') closeEditor(); });
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeEditor(); });

    document.getElementById('editorSearch').addEventListener('input', function() { renderWeaponList(this.value); });

    // 清除临时数据按钮（主页面）
    document.getElementById('clearDataBtn') && document.getElementById('clearDataBtn').addEventListener('click', function() {
      if (!confirm('清除所有数据？\n\n将清除：\n- 武器数值覆盖\n- 自定义武器、专属枪口\n- 主页面设置（子弹等级、护甲值等）\n\n永久版数据 (ttk_baked_patch) 不受影响')) return;
      ['ttk_weapon_overrides','ttk_custom_weapons','ttk_custom_muzzles','ttk_per_weapon_muzzles','ttk_muzzle_overrides','ttk_calculator_config','ttk_ammo_overrides'].forEach(function(k) { try { localStorage.removeItem(k); } catch(e) {} });
      location.href = 'index.html?r=' + Date.now();
    });

    document.getElementById('hideDmrBtn') && document.getElementById('hideDmrBtn').addEventListener('click', function() {
      var rows = document.querySelectorAll('#attachmentTable tbody tr');
      var count = 0;
      rows.forEach(function(row) {
        if (row.dataset.excluded === '1') return;
        var name = row.dataset.weaponName || (row.cells ? row.cells[0].textContent.trim() : '');
        if (!name) return;
        var idx = -1;
        for (var i = 0; i < weapons.length; i++) { if (weapons[i].name === name) { idx = i; break; } }
        if (idx < 0 || weapons[idx].type !== '精确射手步枪') return;
        if (name === 'M14' || name === 'SVCH') return;
        row.dataset.excluded = '1';
        row.style.display = 'none';
        count++;
      });
      alert(count > 0 ? '已隐藏 ' + count + ' 把精确射手步枪' : '没有可隐藏的精确射手步枪');
    });

    document.getElementById('editorExportBtn').addEventListener('click', exportJSON);
    document.getElementById('editorImportBtn').addEventListener('click', function() { document.getElementById('editorFileInput').click(); });
    document.getElementById('editorFileInput').addEventListener('change', importJSON);
    document.getElementById('editorResetBtn').addEventListener('click', resetAll);
    document.getElementById('editorAddBtn').addEventListener('click', addCustomWeapon);
    document.getElementById('editorPermanentBtn').addEventListener('click', generatePermanent);
    document.getElementById('editorAmmoBtn').addEventListener('click', openAmmoEditor);

    // 事件委托
    document.getElementById('editorProps').addEventListener('click', function(e) {
      var t = e.target, ci = currentIdx;
      if (t.closest('#deleteCustomWeaponBtn')) { deleteCustomWeapon(parseInt(t.closest('#deleteCustomWeaponBtn').dataset.idx)); return; }
      if (t.closest('.remove-barrel-btn') && ci !== null && weapons[ci]) {
        var bi = parseInt(t.closest('.remove-barrel-btn').dataset.barrelIdx);
        if (weapons[ci].barrels.length > 1 || ci >= builtinCount) { weapons[ci].barrels.splice(bi, 1); markModified(ci); renderProps(weapons[ci], ci); } else alert('至少保留一个枪管');
        return;
      }
      if (t.closest('.remove-fc-btn') && ci !== null && weapons[ci]) {
        var fi = parseInt(t.closest('.remove-fc-btn').dataset.fcIdx);
        if (weapons[ci].fireControls) { weapons[ci].fireControls.splice(fi, 1); markModified(ci); renderProps(weapons[ci], ci); }
        return;
      }
      if (t.id === 'addBarrelBtn' && ci !== null && weapons[ci]) {
        var n = weapons[ci].barrels.length + 1;
        weapons[ci].barrels.push({ name: '新枪管' + n, rangeMult: 1, rofMult: 1 }); markModified(ci); renderProps(weapons[ci], ci);
        return;
      }
      if (t.id === 'addFcBtn' && ci !== null && weapons[ci]) {
        var n2 = (weapons[ci].fireControls || []).length + 1;
        if (!weapons[ci].fireControls) weapons[ci].fireControls = [];
        weapons[ci].fireControls.push({ name: '新导气箍' + n2, rof: 700 }); markModified(ci); renderProps(weapons[ci], ci);
        return;
      }
      // 专属枪口：删除
      if (t.closest('.remove-pwm-btn') && ci !== null) {
        var pi = parseInt(t.closest('.remove-pwm-btn').dataset.pwmIdx);
        var list = getPerWeaponMuzzlesFor(ci);
        list.splice(pi, 1); setPerWeaponMuzzlesFor(ci, list);
        mergePerWeaponMuzzles();
        if (app.domController) { app.domController.renderAttachmentTable(); app.domController.updateGlobalBarrelSelections(); }
        setTimeout(function() { patchMainTableMuzzles(); }, 50);
        renderProps(weapons[ci], ci); setStatus('已删除专属枪口', 'info');
        return;
      }
      // 专属枪口：添加
      if (t.id === 'addPwmBtn' && ci !== null) {
        var newName = prompt('输入枪口名称:', '新消音器');
        if (!newName) return;
        var list2 = getPerWeaponMuzzlesFor(ci);
        list2.push({ name: newName, mult: 0.3 }); setPerWeaponMuzzlesFor(ci, list2);
        mergePerWeaponMuzzles();
        if (app.domController) { app.domController.renderAttachmentTable(); app.domController.updateGlobalBarrelSelections(); }
        setTimeout(function() { patchMainTableMuzzles(); }, 50);
        renderProps(weapons[ci], ci); setStatus('已添加专属枪口「' + newName + '」', 'info');
        return;
      }
    });
  }

  function openEditor() {
    var modal = document.getElementById('weaponDataEditor');
    if (!modal) return;
    // 恢复所有UI
    ['editorAddBtn','editorAmmoBtn','editorPermanentBtn'].forEach(function(id) { var el = document.getElementById(id); if (el) el.style.display = ''; });
    var sb2 = document.querySelector('.editor-sidebar'); if (sb2) sb2.style.display = '';
    var dw2 = document.querySelector('.weapon-data-editor-dialog'); if (dw2) dw2.style.maxWidth = "";
    var resetBtn = document.getElementById('editorResetBtn'); if (resetBtn) resetBtn.textContent = '↺ 重置';
    renderWeaponList();
    modal.classList.remove('hidden');
    if (weapons.length > 0) selectWeapon(0);
    var bar = document.getElementById('editorStatusBar');
    if (bar) bar.textContent = '已加载 ' + weapons.length + ' 把武器 · 已修改: ' + Object.keys(loadOverrides()).length + ' 条';
  }

  function closeEditor() { var modal = document.getElementById('weaponDataEditor'); if (modal) modal.classList.add('hidden'); }

  function renderWeaponList(filter) {
    var list = document.getElementById('editorWeaponList'); if (!list) return;
    list.innerHTML = '';
    weapons.forEach(function(w, i) {
      if (filter && w.name.indexOf(filter) === -1) return;
      var isCustom = i >= builtinCount;
      var item = document.createElement('div');
      item.className = 'editor-weapon-item' + (i === currentIdx ? ' active' : '') + (!isCustom && overrides[i] ? ' modified' : '') + (isCustom ? ' custom' : '');
      item.dataset.idx = i;
      item.innerHTML = '<span>' + w.name + '</span><span class="weapon-type-badge">' + (isCustom ? '自定义' : w.type) + '</span>';
      item.addEventListener('click', function() { selectWeapon(i); });
      list.appendChild(item);
    });
    var c = list.children.length;
    document.getElementById('editorWeaponCount').textContent = '共 ' + c + ' 把武器' + (customWeapons.length ? ' (其中 ' + customWeapons.length + ' 把自定义)' : '');
  }

  function selectWeapon(idx) {
    // 恢复枪械编辑按钮
    // 恢复枪械编辑UI
    ['editorAddBtn','editorAmmoBtn','editorPermanentBtn'].forEach(function(id) { var el = document.getElementById(id); if (el) el.style.display = ''; });
    // 移除弹药页面的动态按钮
    var dw = document.querySelector('.weapon-data-editor-dialog'); if (dw) dw.style.maxWidth = "";
    ['ammoBackBtn','addAmmoBtn'].forEach(function(id) { var el = document.getElementById(id); if (el) el.remove(); });
    var sb = document.querySelector('.editor-sidebar'); if (sb) sb.style.display = '';
    var resetBtn = document.getElementById('editorResetBtn'); if (resetBtn) resetBtn.textContent = '↺ 重置';
    currentIdx = idx;
    var w = weapons[idx]; if (!w) return;
    var items = document.querySelectorAll('#editorWeaponList .editor-weapon-item');
    items.forEach(function(it) { it.className = 'editor-weapon-item' + (parseInt(it.dataset.idx) === idx ? ' active' : '') + (overrides[parseInt(it.dataset.idx)] ? ' modified' : ''); });
    renderProps(w, idx);
  }

  function renderProps(w, idx) {
    var container = document.getElementById('editorProps'); if (!container) return;
    var isCustom = idx >= builtinCount, mult = w.mult || {};
    var html = '';

    html += '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">';
    html += '<h3 style="margin:0;font-size:1.1rem">' + w.name + '</h3>';
    if (isCustom) html += '<button id="deleteCustomWeaponBtn" class="editor-action-btn danger" data-idx="' + idx + '">🗑 删除此武器</button>';
    html += '</div>';

    // 基础属性
    html += '<div class="editor-prop-group"><div class="editor-prop-group-title">基础属性</div><div class="editor-prop-group-body">';
    html += field('名称', 'wpn_name', w.name, 'text') + field('类型', 'wpn_type', w.type, 'text');
    html += field('肉伤', 'wpn_flesh', w.flesh, 'number') + field('甲伤', 'wpn_armor', w.armor, 'number');
    html += field('射速', 'wpn_rof', w.rof, 'number') + field('初速', 'wpn_velocity', w.velocity, 'number');
    html += field('扳机延迟', 'wpn_triggerDelay', w.triggerDelay || 0, 'number');
    html += '</div></div>';

    // 射程衰减
    html += '<div class="editor-prop-group"><div class="editor-prop-group-title">射程衰减</div><div class="editor-prop-group-body">';
    html += '<div class="editor-field" style="flex-direction:row;align-items:center;gap:4px;width:100%;flex-wrap:wrap;"><label>射程断点 (m):</label>';
    (w.ranges || []).forEach(function(r, i) { html += '<input type="number" class="arr-val" data-key="ranges" data-idx="' + i + '" value="' + (r === 1/0 ? 9999 : r) + '" min="0" style="width:60px">'; if (i < 3) html += '<span style="color:#aaa">→</span>'; });
    html += '</div>';
    html += '<div class="editor-field" style="flex-direction:row;align-items:center;gap:4px;width:100%;flex-wrap:wrap;"><label>伤害衰减系数:</label>';
    (w.decays || []).forEach(function(d, i) { html += '<input type="number" class="arr-val" data-key="decays" data-idx="' + i + '" value="' + d + '" step="0.05" min="0" max="1" style="width:55px">'; if (i < 4) html += '<span style="color:#aaa">→</span>'; });
    html += '</div></div></div>';

    // 部位倍率
    html += '<div class="editor-prop-group"><div class="editor-prop-group-title">部位倍率</div><div class="editor-prop-group-body">';
    html += field('头部', 'wpn_mult_head', mult.head || 1, 'number', '0.1') + field('胸部', 'wpn_mult_chest', mult.chest || 1, 'number', '0.1');
    html += field('腹部', 'wpn_mult_stomach', mult.stomach || 1, 'number', '0.1') + field('四肢', 'wpn_mult_limbs', mult.limbs || 0.4, 'number', '0.05');
    html += '</div></div>';

    // 可用子弹
    html += '<div class="editor-prop-group"><div class="editor-prop-group-title">可用子弹（逗号分隔）</div><div class="editor-prop-group-body">';
    html += '<input type="text" id="wpn_allowedBullets" value="' + (w.allowedBullets || []).join(',') + '" style="min-width:400px;padding:6px 10px;border:1px solid #ddd;border-radius:4px;font-size:0.85rem">';
    html += '</div></div>';

    // 枪管列表
    if (w.barrels && w.barrels.length > 0) {
      html += '<div class="editor-prop-group"><div class="editor-prop-group-title">枪管</div><div class="editor-prop-group-body" style="flex-direction:column">';
      w.barrels.forEach(function(b, bi) {
        html += '<div class="editor-barrel-item"><div class="barrel-header">#' + (bi+1) + ' ' + b.name;
        html += ' <button class="remove-barrel-btn editor-action-btn danger" style="float:right;padding:1px 8px;font-size:0.75rem" data-barrel-idx="' + bi + '">✕ 删除</button></div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
        html += field('射程/初速倍率', 'bar_rangeMult_' + bi, b.rangeMult !== void 0 ? b.rangeMult : '', 'number', '0.01');
        html += field('肉伤加值', 'bar_damageBonus_' + bi, b.damageBonus !== void 0 ? b.damageBonus : 0, 'number');
        html += field('甲伤加值', 'bar_armorDamageBonus_' + bi, b.armorDamageBonus !== void 0 ? b.armorDamageBonus : 0, 'number');
        html += field('射速倍率', 'bar_rofMult_' + bi, b.rofMult !== void 0 ? b.rofMult : 1, 'number', '0.01');
        html += field('射速加成', 'bar_rofAdd_' + bi, b.rofAdd !== void 0 ? b.rofAdd : 0, 'number');
        html += '</div></div>';
      });
      html += '<div style="padding:8px 0 0"><button id="addBarrelBtn" class="editor-action-btn" style="border-color:#6b4c9a;color:#6b4c9a">＋ 添加枪管</button></div></div></div>';
    }

    // 射速配件
    html += '<div class="editor-prop-group"><div class="editor-prop-group-title">射速配件（导气箍）</div><div class="editor-prop-group-body" style="flex-direction:column">';
    if (w.fireControls) {
      w.fireControls.forEach(function(f, fi) {
        html += '<div class="editor-barrel-item"><div class="barrel-header">#' + (fi+1) + ' ' + f.name;
        html += ' <button class="remove-fc-btn editor-action-btn danger" style="float:right;padding:1px 8px;font-size:0.75rem" data-fc-idx="' + fi + '">✕ 删除</button></div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
        html += field('射速', 'fc_rof_' + fi, f.rof || '', 'number');
        html += field('首发射速', 'fc_initialRof_' + fi, f.initialRof !== void 0 ? f.initialRof : '', 'number');
        html += field('首发弹数', 'fc_initialRofShots_' + fi, f.initialRofShots !== void 0 ? f.initialRofShots : '', 'number');
        html += '</div></div>';
      });
    }
    html += '<div style="padding:8px 0 0"><button id="addFcBtn" class="editor-action-btn" style="border-color:#6b4c9a;color:#6b4c9a">＋ 添加导气箍</button></div></div></div>';

    // ── 专属枪口 ──
    var pwmList = getPerWeaponMuzzlesFor(idx);
    html += '<div class="editor-prop-group"><div class="editor-prop-group-title">🔒 专属枪口（仅此武器可用）</div><div class="editor-prop-group-body" style="flex-direction:column">';
    if (pwmList.length > 0) {
      pwmList.forEach(function(m, pi) {
        html += '<div class="editor-barrel-item"><div class="barrel-header">#' + (pi+1) + ' ' + m.name;
        html += ' <button class="remove-pwm-btn editor-action-btn danger" style="float:right;padding:1px 8px;font-size:0.75rem" data-pwm-idx="' + pi + '">✕ 删除</button></div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
        html += field('初速/射程倍率', 'pwm_mult_' + pi, m.mult, 'number', '0.01');
        html += '</div></div>';
      });
    }
    html += '<div style="padding:8px 0 0"><button id="addPwmBtn" class="editor-action-btn" style="border-color:#6b4c9a;color:#6b4c9a">＋ 添加专属枪口</button></div></div></div>';

    // ── 全局枪口（可修改倍率） ──
    var globalMuzzles = app.weaponManager.muzzles || [];
    html += '<div class="editor-prop-group"><div class="editor-prop-group-title">🌐 全局枪口（所有武器共用）</div><div class="editor-prop-group-body" style="flex-direction:column">';
    for (var gi = 0; gi < GLOBAL_MUZZLE_COUNT && gi < globalMuzzles.length; gi++) {
      var gm = globalMuzzles[gi];
      html += '<div class="editor-barrel-item"><div class="barrel-header">#' + (gi+1) + ' ' + gm.name + '</div>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:8px">';
      html += field('初速/射程倍率', 'global_muzzle_mult_' + gi, gm.mult, 'number', '0.01');
      html += '</div></div>';
    }
    html += '</div></div>';

    container.innerHTML = html;

    // 绑定事件
    container.querySelectorAll('.arr-val').forEach(function(el) {
      el.addEventListener('change', function() {
        var key = this.dataset.key, idx2 = parseInt(this.dataset.idx);
        if (!weapons[currentIdx]) return;
        if (key === 'ranges' || key === 'decays') {
          if (!weapons[currentIdx][key]) weapons[currentIdx][key] = [];
          weapons[currentIdx][key][idx2] = key === 'ranges' ? (parseInt(this.value) >= 9999 ? 1/0 : parseFloat(this.value)) : parseFloat(this.value);
        }
        markModified(currentIdx);
      });
    });

    var ni = document.getElementById('wpn_name');
    ni && ni.addEventListener('change', function() {
      if (weapons[currentIdx]) weapons[currentIdx].name = this.value;
      markModified(currentIdx);
      document.querySelectorAll('#editorWeaponList .editor-weapon-item').forEach(function(it) { if (parseInt(it.dataset.idx) === currentIdx) it.querySelector('span:first-child').textContent = weapons[currentIdx].name; });
    });
    document.getElementById('wpn_type') && document.getElementById('wpn_type').addEventListener('change', function() { if (weapons[currentIdx]) { weapons[currentIdx].type = this.value; markModified(currentIdx); } });
    ['wpn_flesh','wpn_armor','wpn_rof','wpn_velocity','wpn_triggerDelay'].forEach(function(id) {
      var key = id.replace('wpn_', '');
      document.getElementById(id) && document.getElementById(id).addEventListener('change', function() { if (weapons[currentIdx]) { weapons[currentIdx][key] = parseFloat(this.value) || 0; markModified(currentIdx); } });
    });
    ['head','chest','stomach','limbs'].forEach(function(p) {
      document.getElementById('wpn_mult_' + p) && document.getElementById('wpn_mult_' + p).addEventListener('change', function() { if (weapons[currentIdx]) { if (!weapons[currentIdx].mult) weapons[currentIdx].mult = {}; weapons[currentIdx].mult[p] = parseFloat(this.value) || 0; markModified(currentIdx); } });
    });
    document.getElementById('wpn_allowedBullets') && document.getElementById('wpn_allowedBullets').addEventListener('change', function() {
      if (weapons[currentIdx]) { weapons[currentIdx].allowedBullets = this.value.split(',').map(function(s) { return s.trim(); }).filter(Boolean).map(function(s) { return isNaN(s) ? s : Number(s); }); markModified(currentIdx); }
    });
    // 枪管
    if (w.barrels) {
      w.barrels.forEach(function(b, bi) {
        ['rangeMult','damageBonus','armorDamageBonus','rofMult','rofAdd'].forEach(function(k) {
          document.getElementById('bar_' + k + '_' + bi) && document.getElementById('bar_' + k + '_' + bi).addEventListener('change', function() {
            if (weapons[currentIdx] && weapons[currentIdx].barrels && weapons[currentIdx].barrels[bi]) { weapons[currentIdx].barrels[bi][k] = this.value === '' ? void 0 : parseFloat(this.value); markModified(currentIdx); }
          });
        });
      });
    }
    // 导气箍
    if (w.fireControls) {
      w.fireControls.forEach(function(f, fi) {
        ['rof','initialRof','initialRofShots'].forEach(function(k) {
          document.getElementById('fc_' + k + '_' + fi) && document.getElementById('fc_' + k + '_' + fi).addEventListener('change', function() {
            if (weapons[currentIdx] && weapons[currentIdx].fireControls && weapons[currentIdx].fireControls[fi]) { weapons[currentIdx].fireControls[fi][k] = this.value === '' ? void 0 : parseFloat(this.value); markModified(currentIdx); }
          });
        });
      });
    }
    // 专属枪口倍率
    pwmList.forEach(function(m, pi) {
      document.getElementById('pwm_mult_' + pi) && document.getElementById('pwm_mult_' + pi).addEventListener('change', function() {
        var list = getPerWeaponMuzzlesFor(currentIdx);
        if (list[pi]) { list[pi].mult = parseFloat(this.value) || 0; setPerWeaponMuzzlesFor(currentIdx, list); }
        mergePerWeaponMuzzles();
        setStatus('专属枪口倍率已修改', 'info');
      });
    });
    // 全局枪口倍率修改
    for (var gi2 = 0; gi2 < GLOBAL_MUZZLE_COUNT; gi2++) {
      (function(idx) {
        document.getElementById('global_muzzle_mult_' + idx) && document.getElementById('global_muzzle_mult_' + idx).addEventListener('change', function() {
          var muzzlesArr = app.weaponManager.muzzles;
          if (muzzlesArr[idx]) {
            muzzlesArr[idx].mult = parseFloat(this.value) || 0;
            setStatus('全局枪口倍率已修改，保存后生效', 'info');
          }
        });
      })(gi2);
    }
  }

  function field(label, id, value, type, step) {
    var st = step ? ' step="' + step + '"' : '';
    return '<div class="editor-field"><label for="' + id + '">' + label + '</label><input type="' + type + '" id="' + id + '" value="' + (value ?? '') + '"' + st + '></div>';
  }

  function stripCustomFlag(w) { var c = JSON.parse(JSON.stringify(w)); delete c._custom; return c; }

  function syncCustomWeaponsToStorage() {
    customWeapons = [];
    for (var i = builtinCount; i < weapons.length; i++) customWeapons.push(stripCustomFlag(weapons[i]));
    saveCustomWeapons();
  }

  function markModified(idx) {
    if (idx >= builtinCount) { syncCustomWeaponsToStorage(); return; }
    overrides = loadOverrides();
    var vals = readWeaponValues(weapons[idx]);
    var ov = computeOverrides(originalValues[idx], vals);
    if (ov) overrides[idx] = ov; else delete overrides[idx];
    saveOverrides(overrides);
    document.querySelectorAll('#editorWeaponList .editor-weapon-item').forEach(function(it) {
      var i = parseInt(it.dataset.idx);
      it.className = 'editor-weapon-item' + (i === currentIdx ? ' active' : '') + (overrides[i] ? ' modified' : '');
    });
  }

  function setStatus(msg, type) { var bar = document.getElementById('editorStatusBar'); if (!bar) return; bar.textContent = msg; bar.className = 'editor-status-bar' + (type ? ' ' + type : ''); }

  // ── 导出 / 导入 / 重置 ──

  function saveChanges() {
    // 已改为自动保存，无需手动操作
    setStatus('✅ 修改已自动保存', 'success');
  }

  function exportJSON() {
    var data = JSON.stringify({
      version: 3, exportedAt: new Date().toISOString(),
      overrides: overrides, customWeapons: customWeapons, customMuzzles: customMuzzles,
      perWeaponMuzzles: loadPerWeaponMuzzles(),
      ammoOverrides: loadAmmoOverrides(),
    }, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var url = URL.createObjectURL(blob), a = document.createElement('a');
    a.href = url; a.download = 'ttk_data_' + new Date().toISOString().slice(0, 10) + '.json'; a.click();
    URL.revokeObjectURL(url);
    setStatus('📤 已导出（覆盖 ' + Object.keys(overrides).length + ' 条 + 自定义 ' + customWeapons.length + ' 把）', 'info');
  }

  function importJSON(e) {
    var file = e.target.files[0]; if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      try {
        var data = JSON.parse(ev.target.result);
        if (typeof data !== 'object' || Array.isArray(data)) throw new Error('数据格式错误');
        var importOverrides = data.overrides || data, importCustom = data.customWeapons || [], importMuzzles = data.customMuzzles || [], importPwm = data.perWeaponMuzzles || [], importAmmo = data.ammoOverrides || {};
        if (importOverrides !== data) {
          Object.keys(data).forEach(function(k) { if (['version','exportedAt','overrides','customWeapons','customMuzzles','perWeaponMuzzles','ammoOverrides'].indexOf(k) === -1) throw new Error('未知字段: ' + k); });
        }
        overrides = {};
        weapons.forEach(function(w, i_) { if (originalValues[i_]) Object.assign(w, originalValues[i_]); });
        var valid = 0;
        Object.keys(importOverrides).forEach(function(k) {
          var idx = parseInt(k);
          if (!isNaN(idx) && weapons[idx]) {
            var ov = importOverrides[k];
            Object.keys(ov).forEach(function(key) {
              if (key === 'mult' && typeof ov.mult === 'object' && weapons[idx].mult) { Object.assign(weapons[idx].mult, ov.mult); }
              else if (key === 'barrels' && Array.isArray(ov.barrels)) { ov.barrels.forEach(function(bov, bi) { if (bov._new) { var _nb=Object.assign({},bov); delete _nb._new; weapons[idx].barrels.push(_nb); } else if (weapons[idx].barrels[bi]) Object.assign(weapons[idx].barrels[bi], bov); }); }
              else if (key === 'fireControls' && Array.isArray(ov.fireControls)) { ov.fireControls.forEach(function(fov, fi) { if (fov._new) { var _nf=Object.assign({},fov); delete _nf._new; weapons[idx].fireControls.push(_nf); } else if (weapons[idx].fireControls[fi]) Object.assign(weapons[idx].fireControls[fi], fov); }); }
              else { weapons[idx][key] = ov[key]; }
            });
            overrides[idx] = ov; valid++;
          }
        });
        if (importCustom.length > 0) { customWeapons = importCustom.map(function(cw) { return JSON.parse(JSON.stringify(cw)); }); saveCustomWeapons(); mergeCustomWeapons(); }
        if (importMuzzles.length > 0) { customMuzzles = importMuzzles.map(function(cm) { return JSON.parse(JSON.stringify(cm)); }); saveCustomMuzzles(); mergeCustomMuzzles(); }
        if (Object.keys(importPwm).length > 0) { savePerWeaponMuzzles(importPwm); mergePerWeaponMuzzles(); }
        if (Object.keys(importAmmo).length > 0) { saveAmmoOverrides(importAmmo); applyAmmoOverrides(); }
        saveOverrides(overrides);
        if (app.domController) { app.domController.renderAttachmentTable(); app.domController.updateGlobalBarrelSelections(); }
        setTimeout(function() { patchMainTableMuzzles(); }, 50);
        renderWeaponList();
        if (currentIdx !== null) renderProps(weapons[currentIdx], currentIdx);
        setStatus('📥 已导入 ' + valid + ' 条覆盖 + ' + importCustom.length + ' 把自定义武器', 'success');
      } catch(e) { setStatus('❌ 导入失败: ' + e.message, 'error'); }
    };
    reader.readAsText(file); e.target.value = '';
  }

  function resetAll() {
    if (!confirm('确定要重置所有武器数据到原始值？（自定义武器和枪口也会被删除，此操作不可撤销）')) return;
    overrides = {};
    weapons.forEach(function(w, i) {
      if (i >= builtinCount) return;
      var ov = originalValues[i]; if (!ov) return;
      w.flesh = ov.flesh; w.armor = ov.armor; w.rof = ov.rof; w.velocity = ov.velocity; w.triggerDelay = ov.triggerDelay;
      w.ranges = ov.ranges.slice(); w.decays = ov.decays.slice();
      if (w.mult && ov.mult) Object.assign(w.mult, ov.mult);
      w.allowedBullets = ov.allowedBullets.slice();
      if (w.barrels && ov.barrels) { ov.barrels.forEach(function(b, bi) { if (w.barrels[bi]) Object.assign(w.barrels[bi], b); }); }
      if (w.fireControls && ov.fireControls) { ov.fireControls.forEach(function(f, fi) { if (w.fireControls[fi]) Object.assign(w.fireControls[fi], f); }); }
    });
    customWeapons = []; customMuzzles = [];
    saveCustomWeapons(); saveCustomMuzzles();
    savePerWeaponMuzzles({});
    mergeCustomWeapons(); mergeCustomMuzzles(); mergePerWeaponMuzzles();
    try { localStorage.removeItem('ttk_muzzle_overrides'); } catch(e) {}
    try { localStorage.removeItem("'ttk_ammo_overrides'"); } catch(e) {}
    saveOverrides({});
    if (app.domController) { app.domController.renderAttachmentTable(); app.domController.updateGlobalBarrelSelections(); }
    setTimeout(function() { patchMainTableMuzzles(); }, 50);
    renderWeaponList();
    currentIdx = null; document.getElementById('editorProps').innerHTML = '<div class="editor-empty">已重置所有数据，从左侧选择一个武器开始编辑</div>';
    setStatus('↺ 已重置所有武器数据', 'success');
  }

  // ── 尝试加载外部的 weapon_patch.js ──
  function tryLoadExternalPatch() {
    var s = document.createElement('script');
    s.src = 'weapon_patch.js?t=' + Date.now();
    s.onerror = function() { s.remove(); };
    s.onload = function() { console.log('已加载 weapon_patch.js'); };
    document.body.appendChild(s);
  }

  // ── 生成永久版 ──
  function generatePermanent() {
    // 读取上次固化数据，计算增量
    var prevRaw = localStorage.getItem('ttk_baked_patch');
    var prev = prevRaw ? JSON.parse(prevRaw) : null;

    // 计算新增/变化的武器覆盖
    var newBuiltin = 0;
    var builtinData = {};
    for (var i = 0; i < builtinCount; i++) {
      var ov = computeOverrides(originalValues[i], weapons[i]);
      if (ov) {
        builtinData[i] = ov;
        if (!prev || !prev.overrides || JSON.stringify(prev.overrides[i]) !== JSON.stringify(ov)) newBuiltin++;
      }
    }

    // 新增自定义武器（不在上次固化中的）
    var newCustom = 0;
    if (customWeapons.length > 0) {
      var prevNames = prev && prev.customWeapons ? prev.customWeapons.map(function(c) { return c.name; }) : [];
      customWeapons.forEach(function(c) { if (prevNames.indexOf(c.name) < 0) newCustom++; });
    }

    // 新增专属枪口组
    var pwmData = loadPerWeaponMuzzles();
    var newPwm = 0;
    var prevPwm = prev && prev.perWeaponMuzzles ? prev.perWeaponMuzzles : {};
    Object.keys(pwmData).forEach(function(k) {
      if (!prevPwm[k] || JSON.stringify(prevPwm[k]) !== JSON.stringify(pwmData[k])) newPwm++;
    });

    // 新增弹药修改
    var ammoOv = loadAmmoOverrides();
    var newAmmo = 0;
    var prevAmmo = prev && prev.ammoOverrides ? prev.ammoOverrides : {};
    Object.keys(ammoOv).forEach(function(k) {
      if (!prevAmmo[k] || JSON.stringify(prevAmmo[k]) !== JSON.stringify(ammoOv[k])) newAmmo++;
    });

    // 生成提示信息
    var msg = '将以下新增修改固化为永久？\n';
    var hasAny = false;
    if (newBuiltin > 0) { msg += '\n• ' + newBuiltin + ' 条武器数值变化'; hasAny = true; }
    if (newCustom > 0) { msg += '\n• ' + newCustom + ' 把新增自定义武器'; hasAny = true; }
    if (newPwm > 0) { msg += '\n• ' + newPwm + ' 组新增专属枪口'; hasAny = true; }
    if (newAmmo > 0) { msg += '\n• ' + newAmmo + ' 条弹药修改'; hasAny = true; }
    if (!hasAny) {
      if (!confirm('当前没有新的修改需要固化。\n所有数据已是最新版本。\n\n继续覆盖固化？')) return;
    } else {
      if (!confirm(msg + '\n\n继续吗？')) return;
    }

    var patchData = { version:2, time:new Date().toISOString(), overrides:builtinData, customWeapons:customWeapons, customMuzzles:customMuzzles, perWeaponMuzzles:pwmData, ammoOverrides:ammoOv };

    localStorage.setItem('ttk_baked_patch', JSON.stringify(patchData));
    ['ttk_weapon_overrides','ttk_custom_weapons','ttk_custom_muzzles','ttk_per_weapon_muzzles','ttk_muzzle_overrides','ttk_permanent_patch','ttk_patch_done','ttk_ammo_overrides'].forEach(function(k) { try { localStorage.removeItem(k); } catch(e) {} });

    applyBakedPatch();
    if (app.domController) { app.domController.renderAttachmentTable(); app.domController.updateGlobalBarrelSelections(); }
    setTimeout(function() { patchMainTableMuzzles(); }, 50);
    setStatus('✅ 已固化为永久数据！刷新后依然生效。清除临时数据不影响此版本', 'success');
  }

  /** 在 init 时从 localStorage 加载并应用固化数据（降级方案） */
  function applyBakedPatch() {
    try {
      var raw = localStorage.getItem('ttk_baked_patch');
      if (!raw) return;
      var data = JSON.parse(raw);
      if (!data || !data.version) return;
      var cnt = 0;

      if (data.overrides) {
        Object.keys(data.overrides).forEach(function(idx) {
          var w = weapons[parseInt(idx)]; if (!w) return;
          var ov = data.overrides[idx];
          Object.keys(ov).forEach(function(key) {
            if (key === 'mult' && typeof ov.mult === 'object' && w.mult) { Object.assign(w.mult, ov.mult); cnt++; }
            else if (key === 'barrels' && Array.isArray(ov.barrels)) { ov.barrels.forEach(function(bov, bi) { if (bov._new) { var _nb2=Object.assign({},bov); delete _nb2._new; w.barrels.push(_nb2); cnt++; } else if (w.barrels[bi]) { Object.assign(w.barrels[bi], bov); cnt++; } }); }
            else if (key === 'fireControls' && Array.isArray(ov.fireControls)) { ov.fireControls.forEach(function(fov, fi) { if (fov._new) { var _nf2=Object.assign({},fov); delete _nf2._new; w.fireControls.push(_nf2); cnt++; } else if (w.fireControls[fi]) { Object.assign(w.fireControls[fi], fov); cnt++; } }); }
            else { w[key] = ov[key]; cnt++; }
          });
        });
      }

      if (data.customWeapons && data.customWeapons.length > 0) {
        data.customWeapons.forEach(function(cw) {
          var existing = false;
          for (var i = builtinCount; i < weapons.length; i++) { if (weapons[i].name === cw.name) { existing = true; break; } }
          if (!existing) { var w2 = JSON.parse(JSON.stringify(cw)); w2._custom = true; weapons.push(w2); }
        });
        customWeapons = data.customWeapons.map(function(cw) { return JSON.parse(JSON.stringify(cw)); });
        saveCustomWeapons();
      }

      if (data.customMuzzles && data.customMuzzles.length > 0) {
        customMuzzles = data.customMuzzles.map(function(cm) { return JSON.parse(JSON.stringify(cm)); });
        saveCustomMuzzles(); mergeCustomMuzzles();
      }

      if (data.perWeaponMuzzles && Object.keys(data.perWeaponMuzzles).length > 0) {
        savePerWeaponMuzzles(data.perWeaponMuzzles); mergePerWeaponMuzzles();
      }
      if (data.ammoOverrides && Object.keys(data.ammoOverrides).length > 0) {
        saveAmmoOverrides(data.ammoOverrides); applyAmmoOverrides();
      }
    } catch(e) { console.warn('固化数据加载失败:', e); }
  }

  // ── 弹药编辑器 ──
  var AMMO_OVERRIDES_KEY = 'ttk_ammo_overrides';

  function shortAmmoName(key, cal) {
    if (!cal) return key;
    // 从弹药名中去掉口径前缀，如 ".300BLK V SUB" → "V SUB"
    var prefixMap = {
      '.300 BLK': '.300BLK ',
      '7.62×39': '7.62×39 ',
      '5.45×39': '5.45×39mm ',
      '45-70 Govt': '45-70 Govt ',
    };
    var prefix = prefixMap[cal] || '';
    if (prefix && key.indexOf(prefix) === 0) return key.slice(prefix.length);
    // 特殊处理 M855A1 系列
    if (key.indexOf('M855A1 ') === 0) return key.slice(7);
    return key;
  }

  function loadAmmoOverrides() { try { return JSON.parse(localStorage.getItem(AMMO_OVERRIDES_KEY) || '{}'); } catch(e) { return {}; } }
  function saveAmmoOverrides(d) { try { localStorage.setItem(AMMO_OVERRIDES_KEY, JSON.stringify(d)); } catch(e) {} }

  function getAmmoList() {
    var raw = window.__ammo || {};
    var list = [];
    Object.keys(raw).forEach(function(k) {
      if (k === '1' || k === '2' || k === '3' || k === '4' || k === '5') return;
      var cal = (window.__caliber || {})[k] || '';
      list.push({ key: k, caliber: cal, data: raw[k] });
    });
    list.sort(function(a, b) {
      if (a.caliber !== b.caliber) return a.caliber.localeCompare(b.caliber);
      return a.key.localeCompare(b.key);
    });
    return list;
  }

  function openAmmoEditor() {
    var modal = document.getElementById('weaponDataEditor');
    var container = document.getElementById('editorProps');
    if (!modal || !container) return;
    // 弹药页面：收窄内容区
    var dialogEl = modal.querySelector(".weapon-data-editor-dialog"); if (dialogEl) dialogEl.style.maxWidth = "860px";
    // 隐藏枪械相关UI
    document.getElementById('editorAddBtn') && (document.getElementById('editorAddBtn').style.display = 'none');
    document.getElementById('editorAmmoBtn') && (document.getElementById('editorAmmoBtn').style.display = 'none');
    var sidebar = document.querySelector('.editor-sidebar');
    if (sidebar) sidebar.style.display = 'none';
    var resetBtn2 = document.getElementById('editorResetBtn');
    if (resetBtn2) resetBtn2.textContent = '↺ 重置';

    // 在工具栏添加弹药专属按钮
    var actionDiv = document.querySelector('.editor-actions');
    if (actionDiv && !document.getElementById('ammoBackBtn')) {
      var backBtn = document.createElement('button');
      backBtn.id = 'ammoBackBtn';
      backBtn.className = 'editor-action-btn';
      backBtn.style.cssText = 'border-color:#6b4c9a;color:#6b4c9a';
      backBtn.textContent = '← 返回武器列表';
      var addBtn = document.createElement('button');
      addBtn.id = 'addAmmoBtn';
      addBtn.className = 'editor-action-btn primary';
      addBtn.textContent = '＋ 添加特殊子弹';
      addBtn.style.cssText = 'margin-right:4px';
      actionDiv.insertBefore(addBtn, actionDiv.firstChild);
      actionDiv.insertBefore(backBtn, actionDiv.firstChild);
    }

    var ammoList = getAmmoList();
    var ov = loadAmmoOverrides();
    var html = '';

    html += '<div style="max-width:720px;margin:0 auto;font-size:1.1rem">';
    html += '<h3 style="margin:0 0 12px 0;font-size:1.1rem">🔫 特殊子弹管理</h3>';

    // 按口径分组
    var groups = {};
    ammoList.forEach(function(a) {
      var g = a.caliber || '未分类';
      if (!groups[g]) groups[g] = [];
      groups[g].push(a);
    });

    Object.keys(groups).sort().forEach(function(cal) {
      html += '<div class="editor-prop-group">';
      html += '<div class="editor-prop-group-title" style="cursor:pointer;background:#e8f0fe;padding:8px 14px;border-bottom:1px solid #d0ddf5;font-size:0.9rem">🔵 ' + cal + ' <span style="font-weight:normal;color:#888;font-size:0.8rem">(' + groups[cal].length + ' 种子弹)</span></div>';
      html += '<div class="editor-prop-group-body" style="flex-direction:column">';

      // 显示该口径的可用武器
      var weaponsWithCal = [];
      for (var i = 0; i < weapons.length; i++) {
        if (getWeaponCaliber(weapons[i]) === cal) weaponsWithCal.push(weapons[i].name);
      }
      if (weaponsWithCal.length > 0) {
        html += '<div style="font-size:0.8rem;color:#888;margin-bottom:8px">可用枪械: ' + weaponsWithCal.join('、') + '</div>';
      }

      groups[cal].forEach(function(a) {
        var override = ov[a.key] || {};
        var data = a.data;
        var isCustom = a.data && a.data._isCustom;
        html += '<div class="editor-barrel-item" style="margin-bottom:6px">';
        var shortName = shortAmmoName(a.key, cal);
        html += '<div class="barrel-header">' + shortName + ' <span style="font-weight:normal;color:#888;font-size:0.8rem">(' + cal + ')</span>';
        if (isCustom) html += ' <button class="delete-ammo-btn editor-action-btn danger" style="float:right;padding:1px 8px;font-size:0.75rem" data-ammo-key="' + a.key + '">✕ 删除</button>';
        html += '</div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center">';

        // 基础伤害倍率（作用于肉伤和甲伤）
        var baseVal = override.base !== undefined ? override.base : data.base;
        html += field('基础伤害倍率', 'ammo_base_' + a.key, baseVal, 'number', '0.01');

        // 甲伤倍率（所有弹药都有）
        var abVal = override.armorBase !== undefined ? override.armorBase : (data.armorBase || 1);
        html += field('甲伤倍率', 'ammo_armorBase_' + a.key, abVal, 'number', '0.01');

        html += '</div>';

        // Per-armor-level expandable section
        html += '<div style="margin-top:4px;font-size:0.8rem;color:#888">各护甲等级穿透:</div>';
        html += '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:2px">';
        for (var lv = 1; lv <= 6; lv++) {
          var lvData = data.armor[lv] || {};
          var lvOv = override.armor ? (override.armor[lv] || {}) : {};
          var mult = lvOv.armorMult !== undefined ? lvOv.armorMult : lvData.armorMult;
          var pen = lvOv.pen !== undefined ? lvOv.pen : lvData.pen;
          html += '<div style="border:1px solid #eee;border-radius:4px;padding:4px 6px;text-align:center;min-width:70px">';
          html += '<div style="font-size:0.7rem;color:#999">Lv' + lv + '</div>';
          html += '<div style="font-size:0.7rem;color:#999">穿透伤害系数</div>';
          html += '<input type="number" class="ammo-armor" data-ammo="' + a.key + '" data-lv="' + lv + '" data-field="pen" value="' + pen + '" step="0.05" min="0" max="1" style="width:44px;font-size:0.8rem;padding:2px 4px;border:1px solid #ddd;border-radius:3px;text-align:center">';
          html += '<div style="font-size:0.7rem;color:#999;margin-top:2px">护甲伤害衰减</div>';
          html += '<input type="number" class="ammo-armor" data-ammo="' + a.key + '" data-lv="' + lv + '" data-field="armorMult" value="' + mult + '" step="0.05" min="0" style="width:48px;font-size:0.8rem;padding:2px 4px;border:1px solid #ddd;border-radius:3px;text-align:center">';
          html += '</div>';
        }
        html += '</div>';
        html += '</div>';
      });

      html += '</div></div>';
    });

    html += '<div style="text-align:center;padding-bottom:12px;font-size:0.8rem;color:#888">修改后自动保存</div>';
    html += '</div>'; // 关闭 max-width wrapper

    container.innerHTML = html;

    // 返回按钮
    document.getElementById('ammoBackBtn').addEventListener('click', function() { if (currentIdx !== null) selectWeapon(currentIdx); else { renderWeaponList(); if (weapons.length > 0) selectWeapon(0); } });

    // 添加弹药按钮 - 弹出模态框
    document.getElementById('addAmmoBtn').addEventListener('click', function() {
      var calibers = ['5.56×45','7.62×39','7.62×51','7.62×54','5.45×39','6.8×51','9×19','9×39','4.6×30','5.7×28','.45','.300 BLK','12.7×55','45-70 Govt','5.8×42'];
      var overlay = document.createElement('div');
      overlay.style.cssText = 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center';
      var dialog = document.createElement('div');
      dialog.style.cssText = 'background:#fff;border-radius:14px;padding:24px;width:400px;max-width:90vw;box-shadow:0 18px 50px rgba(0,0,0,0.25)';
      dialog.innerHTML = '<h3 style="margin:0 0 16px;font-size:1.1rem">添加特殊子弹</h3>' +
        '<label style="display:block;margin-bottom:4px;font-size:0.9rem;color:#555">子弹名称:</label>' +
        '<input id="modalAmmoName" style="width:100%;padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-size:0.95rem;box-sizing:border-box" placeholder="如 NewAP">' +
        '<label style="display:block;margin:12px 0 4px;font-size:0.9rem;color:#555">口径:</label>' +
        '<select id="modalAmmoCal" style="width:100%;padding:8px 12px;border:1px solid #ddd;border-radius:6px;font-size:0.95rem">' +
        calibers.map(function(c) { return '<option value="' + c + '">' + c + '</option>'; }).join('') +
        '</select>' +
        '<div style="display:flex;gap:8px;margin-top:16px">' +
        '<button id="modalAmmoConfirm" class="editor-action-btn primary" style="flex:1;padding:10px">确认添加</button>' +
        '<button id="modalAmmoCancel" class="editor-action-btn" style="flex:1;padding:10px">取消</button></div>';
      overlay.appendChild(dialog);
      document.body.appendChild(overlay);
      document.getElementById('modalAmmoName').focus();
      var closeModal = function() { document.body.removeChild(overlay); };
      document.getElementById('modalAmmoCancel').addEventListener('click', closeModal);
      overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
      document.getElementById('modalAmmoConfirm').addEventListener('click', function() {
        var name = document.getElementById('modalAmmoName').value.trim();
        if (!name) { alert('请输入子弹名称'); return; }
        if (window.__ammo && window.__ammo[name]) { alert('该子弹已存在'); return; }
        var calSel = document.getElementById('modalAmmoCal').value;
        var newAmmo = { base: 1, armor: {} };
        for (var l = 1; l <= 6; l++) newAmmo.armor[l] = { armorMult: 1, pen: 1 };
        var ov2 = loadAmmoOverrides();
        ov2['_custom_' + name] = { _name: name, _caliber: calSel, _data: newAmmo };
        saveAmmoOverrides(ov2);
        applyAmmoOverrides();
        if (app.domController) { app.domController.renderAttachmentTable(); app.domController.updateGlobalBarrelSelections(); }
        closeModal();
        openAmmoEditor();
        setStatus('已添加新子弹「' + name + '」', 'info');
      });
    });

    // 弹药字段自动保存（change 事件）
    container.addEventListener('change', function(e) {
      if (e.target.id && e.target.id.indexOf('ammo_base_') === 0) {
        var key = e.target.id.replace('ammo_base_', '');
        var ov = loadAmmoOverrides();
        if (!ov[key]) ov[key] = {};
        ov[key].base = parseFloat(e.target.value) || 0;
        saveAmmoOverrides(ov);
        applyAmmoOverrides();
        setStatus('基础伤害倍率已保存', 'info');
      }
      if (e.target.id && e.target.id.indexOf('ammo_armorBase_') === 0) {
        var key2 = e.target.id.replace('ammo_armorBase_', '');
        var ov2 = loadAmmoOverrides();
        if (!ov2[key2]) ov2[key2] = {};
        ov2[key2].armorBase = parseFloat(e.target.value) || 0;
        saveAmmoOverrides(ov2);
        applyAmmoOverrides();
        setStatus('甲伤倍率已保存', 'info');
      }
      if (e.target.classList.contains('ammo-armor')) {
        var key3 = e.target.dataset.ammo;
        var lv = parseInt(e.target.dataset.lv);
        var field = e.target.dataset.field;
        var ov3 = loadAmmoOverrides();
        if (!ov3[key3]) ov3[key3] = {};
        if (!ov3[key3].armor) ov3[key3].armor = {};
        if (!ov3[key3].armor[lv]) ov3[key3].armor[lv] = {};
        ov3[key3].armor[lv][field] = parseFloat(e.target.value) || 0;
        saveAmmoOverrides(ov3);
        applyAmmoOverrides();
      }
    });

    // 删除自定义弹药
    document.querySelectorAll('.delete-ammo-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        var key = this.dataset.ammoKey;
        if (!key) return;
        // 从 overrides 中找到对应的 _custom_ 条目
        var ov4 = loadAmmoOverrides();
        var sourceKey = null;
        Object.keys(ov4).forEach(function(sk) { if (ov4[sk]._name === key || (ov4[sk]._name || sk) === key) sourceKey = sk; });
        if (!sourceKey) return;
        if (!confirm('确定要删除子弹「' + key + '」？')) return;
        delete ov4[sourceKey];
        if (window.__ammo && window.__ammo[key]) delete window.__ammo[key];
        saveAmmoOverrides(ov4);
        applyAmmoOverrides();
        openAmmoEditor();
        setStatus('已删除「' + key + '」', 'info');
      });
    });
  }

  // ── 启动 ──
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
