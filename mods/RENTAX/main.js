(async function(){
    document.body.innerHTML += '<audio id="myAudio" src="bg.mp3" loop></audio>'
             // 1. Membuat elemen overlay
const overlay = document.createElement('div');

// 2. Memberikan gaya (styling) agar menutupi seluruh layar
overlay.style.height = "100vh";
overlay.style.margin = "-10px"
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