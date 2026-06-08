// 1. Initialize Default Settings (added variables for custom video & audio)
window.xzoneset = {
    "music": false,
    "customVideo": "", // Stores Video Base64
    "customMusic": ""  // Stores Audio Base64
};

if(localStorage.getItem("xzoneset")){
    window.xzoneset = JSON.parse(localStorage.getItem("xzoneset"));
}

// 2. Save to LocalStorage Function
window.savexzone = function(){
    try {
        localStorage.setItem("xzoneset", JSON.stringify(window.xzoneset));
    } catch(e) {
        alert("⚠️ Failed to save! The file size is too large (Maximum Limit 5MB). Please use a smaller file.");
    }
};

// 3. Load Video to Dashboard (Check if custom video exists, otherwise use GitHub default)
const activeVideoSrc = window.xzoneset.customVideo || "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/dashboardvid.mp4";
const dashboardElement = document.getElementById('consdash');
const dashboardElementOut = document.getElementById('scene-dashboard');

if (dashboardElement) {
    // Using insertAdjacentHTML so other dashboard menus/buttons don't break or lose functionality
    dashboardElement.insertAdjacentHTML('afterbegin', `
        <video id="xz-dash-video" style="border-radius: 18px; margin-bottom: 10px;" width="300px" autoplay muted loop playsinline src="${activeVideoSrc}"></video>
    `);
}
else {
    {
        dashboardElementOut.insertAdjacentHTML('afterbegin', `
        <video id="xz-dash-video" style="border-radius: 18px; margin-bottom: 10px;" width="300px" autoplay muted loop playsinline src="${activeVideoSrc}"></video>
    `);
    }
}

// 4. Load Music (Check if music is active & check if custom music exists)
if(window.xzoneset.music === true){
    const activeMusicSrc = window.xzoneset.customMusic || "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/backsound.mp3";
    let bgm = new Audio(activeMusicSrc); 
    bgm.loop = true; 
    
    const startSound = () => bgm.play().catch(() => {});
    startSound(); 
    document.addEventListener('click', startSound, { once: true });
}

// Set Wallpaper
document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/wallpaper.jpg')";

// 5. Video Import Logic Function (Convert file to Base64)
window.xzImportVideo = function(input) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) { // 2.5MB size protection
        alert("Video size is too large! Please use a video file under 2.5MB so it fits in the browser's memory.");
        return;
    }

    const reader = new FileReader();
    document.getElementById("xz-vid-status").innerText = "Processing video...";
    
    reader.onload = function(e) {
        window.xzoneset.customVideo = e.target.result;
        window.savexzone();
        
        // Directly replace the video on the dashboard without restarting if the element exists
        const liveVideo = document.getElementById("xz-dash-video");
        if (liveVideo) liveVideo.src = e.target.result;
        
        document.getElementById("xz-vid-status").innerText = "✅ Video Saved Successfully!";
    };
    reader.readAsDataURL(file);
};

// 6. Audio Import Logic Function
window.xzImportAudio = function(input) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 2.5 * 1024 * 1024) {
        alert("Audio size is too large! Please use a highly compressed or short audio file under 2.5MB.");
        return;
    }

    const reader = new FileReader();
    document.getElementById("xz-aud-status").innerText = "Processing audio...";
    
    reader.onload = function(e) {
        window.xzoneset.customMusic = e.target.result;
        window.savexzone();
        document.getElementById("xz-aud-status").innerText = "✅ Audio Saved! (Restart App To Play)";
    };
    reader.readAsDataURL(file);
};

// 7. Reset Media Data to Default Function
window.xzResetMedia = function() {
    if (confirm("Reset custom video and audio back to XZone defaults?")) {
        window.xzoneset.customVideo = "";
        window.xzoneset.customMusic = "";
        window.savexzone();
        alert("Media reset successfully! The system will now reload the page.");
        location.reload();
    }
};

// 8. Create XZone Menu UI
window.createuixzone = async function(){
    const maint = document.getElementById("app-container");
    
    if (maint) {
        maint.insertAdjacentHTML('beforeend', `
        <div id="scene-xzone-main" class="panel">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                    <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                </span>
                <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">XZone Settings</h2>
            </div>
            
            <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; border: 1px dashed rgba(255,255,255,0.2); margin-bottom: 15px;">
                <div class="allowslidetext" style="text-align: center; font-weight: bold;">MUSIC CORE</div>
                <div style="color: grey; font-size: 9px; text-align: center; margin-bottom: 10px;">( Restart required after toggle )</div>
                <div style="white-space: nowrap; text-align: center;">
                    <span style="color: #0A84FF; font-size: 16px; cursor: pointer;" onclick="window.xzoneset.music = false; window.savexzone()">OFF</span>
                    <span style="color: #0A84FF; margin-left: 20px; font-size: 16px; cursor: pointer;" onclick="window.xzoneset.music = true; window.savexzone()">ON</span>
                </div>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 15px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 15px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; text-align: center;">📥 IMPORT DASHBOARD VIDEO</div>
                <input type="file" id="xz-file-video" accept="video/*" style="display: none;" onchange="window.xzImportVideo(this)">
                <button onclick="document.getElementById('xz-file-video').click()" style="width: 100%; background: #0A84FF; color: white; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">Choose Video</button>
                <div id="xz-vid-status" style="font-size: 10px; color: #8e8e93; text-align: center; margin-top: 6px;">Max recommended size: 2.5MB</div>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 15px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 25px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; text-align: center;">📥 IMPORT BACKGROUND MUSIC</div>
                <input type="file" id="xz-file-audio" accept="audio/*" style="display: none;" onchange="window.xzImportAudio(this)">
                <button onclick="document.getElementById('xz-file-audio').click()" style="width: 100%; background: #0A84FF; color: white; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">Choose Audio (MP3)</button>
                <div id="xz-aud-status" style="font-size: 10px; color: #8e8e93; text-align: center; margin-top: 6px;">Max recommended size: 2.5MB</div>
            </div>

            <button onclick="window.xzResetMedia()" style="width: 100%; background: rgba(255,59,48,0.2); color: #FF3B30; border: 1px solid rgba(255,59,48,0.4); padding: 12px; border-radius: 12px; font-weight: bold; cursor: pointer;">
                Reset to Default Assets
            </button>
            
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
                        <span>Main Settings</span>
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
