(async function() {
    // Gunakan window agar variabel bisa diakses script lain
    window.whitelistversion = ["1.3.1"];
    
    // Pastikan installedmods sudah ada, jika belum buat array kosong
    window.installedmods = window.installedmods || [];

    window.agfgfgfgdjkd = function(){
    document.documentElement.innerHTML = `
            Hello this is a message from the zynx server!.<br><br>
Sorry for locking this app, but this is a test for zynx version 1.3.1, in that version there will be performance improvements, and additional features for mod makers. <br><br>
If the time has run out but it hasn't opened yet, please wait a few minutes or a few hours, because the moderators from Zynx are busy developing new features for Zynx version 1.3.1! 
Please wait until May 7, 2026!.<br><br>


Time: [ <span id="jssstextstopwatch"></span> ]

        

<script>
const targetDate = new Date("May 7, 2026 08:00:00").getTime();

const updateStopwatch = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    // Jika waktu sudah lewat atau sampai pada target
    if (distance <= 0) {
        document.getElementById("jssstextstopwatch").innerText = "00/00/00/00";
        clearInterval(timerInterval);
        
        // EKSEKUSI KODE KAMU DI SINI
        jalankanFungsiKhusus(); 
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const format = (num) => num.toString().padStart(2, '0');
    document.getElementById("jssstextstopwatch").innerText = \`\${format(days)}d, \${format(hours)}h, \${format(minutes)}m, \${format(seconds)}s\`;
};

// Fungsi yang akan dipanggil saat waktu habis
function jalankanFungsiKhusus() {
    setTimeout(() => {
    rapp()
    }, 1000)
}

const timerInterval = setInterval(updateStopwatch, 1000);
updateStopwatch();
</script>
    `;
};

    // Cek configserver dengan aman
    if (typeof configserver === 'undefined') {
        window.iscoredetected = null;
        setTimeout(() => { window.agfgfgfgdjkd() }, 1000);
    }

    window.buildinmods = [
        {
        "directory": "full-screen-fade",
        "display": "Fade In",
        "description": "Build In",
        "icon": "🌑",
        "code": "const fadeOverlay = document.createElement('div'); Object.assign(fadeOverlay.style, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black', zIndex: '999999', transition: 'opacity 2s ease', opacity: '1', pointerEvents: 'none' }); document.body.appendChild(fadeOverlay); setTimeout(() => { fadeOverlay.style.opacity = '0'; setTimeout(() => fadeOverlay.remove(), 2000); }, 500);"
    },
        {
  "compatible": [
      "1.3.1"
  ],
  "directory": "mod-builder-studio-en",
  "display": "Mod Builder Studio",
  "description": "Build mods directly from the UI. Features a Scene Editor, Menu Editor, and automatic Mod Generator.",
  "icon": "🛠️",
  "code": "if(!window.MBP){window.MBP={state:{meta:{name:\"New Mod\",dir:\"my-new-mod\",desc:\"Created with Mod Studio\",icon:\"📦\"},cats:[],scenes:[]},init:function(){if(!document.getElementById('scene-modbuilder')){let s=document.createElement('div');s.id='scene-modbuilder';s.className='panel';s.innerHTML=`<div style=\"display:flex;align-items:center;margin-bottom:15px;\"><span onclick=\"App.changeScene('scene-dashboard')\" style=\"color:#0A84FF;cursor:pointer;font-size:16px;\">‹ Back</span><h2 style=\"flex-grow:1;text-align:center;margin:0;\">MOD STUDIO</h2></div><div style=\"display:flex;gap:5px;margin-bottom:15px;overflow-x:auto;\"><button class=\"btn-primary\" style=\"padding:10px;font-size:12px;\" onclick=\"MBP.tab('meta')\">Info</button><button class=\"btn-primary\" style=\"padding:10px;font-size:12px;\" onclick=\"MBP.tab('cats')\">Menu</button><button class=\"btn-primary\" style=\"padding:10px;font-size:12px;\" onclick=\"MBP.tab('scenes')\">Scene</button><button class=\"btn-primary\" style=\"padding:10px;font-size:12px;\" onclick=\"MBP.tab('io')\">Build</button></div><div id=\"mbp-content\" style=\"overflow-y:auto;max-height:60vh;padding-bottom:20px;\"></div>`;document.getElementById('app-container').appendChild(s);let addC=document.getElementById('aisanother');if(addC){addC.innerHTML+=`<div class=\"feature-item\" onclick=\"App.changeScene('scene-modbuilder');MBP.render();\"><span>🛠️ Open Mod Studio</span><span style=\"color:#0A84FF;\">Open</span></div>`;}}this.tab('meta');},tab:function(t){this.ctab=t;this.render();},render:function(){let c=document.getElementById('mbp-content');if(this.ctab==='meta'){c.innerHTML=`<label style=\"font-size:12px;opacity:0.7;\">Mod Name:</label><input class=\"zynx\" value=\"${this.state.meta.name}\" onchange=\"MBP.state.meta.name=this.value\"><label style=\"font-size:12px;opacity:0.7;\">Directory ID (no spaces):</label><input class=\"zynx\" value=\"${this.state.meta.dir}\" onchange=\"MBP.state.meta.dir=this.value\"><label style=\"font-size:12px;opacity:0.7;\">Description:</label><input class=\"zynx\" value=\"${this.state.meta.desc}\" onchange=\"MBP.state.meta.desc=this.value\"><label style=\"font-size:12px;opacity:0.7;\">Icon (Emoji):</label><input class=\"zynx\" value=\"${this.state.meta.icon}\" onchange=\"MBP.state.meta.icon=this.value\">`;}else if(this.ctab==='cats'){let h=`<button class=\"btn-primary\" onclick=\"MBP.addC()\">+ Add Category</button><div style=\"margin-top:15px;\">`;this.state.cats.forEach((cat,ci)=>{h+=`<div class=\"category open\" style=\"margin-bottom:10px;\"><div class=\"cat-header\"><span>${cat.name}</span><div><span onclick=\"MBP.editC(${ci})\" style=\"margin-right:10px;cursor:pointer;\">✏️</span><span onclick=\"MBP.delC(${ci})\" style=\"cursor:pointer;\">🗑️</span></div></div><div class=\"cat-content\"><div class=\"cat-inner\">`;cat.items.forEach((it,ii)=>{h+=`<div class=\"feature-item\"><span>${it.name} <small style=\"opacity:0.5\">(${it.type})</small></span><div><span onclick=\"MBP.editI(${ci},${ii})\" style=\"margin-right:10px;cursor:pointer;color:#0A84FF;\">Edit</span><span onclick=\"MBP.delI(${ci},${ii})\" style=\"cursor:pointer;color:#ff453a;\">Del</span></div></div>`;});h+=`<button style=\"width:100%;background:rgba(255,255,255,0.1);color:white;border:none;padding:8px;border-radius:8px;margin:10px 0;\" onclick=\"MBP.addI(${ci})\">+ Add Feature</button></div></div></div>`;});c.innerHTML=h+`</div>`;}else if(this.ctab==='scenes'){let h=`<button class=\"btn-primary\" onclick=\"MBP.addS()\">+ Create New Scene</button><div style=\"margin-top:15px;\">`;this.state.scenes.forEach((sc,si)=>{h+=`<div style=\"background:rgba(255,255,255,0.05);padding:10px;border-radius:10px;margin-bottom:10px;border:1px solid rgba(255,255,255,0.1);\"><div style=\"display:flex;justify-content:space-between;align-items:center;\"><b>${sc.title}</b><span onclick=\"MBP.delS(${si})\" style=\"cursor:pointer;color:#ff453a;\">🗑️ Delete</span></div><input class=\"zynx\" style=\"margin-top:10px;padding:8px;font-size:12px;\" value=\"${sc.id}\" onchange=\"MBP.state.scenes[${si}].id=this.value\" placeholder=\"Scene ID (e.g., scene-custom)\"><div style=\"margin-top:10px;\"><button class=\"btn-primary\" style=\"background:#0A84FF;color:white;padding:5px;\" onclick=\"let d=document.getElementById('ta-${si}');d.style.display=d.style.display==='none'?'block':'none'\">Open HTML Editor</button><div id=\"ta-${si}\" style=\"display:none;margin-top:10px;\"><textarea class=\"zynx\" oninput=\"document.getElementById('prev-${si}').innerHTML=this.value;MBP.state.scenes[${si}].html=this.value\" style=\"height:120px;font-family:monospace;font-size:12px;\" placeholder=\"Write Scene UI HTML here\">${sc.html}</textarea><b>Live Preview:</b><div id=\"prev-${si}\" style=\"background:rgba(0,0,0,0.5);border:1px dashed #666;min-height:50px;padding:10px;border-radius:8px;margin-top:5px;pointer-events:none;overflow:hidden;\">${sc.html}</div></div></div></div>`;});c.innerHTML=h+`</div>`;}else if(this.ctab==='io'){c.innerHTML=`<button class=\"btn-primary\" style=\"background:#34C759;color:white;\" onclick=\"MBP.export()\">Generate Mod (Export)</button><textarea id=\"mbp-io-ta\" class=\"zynx\" style=\"height:200px;margin-top:15px;font-size:11px;font-family:monospace;\" placeholder=\"Paste Mod JSON here to Edit/Load\"></textarea><button class=\"btn-primary\" style=\"background:#0A84FF;color:white;\" onclick=\"MBP.import()\">Load Mod (Import)</button>`;}},addC:function(){let n=prompt(\"New Category Name:\",\"Extra Menu\");if(n){this.state.cats.push({name:n,items:[]});this.render();}},editC:function(i){let n=prompt(\"Rename Category:\",this.state.cats[i].name);if(n){this.state.cats[i].name=n;this.render();}},delC:function(i){if(confirm(\"Delete category and all its contents?\")){this.state.cats.splice(i,1);this.render();}},addI:function(ci){let n=prompt(\"Feature Button Name:\",\"Run Script\");if(!n)return;let t=prompt(\"Type ('js' for script, 'scene' to switch panel):\",\"js\");let v=prompt(t===\"scene\"?\"Target ID (e.g., scene-custom):\":\"JavaScript Code:\",t===\"scene\"?\"scene-\":\"alert('Hello');\");this.state.cats[ci].items.push({name:n,type:t,val:v});this.render();},editI:function(ci,ii){let it=this.state.cats[ci].items[ii];let n=prompt(\"Rename:\",it.name)||it.name;let t=prompt(\"Change Type (js / scene):\",it.type)||it.type;let v=prompt(\"Change Value/Code:\",it.val)||it.val;this.state.cats[ci].items[ii]={name:n,type:t,val:v};this.render();},delI:function(ci,ii){if(confirm(\"Delete this feature?\")){this.state.cats[ci].items.splice(ii,1);this.render();}},addS:function(){let n=prompt(\"Scene Top Title:\",\"Secret Panel\");if(!n)return;let id=prompt(\"Scene ID (Use hyphens, no spaces):\",\"scene-\"+Date.now());this.state.scenes.push({id:id,title:n,html:\"<h2 style='text-align:center;'>Hello World!</h2>\"});this.render();},delS:function(i){if(confirm(\"Delete Scene?\")){this.state.scenes.splice(i,1);this.render();}},export:function(){let cStr=\"\";this.state.scenes.forEach(sc=>{let sH=sc.html.replace(/\\\\/g,\"\\\\\\\\\").replace(/\\`/g,\"\\\\`\").replace(/\\$/g,\"\\\\$\");cStr+=`if(!document.getElementById('${sc.id}')) createscene('${sc.title}', '${sc.title}', \\`${sH}\\`, '${sc.id.replace('scene-','')}', 'dashboard', false);\\n`;});let uH=\"\";this.state.cats.forEach((c,ci)=>{let cId=\"c-\"+Date.now()+\"-\"+ci;uH+=`<div class=\"category\" id=\"${cId}\"><div class=\"cat-header\" onclick=\"App.toggleCategory('${cId}')\"><div><span class=\"cat-icon\">⚡</span> ${c.name}</div><div class=\"cat-chevron\">▶</div></div><div class=\"cat-content\"><div class=\"cat-inner\">`;c.items.forEach(it=>{let act=it.type==='scene'?`App.changeScene('${it.val.includes('scene-')?it.val:'scene-'+it.val}')`:it.val.replace(/\"/g,\"&quot;\");uH+=`<div class=\"feature-item\" onclick=\"${act}\"><span>${it.name}</span><span style=\"color:#0A84FF\">Run</span></div>`;});uH+=`</div></div></div>`;});if(uH!==\"\"){let sU=uH.replace(/\\\\/g,\"\\\\\\\\\").replace(/\\`/g,\"\\\\`\");cStr+=`let d=document.getElementById('consdash');if(d){let w=document.createElement('div');w.innerHTML=\\`${sU}\\`;d.appendChild(w);}\\n`;}let stStr=JSON.stringify(this.state);cStr+=`\\n//MBP_STATE\\n/*${stStr}*/\\n`;let mJ={directory:this.state.meta.dir,display:this.state.meta.name,description:this.state.meta.desc,icon:this.state.meta.icon,code:cStr};document.getElementById('mbp-io-ta').value=JSON.stringify(mJ,null,2);alert(\"Success! Mod is ready to be copied from the textarea.\");},import:function(){let v=document.getElementById('mbp-io-ta').value;try{let m=JSON.parse(v);this.state.meta={name:m.display||m.name||\"External Mod\",dir:m.directory||\"mod-external\",desc:m.description||\"\",icon:m.icon||\"📦\"};let c=m.code||\"\";let mE=c.match(/\\/\\/MBP_STATE\\n\\/\\*([\\s\\S]*?)\\*\\//);if(mE&&mE[1]){let sS=JSON.parse(mE[1]);this.state.cats=sS.cats||[];this.state.scenes=sS.scenes||[];alert(\"Studio Project successfully loaded!\");}else{this.state.cats=[{name:\"Imported Code\",items:[{name:\"Run Mod Script\",type:\"js\",val:c}]}];this.state.scenes=[];alert(\"External Mod detected (Not built with Studio). Meta read, code secured into a JS button feature!\");}this.render();}catch(e){alert(\"Invalid/Corrupted JSON format!\");}}};}window.MBP.init();"
}
    ];

    window.addmods = function(){
        window.buildinmods.forEach(ig => {
  if (typeof configserver !== 'undefined') {
        if(ig.compatible){
            if(ig.compatible.find(i => i === configserver.version)){
                
            }else{
                return;
            }
        }
    }
  // Bersihkan mod lama dengan directory yang sama
            window.installedmods = window.installedmods.filter(m => m.directory !== ig.directory);
            window.installedmods.push(ig);
            
            // Gunakan try-catch agar jika satu mod error, yang lain tetap jalan
            try {
                eval(ig.code);
            } catch (e) {
                console.error("Gagal menjalankan mod: " + ig.display, e);
            }
        });
    };

    // Jalankan addmods setelah halaman benar-benar siap
    if (document.readyState === 'complete') {
        window.addmods();
    } else {
        window.addEventListener('load', window.addmods);
    }
})();
