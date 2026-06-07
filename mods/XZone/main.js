// PERBAIKAN: Menggunakan window (w kecil) agar global variable aman
window.xzoneset = {
    "music": false
};

if(localStorage.getItem("xzoneset")){
    window.xzoneset = JSON.parse(localStorage.getItem("xzoneset"));
}

// Menambahkan video ke dashboard
document.getElementById('scene-dashboard').innerHTML = ('<video style="border-radius: 18px;" width="300px" autoplay muted loop playsinline src="https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/dashboardvid.mp4"></video>'+document.getElementById('scene-dashboard').innerHTML);

if(window.xzoneset.music === true){
    let bgm = new Audio('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/backsound.mp3'); 
    bgm.loop = true; 
    const startSound = () => bgm.play().catch(() => {});
    startSound(); 
    document.addEventListener('click', startSound, { once: true });
}

document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/wallpaper.jpg')";

window.savexzone = function(){
    localStorage.setItem("xzoneset", JSON.stringify(window.xzoneset));
};

window.createuixzone = async function(){
    const maint = document.getElementById("app-container");
    
    // PERBAIKAN: Menggunakan insertAdjacentHTML agar tidak merusak element const
    if (maint) {
        maint.insertAdjacentHTML('beforeend', `<div id="scene-xzone-main" class="panel">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                    <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                </span>
                <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">XZone</h2>
            </div>
            <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; border: 1px dashed rgba(255,255,255,0.2);">
                <div class="allowslidetext" style="text-align: center;">MUSIC</div>
                <div style="white-space: nowrap; text-align: center;">
                    <span style="color: #0A84FF; font-size: 16px; cursor: pointer;" onclick="window.xzoneset.music = false; window.savexzone()">
                        OFF
                    </span>
                    <span style="color: #0A84FF; margin-left: 10px; font-size: 16px; cursor: pointer;" onclick="window.xzoneset.music = true; window.savexzone()">
                        ON
                    </span>
                </div>
            </div>
        </div>`);
    }
                
    const rc = document.getElementById("consdash");
    if (rc) {
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
        rc.appendChild(cat);
    }
};

setTimeout(() => {
    window.createuixzone();
}, 1500);
