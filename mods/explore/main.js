(function(){
 window.createui = function(){
    const maint = document.getElementById("app-container")
    const scene = document.createElement("div");
    scene.innerHTML = `
    <div id="scene-explore-mods" class="panel">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                    </span>
                    <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">EXPLORE - MODS</h2>
                </div>
                
                <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
                    <p style="opacity: 0.6; font-size: 14px;">[ TITLE ]</p>
                    <p style="opacity: 0.6; font-size: 12px; font-weight: normal;">Website Subtitle</p>
                </div>
            </div>
    `
    
    
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
                maint.appendChild(scene)
 }
 createui()
})()