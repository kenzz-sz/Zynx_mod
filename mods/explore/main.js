(function(){
const versionusefeature = {
    "1.0": [],
    "1.1": [],
    "1.2": [],
    "1.3": [
        "mods"
    ],
    "1.3.1": [
        "modsconfig",
        "mods"
    ],
    "1.4": [
        "modsconfig",
        "mods"
    ]
};

// Ambil versi sistem bawaan Zynx OS
const currentVersion = (typeof configserver !== 'undefined' ? configserver.version : "1.0"); 

// FUNGSI PEMBANTU UNTUK CEK DUKUNGAN FITUR
function isModSupported(mod) {
    if (!mod || !mod["using-features"] || !Array.isArray(mod["using-features"])) {
        return true; 
    }
    const supportedFeatures = versionusefeature[currentVersion] || [];
    return mod["using-features"].every(feature => supportedFeatures.includes(feature));
}

let listmodsexplore = [];
let detectbuglist = [{"value":"viruslockxDizz"}];

window.createui = async function(){
    try {
        // Ambil data repository online
        const rawData = await fh("https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/explore/mods.json");
        listmodsexplore = JSON.parse(rawData);
    } catch (err) {
        console.error("📋 Gagal memuat data mod dari server:", err);
        listmodsexplore = [];
    }

    const maint = document.getElementById("app-container");
    if (!maint) return;

    // SOLUSI: Menggunakan insertAdjacentHTML agar tidak merusak event listener bawaan Zynx OS
    const scenesHTML = `
        <div id="scene-explore-mods" class="panel">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                    <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                </span>
                <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">EXPLORE - MODS</h2>
            </div>
            <input class="zynx" placeholder="Search..." id="input-text-mods-explore" oninput="window.ref()">
            <div style="max-height: 500px; overflow-y: scroll;">
                <div id="AXdivexploremods"></div>
            </div>
        </div>

        <div id="scene-explore-credit" class="panel">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                    <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                </span>
                <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">CREDIT</h2>
            </div>
            <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
                <p><h1>EXPLORE</h1></p>
                <p style="margin-top: -22px; opacity: 0.6; font-size: 12px;">Exploring</p>
            </div><br>
            <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
                <p style="font-size: 14px;">[ CHANGELOG v1 ]</p>
                <p style="margin-top: -14px; opacity: 0.6; font-size: 11px; line-height:1.4;">
                - Fix Downloader In Mods<br>- Fixed UI exceeding limit bug for Zynx 1.3+ versions 
                </p>
            </div>
        </div>
        
        <div id="scene-explore-globalid" class="panel">
            <div style="display: flex; align-items: center; margin-bottom: 20px;">
                <span onclick="App.changeScene('scene-dashboard')" style="color: #0A84FF; font-size: 16px; cursor: pointer; display: flex; align-items: center;">
                    <span style="font-size: 20px; margin-right: 5px;">‹</span> Back
                </span>
                <h2 style="margin: 0; font-size: 20px; text-align: center; flex-grow: 1; padding-right: 40px;">GLOBAL ID</h2>
            </div>
            <div>
                <input id="exploreglobalidinput" class="zynx" placeholder="Input Id Here">
                <button class="btn-primary" onclick="
                    (async function(){
                        const tggs = document.getElementById('exploreglobalidinput');
                        const hrs = JSON.parse(await fh('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/explore/globalid.json'));
                        const tffs = hrs.find(il => il['id'] === tggs.value);
                        if(tffs){
                            document.getElementById('ddddexplore').innerHTML = tffs.innerhtml;
                        }
                    })()
                ">ENTER</button>
            </div><br>
            <div style="background: rgba(0,0,0,0.3); border-radius: 16px; padding: 20px; text-align: center; border: 1px dashed rgba(255,255,255,0.2);">
                <div id="ddddexplore">-</div>
            </div>
        </div>
    `;
    maint.insertAdjacentHTML('beforeend', scenesHTML);
    
    // Daftarkan ke Navigasi Dashboard
    const rc = document.getElementById("consdash");
    if (rc) {
        const cat = document.createElement("div");
        cat.innerHTML = `
            <div class="category" id="Axexport">
                <div class="cat-header" onclick="App.toggleCategory('Axexport')">
                    <div><span class="cat-icon">🌐</span> EXPLORE</div>
                    <div class="cat-chevron">▶</div>
                </div>
                <div class="cat-content">
                    <div class="cat-inner">
                        <div class="feature-item" onclick="App.changeScene('scene-explore-mods')">
                            <span>Mods</span> <span style="color: #0A84FF;">Open</span>
                        </div>
                        <div class="feature-item" onclick="App.changeScene('scene-explore-globalid')">
                            <span>Global ID</span> <span style="color: #0A84FF;">Open</span>
                        </div>
                        <div class="feature-item" onclick="App.changeScene('scene-explore-credit')">
                            <span>Credit</span> <span style="color: #0A84FF;">Open</span>
                        </div>
                    </div>
                </div>
            </div>`;
        rc.appendChild(cat);
    }

    // Langsung render list mod setelah elemen HTML siap dibuat
    window.ref();
};
 
window.ref = function() {
    const mvin = document.getElementById("AXdivexploremods");
    if (!mvin) return;
    mvin.innerHTML = "";
    
    let unsupportmods = 0; 
    let HTMLContent = ""; 

    // AMAN: Validasi keberadaan input search box sebelum di konversi ke toLowerCase()
    const searchInput = document.getElementById("input-text-mods-explore");
    const cvalexplore = searchInput ? searchInput.value.toLowerCase() : "";

    listmodsexplore.forEach((i, index) => {
        if (!isModSupported(i)) {
            unsupportmods++;
            return; 
        }

        // AMAN: Proteksi konversi string nama mod
        const namaMod = String(i.display || i.name || "No Display name");
        if (!namaMod.toLowerCase().includes(cvalexplore)) return;

        // Cek status instalasi mod di database lokal
        const exists = (typeof installedmods !== 'undefined') ? installedmods.find(m => m.directory === i.directory) : false;
        const btnText = exists ? "🔄 Re-install" : "📥 Download";
        const idthisvalue = "cat-" + i.directory + "-modsvalueid-explore-mods";
        
        HTMLContent += `
            <div class="category" id="${idthisvalue}">
                <div class="cat-header" onclick="App.toggleCategory('${idthisvalue}')">
                    <div style="white-space: nowrap; overflow-x: scroll;">
                        <span class="cat-icon">${i.icon || "📦"}</span>
                        <span class="allowselect" style="color: #ffffff">${namaMod}</span> 
                    </div>
                </div>
                <div class="cat-content">
                    <div class="cat-inner">
                        <p style="font-size:12px; opacity:0.6; margin-bottom:10px;">
                            ${i.descripsion || i.description || 'No description'}
                        </p>
                        <div class="feature-item">
                            <button class="btn-primary" onclick="window.handlePushMod(${index})" style="margin-top: -5px; padding: 6px 14px; border-radius:8px;">
                                ${btnText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
    });
    
    if (unsupportmods > 0) {
        const warningNotice = `<div style="background: rgba(255,59,48,0.15); color: #ff453a; border-radius: 12px; padding: 12px; text-align: center; font-size:12px; border: 1px solid rgba(255,59,48,0.3);" class="allowslidetext">⚠️ ${unsupportmods} Mods hidden due to incompatibility with your current Zynx OS version.</div><br>`;
        mvin.innerHTML = warningNotice + HTMLContent;
    } else {
        mvin.innerHTML = HTMLContent;
    }
};

window.detectbug = function() {
    if (typeof installedmods !== 'undefined') {
        detectbuglist.forEach(i => {
            installedmods = installedmods.filter(m => m.directory !== i.value);
        });
    }
    // Sinkronkan ulang isi list mod setelah filter bug selesai
    window.ref();
};

window.handlePushMod = function(index) {
    const modData = listmodsexplore[index];
    if (!modData) return;

    if (typeof pushmods === 'function') {
        // Jalankan perintah download core OS
        pushmods(JSON.stringify(modData));

        // Sinkronisasi status terunduh ke array local database jika belum masuk otomatis
        if (typeof installedmods !== 'undefined') {
            const isExist = installedmods.some(m => m.directory === modData.directory);
            if (!isExist) {
                installedmods.push(modData);
            }
        }

        // RE-RENDER: Segarkan tampilan UI agar tombol langsung berubah jadi "Re-install"
        window.ref();
        console.log(`Successfully pushed mod: ${modData.display}`);
    } else {
        alert("❌ Error: Core function 'pushmods' not found in this OS!");
    }
};

// Eksekusi inisialisasi awal
setTimeout(() => {
    createui();
    detectbug();
}, 400);

})();
