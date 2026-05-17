(function(){
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
                cons tggs = document.getElementById('exploreglobalidinput')
                async function btnentr(){
                    const hrs = JSON.parse(await fh('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/explore/globalid.json'))
                    const tffs = hrs.find(il => il['id'] === tggs.value);
                    if(tffs){
                        document.getElementById('ddddexplore').innerHTML = tffs.innerhtml
                    }
                }
                btnentr()
                ">ENTER</button><br>
                </div>
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
    
    listmodsexplore.forEach((i, index) => { // Added index here
        const exists = installedmods.find(m => m.directory === i.directory);
        const btnText = exists ? "Re-install" : "Download";
        const idthisvalue = "cat-" + i.directory + "-modsvalueid-explore-mods";
        
        // We pass the 'index' to a helper function instead of the whole object
        mvin.innerHTML += `
        <div class="category" id="${idthisvalue}">
            <div class="cat-header" onclick="App.toggleCategory('${idthisvalue}')">
                <div><span class="cat-icon">${i.icon || "📦"}</span> ${i.display}</div>
                <div class="cat-chevron">▶</div>
            </div>
            <div class="cat-content">
                <div class="cat-inner">
                    <p style="font-size:12px; opacity:0.6; margin-bottom:10px;">
                        ${i.description || i.descripsion || 'No description'}
                    </p>
                    <div class="feature-item">
                        <button class="btn-primary" onclick="handlePushMod(${index})" style="margin-top: -10px">
                            ${btnText}
                        </button>
                    </div>
                </div>
            </div>
        </div>`;
    });
};
 window.detectbug = function() {
     detectbuglist.forEach(i => {
         installedmods = installedmods.filter(m => m.directory !== i.value)
     })
 };

// Helper function to bridge the click to your existing pushmods logic
window.handlePushMod = function(index) {
    const modData = listmodsexplore[index];
    pushmods(JSON.stringify(modData)); // Or just pushmods(modData) if your function accepts objects
};

 createui()
 setTimeout(() => {
     ref();
     detectbug();
 }, 1000)
})()