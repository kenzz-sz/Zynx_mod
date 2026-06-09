// ========================================================
// 1. THE ULTIMATE COMPRESSION ENGINE (Base32768 - 15 Bit)
// ========================================================
window.OFFSET = 0x4E00; // Safe CJK Unicode block start
window.encodeBase32768 = function(text) {
    if (!text) return "";
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const len = bytes.length;
    let bitBuffer = 0, bitCount = 0, encodedStr = "";

    for (let i = 0; i < len; i++) {
        bitBuffer = (bitBuffer << 8) | bytes[i];
        bitCount += 8;
        while (bitCount >= 15) {
            bitCount -= 15;
            const value = (bitBuffer >> bitCount) & 0x7FFF; // Extract 15 bits
            encodedStr += String.fromCharCode(window.OFFSET + value);
            bitBuffer &= (1 << bitCount) - 1;
        }
    }
    if (bitCount > 0) {
        const value = (bitBuffer << (15 - bitCount)) & 0x7FFF;
        encodedStr += String.fromCharCode(window.OFFSET + value);
    }
    return `${len}_${encodedStr}`;
};

window.decodeBase32768 = function(encodedData) {
    if (!encodedData) return "";
    const separatorIndex = encodedData.indexOf('_');
    if (separatorIndex === -1) throw new Error("Invalid data format");
    const targetLength = parseInt(encodedData.substring(0, separatorIndex), 10);
    const encodedStr = encodedData.substring(separatorIndex + 1);
    let bitBuffer = 0, bitCount = 0, byteIdx = 0;
    const bytes = new Uint8Array(targetLength);

    for (let i = 0; i < encodedStr.length; i++) {
        const value = encodedStr.charCodeAt(i) - window.OFFSET;
        if (value < 0 || value >= 32768) throw new Error("Invalid Base32768 character sequence");
        bitBuffer = (bitBuffer << 15) | value;
        bitCount += 15;
        while (bitCount >= 8) {
            bitCount -= 8;
            const byte = (bitBuffer >> bitCount) & 0xFF;
            if (byteIdx < targetLength) bytes[byteIdx++] = byte;
            bitBuffer &= (1 << bitCount) - 1;
        }
    }
    return new TextDecoder().decode(bytes);
};

// ========================================================
// 2. INJECT ENGINE CSS (Modern English Tab UI Layout)
// ========================================================
const xzStyle = document.createElement('style');
xzStyle.innerHTML = `
    .xz-panel-container {
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        box-sizing: border-box; padding: 24px 20px; overflow-y: auto; z-index: 999;
        background: rgba(18, 18, 20, 0.85) !important; backdrop-filter: blur(25px);
        color: #ffffff !important; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    .xz-tab-box { display: flex; gap: 8px; margin-bottom: 20px; background: rgba(255,255,255,0.05); padding: 4px; border-radius: 12px; }
    .xz-tab-btn { flex: 1; padding: 10px; border-radius: 9px; border: none; background: transparent; color: #a1a1a6; font-weight: 600; font-size: 13px; cursor: pointer; transition: all 0.2s; }
    .xz-tab-btn.active { background: #0A84FF; color: #fff; }
    .xz-card-group { background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.07); border-radius: 14px; padding: 4px 16px; margin-bottom: 16px; }
    .xz-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); }
    .xz-row:last-child { border-bottom: none; }
    .xz-row-label { display: flex; flex-direction: column; gap: 2px; text-align: left; }
    .xz-lbl-main { font-size: 14px; font-weight: 600; color: #fff; }
    .xz-lbl-sub { font-size: 11px; color: rgba(255, 255, 255, 0.4); }
    .xz-toggle-span { font-size: 13px; font-weight: bold; cursor: pointer; padding: 6px 12px; border-radius: 8px; transition: background 0.2s; }
    .xz-action-btn { width: 100%; background: #0A84FF; color: white; border: none; padding: 12px; border-radius: 10px; font-weight: 600; font-size: 13px; cursor: pointer; margin-top: 8px; }
`;
document.head.appendChild(xzStyle);

// ========================================================
// 3. INITIALIZE CONFIGURATIONS
// ========================================================
window.xzoneset = {
    "music": false,
    "videoEnabled": true,
    "wallpaperEnabled": true,
    "customVideo": "", 
    "customMusic": "",
    "customWallpaper": ""
};

if(localStorage.getItem("xzoneset")){
    try {
        window.xzoneset = JSON.parse(window.decodeBase32768(localStorage.getItem("xzoneset")));
    } catch(e) { 
        console.error("Failed parsing compressed configurations, falling back to defaults."); 
    }
}

window.savexzone = function(){
    localStorage.setItem("xzoneset", window.encodeBase32768(JSON.stringify(window.xzoneset)));
};

