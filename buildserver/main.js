/*let isLocked = true;

// Cek apakah configserver ada dan bernilai truthy
if (typeof configserver !== 'undefined' && configserver) {
    if(configserver.version === "1.3.1"){
    isLocked = false; 
    }
}

(async function() {
    const lockUrl = "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/buildserver/lock-2.html";

    // Jika sudah tidak terkunci, jangan jalankan kode di bawahnya
    if (!isLocked) return;

    try {
        const response = await fetch(lockUrl);
        const htmlContent = await response.text();

        const lockIframe = document.createElement('iframe');
        lockIframe.id = "zynx-lock-iframe";
        
        Object.assign(lockIframe.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            zIndex: '9999999',
            border: 'none',
            backgroundColor: '#121212'
        });

        lockIframe.srcdoc = htmlContent;

        document.body.style.backgroundColor = "white";
        document.body.style.backgroundImage = "url()";
        document.body.style.color = "black";
        document.body.appendChild(lockIframe);

    } catch (error) {
        console.error("Gagal memuat sistem keamanan:", error);
    }
})();
*/
(async function() {
    // === HELPER FUNCTION FOR COMPACT ENGLISH TIMELINE ===
    function getTimeAgo(dateStr) {
        if (!dateStr) return "";
        
        // Fallback if the JSON date is already plain text
        if (!dateStr.includes("/")) {
            return `Released: ${dateStr}`;
        }

        const parts = dateStr.split('/');
        if (parts.length < 5) return "";

        // Format: Day/Month/Year/Hour/Minute -> JS Month is 0-indexed
        const updateDate = new Date(parts[2], parts[1] - 1, parts[0], parts[3], parts[4]);
        const now = new Date();
        const diffMs = now - updateDate;

        // If the update date is set in the future
        if (diffMs < 0) {
            return "Coming soon";
        }

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        // Compact English formatting
        if (weeks > 0) return `${weeks} wk${weeks > 1 ? 's' : ''} ago`;
        if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
        if (hours > 0) return `${hours}h ago`;
        if (minutes > 0) return `${minutes}m ago`;
        if (seconds > 0) return `${seconds}s ago`;
        
        return "Just now";
    }

    // Fetching JSON data from GitHub
    const jsonx = JSON.parse(await fh("https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/buildserver/update.json"));
    const jsonax = jsonx.find(i => i.downloadsupport === configserver.version);
    const jsonay = jsonx.find(i => i.version === configserver.version);
    
    if(jsonax){
        document.getElementById("title-checkupdate").innerHTML = jsonax.title;
        
        // Calculate and display relative time ago
        const releaseTime = jsonax.date ? `<div style="font-size: 11px; color: #8b949e; margin-bottom: 8px; font-weight: normal; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 4px;">🕒 ${getTimeAgo(jsonax.date)}</div>` : '';
        document.getElementById("decs-checkupdate").innerHTML = releaseTime + jsonax.desc;
        
        if(jsonax.comingsoon === true){
            document.getElementById("updav").style.backgroundColor = "yellow";
            document.getElementById("updavtxt").innerText = "Coming Soon";
            document.getElementById("update-checkupdate").style.style.display = "none";
        } else {
            document.getElementById("updav").style.backgroundColor = "#238636"; 
            document.getElementById("updavtxt").innerText = "Update Available";
            document.getElementById("update-checkupdate").style.display = "block"; 
            
            document.getElementById("update-checkupdate").outerHTML = `
              <a href="${jsonax.urldownload}" target="_blank" style="text-decoration: none; flex: 2;">
               <button id="update-checkupdate" class="btn-primary" style="flex: 2; padding: 11px; background: white; color: black; border: none; border-radius: 10px; font-size: 13px; font-weight: 600; cursor: pointer; transition: background 0.2s; box-shadow: 0 4px 12px rgba(35, 134, 54, 0.2); width: 100%" onmouseover="this.style.background='white'" onmouseout="this.style.background='grey'">
                  DOWNLOAD PKG
                </button>
              </a>
            `;
        }
    }
    else {
        if(jsonay){
            document.getElementById("title-checkupdate").innerHTML = jsonay.title;
            
            const releaseTimeAy = jsonay.date ? `<div style="font-size: 11px; color: #8b949e; margin-bottom: 8px; font-weight: normal; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 4px;">🕒 ${getTimeAgo(jsonay.date)}</div>` : '';
            document.getElementById("decs-checkupdate").innerHTML = releaseTimeAy + jsonay.desc;
        } else {
            document.getElementById("title-checkupdate").innerHTML = "System Up to Date";
            document.getElementById("decs-checkupdate").innerHTML = "You are currently running the latest version of Zynx OS.";
        }
        
        document.getElementById("updav").style.backgroundColor = "red";
        document.getElementById("updavtxt").innerText = "All Updated!";
        document.getElementById("update-checkupdate").style.display = "none";
    }
})();
