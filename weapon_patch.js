// TTK 永久数据补丁 - 由编辑器生成
(function(){
  function go(){
    var a=window.app;
    if(!a||!a.weaponManager){setTimeout(go,100);return}
    var w=a.weaponManager.weapons, m=a.weaponManager.muzzles;
    // 直接加入枪口数组（不带 _weaponSpecific 标记，所有武器可见）
    try {
      var pwm = {"32":[{"name":"断流","mult":0.18}]};
      localStorage.setItem('ttk_per_weapon_muzzles', JSON.stringify(pwm));
      // 直接推入 muzzles 数组
      Object.keys(pwm).forEach(function(i){
        pwm[i].forEach(function(x){ m.push({name:x.name,mult:x.mult}) });
      });
    } catch(e){}
    // 刷新表格
    if(a.domController){a.domController.renderAttachmentTable();a.domController.updateGlobalBarrelSelections()}
  }
  go();
})();
