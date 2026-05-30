(function () {
    /* ==========================================
       1. DATA KONFIGURASI
       ========================================== */
    const menuConfig = [
        {
            "type": "cat",
            "name": "🧾 Website",
            "value": [
                {
                    "type": "button",
                    "name": "♟️ open console",
                    "js": "if(confirm('[ want to open console? ]')){(function () { var script = document.createElement('script'); script.src='//cdn.jsdelivr.net/npm/eruda'; document.body.appendChild(script); script.onload = function () { eruda.init() } })();}"
                },
                {
                    "type": "cat",
                    "name": "📂 MAIN HTML",
                    "value": [
                        {
    "type": "cat",
    "name": "🖼️ Image Scraper",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="img-scraper-container">
                    <button class="widget-btn" style="margin: 0 0 12px 0; background: var(--widget-brand); color: white; text-align: center;" onclick="
                        (function() {
                            const gallery = document.getElementById('img-gallery-root');
                            gallery.innerHTML = '';
                            const images = document.querySelectorAll('img');
                            
                            if (images.length === 0) {
                                gallery.innerHTML = '';
                                return;
                            }
                            
                            images.forEach((img, index) => {
                                const srcUrl = img.src;
                                if (!srcUrl) return;
                                
                                const card = document.createElement('div');
                                card.className = 'img-item-card';
                                
                                const pBox = document.createElement('div');
                                pBox.className = 'img-preview-box';
                                const pImg = document.createElement('img');
                                pImg.src = srcUrl;
                                pBox.appendChild(pImg);
                                
                                const iBox = document.createElement('div');
                                iBox.className = 'img-info-box';
                                
                                const idx = document.createElement('span');
                                idx.className = 'img-index';
                                idx.innerText = '#' + (index + 1);
                                
                                const inp = document.createElement('input');
                                inp.type = 'text';
                                inp.className = 'img-url-input';
                                inp.value = srcUrl;
                                inp.readOnly = true;
                                inp.onclick = function() { this.select(); };
                                
                                const btn = document.createElement('button');
                                btn.className = 'img-copy-btn';
                                btn.innerText = 'Copy URL';
                                btn.onclick = function() {
                                    navigator.clipboard.writeText(srcUrl);
                                    
                                };
                                
                                iBox.appendChild(idx);
                                iBox.appendChild(inp);
                                iBox.appendChild(btn);
                                
                                card.appendChild(pBox);
                                card.appendChild(iBox);
                                gallery.appendChild(card);
                            });
                        })();
                    ">🔍 Scan the Image on This Page</button>
                    
                    <div id="img-gallery-root" class="img-gallery-grid">
</div>
                </div>

                <style>
                    .img-scraper-container {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    .img-gallery-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                        gap: 12px;
                        max-height: 300px;
                        overflow-y: auto;
                        padding: 4px;
                    }
                    .img-item-card {
                        background: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                    .img-preview-box {
                        width: 100%;
                        height: 100px;
                        background: #f3f4f6;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }
                    .img-preview-box img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                    .img-info-box {
                        padding: 8px;
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        background: #f9fafb;
                        border-top: 1px solid #e5e7eb;
                    }
                    .img-index {
                        font-size: 11px;
                        font-weight: bold;
                        color: #9ca3af;
                    }
                    .img-url-input {
                        width: 100%;
                        font-size: 10px;
                        padding: 4px;
                        border: 1px solid #d1d5db;
                        border-radius: 4px;
                        background: #fff;
                        color: #374151;
                        box-sizing: border-box;
                        text-overflow: ellipsis;
                    }
                    .img-copy-btn {
                        background: #f3f4f6;
                        border: 1px solid #d1d5db;
                        color: #374151;
                        font-size: 11px;
                        font-weight: 600;
                        padding: 4px;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background 0.2s;
                    }
                    .img-copy-btn:hover {
                        background: #e5e7eb;
                    }
                </style>
            `
        }
    ]
},
{
    "type": "cat",
    "name": "🎥 Video Scraper",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="video-scraper-container">
                    <button class="widget-btn" style="margin: 0 0 12px 0; background: var(--widget-brand); color: white; text-align: center;" onclick="
                        (function() {
                            const gallery = document.getElementById('video-gallery-root');
                            gallery.innerHTML = '';
                            const videos = document.querySelectorAll('video');
                            
                            if (videos.length === 0) {
                                gallery.innerHTML = '';
                                return;
                            }
                            
                            videos.forEach((vid, index) => {
                                /* Mencari source video jika atribut src di tag video kosong */
                                let srcUrl = vid.src;
                                if (!srcUrl) {
                                    const sourceEl = vid.querySelector('source');
                                    if (sourceEl) srcUrl = sourceEl.src;
                                }
                                
                                if (!srcUrl) return;
                                
                                const card = document.createElement('div');
                                card.className = 'video-item-card';
                                
                                const pBox = document.createElement('div');
                                pBox.className = 'video-preview-box';
                                
                                /* Membuat element video kecil untuk preview */
                                const pVid = document.createElement('video');
                                pVid.src = srcUrl;
                                pVid.autoplay = false;
                                pVid.controls = true;
                                pVid.muted = false;
                                pVid.preload = 'metadata';
                                pBox.appendChild(pVid);
                                
                                const iBox = document.createElement('div');
                                iBox.className = 'video-info-box';
                                
                                const idx = document.createElement('span');
                                idx.className = 'video-index';
                                idx.innerText = '#' + (index + 1);
                                
                                const inp = document.createElement('input');
                                inp.type = 'text';
                                inp.className = 'video-url-input';
                                inp.value = srcUrl;
                                inp.readOnly = true;
                                inp.onclick = function() { this.select(); };
                                
                                const btn = document.createElement('button');
                                btn.className = 'video-copy-btn';
                                btn.innerText = 'Copy URL';
                                
                                const currentIdx = index + 1;
                                btn.onclick = function() {
                                    navigator.clipboard.writeText(srcUrl);
                                    alert('URL Video #' + currentIdx + ' berhasil disalin!');
                                };
                                
                                iBox.appendChild(idx);
                                iBox.appendChild(inp);
                                iBox.appendChild(btn);
                                
                                card.appendChild(pBox);
                                card.appendChild(iBox);
                                gallery.appendChild(card);
                            });
                        })();
                    ">🔍 Scan the Video on This Page</button>
                    
                    <div id="video-gallery-root" class="video-gallery-grid">
                        
                    </div>
                </div>

                <style>
                    .video-scraper-container {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    .video-gallery-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
                        gap: 12px;
                        max-height: 300px;
                        overflow-y: auto;
                        padding: 4px;
                    }
                    .video-item-card {
                        background: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                    .video-preview-box {
                        width: 100%;
                        height: 100px;
                        background: #f3f4f6;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }
                    .video-preview-box video {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                        background: #000;
                    }
                    .video-info-box {
                        padding: 8px;
                        display: flex;
                        flex-direction: column;
                        gap: 4px;
                        background: #f9fafb;
                        border-top: 1px solid #e5e7eb;
                    }
                    .video-index {
                        font-size: 11px;
                        font-weight: bold;
                        color: #9ca3af;
                    }
                    .video-url-input {
                        width: 100%;
                        font-size: 10px;
                        padding: 4px;
                        border: 1px solid #d1d5db;
                        border-radius: 4px;
                        background: #fff;
                        color: #374151;
                        box-sizing: border-box;
                        text-overflow: ellipsis;
                    }
                    .video-copy-btn {
                        background: #f3f4f6;
                        border: 1px solid #d1d5db;
                        color: #374151;
                        font-size: 11px;
                        font-weight: 600;
                        padding: 4px;
                        border-radius: 4px;
                        cursor: pointer;
                        transition: background 0.2s;
                    }
                    .video-copy-btn:hover {
                        background: #e5e7eb;
                    }
                </style>
            `
        }
    ]
},
{
    "type": "cat",
    "name": "💻 Source Code (HTML Copier)",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="html-copier-container">
                    <button class="widget-btn" style="margin: 0 0 12px 0; background: var(--widget-brand); color: white; text-align: center;" onclick="
                        (function() {
                            const root = document.getElementById('html-copier-root');
                            root.innerHTML = '';
                            
                            /* Get the entire HTML code from the current page */
                            const currentHtml = document.documentElement.outerHTML;
                            
                            const box = document.createElement('div');
                            box.className = 'html-view-box';
                            
                            const txt = document.createElement('textarea');
                            txt.className = 'html-textarea';
                            txt.value = currentHtml;
                            txt.readOnly = true;
                            txt.onclick = function() { this.select(); };
                            
                            const btn = document.createElement('button');
                            btn.className = 'widget-btn';
                            btn.style.margin = '8px 0 0 0';
                            btn.style.background = '#10b981';
                            btn.style.color = '#ffffff';
                            btn.style.textAlign = 'center';
                            btn.innerText = '📋 Copy All HTML Code';
                            btn.onclick = function() {
                                txt.select();
                                navigator.clipboard.writeText(currentHtml);
                                alert('Entire HTML source code copied successfully!');
                            };
                            
                            box.appendChild(txt);
                            box.appendChild(btn);
                            root.appendChild(box);
                        })();
                    ">🔍 Get HTML Source Code</button>
                    
                    <div id="html-copier-root">
                        <span style="display: block; width: 100%; font-size: 13px; color: #9ca3af; text-align: center; margin: 10px 0;">Click the button above to load the source code</span>
                    </div>
                </div>

                <style>
                    .html-copier-container {
                        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    .html-view-box {
                        background: #ffffff;
                        border: 1px solid #e5e7eb;
                        border-radius: 8px;
                        padding: 10px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }
                    .html-textarea {
                        width: 100%;
                        height: 200px;
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 11px;
                        padding: 8px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        background: #f9fafb;
                        color: #1f2937;
                        resize: vertical;
                        box-sizing: border-box;
                    }
                </style>
            `
        }
    ]
}

            ]
        }
    ]
        },
        {
            "type": "cat",
            "name": "🔗 JavaScript",
            "value": [
                {
    "type": "cat",
    "name": "🌐 Fetch",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="fetch-scraper-container">
                    <p style="font-size: 12px; color: #4b5563; margin: 0 0 8px 0;">Input URL:</p>
                    <input type="text" id="fetch-url-input" class="fetch-input" placeholder="https://..." />
                    
                    <button class="widget-btn" style="margin-top: 8px; background: var(--widget-brand); color: white; text-align: center;" onclick="
                        (async function() {
                            const urlStr = document.getElementById('fetch-url-input').value.trim();
                            const resultBox = document.getElementById('fetch-result-box');
                            const textArea = document.getElementById('fetch-textarea');
                            const imgPreview = document.getElementById('fetch-img-preview');
                            const actionBtns = document.getElementById('fetch-action-btns');
                            
                            if (!urlStr) return; 
                            
                            textArea.style.display = 'block';
                            imgPreview.style.display = 'none';
                            actionBtns.style.display = 'flex';
                            textArea.value = '⏳ Fetching data...';
                            resultBox.style.display = 'block';
                            
                            try {
                                const response = await fetch(urlStr);
                                if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
                                
                                const contentType = response.headers.get('content-type') || '';
                                
                                const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.ico', '.bmp'];
                                const urlLower = urlStr.toLowerCase();
                                const isImageUrl = imageExtensions.some(ext => urlLower.includes(ext));
                                
                                if (contentType.startsWith('image/') || isImageUrl) {
                                    const blob = await response.blob();
                                    const imageBlob = new Blob([blob], { type: contentType.startsWith('image/') ? contentType : 'image/jpeg' });
                                    
                                    /* Mengganti URL.createObjectURL dengan FileReader (Base64) */
                                    const reader = new FileReader();
                                    reader.onloadend = function() {
                                        imgPreview.src = reader.result; /* Hasil Base64 */
                                        imgPreview.style.display = 'block';
                                        textArea.style.display = 'none';
                                        actionBtns.style.display = 'none';
                                    };
                                    reader.onerror = function() {
                                        throw new Error('Failed to read image blob as Base64');
                                    };
                                    reader.readAsDataURL(imageBlob);
                                    
                                } else {
                                    const text = await response.text();
                                    textArea.value = text;
                                    imgPreview.style.display = 'none';
                                    textArea.style.display = 'block';
                                    actionBtns.style.display = 'flex';
                                }
                            } catch (e) {
                                textArea.style.display = 'block';
                                imgPreview.style.display = 'none';
                                actionBtns.style.display = 'flex';
                                textArea.value = '❌ Failed to retrieve data\\n\\n' + e.toString() + '\\n\\n(Note: Make sure the URL is valid and the destination server supports CORS.)';
                            }
                        })();
                    ">📥 Fetch Data</button>

                    <div id="fetch-result-box" style="display: none; margin-top: 12px; border-top: 1px solid #e5e7eb; padding-top: 12px;">
                        <span style="font-size: 12px; font-weight: bold; margin-bottom: 6px; display: block;">Result:</span>
                        
                        <textarea id="fetch-textarea" class="fetch-textarea"></textarea>
                        
                        <div style="text-align: center;">
                            <img id="fetch-img-preview" style="display: none; max-width: 100%; border-radius: 6px; border: 1px solid #d1d5db; margin: 0 auto;" />
                        </div>
                        
                        <div id="fetch-action-btns" style="display: flex; gap: 8px; margin-top: 8px;">
                            <button class="widget-btn" style="flex: 1; background: #10b981; color: white; text-align: center;" onclick="
                                (function() {
                                    const code = document.getElementById('fetch-textarea').value;
                                    if (!code || code.includes('❌ Failed') || code.includes('⏳ Fetching')) {
                                        alert('No valid code to execute!');
                                        return;
                                    }
                                    
                                    try {
                                        window.eval(code);
                                        alert('✅ JavaScript executed successfully!');
                                    } catch (e) {
                                        alert('⚠️ Error:\\n' + e.message);
                                    }
                                })();
                            ">▶️ Run as JS</button>
                            
                            <button class="widget-btn" style="flex: 1; background: #6b7280; color: white; text-align: center;" onclick="
                                (function() {
                                    const ta = document.getElementById('fetch-textarea');
                                    ta.select();
                                    navigator.clipboard.writeText(ta.value);
                                    alert('📋 Text copied successfully!');
                                })();
                            ">📋 Copy Text</button>
                        </div>
                    </div>
                </div>

                <style>
                    .fetch-scraper-container {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                    .fetch-input {
                        width: 100%;
                        font-size: 12px;
                        padding: 10px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        background: #f9fafb;
                        color: #1f2937;
                        box-sizing: border-box;
                        outline: none;
                        transition: border-color 0.2s;
                    }
                    .fetch-input:focus {
                        border-color: var(--widget-brand);
                    }
                    .fetch-textarea {
                        width: 100%;
                        height: 150px;
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 11px;
                        padding: 8px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        background: #ffffff;
                        color: #1f2937;
                        resize: vertical;
                        box-sizing: border-box;
                    }
                </style>
            `
        }
    ]
}
            ]
        }
    ]

    /* ==========================================
       2. INJEKSI CSS DENGAN ANIMASI KURVA BEZIER
       ========================================== */
    const styles = `
        :root {
            --widget-brand: #4f46e5;
            --widget-bg: #ffffff;
            --widget-text: #1f2937;
            /* Kurva animasi kustom (Eases) */
            --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
            --ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);
        }
        
        /* Bola Melayang */
        .floating-ball {
            position: fixed; width: 60px; height: 60px;
            background: linear-gradient(135deg, #6366f1, var(--widget-brand));
            color: white; border-radius: 50%; display: flex;
            align-items: center; justify-content: center; font-size: 24px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.25); cursor: grab;
            z-index: 999999; touch-action: none; user-select: none;
            transition: transform 0.4s var(--ease-bounce), opacity 0.3s ease;
        }
        /* Animasi saat bola menghilang/mengecil */
        .floating-ball.hidden {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
            pointer-events: none;
        }

        /* Menu Utama Fullscreen dengan Animasi Kurva */
        .fullscreen-menu {
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: var(--widget-bg); color: var(--widget-text);
            z-index: 1000000; display: flex; flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            box-sizing: border-box;
            
            /* Status Awal (Hidden) */
            opacity: 0;
            visibility: hidden;
            transform: scale(0.85);
            transform-origin: center;
            
            /* Transisi Smooth */
            transition: opacity 0.4s var(--ease-smooth),
                        transform 0.4s var(--ease-bounce),
                        visibility 0.4s;
        }
        /* Status Aktif (Terbuka) */
        .fullscreen-menu.active {
            opacity: 1;
            visibility: visible;
            transform: scale(1);
        }

            .menu-header {
                padding: 16px; background: var(--widget-brand); color: white;
                display: flex; justify-content: space-between; align-items: center;
                transition: background 0.3s ease;
            }
            .menu-header h3 { margin: 0; font-size: 18px; }
            .close-btn {
                background: rgba(255,255,255,0.2); border: none; color: white;
                padding: 8px 16px; border-radius: 20px; cursor: pointer; font-weight: bold;
            }

            /* Fitur Baru: Bar Pencarian / Filter */
            .search-container {
                padding: 10px 15px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb;
            }
            .search-input {
                width: 100%; padding: 10px; border: 1px solid #d1d5db; 
                border-radius: 8px; font-size: 14px; box-sizing: border-box;
                outline: none; transition: border-color 0.2s;
            }
            .search-input:focus { border-color: var(--widget-brand); }

            .menu-body { flex: 1; padding: 15px; overflow-y: auto; }

            /* Style Komponen */
            .widget-btn {
                width: 100%; padding: 12px; margin: 6px 0;
                background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px;
                text-align: left; font-size: 14px; font-weight: 500; cursor: pointer;
                transition: background 0.2s, transform 0.1s; color: #374151;
            }
            .widget-btn:active { transform: scale(0.98); }

            .widget-raw { margin: 8px 0; }

            /* ANIMASI BUKA/TUTUP KATEGORI */
            .category-container {
                border: 1px solid #e5e7eb; border-radius: 8px; margin: 8px 0;
                background: #ffffff; overflow: hidden; transition: all 0.3s var(--ease-smooth);
            }
            .category-header {
                padding: 14px; background: #f9fafb; font-weight: bold;
                font-size: 14px; cursor: pointer; display: flex;
                justify-content: space-between; align-items: center; user-select: none;
            }
            .category-header::after {
                content: '▼'; font-size: 10px; transition: transform 0.4s var(--ease-bounce); color: #9ca3af;
            }
            .category-container.open > .category-header::after {
                transform: rotate(-180deg);
            }
            
            /* Efek Akordion Kurva Mulus */
            .category-wrapper {
                display: grid; grid-template-rows: 0fr;
                transition: grid-template-rows 0.4s var(--ease-smooth);
            }
            .category-container.open > .category-wrapper {
                grid-template-rows: 1fr;
            }
            .category-content { min-height: 0; padding: 0 12px; }
        `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    /* ==========================================
       3. ELEMEN DASAR DOM (Ball & Menu)
       ========================================== */
    const ball = document.createElement("div");
    ball.className = "floating-ball";
    ball.innerHTML = "☰";
    ball.style.left = "20px"; ball.style.top = "75vh";
    document.body.appendChild(ball);

    const menu = document.createElement("div");
    menu.className = "fullscreen-menu";
    menu.innerHTML = `
        <div class="menu-header">
            <h3>Kenzz Module</h3>
            <button class="close-btn">Close</button>
        </div>
        <div class="search-container">
            <input type="text" class="search-input" id="widget-search" placeholder="🔍 Search for features or categories...">
        </div>
        <div class="menu-body" id="menu-root"></div>
    `;
    document.body.appendChild(menu);

    const menuRoot = menu.querySelector("#menu-root");

    /* ==========================================
       4. RECURSIVE ENGINE (Penerjemah JSON ke UI)
       ========================================== */
    function buildMenuStructure(configArray, targetContainer) {
        configArray.forEach(item => {
            if (item.type === "cat") {
                const catContainer = document.createElement("div");
                catContainer.className = "category-container";
                catContainer.setAttribute("data-search-target", item.name.toLowerCase());

                const catHeader = document.createElement("div");
                catHeader.className = "category-header";
                catHeader.innerText = item.name;

                const catWrapper = document.createElement("div");
                catWrapper.className = "category-wrapper";

                const catContent = document.createElement("div");
                catContent.className = "category-content";

                catHeader.addEventListener("click", (e) => {
                    e.stopPropagation();
                    catContainer.classList.toggle("open");
                });

                catWrapper.appendChild(catContent);
                catContainer.appendChild(catHeader);
                catContainer.appendChild(catWrapper);
                targetContainer.appendChild(catContainer);

                if (item.value && Array.isArray(item.value)) {
                    buildMenuStructure(item.value, catContent);
                }

            } else if (item.type === "button") {
                const btn = document.createElement("button");
                btn.className = "widget-btn";
                btn.innerText = item.name;
                btn.setAttribute("data-search-target", item.name.toLowerCase());
                btn.addEventListener("click", () => {
                    if (item.js) new Function(item.js)();
                });
                targetContainer.appendChild(btn);

            } else if (item.type === "raw") {
                const rawDiv = document.createElement("div");
                rawDiv.className = "widget-raw";
                rawDiv.innerHTML = item.html || "";
                targetContainer.appendChild(rawDiv);
            }
        });
    }

    buildMenuStructure(menuConfig, menuRoot);

    /* ==========================================
       5. LOGIKA PENCARIAN (LIVE FILTER)
       ========================================== */
    const searchInput = menu.querySelector("#widget-search");
    searchInput.addEventListener("input", function (e) {
        const keyword = e.target.value.toLowerCase();
        const items = menuRoot.querySelectorAll(".category-container, .widget-btn");

        items.forEach(item => {
            const text = item.getAttribute("data-search-target") || "";
            if (text.includes(keyword)) {
                item.style.display = "";
                /* Otomatis buka kategori jika sedang mencari sesuatu di dalamnya */
                if (keyword.length > 0 && item.classList.contains("category-container")) {
                    item.classList.add("open");
                }
            } else {
                item.style.display = "none";
            }
        });
    });

    /* ==========================================
       6. LOGIKA DRAG & DROP (HP & PC)
       ========================================== */
    let isDragging = false, hasMoved = false;
    let startX, startY, initialLeft, initialTop;

    function dragStart(e) {
        isDragging = true; hasMoved = false;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        startX = clientX; startY = clientY;
        initialLeft = parseInt(ball.style.left) || 0;
        initialTop = parseInt(ball.style.top) || 0;
    }

    function dragMove(e) {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaX = clientX - startX, deltaY = clientY - startY;

        if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) hasMoved = true;

        let newLeft = Math.max(0, Math.min(initialLeft + deltaX, window.innerWidth - ball.offsetWidth));
        let newTop = Math.max(0, Math.min(initialTop + deltaY, window.innerHeight - ball.offsetHeight));

        ball.style.left = `${newLeft}px`;
        ball.style.top = `${newTop}px`;
    }

    ball.addEventListener("mousedown", dragStart);
    document.addEventListener("mousemove", dragMove);
    document.addEventListener("mouseup", () => isDragging = false);

    ball.addEventListener("touchstart", dragStart, { passive: true });
    document.addEventListener("touchmove", dragMove, { passive: false });
    document.addEventListener("touchend", () => isDragging = false);

    /* ==========================================
       7. ANIMASI MINIMIZE / UNMINIMIZE (TRANSITION)
       ========================================== */
    ball.addEventListener("click", () => {
        if (hasMoved) return; /* Jika cuma geser bola, jangan buka menu */
        
        const rect = ball.getBoundingClientRect();
        menu.style.transformOrigin = `${rect.left + 30}px ${rect.top + 30}px`;
        
        ball.classList.add("hidden");
        setTimeout(() => {
            menu.classList.add("active");
        }, 50); /* Delay mikro agar transisinya sinkron */
    });

    menu.querySelector(".close-btn").addEventListener("click", () => {
        menu.classList.remove("active");
        
        setTimeout(() => {
            ball.classList.remove("hidden");
        }, 150); /* Munculkan bola melayang kembali setelah menu mulai mengecil */
    });

})();
