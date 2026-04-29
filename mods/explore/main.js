(function(){
 let listmodsexplore = []
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
                
                <div id="AXdivexploremods"></div>
            </div>
    `;
  const rc = document.getElementById("scene-dashboard")
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
                        ${i.description || 'No description'}
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

// Helper function to bridge the click to your existing pushmods logic
window.handlePushMod = function(index) {
    const modData = listmodsexplore[index];
    pushmods(JSON.stringify(modData)); // Or just pushmods(modData) if your function accepts objects
};

 createui()
 setTimeout(() => {
     ref()
 }, 500)
})()