// ========================================================
// 4. PIPELINE RENDER ENGINES
// ========================================================
window.loadXZoneWallpaper = function() {
    const defaultWall = "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/wallpaper.jpg";
    if (window.xzoneset.wallpaperEnabled === true) {
        document.body.style.backgroundImage = `url('${window.xzoneset.customWallpaper || defaultWall}')`;
    } else {
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = "#121214";
    }
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
};

window.loadXZoneVideo = function() {
    const oldVid = document.getElementById("xz-dash-video");
    if (oldVid) oldVid.remove();

    if (window.xzoneset.videoEnabled !== true) return;

    const activeVideoSrc = window.xzoneset.customVideo || "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/dashboardvid.mp4";
    const dashboardElement = document.getElementById('topdashboard');
    const dashboardElementOut = document.getElementById('consdash');
    const videoHTML = `<video id="xz-dash-video" style="border-radius: 18px; margin-bottom: 10px;" width="100%" autoplay muted loop playsinline src="${activeVideoSrc}"></video>`;

    if (dashboardElement) {
        dashboardElement.insertAdjacentHTML('afterbegin', videoHTML);
    } else if (dashboardElementOut) {
        dashboardElementOut.insertAdjacentHTML('afterbegin', videoHTML);
    }
};

// Deploy Environmental Assets
window.loadXZoneWallpaper();
window.loadXZoneVideo();

// Independent Music Initialization
if(window.xzoneset.music === true){
    const activeMusicSrc = window.xzoneset.customMusic || "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/backsounds.mp3";
    let bgm = new Audio(activeMusicSrc); 
    bgm.loop = true;
    const startSound = () => bgm.play().catch(() => {});
    startSound(); 
    document.addEventListener('click', startSound, { once: true });
}

// ========================================================
// 5. FILE IMPORT HANDLERS (Binary-to-Text Pipelines)
// ========================================================
window.xzImportFile = function(input, targetKey, statusId) {
    const file = input.files[0];
    if (!file) return;

    // Standard local storage threshold warning
    if (file.size > 4.5 * 1024 * 1024) { 
        alert("File size is too heavy! Keep individual media assets small to avoid exceeding browser string memory limits.");
        return;
    }

    const reader = new FileReader();
    document.getElementById(statusId).innerText = "Compressing stream...";
    
    reader.onload = function(e) {
        window.xzoneset[targetKey] = e.target.result;
        window.savexzone();
        
        if (targetKey === 'customWallpaper') window.loadXZoneWallpaper();
        if (targetKey === 'customVideo') window.loadXZoneVideo();
        
        document.getElementById(statusId).innerText = "✅ Saved Successfully!";
    };
    reader.readAsDataURL(file);
};

