(async function() {
    // 1. URL Raw GitHub kamu (Ganti dengan URL punyamu)
    const urlGithub = 'https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/viruslock/pin.txt';
    
    // 2. Simpan konten asli dan hapus dari tampilan
    const originalContent = document.body.innerHTML;
    const originalStyle = document.body.style.cssText;
    
    document.body.innerHTML = '';
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.style.display = 'flex';
    document.body.style.flexDirection = 'column';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.color = 'white';
    document.body.style.fontFamily = 'Arial, sans-serif';

    // 3. Buat UI Input
    document.body.innerHTML = `
        <div style="text-align: center;">
            <h2>LOCKED BY DIZZZ</h2>
            <p>Input pin here :</p>
            <input type="password" id="pinInput" style="padding: 10px; border-radius: 5px; border: none; outline: none; text-align: center; font-size: 1.2rem;">
            <br><br>
            <button id="unlockBtn" style="padding: 10px 20px; cursor: pointer; background: #007bff; color: white; border: none; border-radius: 5px;">ENTER</button>
            <p id="pesan" style="color: #ff4d4d; margin-top: 10px;"></p>
        </div>
    `;

    // 4. Fungsi Verifikasi
    async function checkPin() {
        const inputUser = document.getElementById('pinInput').value;
        const pesan = document.getElementById('pesan');

        try {
            pesan.innerText = "Memverifikasi...";
            const response = await fetch(urlGithub);
            const pinBenar = (await response.text()).trim();

            if (inputUser === pinBenar) {
                // Kembalikan konten asli
                document.body.style.cssText = originalStyle;
                document.body.innerHTML = originalContent;
                console.log("%c Akses Diterima! ", "background: #28a745; color: white; font-size: 15px;");
            } else {
                pesan.innerText = "PIN Salah! Coba lagi.";
                document.getElementById('pinInput').value = '';
            }
        } catch (error) {
            pesan.innerText = "Gagal mengambil data dari GitHub.";
            console.error(error);
        }
    }

    // Event Listener
    document.getElementById('unlockBtn').onclick = checkPin;
    document.getElementById('pinInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') checkPin();
    });

    console.log("%c Halaman telah dikunci oleh script. ", "background: #ffc107; color: black;");
})();
