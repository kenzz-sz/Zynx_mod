let isLocked = true;
(async function() {
    // URL file lock.html di GitHub kamu
    const lockUrl = "https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/buildserver/lock.html";

    if (isLocked) {
        try {
            // Ambil kode HTML dari GitHub
            const response = await fetch(lockUrl);
            const htmlContent = await response.text();

            // Buat elemen iframe
            const lockIframe = document.createElement('iframe');
            lockIframe.id = "zynx-lock-iframe";
            
            // Styling agar iframe menutupi full layar tanpa celah
            Object.assign(lockIframe.style, {
                position: 'fixed',
                top: '0',
                left: '0',
                width: '100vw',
                height: '100vh',
                zIndex: '9999999', // Pastikan posisinya paling atas
                border: 'none',
                backgroundColor: '#121212' // Warna dasar saat loading
            });

            // Masukkan kode HTML yang diambil ke dalam iframe
            lockIframe.srcdoc = htmlContent;

            // Pasang ke body
            document.body.style.backgroundColor = "white";
           document.body.style.backgroundImage = "url()"
            document.body.style.color = "black";
            document.body.appendChild(lockIframe);

        } catch (error) {
            console.error("Gagal memuat sistem keamanan / Lock screen:", error);
        }
    }
})();