window.xzSwitchTab = function(tabName) {
    document.querySelectorAll('.xz-tab-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    document.querySelectorAll('.xz-tab-panel').forEach(p => p.style.display = 'none');
    document.getElementById('xz-panel-' + tabName).style.display = 'block';
};

window.xzResetMedia = function() {
    if (confirm("Reset all environment configurations back to engine defaults?")) {
        window.xzoneset = { music: false, videoEnabled: true, wallpaperEnabled: true, customVideo: "", customMusic: "", customWallpaper: "" };
        window.savexzone();
        location.reload();
    }
};

// ========================================================
// 6. UI BUILDER ENGINE (English Modular Panels)
// ========================================================
window.createuixzone = async function(){
    const maint = document.getElementById("app-container");
    if (!maint) return;
    
    if (!document.getElementById("scene-xzone-main")) {
        maint.insertAdjacentHTML('beforeend', `
        <div id="scene-xzone-main" class="panel xz-panel-container" style="">
            
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 15px; cursor: pointer; display: flex; align-items: center; font-weight: 600;">
                    <span style="font-size: 20px; margin-right: 4px; line-height: 0;">‹</span> Back
                </span>
                <h2 style="margin: 0; font-size: 17px; text-align: center; flex-grow: 1; padding-right: 50px; font-weight: 700; color: #fff;">XZone Engine</h2>
            </div>

            <div class="xz-tab-box">
                <button class="xz-tab-btn active" onclick="window.xzSwitchTab('toggles')">System Toggles</button>
                <button class="xz-tab-btn" onclick="window.xzSwitchTab('media')">Custom Storage</button>
            </div>

            <div id="xz-panel-toggles" class="xz-tab-panel">
                <div class="xz-card-group">
                    
                    <div class="xz-row">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Background Music Core</span>
                            <span class="xz-lbl-sub">Toggle continuous background audio (Requires refresh)</span>
                        </div>
                        <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 10px;">
                            <span class="xz-toggle-span" style="background: ${!window.xzoneset.music ? '#0A84FF' : 'transparent'}; color: ${!window.xzoneset.music ? '#fff' : '#8e8e93'}" onclick="window.xzoneset.music = false; window.savexzone(); location.reload()">OFF</span>
                            <span class="xz-toggle-span" style="background: ${window.xzoneset.music ? '#0A84FF' : 'transparent'}; color: ${window.xzoneset.music ? '#fff' : '#8e8e93'}" onclick="window.xzoneset.music = true; window.savexzone(); location.reload()">ON</span>
                        </div>
                    </div>

                    <div class="xz-row">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Dashboard Video Player</span>
                            <span class="xz-lbl-sub">Toggle the dashboard looping background video</span>
                        </div>
                        <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 10px;">
                            <span class="xz-toggle-span" style="background: ${!window.xzoneset.videoEnabled ? '#0A84FF' : 'transparent'}; color: ${!window.xzoneset.videoEnabled ? '#fff' : '#8e8e93'}" onclick="window.xzoneset.videoEnabled = false; window.savexzone(); window.loadXZoneVideo()">OFF</span>
                            <span class="xz-toggle-span" style="background: ${window.xzoneset.videoEnabled ? '#0A84FF' : 'transparent'}; color: ${window.xzoneset.videoEnabled ? '#fff' : '#8e8e93'}" onclick="window.xzoneset.videoEnabled = true; window.savexzone(); window.loadXZoneVideo()">ON</span>
                        </div>
                    </div>

                    <div class="xz-row">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Environment Wallpaper</span>
                            <span class="xz-lbl-sub">Toggle system-wide custom wallpaper interface backdrop</span>
                        </div>
                        <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 10px;">
                            <span class="xz-toggle-span" style="background: ${!window.xzoneset.wallpaperEnabled ? '#0A84FF' : 'transparent'}; color: ${!window.xzoneset.wallpaperEnabled ? '#fff' : '#8e8e93'}" onclick="window.xzoneset.wallpaperEnabled = false; window.savexzone(); window.loadXZoneWallpaper()">OFF</span>
                            <span class="xz-toggle-span" style="background: ${window.xzoneset.wallpaperEnabled ? '#0A84FF' : 'transparent'}; color: ${window.xzoneset.wallpaperEnabled ? '#fff' : '#8e8e93'}" onclick="window.xzoneset.wallpaperEnabled = true; window.savexzone(); window.loadXZoneWallpaper()">ON</span>
                        </div>
                    </div>

                </div>
            </div>

            <div id="xz-panel-media" class="xz-tab-panel" style="display: none;">
                <div class="xz-card-group">
                    
                    <div class="xz-row" style="flex-direction: column; align-items: flex-start;">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Import Dashboard Video</span>
                            <span class="xz-lbl-sub" id="xz-vid-status">Recommended compressed mp4 loops up to ~4MB</span>
                        </div>
                        <input type="file" id="xz-file-video" accept="video/*" style="display: none;" onchange="window.xzImportFile(this, 'customVideo', 'xz-vid-status')">
                        <button class="xz-action-btn" onclick="document.getElementById('xz-file-video').click()">Choose Video File</button>
                    </div>

                    <div class="xz-row" style="flex-direction: column; align-items: flex-start;">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Import Background Music</span>
                            <span class="xz-lbl-sub" id="xz-aud-status">Recommended highly compressed audio formats up to ~4MB</span>
                        </div>
                        <input type="file" id="xz-file-audio" accept="audio/*" style="display: none;" onchange="window.xzImportFile(this, 'customMusic', 'xz-aud-status')">
                        <button class="xz-action-btn" onclick="document.getElementById('xz-file-audio').click()">Choose Audio File</button>
                    </div>

                    <div class="xz-row" style="flex-direction: column; align-items: flex-start;">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Import Custom Wallpaper</span>
                            <span class="xz-lbl-sub" id="xz-wall-status">Supported image files (PNG/JPG) up to ~2MB</span>
                        </div>
                        <input type="file" id="xz-file-wall" accept="image/*" style="display: none;" onchange="window.xzImportFile(this, 'customWallpaper', 'xz-wall-status')">
                        <button class="xz-action-btn" onclick="document.getElementById('xz-file-wall').click()">Choose Wallpaper Image</button>
                    </div>

                </div>

                <button onclick="window.xzResetMedia()" style="width: 100%; background: rgba(255,59,48,0.12); color: #FF3B30; border: 1px solid rgba(255,59,48,0.25); padding: 12px; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 13px; margin-top: 8px;">
                    Reset Environment to Default
                </button>
            </div>

        </div>`);
    }
                
    const rc = document.getElementById("consdash");
    if (rc && !document.getElementById('cat-xzone')) {
        const cat = document.createElement("div");
        cat.innerHTML = `<div class="category" id="cat-xzone">
            <div class="cat-header" onclick="App.toggleCategory('cat-xzone')">
                <div><span class="cat-icon" style="color: #0A84FF;">💍</span> XZone</div>
                <div class="cat-chevron">▶</div>
            </div>
            <div class="cat-content">
                <div class="cat-inner">
                    <div class="feature-item" onclick="App.changeScene('scene-xzone-main');">
                        <span>Main Settings</span>
                        <span style="color: #0A84FF; font-weight: 600;">Open</span>
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
