document.getElementById('scene-dashboard').insertAdjacentHTML('afterbegin', '<video style="border-radius: 18px;" width="300px" autoplay muted loop playsinline src="https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/dashboardvid.mp4"></video>');
let bgm = new Audio('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/backsound.mp3'); 
bgm.loop = true; 
const startSound = () => bgm.play().catch(() => {});
startSound(); 
document.addEventListener('click', startSound, { once: true });
document.body.style.backgroundImage = "url('https://raw.githubusercontent.com/kenzz-sz/Zynx_mod/refs/heads/main/mods/XZone/assets/wallpaper.jpg')"

window.createuixzone = async function(){
    const maint = document.getElementById("app-container")
    
 }
 