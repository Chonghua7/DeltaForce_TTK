// TTK 永久数据补丁 - 由编辑器生成
(function(){
  var KEY="ttk_patch_done"; if(localStorage.getItem(KEY)) return;
  function go(){
    var a=window.app; if(!a||!a.weaponManager){setTimeout(go,100);return}
    var w=a.weaponManager.weapons, m=a.weaponManager.muzzles;
    var pm={"32":[{"name":"断流","mult":0.18}]};
    Object.keys(pm).forEach(function(i){pm[i].forEach(function(x){m.push({name:"🔒 "+i+"·"+x.name,mult:x.mult,_weaponSpecific:true})})});
    localStorage.setItem(KEY,"1");
    if(a.domController){a.domController.renderAttachmentTable();a.domController.updateGlobalBarrelSelections()}
  } go(); })();