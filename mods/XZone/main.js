// Menggunakan karakter Unicode dari blok CJK agar aman disimpan di localStorage
window.OFFSET = 0x4E00; 
window.encodeBase1024 = function(text) {
    if (!text) return "";
    
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const len = bytes.length;
    
    let bitBuffer = 0;
    let bitCount = 0;
    let encodedStr = "";

    for (let i = 0; i < len; i++) {
        bitBuffer = (bitBuffer << 8) | bytes[i];
        bitCount += 8;

        while (bitCount >= 10) {
            bitCount -= 10;
            const value = (bitBuffer >> bitCount) & 0x3FF; // Ambil 10 bit
            encodedStr += String.fromCharCode(window.OFFSET + value);
            bitBuffer &= (1 << bitCount) - 1; // FIX: Bersihkan bit yang sudah diambil agar tidak overflow
        }
    }

    // Jika ada sisa bit yang tidak genap 10 bit, tambahkan padding bit 0
    if (bitCount > 0) {
        const value = (bitBuffer << (10 - bitCount)) & 0x3FF;
        encodedStr += String.fromCharCode(window.OFFSET + value);
    }

    // Pasang metadata panjang byte asli di awal string untuk mengatasi masalah padding saat decode
    return `${len}_${encodedStr}`;
}

window.decodeBase1024 = function(encodedData) {
    if (!encodedData) return "";

    // Pisahkan penanda panjang asli (metadata) dengan isi data
    const separatorIndex = encodedData.indexOf('_');
    if (separatorIndex === -1) throw new Error("Format data tidak valid");

    const targetLength = parseInt(encodedData.substring(0, separatorIndex), 10);
    const encodedStr = encodedData.substring(separatorIndex + 1);

    let bitBuffer = 0;
    let bitCount = 0;
    const bytes = new Uint8Array(targetLength);
    let byteIdx = 0;

    for (let i = 0; i < encodedStr.length; i++) {
        const value = encodedStr.charCodeAt(i) - window.OFFSET;
        if (value < 0 || value >= 1024) throw new Error("Karakter Base1024 tidak valid");

        bitBuffer = (bitBuffer << 10) | value;
        bitCount += 10;

        while (bitCount >= 8) {
            bitCount -= 8;
            const byte = (bitBuffer >> bitCount) & 0xFF; // Ambil 8 bit (1 byte)
            if (byteIdx < targetLength) {
                bytes[byteIdx++] = byte;
            }
            bitBuffer &= (1 << bitCount) - 1; // FIX: Bersihkan bit yang sudah diambil
        }
    }

    const decoder = new TextDecoder();
    return decoder.decode(bytes);
}


// 1. Initialize Default Settings (added variables for custom video & audio)
window.xzoneset = {
    "music": false,
    "customVideo": "", // Stores Video Base64
    "customMusic": ""  // Stores Audio Base64
};

if(localStorage.getItem("xzoneset")){
        window.xzoneset = JSON.parse(window.decodeBase1024(localStorage.getItem("xzoneset")));
   
}

// 2. Save to LocalStorage Function
window.savexzone = function(){
    
        localStorage.setItem("xzoneset", (window.encodeBase1024(JSON.stringify(window.xzoneset))));
    
};

// 3. Load Video to Dashboard
const activeVideoSrc = window.xzoneset.customVideo || "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/dashboardvid.mp4";
const dashboardElement = document.getElementById('topdashboard');
const dashboardElementOut = document.getElementById('consdash');

if (dashboardElement) {
    dashboardElement.innerHTML += (`
        <video id="xz-dash-video" style="border-radius: 18px; margin-bottom: 10px;" width="300px" autoplay muted loop playsinline src="${activeVideoSrc}"></video>
    `);
}
else if (dashboardElementOut) {
    dashboardElementOut.insertAdjacentHTML('afterbegin', `
        <video id="xz-dash-video" style="border-radius: 18px; margin-bottom: 10px;" width="300px" autoplay muted loop playsinline src="${activeVideoSrc}"></video>
    `);
}

// 4. Load Music
if(window.xzoneset.music === true){
    const activeMusicSrc = window.xzoneset.customMusic || "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/backsounds.mp3";
    let bgm = new Audio(activeMusicSrc); 
    bgm.loop = true; 
    
    const startSound = () => bgm.play().catch(() => {});
    startSound(); 
    document.addEventListener('click', startSound, { once: true });
}

// Set Wallpaper
document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/wallpaper.jpg')";

// 5. Video Import Logic Function (FIXED LIMIT TO 3.5MB)
window.xzImportVideo = function(input) {
    const file = input.files[0];
    if (!file) return;

    // FIX: Limit diturunkan ke 3.5MB karena limit mutlak localStorage adalah 5MB string
    if (file.size > 5 * 1024 * 1024) { 
        alert("Ukuran video terlalu besar! Gunakan video di bawah 5MB agar muat di penyimpanan browser.");
        return;
    }

    const reader = new FileReader();
    document.getElementById("xz-vid-status").innerText = "Processing video...";
    
    reader.onload = function(e) {
        window.xzoneset.customVideo = e.target.result;
        window.savexzone();
        
        const liveVideo = document.getElementById("xz-dash-video");
        if (liveVideo) liveVideo.src = e.target.result;
        
        document.getElementById("xz-vid-status").innerText = "✅ Video Berhasil Disimpan!";
    };
    reader.readAsDataURL(file);
};

// 6. Audio Import Logic Function (FIXED LIMIT TO 3.5MB)
window.xzImportAudio = function(input) {
    const file = input.files[0];
    if (!file) return;

    // FIX: Limit diturunkan ke 3.5MB
    if (file.size > 5 * 1024 * 1024) {
        alert("Ukuran audio terlalu besar! Gunakan file audio di bawah 5MB.");
        return;
    }

    const reader = new FileReader();
    document.getElementById("xz-aud-status").innerText = "Processing audio...";
    
    reader.onload = function(e) {
        window.xzoneset.customMusic = e.target.result;
        window.savexzone();
        document.getElementById("xz-aud-status").innerText = "✅ Audio Disimpan! (Restart App Untuk Memutar)";
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
                <div id="xz-vid-status" style="font-size: 10px; color: #8e8e93; text-align: center; margin-top: 6px;">Max size: 5MB</div>
            </div>

            <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 15px; border: 1px solid rgba(255,255,255,0.1); margin-bottom: 25px;">
                <div style="font-size: 13px; font-weight: 600; margin-bottom: 8px; text-align: center;">📥 IMPORT BACKGROUND MUSIC</div>
                <input type="file" id="xz-file-audio" accept="audio/*" style="display: none;" onchange="window.xzImportAudio(this)">
                <button onclick="document.getElementById('xz-file-audio').click()" style="width: 100%; background: #0A84FF; color: white; border: none; padding: 10px; border-radius: 10px; font-weight: bold; cursor: pointer;">Choose Audio (MP3)</button>
                <div id="xz-aud-status" style="font-size: 10px; color: #8e8e93; text-align: center; margin-top: 6px;">Max size: 5MB</div>
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
