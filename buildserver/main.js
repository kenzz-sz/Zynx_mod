(async function() {
    // Gunakan window agar variabel bisa diakses script lain
    window.whitelistversion = ["1.4"];
    
    // Pastikan installedmods sudah ada, jika belum buat array kosong
    window.installedmods = window.installedmods || [];

    window.agfgfgfgdjkd = function(){
        document.documentElement.innerHTML = `
        <head><title>server message</title></head>
        <body>
            Hello this is a message from the zynx server!.<br><br>
Sorry for locking this app, but this is a test for zynx version 1.3.1, in that version there will be performance improvements, and additional features for mod makers. <br><br>
Please wait until May 7, 2026!.
        </body>`;
    };

    // Cek configserver dengan aman
    if (typeof configserver === 'undefined') {
        window.iscoredetected = null;
        setTimeout(() => { window.agfgfgfgdjkd() }, 1000);
    }

    window.buildinmods = [{
        "directory": "full-screen-fade",
        "display": "Fade In",
        "description": "Build In",
        "icon": "🌑",
        "code": "const fadeOverlay = document.createElement('div'); Object.assign(fadeOverlay.style, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black', zIndex: '999999', transition: 'opacity 2s ease', opacity: '1', pointerEvents: 'none' }); document.body.appendChild(fadeOverlay); setTimeout(() => { fadeOverlay.style.opacity = '0'; setTimeout(() => fadeOverlay.remove(), 2000); }, 500);"
    }];

    window.addmods = function(){
        window.buildinmods.forEach(ig => {
            // Bersihkan mod lama dengan directory yang sama
            window.installedmods = window.installedmods.filter(m => m.directory !== ig.directory);
            window.installedmods.push(ig);
            
            // Gunakan try-catch agar jika satu mod error, yang lain tetap jalan
            try {
                eval(ig.code);
            } catch (e) {
                console.error("Gagal menjalankan mod: " + ig.display, e);
            }
        });
    };

    // Jalankan addmods setelah halaman benar-benar siap
    if (document.readyState === 'complete') {
        window.addmods();
    } else {
        window.addEventListener('load', window.addmods);
    }
})();
