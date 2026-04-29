(function(){
window.createui = async function(){
    const maint = document.getElementById("app-container")
    maint.innerHTML += `<div id="xqrwabug-scene" class="panel">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                    </span>
                    <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">XQR - WABUG</h2>
                </div>
                
                <div>
                
                </div>
            </div>
    `;
  const rc = document.getElementById("scene-dashboard")
  const cat = document.createElement("div");
  cat.innerHTML = `<div class="category" id="xqrwabug">
                    <div class="cat-header" onclick="App.toggleCategory('xqrwabug')">
                        <div><span class="cat-icon">☠️</span> XQR WA-BUG</div>
                        <div class="cat-chevron">▶</div>
                    </div>
                    <div class="cat-content">
                        <div class="cat-inner">
                            <div class="feature-item" onclick="App.changeScene('xqrwabug-scene')">
                                <span>Mods</span>
                                <span style="color: #0A84FF;">Open</span>
                            </div>
                        </div>
                    </div>
                </div>`;
                rc.appendChild(cat)
                
 }
 createui()
})()