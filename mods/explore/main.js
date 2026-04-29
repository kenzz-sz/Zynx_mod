(function(){
    let listmodsexplore = []
 window.createui = async function(){
     listmodsexplore = await fh("https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/explore/mods.json");
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
 window.ref = async function(){
    const mvin = document.getElementById("AXdivexploremods");
    if (!mvin) return; 
        mvin.innerHTML = ""; 
        
            let res = "";
            
            listmodsexplore.forEach(i => {
                if(!i.name){
                const idthisvalue = "cat-" + i.directory + "-mymodsvalueid";
                mvin.innerHTML += `
                <div class="category" id="${idthisvalue}">
                    <div class="cat-header" onclick="App.toggleCategory('${idthisvalue}')">
                        <div><span class="cat-icon">${i.icon || "📦"}</span> ${i.display || i.name  || "-"}</div>
                        <div class="cat-chevron">▶</div>
                    </div>
                    <div class="cat-content">
                        <div class="cat-inner">
                            <p style="font-size:12px; opacity:0.6; margin-bottom:10px;">
                                ${i.descripsion || i.description || 'No description'}
                            </p>
                            <div class="feature-item">
                                <button class="btn-primary" onclick="deleteinstalledmods('${i.directory || null}')" style="margin-top: -10px">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>`;
            }});
            if(listmodsexplore.length == 1){
                mvin.innerHTML = `
                <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
                    <p style="opacity: 0.6; font-size: 14px;">[ YOU DONT HAVE ANY MODS ]</p>
                    <p style="opacity: 0.6; font-size: 12px; font-weight: normal;">Download mods in mods menu.</p>
                </div>
            `
            }
 }
 ref()
 createui()
})()