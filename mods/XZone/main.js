document.getElementById('scene-dashboard').insertAdjacentHTML('afterbegin', '<video style="border-radius: 18px;" width="300px" autoplay muted loop playsinline src="https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/dashboardvid.mp4"></video>');
let bgm = new Audio('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/backsound.mp3'); 
bgm.loop = true; 
const startSound = () => bgm.play().catch(() => {});
startSound(); 
document.addEventListener('click', startSound, { once: true });
document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/wallpaper.jpg')"

window.createuixzone = async function(){
    const maint = document.getElementById("app-container")
    maint += `<div id="scene-xzone-main" class="panel">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                        <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                    </span>
                    <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">XZone</h2>
                </div>
                
            </div>`;
            const rc = document.getElementById("consdash")
  const cat = document.createElement("div");
  cat.innerHTML = `<div class="category" id="cat-xzone">
                    <div class="cat-header" onclick="App.toggleCategory('cat-xzone')">
                        <div><span class="cat-icon">💍</span> XZone</div>
                        <div class="cat-chevron">▶</div>
                    </div>
                    <div class="cat-content">
                        <div class="cat-inner">
                            <div class="feature-item" onclick="App.changeScene('scene-xzone-main');">
                                <span>Main</span>
                                <span style="color: pink;">Open</span>
                            </div>
                            
                        </div>
                    </div>
                </div>`;
                rc.appendChild(cat)
 }