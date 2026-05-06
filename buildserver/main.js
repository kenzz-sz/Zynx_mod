(async function() {
  window.whitelistversion = [
  // below that there is no server config variable
  "1.4"
]

  window.agfgfgfgdjkd = function(){
   document.documentElement.innerHTML = `
    <head>
        <title>Repair</title>
    </head>
    <body>
        The main core server is currently being upgraded to Zynx 1.4. Please be patient. The server will reopen on May 6, 2026.
    </body>
    `;
}
   agfgfgfgdjkd()
  window.buildinmods = [
    {
  "directory": "full-screen-fade",
  "display": "Fade In",
  "description": "Build In",
  "icon": "🌑",
  "code": "const fadeOverlay = document.createElement('div'); Object.assign(fadeOverlay.style, { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black', zIndex: '999999', transition: 'opacity 2s ease', opacity: '1' }); document.body.appendChild(fadeOverlay); setTimeout(() => { fadeOverlay.style.opacity = '0'; setTimeout(() => fadeOverlay.remove(), 2000); }, 500);"
}
]
  window.addmods = function(){
  buildinmods.forEach(ig => {
installedmods = installedmods.filter(m => m.directory !== ig.directory);
    installedmods.push(ig)
eval((installedmods.find(i => i.directory === ig.directory)).code)
})}
  addmods()
})();

