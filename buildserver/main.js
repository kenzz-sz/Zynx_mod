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
    const json = JSON.parse(await fh("https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/buildserver/update.json"))
    const jsona = json.find(i => i.downloadsupport === configserver.version);
    if(jsona){
        document.getElementById("title-checkupdate").innerHTML = jsona.title;
        document.getElementById("decs-checkupdate").innerHTML = jsona.decs;
        document.getElementById("update-checkupdate").onclick = ("fetch('"+jsona.urldownload+"').then(r=>r.blob()).then(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='"+jsona.pkgname+"';a.click();});");
    }
})()