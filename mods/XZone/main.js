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
            const value = (bitBuffer >> bitCount) & 0x7FFF;
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
    .xz-row { display: flex; align-items: center; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid rgba(255, 255, 255, 0.06); flex-wrap: wrap; }
    .xz-row:last-child { border-bottom: none; }
    .xz-row-label { display: flex; flex-direction: column; gap: 4px; text-align: left; width: 100%; }
    .xz-lbl-header-container { display: flex; align-items: center; justify-content: space-between; width: 100%; }
    .xz-lbl-main { font-size: 14px; font-weight: 600; color: #fff; }
    .xz-lbl-sub { font-size: 11px; color: rgba(255, 255, 255, 0.4); margin-top: 2px; }
    .xz-status-badge { font-size: 9px; font-weight: 700; padding: 2px 6px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; }
    .xz-badge-default { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); }
    .xz-badge-custom { background: rgba(10,132,255,0.15); color: #0A84FF; border: 1px solid rgba(10,132,255,0.2); }
    .xz-toggle-span { font-size: 13px; font-weight: bold; cursor: pointer; padding: 6px 12px; border-radius: 8px; transition: all 0.2s ease; }
    .xz-action-btn { background: #0A84FF; color: white; border: none; padding: 10px 12px; border-radius: 10px; font-weight: 600; font-size: 13px; cursor: pointer; margin-top: 8px; }
    .xz-preview-box { width: 100%; margin-top: 10px; border-radius: 10px; overflow: hidden; background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; position: relative; }
    .xz-preview-vid { width: 100%; max-height: 140px; object-fit: cover; display: block; }
    .xz-preview-img { width: 100%; max-height: 140px; object-fit: cover; display: block; }
    audio::-webkit-media-controls-panel { background-color: rgba(255,255,255,0.1); }
    audio::-webkit-media-controls-current-time-display, audio::-webkit-media-controls-time-remaining-display { color: #fff; }
`;
document.head.appendChild(xzStyle);

// ========================================================
// 3. INITIALIZE CONFIGURATIONS
// ========================================================
window.xzoneset = {
    "music": false,
    "videoEnabled": true,
    "wallpaperEnabled": true,
    "bgType": "image", // "image" or "video"
    "customVideo": "", // Dashboard video
    "customMusic": "",
    "customWallpaper": "", // Background Image
    "customBgVideo": "" // Background Video
};

if(localStorage.getItem("xzoneset")){
    try {
        const parsed = JSON.parse(window.decodeBase32768(localStorage.getItem("xzoneset")));
        window.xzoneset = { ...window.xzoneset, ...parsed };
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
    const existingBgVid = document.getElementById("xz-bg-video-element");
    if (existingBgVid) existingBgVid.remove();
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = "#121214";

    if (window.xzoneset.wallpaperEnabled === true) {
        if (window.xzoneset.bgType === 'video') {
            const bgVidSrc = window.xzoneset.customBgVideo || "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/snaptik_7642236110743080212_v3.mp4";
            const vidHtml = `<video id="xz-bg-video-element" autoplay muted loop playsinline style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; object-fit: cover; z-index: -999; opacity: 0.6;" src="${bgVidSrc}"></video>`;
            document.body.insertAdjacentHTML('afterbegin', vidHtml);
            
        } else {
            const defaultWall = "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/wallpaper.jpg";
            document.body.style.backgroundImage = `url('${window.xzoneset.customWallpaper || defaultWall}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundAttachment = "fixed";
        }
    }
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
window.xzBgmInstance = null;
if(window.xzoneset.music === true){
    const activeMusicSrc = window.xzoneset.customMusic || "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/backsounds.mp3";
    window.xzBgmInstance = new Audio(activeMusicSrc); 
    window.xzBgmInstance.loop = true;
    const startSound = () => window.xzBgmInstance.play().catch(() => {});
    startSound(); 
    document.addEventListener('click', startSound, { once: true });
}

// ========================================================
// 5. LIVE RE-RENDERING & TOGGLE CONTROLLERS
// ========================================================
window.xzToggleSetting = function(key, targetValue, eventNode) {
    window.xzoneset[key] = targetValue;
    window.savexzone();
    
    if (key === 'wallpaperEnabled' || key === 'bgType') window.loadXZoneWallpaper();
    if (key === 'videoEnabled') window.loadXZoneVideo();
    if (key === 'music') { location.reload(); return; }
    
    const switchContainer = eventNode.parentElement;
    const items = switchContainer.querySelectorAll('.xz-toggle-span');
    items.forEach(el => {
        const componentVal = el.getAttribute('data-val');
        let isMatch = false;
        if (typeof targetValue === 'boolean') {
            isMatch = (componentVal === 'true') === targetValue;
        } else {
            isMatch = componentVal === targetValue;
        }

        if (isMatch) {
            el.style.background = '#0A84FF'; el.style.color = '#fff';
        } else {
            el.style.background = 'transparent'; el.style.color = '#8e8e93';
        }
    });
};

window.xzUpdateBadge = function(badgeId, isCustom) {
    const badge = document.getElementById(badgeId);
    if (!badge) return;
    badge.className = isCustom ? "xz-status-badge xz-badge-custom" : "xz-status-badge xz-badge-default";
    badge.innerText = isCustom ? "Custom" : "Default";
};

window.xzUpdatePreviewNode = function(nodeId, src) {
    const node = document.getElementById(nodeId);
    if (node) node.src = src;
};

window.xzImportFile = function(input, targetKey, statusId, badgeId, previewNodeId) {
    const file = input.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) { 
        alert("File is too heavy! Keep media small (~4MB) to avoid browser storage limits.");
        return;
    }

    const reader = new FileReader();
    document.getElementById(statusId).innerText = "Compressing stream...";
    
    reader.onload = function(e) {
        window.xzoneset[targetKey] = e.target.result;
        window.savexzone();
        
        if (targetKey === 'customWallpaper' || targetKey === 'customBgVideo') window.loadXZoneWallpaper();
        if (targetKey === 'customVideo') window.loadXZoneVideo();
        
        window.xzUpdateBadge(badgeId, true);
        window.xzUpdatePreviewNode(previewNodeId, e.target.result);
        document.getElementById(statusId).innerText = "✅ Saved Successfully!";
    };
    reader.readAsDataURL(file);
};

window.xzResetSingle = function(targetKey, statusId, badgeId, previewNodeId, defaultSrc) {
    if (confirm("Reset this specific media item back to system default?")) {
        window.xzoneset[targetKey] = "";
        window.savexzone();
        
        if (targetKey === 'customWallpaper' || targetKey === 'customBgVideo') window.loadXZoneWallpaper();
        if (targetKey === 'customVideo') window.loadXZoneVideo();
        
        window.xzUpdateBadge(badgeId, false);
        window.xzUpdatePreviewNode(previewNodeId, defaultSrc);
        const statusNode = document.getElementById(statusId);
        if (statusNode) statusNode.innerText = "✅ Reset to default!";
    }
};

window.xzSwitchTab = function(tabName, eventObj) {
    document.querySelectorAll('.xz-tab-btn').forEach(b => b.classList.remove('active'));
    eventObj.target.classList.add('active');
    document.querySelectorAll('.xz-tab-panel').forEach(p => p.style.display = 'none');
    document.getElementById('xz-panel-' + tabName).style.display = 'block';
};

window.xzResetMedia = function() {
    if (confirm("Factory reset ALL environment configurations?")) {
        window.xzoneset = { music: false, videoEnabled: true, wallpaperEnabled: true, bgType: 'image', customVideo: "", customMusic: "", customWallpaper: "", customBgVideo: "" };
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
        // Defaults
        const defWall = "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/wallpaper.jpg";
        const defDashVid = "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/dashboardvid.mp4";
        const defMusic = "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/backsounds.mp3";
        
        // Active Assets
        const actDashVid = window.xzoneset.customVideo || defDashVid;
        const actBgVid = window.xzoneset.customBgVideo || defDashVid;
        const actMusic = window.xzoneset.customMusic || defMusic;
        const actWall = window.xzoneset.customWallpaper || defWall;

        // Badges
        const vBadge = window.xzoneset.customVideo ? 'xz-badge-custom">Custom' : 'xz-badge-default">Default';
        const aBadge = window.xzoneset.customMusic ? 'xz-badge-custom">Custom' : 'xz-badge-default">Default';
        const wBadge = window.xzoneset.customWallpaper ? 'xz-badge-custom">Custom' : 'xz-badge-default">Default';
        const bvBadge = window.xzoneset.customBgVideo ? 'xz-badge-custom">Custom' : 'xz-badge-default">Default';

        maint.insertAdjacentHTML('beforeend', `
        <div id="scene-xzone-main" class="panel xz-panel-container">
            
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 15px; cursor: pointer; display: flex; align-items: center; font-weight: 600;">
                    <span style="font-size: 20px; margin-right: 4px; line-height: 0;">‹</span> Back
                </span>
                <h2 style="margin: 0; font-size: 17px; text-align: center; flex-grow: 1; padding-right: 50px; font-weight: 700; color: #fff;">XZone Engine</h2>
            </div>

            <div class="xz-tab-box">
                <button class="xz-tab-btn active" onclick="window.xzSwitchTab('toggles', event)">System Toggles</button>
                <button class="xz-tab-btn" onclick="window.xzSwitchTab('media', event)">Custom Storage</button>
            </div>

            <div id="xz-panel-toggles" class="xz-tab-panel">
                <div class="xz-card-group">
                    
                    <div class="xz-row">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Background Music Core</span>
                            <span class="xz-lbl-sub">Toggle continuous background audio (Requires refresh)</span>
                        </div>
                        <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 10px;">
                            <span class="xz-toggle-span" data-val="false" style="background: ${!window.xzoneset.music ? '#0A84FF' : 'transparent'}; color: ${!window.xzoneset.music ? '#fff' : '#8e8e93'}" onclick="window.xzToggleSetting('music', false, this)">OFF</span>
                            <span class="xz-toggle-span" data-val="true" style="background: ${window.xzoneset.music ? '#0A84FF' : 'transparent'}; color: ${window.xzoneset.music ? '#fff' : '#8e8e93'}" onclick="window.xzToggleSetting('music', true, this)">ON</span>
                        </div>
                    </div>

                    <div class="xz-row">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Dashboard Video Player</span>
                            <span class="xz-lbl-sub">Toggle the dashboard looping background video</span>
                        </div>
                        <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 10px;">
                            <span class="xz-toggle-span" data-val="false" style="background: ${!window.xzoneset.videoEnabled ? '#0A84FF' : 'transparent'}; color: ${!window.xzoneset.videoEnabled ? '#fff' : '#8e8e93'}" onclick="window.xzToggleSetting('videoEnabled', false, this)">OFF</span>
                            <span class="xz-toggle-span" data-val="true" style="background: ${window.xzoneset.videoEnabled ? '#0A84FF' : 'transparent'}; color: ${window.xzoneset.videoEnabled ? '#fff' : '#8e8e93'}" onclick="window.xzToggleSetting('videoEnabled', true, this)">ON</span>
                        </div>
                    </div>

                    <div class="xz-row">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Main Environment Backdrop</span>
                            <span class="xz-lbl-sub">Toggle the system-wide custom interface backdrop</span>
                        </div>
                        <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 10px;">
                            <span class="xz-toggle-span" data-val="false" style="background: ${!window.xzoneset.wallpaperEnabled ? '#0A84FF' : 'transparent'}; color: ${!window.xzoneset.wallpaperEnabled ? '#fff' : '#8e8e93'}" onclick="window.xzToggleSetting('wallpaperEnabled', false, this)">OFF</span>
                            <span class="xz-toggle-span" data-val="true" style="background: ${window.xzoneset.wallpaperEnabled ? '#0A84FF' : 'transparent'}; color: ${window.xzoneset.wallpaperEnabled ? '#fff' : '#8e8e93'}" onclick="window.xzToggleSetting('wallpaperEnabled', true, this)">ON</span>
                        </div>
                    </div>

                    <div class="xz-row" style="border-top: 1px solid rgba(255,255,255,0.06);">
                        <div class="xz-row-label">
                            <span class="xz-lbl-main">Backdrop Type</span>
                            <span class="xz-lbl-sub">Choose static image or live video format</span>
                        </div>
                        <div style="display: flex; gap: 4px; background: rgba(0,0,0,0.2); padding: 4px; border-radius: 10px;">
                            <span class="xz-toggle-span" data-val="image" style="background: ${window.xzoneset.bgType === 'image' ? '#0A84FF' : 'transparent'}; color: ${window.xzoneset.bgType === 'image' ? '#fff' : '#8e8e93'}" onclick="window.xzToggleSetting('bgType', 'image', this)">IMAGE</span>
                            <span class="xz-toggle-span" data-val="video" style="background: ${window.xzoneset.bgType === 'video' ? '#0A84FF' : 'transparent'}; color: ${window.xzoneset.bgType === 'video' ? '#fff' : '#8e8e93'}" onclick="window.xzToggleSetting('bgType', 'video', this)" id="vxxzzz">VIDEO</span>
                        </div>
                    </div>

                </div>
            </div>

            <div id="xz-panel-media" class="xz-tab-panel" style="display: none;">
                <div class="xz-card-group">
                    
                    <div class="xz-row" style="flex-direction: column; align-items: flex-start;">
                        <div class="xz-row-label">
                            <div class="xz-lbl-header-container">
                                <span class="xz-lbl-main">Import Background Music</span>
                                <span id="xz-badge-aud" class="xz-status-badge ${aBadge}</span>
                            </div>
                            <span class="xz-lbl-sub" id="xz-aud-status">Recommended compressed mp3 up to ~4MB</span>
                        </div>
                        <input type="file" id="xz-file-audio" accept="audio/*" style="display: none;" onchange="window.xzImportFile(this, 'customMusic', 'xz-aud-status', 'xz-badge-aud', 'prev-bg-audio')">
                        <div class="xz-preview-box" style="padding: 12px 10px; background: rgba(0,0,0,0.4);">
                            <audio id="prev-bg-audio" controls src="${actMusic}" style="width: 100%; height: 40px; outline: none; border-radius: 6px;"></audio>
                        </div>
                        <div style="display: flex; gap: 8px; width: 100%;">
                            <button class="xz-action-btn" style="flex: 1;" onclick="document.getElementById('xz-file-audio').click()">Choose Audio File</button>
                            <button class="xz-action-btn" style="flex: none; width: auto; background: rgba(255,59,48,0.12); color: #FF3B30; border: 1px solid rgba(255,59,48,0.25);" onclick="window.xzResetSingle('customMusic', 'xz-aud-status', 'xz-badge-aud', 'prev-bg-audio', '${defMusic}')">Reset</button>
                        </div>
                    </div>

                    <div class="xz-row" style="flex-direction: column; align-items: flex-start;">
                        <div class="xz-row-label">
                            <div class="xz-lbl-header-container">
                                <span class="xz-lbl-main">Import Dashboard Video</span>
                                <span id="xz-badge-vid" class="xz-status-badge ${vBadge}</span>
                            </div>
                            <span class="xz-lbl-sub" id="xz-vid-status">Header dashboard looping preview</span>
                        </div>
                        <div class="xz-preview-box">
                            <video id="prev-dash-vid" class="xz-preview-vid" controls muted src="${actDashVid}"></video>
                        </div>
                        <input type="file" id="xz-file-video" accept="video/*" style="display: none;" onchange="window.xzImportFile(this, 'customVideo', 'xz-vid-status', 'xz-badge-vid', 'prev-dash-vid')">
                        <div style="display: flex; gap: 8px; width: 100%;">
                            <button class="xz-action-btn" style="flex: 1;" onclick="document.getElementById('xz-file-video').click()">Choose Video</button>
                            <button class="xz-action-btn" style="flex: none; width: auto; background: rgba(255,59,48,0.12); color: #FF3B30; border: 1px solid rgba(255,59,48,0.25);" onclick="window.xzResetSingle('customVideo', 'xz-vid-status', 'xz-badge-vid', 'prev-dash-vid', '${defDashVid}')">Reset</button>
                        </div>
                    </div>

                    <div class="xz-row" style="flex-direction: column; align-items: flex-start;">
                        <div class="xz-row-label">
                            <div class="xz-lbl-header-container">
                                <span class="xz-lbl-main">Import Image Backdrop</span>
                                <span id="xz-badge-wall" class="xz-status-badge ${wBadge}</span>
                            </div>
                            <span class="xz-lbl-sub" id="xz-wall-status">Static wallpaper background image</span>
                        </div>
                        <div class="xz-preview-box">
                            <img id="prev-wall-img" class="xz-preview-img" src="${actWall}">
                        </div>
                        <input type="file" id="xz-file-wall" accept="image/*" style="display: none;" onchange="window.xzImportFile(this, 'customWallpaper', 'xz-wall-status', 'xz-badge-wall', 'prev-wall-img')">
                        <div style="display: flex; gap: 8px; width: 100%;">
                            <button class="xz-action-btn" style="flex: 1;" onclick="document.getElementById('xz-file-wall').click()">Choose Image</button>
                            <button class="xz-action-btn" style="flex: none; width: auto; background: rgba(255,59,48,0.12); color: #FF3B30; border: 1px solid rgba(255,59,48,0.25);" onclick="window.xzResetSingle('customWallpaper', 'xz-wall-status', 'xz-badge-wall', 'prev-wall-img', '${defWall}')">Reset</button>
                        </div>
                    </div>

                    <div class="xz-row" style="flex-direction: column; align-items: flex-start;">
                        <div class="xz-row-label">
                            <div class="xz-lbl-header-container">
                                <span class="xz-lbl-main">Import Video Backdrop</span>
                                <span id="xz-badge-bgvid" class="xz-status-badge ${bvBadge}</span>
                            </div>
                            <span class="xz-lbl-sub" id="xz-bgvid-status">Live moving wallpaper background</span>
                        </div>
                        <div class="xz-preview-box">
                            <video id="prev-bgvid-vid" class="xz-preview-vid" controls muted src="${actBgVid}"></video>
                        </div>
                        <input type="file" id="xz-file-bgvid" accept="video/*" style="display: none;" onchange="window.xzImportFile(this, 'customBgVideo', 'xz-bgvid-status', 'xz-badge-bgvid', 'prev-bgvid-vid')">
                        <div style="display: flex; gap: 8px; width: 100%;">
                            <button class="xz-action-btn" style="flex: 1;" onclick="document.getElementById('xz-file-bgvid').click()">Choose Video</button>
                            <button class="xz-action-btn" style="flex: none; width: auto; background: rgba(255,59,48,0.12); color: #FF3B30; border: 1px solid rgba(255,59,48,0.25);" onclick="window.xzResetSingle('customBgVideo', 'xz-bgvid-status', 'xz-badge-bgvid', 'prev-bgvid-vid', '${defDashVid}')">Reset</button>
                        </div>
                    </div>

                </div>

                <button onclick="window.xzResetMedia()" style="width: 100%; background: rgba(255,59,48,0.12); color: #FF3B30; border: 1px solid rgba(255,59,48,0.25); padding: 12px; border-radius: 12px; font-weight: bold; cursor: pointer; font-size: 13px; margin-top: 8px;">
                    Factory Reset Everything
                </button>
            </div>

        </div>`);

        // Sync Audio Player Preview with Global Music
        const audPrev = document.getElementById('prev-bg-audio');
        if (audPrev) {
            // Auto-catch timestamp if music is actively playing in the background
            if (window.xzBgmInstance && !window.xzBgmInstance.paused) {
                audPrev.currentTime = window.xzBgmInstance.currentTime;
                audPrev.play().catch(()=>{});
                window.xzBgmInstance.pause();
            }
            // Ensure global music stays paused when you preview it in settings
            audPrev.addEventListener('play', () => {
                if (window.xzBgmInstance) window.xzBgmInstance.pause();
            });
        }
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
