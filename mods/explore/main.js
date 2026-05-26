(function(){
const versionusefeature = {
    "1.0": [],
    "1.1": [],
    "1.2": [],
    "1.3": [
        "mods"
    ],
    "1.3.1": [
        "modsconfig",
        "mods"
    ],
    "1.4": [
        "modsconfig",
        "mods"
    ]
}

// 1. TENTUKAN VERSI APLIKASI SAAT INI
// Anda bisa mengubah "1.4" menjadi versi dinamis dari sistem Anda (misal: window.appVersion)
const currentVersion = "1.4"; 

// 2. FUNGSI PEMBANTU UNTUK CEK DUKUNGAN FITUR
function isModSupported(mod) {
    // Jika mod tidak memerlukan fitur khusus, izinkan untuk tampil
    if (!mod["using-features"] || !Array.isArray(mod["using-features"])) {
        return true; 
    }
    
    // Ambil daftar fitur yang didukung oleh versi saat ini
    const supportedFeatures = versionusefeature[currentVersion] || [];
    
    // Pastikan SEMUA fitur yang diminta mod ada di dalam daftar fitur versi saat ini
    return mod["using-features"].every(feature => supportedFeatures.includes(feature));
}

 let listmodsexplore = []
 let detectbuglist = [{"value":"viruslockxDizz"}]
 window.createui = async function(){
     listmodsexplore = JSON.parse(await fh("https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/explore/mods.json"))
     console.log(JSON.parse(await fh("https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/explore/mods.json")))
    const maint = document.getElementById("app-container")
    maint.innerHTML += `<div id="scene-explore-mods" class="panel">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                    </span>
                    <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">EXPLORE - MODS</h2>
                </div>
                <div style="max-height: 500px; overflow-y: scroll;">
                <div id="AXdivexploremods"></div></div>
            </div>
    `;
    maint.innerHTML += `<div id="scene-explore-credit" class="panel">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                    </span>
                    <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">CREDIT</h2>
                </div>
                <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
                    <p style="opacity: 0.6; font-size: 14px;"><h1>EXPLORE</h1></p>
                    <p style="margin-top: -22px; opacity: 0.6; font-size: 12px; font-weight: normal;">Exploring</p>
                </div><br>
                <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
                    <p style="opacity: 1; font-size: 14px;">[ CHANGELOG v1 ]</p>
                    <p style="margin-top: -14px; opacity: 0.6; font-size: 8px; font-weight: normal;">
                    - Fix Downloader In Mods<br>- Fixed ui exceeding limit bug for zynx 1.3+ versions 
                    </p>
                </div>
            </div>
    `;
    
    
    maint.innerHTML += `<div id="scene-explore-globalid" class="panel">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                    </span>
                    <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">GLOBAL ID</h2>
                    
                    
                </div>
                <div>
                <input id="exploreglobalidinput" class="zynx" placeholder="Input Id Here">
                <button class="btn-primary" onclick="
                (async function(){
                const tggs = document.getElementById('exploreglobalidinput')
                const hrs = JSON.parse(await fh('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/explore/globalid.json'))
                    const tffs = hrs.find(il => il['id'] === tggs.value);
                    if(tffs){
                        document.getElementById('ddddexplore').innerHTML = tffs
                    .innerhtml
                    }
                })()
                ">ENTER</button>
                </div><br>
                <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
                    <div id="ddddexplore">-</div>
                </div>
                
            </div>
    `;
    
  const rc = document.getElementById("consdash")
  const cat = document.createElement("div");
  cat.innerHTML = `<div class="category" id="Axexport">
                    <div class="cat-header" onclick="App.toggleCategory('Axexport')">
                        <div><span class="cat-icon">🌐</span> EXPLORE</div>
                        <div class="cat-chevron">▶</div>
                    </div>
                    <div class="cat-content">
                        <div class="cat-inner">
                            <div class="feature-item" onclick="App.changeScene('scene-explore-mods')">
                                <span>Mods</span>
                                <span style="color: #0A84FF;">Open</span>
                            </div>
                            
                            <div class="feature-item" onclick="App.changeScene('scene-explore-globalid')">
                                <span>GLobal ID</span>
                                <span style="color: #0A84FF;">Open</span>
                            </div>
                            
                    <div class="feature-item" onclick="App.changeScene('scene-explore-credit')">
                                <span>Credit</span>
                                <span style="color: #0A84FF;">Open</span>
                            </div>
                        </div>
                    </div>
                </div>`;
                rc.appendChild(cat)
                
 }
 
 window.ref = async function() {
    const mvin = document.getElementById("AXdivexploremods");
    mvin.innerHTML = "";
    
    listmodsexplore.forEach((i, index) => {
        // 3. PROSES PENYARINGAN (FILTERING) SEBELUM DI-RENDER
        if (!isModSupported(i)) {
            return; // Lewati mod ini dan jangan tampilkan di UI jika tidak support
        }
        
        const exists = installedmods.find(m => m.directory === i.directory);
        const btnText = exists ? "Re-install" : "Download";
        const idthisvalue = "cat-" + i.directory + "-modsvalueid-explore-mods";
        mvin.innerHTML += `
                <div class="category" id="${idthisvalue}">
                    <div class="cat-header" onclick="App.toggleCategory('${idthisvalue}')">
                        <div style=""><span class="cat-icon">${i.icon || "📦"}</span>
                        
                        <span class="allowselect" style="color: ${colorer}">${i.display || i.name  || "No Display name"}</span> </div>
                        
                    </div>
                    <div class="cat-content">
                        <div class="cat-inner">
                            <p style="white-space: nowrap; overflow-x: scroll; font-size:12px; opacity:0.6; margin-bottom:10px;">
                                ${i.descripsion || i.description || 'No description'}
                            </p>
                            <div class="feature-item">
                                <button class="btn-primary" onclick="handlePushMod(${index})" style="margin-top: -10px">
                            ${btnText}
                        </button>
                                </div>
                                
                                <br>
                        </div>
                    </div>
                </div>`;
    });
    mvin.innerHTML = (`<div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">${unsupportmods} Mods have been removed from the UI, because these mods are not compatible with your Zynx OS version</div><br>`+mvin.innerHTML);
};

 window.detectbug = function() {
     detectbuglist.forEach(i => {
         installedmods = installedmods.filter(m => m.directory !== i.value)
     });
     setTimeout(() => {
     ref()
     }, 1500)
 };

window.handlePushMod = function(index) {
    const modData = listmodsexplore[index];
    pushmods(JSON.stringify(modData));
};

     
 setTimeout(() => {
     createui();
     detectbug();
 }, 500)
})()
