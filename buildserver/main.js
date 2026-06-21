
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
    const jsonax = jsonx.find(i => i.downloadsupport === (configserver.version || "1.3"));
    const jsonay = jsonx.find(i => i.version === (configserver.version  || "1.3"));
    
    if(jsonax){
        document.getElementById("title-checkupdate").innerHTML = jsonax.title;
        
        // Calculate and display relative time ago
        const releaseTime = jsonax.date ? `<div style="font-size: 11px; color: #8b949e; margin-bottom: 8px; font-weight: normal; border-bottom: 1px dashed rgba(255,255,255,0.1); padding-bottom: 4px;">🕒 ${getTimeAgo(jsonax.date)}</div>` : '';
        document.getElementById("decs-checkupdate").innerHTML = releaseTime + jsonax.desc;
        
        if(jsonax.comingsoon === true){
            document.getElementById("updav").style.backgroundColor = "yellow";
            document.getElementById("updavtxt").innerText = "Coming Soon";
            document.getElementById("update-checkupdate").style.display = "none";
        } else {
            document.getElementById("updav").style.backgroundColor = "#238636"; 
            document.getElementById("updavtxt").innerText = "Update Available";
            document.getElementById("update-checkupdate").style.display = "block"; 
            
            // PERBAIKAN: Set lebar penuh (100%), hilangkan teks patah, dan beri transisi halus
            document.getElementById("update-checkupdate").outerHTML = `
              <a href="${jsonax.urldownload}" target="_blank" style="text-decoration: none; width: 100%; display: block; margin-top: 20px;">
               <button id="update-checkupdate" style="width: 100%; background: #ffffff !important; color: #121218 !important; border: none !important; border-radius: 16px !important; padding: 14px !important; font-weight: 700; font-size: 13px; letter-spacing: 0.5px; cursor: pointer; transition: transform 0.2s ease, opacity 0.2s ease; white-space: nowrap;" 
                       onmouseover="this.style.opacity='0.85'" 
                       onmouseout="this.style.opacity='1'"
                       onmousedown="this.style.transform='scale(0.97)'"
                       onmouseup="this.style.transform='scale(1)'">
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
