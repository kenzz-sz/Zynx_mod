(function(){
 window.createui = function(){
  const rc = document.getElementById("scene-dashboard")
  const cat = document.createElement("div")
  cat.innerHTML = `<div class="category" id="cat-settings">
                    <div class="cat-header" onclick="App.toggleCategory('cat-settings')">
                        <div><span class="cat-icon">👤</span> Preferences</div>
                        <div class="cat-chevron">▶</div>
                    </div>
                    <div class="cat-content">
                        <div class="cat-inner">
                            <!--<div class="feature-item" onclick="App.changeScene('scene-custom')">
                                <span>Open Editor Workspace</span>
                                <span style="color: #0A84FF;">Open</span>
                            </div>-->
                        </div>
                    </div>
                </div>`;
                rc.appendChild(cat)
 }
})()