(async function(){
    document.body.innerHTML += '<audio id="myAudio" src="bg.mp3" loop></audio>'
             // 1. Membuat elemen overlay
const overlay = document.createElement('div');

// 2. Memberikan gaya (styling) agar menutupi seluruh layar
Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 1)', // Warna hitam transparan
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999', // Pastikan di atas elemen lain
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'opacity 0.5s ease'
});

// 3. Menambahkan konten teks ke dalam overlay
overlay.innerHTML = `
    <h1 style="margin-bottom: 20px;"></h1>
    <p>click anything to open </p>
`;

// 4. Menambahkan event listener untuk menghapus overlay saat diklik
overlay.addEventListener('click', () => {
    // Efek fade out sebelum dihapus
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        overlay.remove();
        console.log("Overlay dibuka!");
    }, 500); // Menunggu transisi selesai
});

// 5. Memasukkan elemen ke dalam body
document.body.appendChild(overlay);
function putarAudio() {
    const audio = document.getElementById('myAudio');
    audio.play().catch(error => {
    });
    // Hapus event listener setelah berhasil putar agar tidak bentrok
    document.removeEventListener('click', putarAudio);
  }

  // Jalankan saat user klik di mana saja di halaman
  document.addEventListener('click', putarAudio);
})()