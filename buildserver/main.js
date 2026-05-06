/* =========================================
   ZYNX LOCK SYSTEM - INTEGRATED
   ========================================= */
(function() {
    // 1. Tentukan Waktu Target (7 Mei 2026, Jam 08:00 AM)
    const targetDate = new Date("May 7, 2026 08:00:00").getTime();

    window.checkServerStatus = function() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Jika waktu belum sampai, buat Overlay Pengunci
        if (distance > 0) {
            renderLockScreen();
            startLockTimer();
        }
    };

    function renderLockScreen() {
        // Buat elemen overlay agar tidak merusak elemen OS yang sudah ada
        const lockOverlay = document.createElement('div');
        lockOverlay.id = "zynx-lock-overlay";
        Object.assign(lockOverlay.style, {
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundColor: '#0a0a0a',
            color: 'white',
            zIndex: '1000000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '30px',
            textAlign: 'center',
            fontFamily: 'sans-serif'
        });

        lockOverlay.innerHTML = `
            <h2 style="letter-spacing:2px; margin-bottom:10px;">ZYNX SERVER MESSAGE</h2>
            <div style="background:rgba(255,255,255,0.05); padding:20px; border-radius:20px; border:1px solid rgba(255,255,255,0.1); max-width:300px;">
                <p style="font-size:14px; opacity:0.8; line-height:1.6;">
                    
            Hello this is a message from the zynx server!.<br><br>
Sorry for locking this app, but this is a test for zynx version 1.3.1, in that version there will be performance improvements, and additional features for mod makers. <br><br>
If the time has run out but it hasn't opened yet, please wait a few minutes or a few hours, because the moderators from Zynx are busy developing new features for Zynx version 1.3.1! 
Please wait until May 7, 2026!.
                </p>
                <div style="margin-top:20px; font-family:monospace; font-size:18px; color:#0A84FF;">
                    Time Left:<br>
                    [ <span id="jssstextstopwatch">--/--/--/--</span> ]
                </div>
            </div>
            <p style="margin-top:20px; font-size:10px; opacity:0.4;">v1.3.1 MAINTENANCE MODE</p>
        `;
        document.body.appendChild(lockOverlay);
    }

    function startLockTimer() {
        const timerInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;
            const el = document.getElementById("jssstextstopwatch");

            if (!el) return;

            if (distance <= 0) {
                el.innerHTML = "00d, 00h, 00m, 00s";
                clearInterval(timerInterval);
                
                // Animasi menghilang saat selesai
                const overlay = document.getElementById("zynx-lock-overlay");
                overlay.style.transition = "opacity 1s ease";
                overlay.style.opacity = "0";
                setTimeout(() => {
                    overlay.remove();
                    // Panggil fungsi restart atau rapp kamu
                    if(typeof rapp === 'function') rapp();
                }, 1000);
                return;
            }

            const d = Math.floor(distance / (1000 * 60 * 60 * 24));
            const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((distance % (1000 * 60)) / 1000);

            const pad = (n) => n.toString().padStart(2, '0');
            el.innerHTML = pad(d) + "d, " + pad(h) + "h, " + pad(m) + "m, " + pad(s) + "s";
        }, 1000);
    }

    // Jalankan pengecekan saat script dimuat
    window.checkServerStatus();
})();
