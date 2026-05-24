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
    // Mengambil data JSON dari GitHub
    const jsonx = JSON.parse(await fh("https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/buildserver/update.json"));
    const jsonax = jsonx.find(i => i.downloadsupport === configserver.version);
    const jsonay = jsonx.find(i => i.version === configserver.version);
    
    if(jsonax){
        document.getElementById("title-checkupdate").innerHTML = jsonax.title;
        document.getElementById("decs-checkupdate").innerHTML = jsonax.desc;
        
        if(jsonax.comingsoon === true){
            document.getElementById("updav").style.backgroundColor = "yellow";
            document.getElementById("updavtxt").innerText = "Coming Soon";
            document.getElementById("update-checkupdate").style.display = "none";
        } else {
            document.getElementById("updav").style.backgroundColor = "#238636"; 
            document.getElementById("updavtxt").innerText = "Update Available";
            document.getElementById("update-checkupdate").style.display = "block"; 
            
            // ==================== PERBAIKAN UNTUK APLIKASI HTML / WEBVIEW ====================
            document.getElementById("update-checkupdate").onclick = () => {
                try {
                    // Cari elemen <a> lawas agar tidak menumpuk di memori
                    const oldLink = document.getElementById('zynx-native-downloader');
                    if(oldLink) oldLink.remove();

                    // Buat element tautan fisik asli
                    const a = document.createElement('a');
                    a.id = 'zynx-native-downloader';
                    a.href = jsonax.urldownload;
                    
                    // Memaksa sistem aplikasi membuka browser luar atau memicu internal download manager
                    a.setAttribute('download', jsonax.pkgname || 'update.apk');
                    a.setAttribute('target', '_system'); 
                    a.setAttribute('rel', 'noopener noreferrer');
                    
                    // Sematkan gaya agar tidak merusak tata letak layar
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    
                    // Eksekusi klik fisik murni
                    a.click();
                } catch(err) {
                    // Failsafe jika klik fisik diblokir total oleh runtime internal: lempar langsung lewat window
                    window.open(jsonax.urldownload, '_system') || (window.location.href = jsonax.urldownload);
                }
            };
            // =================================================================================
        }
    }
    else {
        if(jsonay){
            document.getElementById("title-checkupdate").innerHTML = jsonay.title;
            document.getElementById("decs-checkupdate").innerHTML = jsonay.desc;
        }
        document.getElementById("updav").style.backgroundColor = "red";
        document.getElementById("updavtxt").innerText = "All Updated!";
        document.getElementById("update-checkupdate").style.display = "none";
    }
})();