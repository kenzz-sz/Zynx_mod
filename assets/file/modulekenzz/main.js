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
                    "name": "⚙️ Source",
                    "value": [
{
    "type": "cat",
    "name": "🖼️ Image Scraper",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="img-scraper-container">
                    <button class="is-scan-btn" onclick="
                        (function() {
                            const gallery = document.getElementById('img-gallery-root');
                            gallery.innerHTML = '';
                            const images = document.querySelectorAll('img');
                            
                            if (images.length === 0) {
                                gallery.innerHTML = '<div class=&quot;is-empty-state&quot;>🖼️ No image elements found on this page.</div>';
                                return;
                            }
                            
                            images.forEach((img, index) => {
                                const srcUrl = img.src;
                                if (!srcUrl) return;
                                
                                const card = document.createElement('div');
                                card.className = 'img-item-card';
                                
                                const pBox = document.createElement('div');
                                pBox.className = 'img-preview-box';
                                
                                /* Image with dynamic height */
                                const pImg = document.createElement('img');
                                pImg.src = srcUrl;
                                pImg.loading = 'lazy';
                                pBox.appendChild(pImg);
                                
                                const iBox = document.createElement('div');
                                iBox.className = 'img-info-box';
                                
                                const header = document.createElement('div');
                                header.className = 'img-card-header';
                                
                                const badge = document.createElement('span');
                                badge.className = 'img-badge';
                                badge.innerText = '🖼️ IMAGE';
                                
                                const idx = document.createElement('span');
                                idx.className = 'img-index';
                                idx.innerText = '#' + (index + 1);
                                
                                header.appendChild(badge);
                                header.appendChild(idx);
                                
                                const inp = document.createElement('input');
                                inp.type = 'text';
                                inp.className = 'img-url-input';
                                inp.value = srcUrl;
                                inp.readOnly = true;
                                inp.onclick = function() { this.select(); };
                                
                                const btn = document.createElement('button');
                                btn.className = 'img-copy-btn';
                                btn.innerHTML = '📋 Copy URL';
                                
                                btn.onclick = function() {
                                    navigator.clipboard.writeText(srcUrl);
                                    const originalHTML = this.innerHTML;
                                    this.innerHTML = '✅ Copied!';
                                    this.classList.add('success');
                                    setTimeout(() => {
                                        this.innerHTML = originalHTML;
                                        this.classList.remove('success');
                                    }, 1500);
                                };
                                
                                iBox.appendChild(header);
                                iBox.appendChild(inp);
                                iBox.appendChild(btn);
                                
                                card.appendChild(pBox);
                                card.appendChild(iBox);
                                gallery.appendChild(card);
                            });
                        })();
                    ">✨ Scan Images on This Page</button>
                    
                    <div id="img-gallery-root" class="img-gallery-grid">
                        <div class="is-empty-state">👆 Click the button above to capture all images loaded on this page.</div>
                    </div>
                </div>

                <style>
                    .img-scraper-container {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    
                    .is-scan-btn {
                        width: 100%;
                        margin: 0 0 16px 0;
                        padding: 12px;
                        background: linear-gradient(135deg, var(--widget-brand, #10b981) 0%, #059669 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 13px;
                        cursor: pointer;
                        box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.2);
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .is-scan-btn:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 6px 8px -1px rgba(16, 185, 129, 0.3);
                    }
                    .is-scan-btn:active {
                        transform: translateY(1px);
                    }

                    .img-gallery-grid {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        max-height: 450px;
                        overflow-y: auto;
                        padding: 4px 8px 12px 4px;
                    }
                    
                    /* Custom Elegant Scrollbar */
                    .img-gallery-grid::-webkit-scrollbar {
                        width: 6px;
                    }
                    .img-gallery-grid::-webkit-scrollbar-track {
                        background: #f1f5f9;
                        border-radius: 4px;
                    }
                    .img-gallery-grid::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                        border-radius: 4px;
                    }
                    .img-gallery-grid::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }

                    .is-empty-state {
                        padding: 30px 10px;
                        text-align: center;
                        font-size: 13px;
                        color: #64748b;
                        background: #f8fafc;
                        border: 2px dashed #cbd5e1;
                        border-radius: 12px;
                    }

                    .img-item-card {
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                        transition: all 0.2s ease;
                    }
                    .img-item-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 16px rgba(0,0,0,0.06);
                        border-color: #cbd5e1;
                    }

                    .img-preview-box {
                        width: 100%;
                        height: auto; 
                        background: #f8fafc; /* Lighter background for images compared to videos */
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        border-bottom: 1px solid #e2e8f0;
                    }
                    .img-preview-box img {
                        width: 100%;
                        height: auto; 
                        max-height: 250px; /* Safe cap for exceptionally tall images */
                        display: block;
                        object-fit: contain;
                    }

                    .img-info-box {
                        padding: 12px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        background: #ffffff;
                    }
                    .img-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .img-badge {
                        font-size: 10px;
                        font-weight: 700;
                        color: #ffffff;
                        background-color: #10b981;
                        padding: 3px 8px;
                        border-radius: 20px;
                        letter-spacing: 0.5px;
                    }
                    .img-index {
                        font-size: 12px;
                        font-weight: 700;
                        color: #94a3b8;
                    }
                    
                    .img-url-input {
                        width: 100%;
                        font-size: 11px;
                        font-family: 'Courier New', Courier, monospace;
                        padding: 8px;
                        border: 1px solid #e2e8f0;
                        border-radius: 6px;
                        background: #f8fafc;
                        color: #334155;
                        box-sizing: border-box;
                        text-overflow: ellipsis;
                        transition: border-color 0.2s;
                    }
                    .img-url-input:focus {
                        border-color: var(--widget-brand, #10b981);
                        outline: none;
                        background: #ffffff;
                    }
                    
                    .img-copy-btn {
                        background: #f1f5f9;
                        border: 1px solid #e2e8f0;
                        color: #475569;
                        font-size: 11px;
                        font-weight: 600;
                        padding: 8px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 6px;
                    }
                    .img-copy-btn:hover {
                        background: #e2e8f0;
                        color: #0f172a;
                    }
                    .img-copy-btn.success {
                        background: #10b981;
                        color: #ffffff;
                        border-color: #10b981;
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
                    <button class="vs-scan-btn" onclick="
                        (function() {
                            const gallery = document.getElementById('video-gallery-root');
                            gallery.innerHTML = '';
                            const videos = document.querySelectorAll('video');
                            
                            if (videos.length === 0) {
                                gallery.innerHTML = '<div class=&quot;vs-empty-state&quot;>🎬 No HTML5 video elements found on this page.</div>';
                                return;
                            }
                            
                            videos.forEach((vid, index) => {
                                /* Extract video source URL */
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
                                
                                /* Native video player with responsive automatic height matching its content */
                                const pVid = document.createElement('video');
                                pVid.src = srcUrl;
                                pVid.autoplay = false;
                                pVid.controls = true;
                                pVid.muted = false;
                                pVid.preload = 'metadata';
                                pBox.appendChild(pVid);
                                
                                const iBox = document.createElement('div');
                                iBox.className = 'video-info-box';
                                
                                const header = document.createElement('div');
                                header.className = 'video-card-header';
                                
                                const badge = document.createElement('span');
                                badge.className = 'video-badge';
                                badge.innerText = '🎬 VIDEO';
                                
                                const idx = document.createElement('span');
                                idx.className = 'video-index';
                                idx.innerText = '#' + (index + 1);
                                
                                header.appendChild(badge);
                                header.appendChild(idx);
                                
                                const inp = document.createElement('input');
                                inp.type = 'text';
                                inp.className = 'video-url-input';
                                inp.value = srcUrl;
                                inp.readOnly = true;
                                inp.onclick = function() { this.select(); };
                                
                                const btn = document.createElement('button');
                                btn.className = 'video-copy-btn';
                                btn.innerHTML = '📋 Copy URL';
                                
                                btn.onclick = function() {
                                    navigator.clipboard.writeText(srcUrl);
                                    const originalHTML = this.innerHTML;
                                    this.innerHTML = '✅ Copied!';
                                    this.classList.add('success');
                                    setTimeout(() => {
                                        this.innerHTML = originalHTML;
                                        this.classList.remove('success');
                                    }, 1500);
                                };
                                
                                iBox.appendChild(header);
                                iBox.appendChild(inp);
                                iBox.appendChild(btn);
                                
                                card.appendChild(pBox);
                                card.appendChild(iBox);
                                gallery.appendChild(card);
                            });
                        })();
                    ">✨ Scan Videos on This Page</button>
                    
                    <div id="video-gallery-root" class="video-gallery-grid">
                        <div class="vs-empty-state">👆 Click the button above to capture and play videos loaded on this page.</div>
                    </div>
                </div>

                <style>
                    .video-scraper-container {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    
                    .vs-scan-btn {
                        width: 100%;
                        margin: 0 0 16px 0;
                        padding: 12px;
                        background: linear-gradient(135deg, var(--widget-brand, #8b5cf6) 0%, #6d28d9 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 13px;
                        cursor: pointer;
                        box-shadow: 0 4px 6px -1px rgba(139, 92, 246, 0.2);
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .vs-scan-btn:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 6px 8px -1px rgba(139, 92, 246, 0.3);
                    }
                    .vs-scan-btn:active {
                        transform: translateY(1px);
                    }

                    .video-gallery-grid {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        max-height: 450px;
                        overflow-y: auto;
                        padding: 4px 8px 12px 4px;
                    }
                    
                    /* Custom Elegant Scrollbar */
                    .video-gallery-grid::-webkit-scrollbar {
                        width: 6px;
                    }
                    .video-gallery-grid::-webkit-scrollbar-track {
                        background: #f1f5f9;
                        border-radius: 4px;
                    }
                    .video-gallery-grid::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                        border-radius: 4px;
                    }
                    .video-gallery-grid::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }

                    .vs-empty-state {
                        padding: 30px 10px;
                        text-align: center;
                        font-size: 13px;
                        color: #64748b;
                        background: #f8fafc;
                        border: 2px dashed #cbd5e1;
                        border-radius: 12px;
                    }

                    .video-item-card {
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                        transition: all 0.2s ease;
                    }
                    .video-item-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 16px rgba(0,0,0,0.06);
                        border-color: #cbd5e1;
                    }

                    .video-preview-box {
                        width: 100%;
                        height: auto; /* Changes from fixed 100px to dynamic sizing */
                        background: #0f172a; 
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                    }
                    .video-preview-box video {
                        width: 100%;
                        height: auto; /* Forces the element to resize naturally based on its ratio */
                        max-height: 320px; /* Prevents overly tall portrait videos from stretching infinitely */
                        display: block;
                        object-fit: contain;
                    }

                    .video-info-box {
                        padding: 12px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        background: #ffffff;
                        border-top: 1px solid #e2e8f0;
                    }
                    .video-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .video-badge {
                        font-size: 10px;
                        font-weight: 700;
                        color: #ffffff;
                        background-color: #8b5cf6;
                        padding: 3px 8px;
                        border-radius: 20px;
                        letter-spacing: 0.5px;
                    }
                    .video-index {
                        font-size: 12px;
                        font-weight: 700;
                        color: #94a3b8;
                    }
                    
                    .video-url-input {
                        width: 100%;
                        font-size: 11px;
                        font-family: 'Courier New', Courier, monospace;
                        padding: 8px;
                        border: 1px solid #e2e8f0;
                        border-radius: 6px;
                        background: #f8fafc;
                        color: #334155;
                        box-sizing: border-box;
                        text-overflow: ellipsis;
                        transition: border-color 0.2s;
                    }
                    .video-url-input:focus {
                        border-color: var(--widget-brand, #8b5cf6);
                        outline: none;
                        background: #ffffff;
                    }
                    
                    .video-copy-btn {
                        background: #f1f5f9;
                        border: 1px solid #e2e8f0;
                        color: #475569;
                        font-size: 11px;
                        font-weight: 600;
                        padding: 8px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 6px;
                    }
                    .video-copy-btn:hover {
                        background: #e2e8f0;
                        color: #0f172a;
                    }
                    .video-copy-btn.success {
                        background: #10b981;
                        color: #ffffff;
                        border-color: #10b981;
                    }
                </style>
            `
        }
    ]
},
{
    "type": "cat",
    "name": "🎵 Audio Scraper",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="audio-scraper-container">
                    <button class="as-scan-btn" onclick="
                        (function() {
                            const gallery = document.getElementById('audio-gallery-root');
                            gallery.innerHTML = '';
                            const audios = document.querySelectorAll('audio');
                            
                            if (audios.length === 0) {
                                gallery.innerHTML = '<div class=&quot;as-empty-state&quot;>🎵 No audio elements found on this page.</div>';
                                return;
                            }
                            
                            audios.forEach((aud, index) => {
                                /* Extract audio source URL */
                                let srcUrl = aud.src;
                                if (!srcUrl) {
                                    const sourceEl = aud.querySelector('source');
                                    if (sourceEl) srcUrl = sourceEl.src;
                                }
                                
                                if (!srcUrl) return;
                                
                                const card = document.createElement('div');
                                card.className = 'audio-item-card';
                                
                                const pBox = document.createElement('div');
                                pBox.className = 'audio-preview-box';
                                
                                /* Native audio player adjusted perfectly for the panel width */
                                const pAud = document.createElement('audio');
                                pAud.src = srcUrl;
                                pAud.autoplay = false;
                                pAud.controls = true;
                                pAud.preload = 'metadata';
                                pBox.appendChild(pAud);
                                
                                const iBox = document.createElement('div');
                                iBox.className = 'audio-info-box';
                                
                                const header = document.createElement('div');
                                header.className = 'audio-card-header';
                                
                                const badge = document.createElement('span');
                                badge.className = 'audio-badge';
                                badge.innerText = '🎵 AUDIO';
                                
                                const idx = document.createElement('span');
                                idx.className = 'audio-index';
                                idx.innerText = '#' + (index + 1);
                                
                                header.appendChild(badge);
                                header.appendChild(idx);
                                
                                const inp = document.createElement('input');
                                inp.type = 'text';
                                inp.className = 'audio-url-input';
                                inp.value = srcUrl;
                                inp.readOnly = true;
                                inp.onclick = function() { this.select(); };
                                
                                const btn = document.createElement('button');
                                btn.className = 'audio-copy-btn';
                                btn.innerHTML = '📋 Copy URL';
                                
                                btn.onclick = function() {
                                    navigator.clipboard.writeText(srcUrl);
                                    const originalHTML = this.innerHTML;
                                    this.innerHTML = '✅ Copied!';
                                    this.classList.add('success');
                                    setTimeout(() => {
                                        this.innerHTML = originalHTML;
                                        this.classList.remove('success');
                                    }, 1500);
                                };
                                
                                iBox.appendChild(header);
                                iBox.appendChild(inp);
                                iBox.appendChild(btn);
                                
                                card.appendChild(pBox);
                                card.appendChild(iBox);
                                gallery.appendChild(card);
                            });
                        })();
                    ">✨ Scan Audio on This Page</button>
                    
                    <div id="audio-gallery-root" class="audio-gallery-grid">
                        <div class="as-empty-state">👆 Click the button above to discover and play audio files trackable on this page.</div>
                    </div>
                </div>

                <style>
                    .audio-scraper-container {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    
                    .as-scan-btn {
                        width: 100%;
                        margin: 0 0 16px 0;
                        padding: 12px;
                        background: linear-gradient(135deg, var(--widget-brand, #ec4899) 0%, #be185d 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 13px;
                        cursor: pointer;
                        box-shadow: 0 4px 6px -1px rgba(236, 72, 153, 0.2);
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .as-scan-btn:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 6px 8px -1px rgba(236, 72, 153, 0.3);
                    }
                    .as-scan-btn:active {
                        transform: translateY(1px);
                    }

                    .audio-gallery-grid {
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        max-height: 450px;
                        overflow-y: auto;
                        padding: 4px 8px 12px 4px;
                    }
                    
                    /* Custom Elegant Scrollbar */
                    .audio-gallery-grid::-webkit-scrollbar {
                        width: 6px;
                    }
                    .audio-gallery-grid::-webkit-scrollbar-track {
                        background: #f1f5f9;
                        border-radius: 4px;
                    }
                    .audio-gallery-grid::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                        border-radius: 4px;
                    }
                    .audio-gallery-grid::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }

                    .as-empty-state {
                        padding: 30px 10px;
                        text-align: center;
                        font-size: 13px;
                        color: #64748b;
                        background: #f8fafc;
                        border: 2px dashed #cbd5e1;
                        border-radius: 12px;
                    }

                    .audio-item-card {
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                        transition: all 0.2s ease;
                    }
                    .audio-item-card:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 8px 16px rgba(0,0,0,0.06);
                        border-color: #cbd5e1;
                    }

                    .audio-preview-box {
                        width: 100%;
                        height: 70px; 
                        background: #fff5f7; /* Soft pink tint for audio tracks */
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        border-bottom: 1px solid #fce7f3;
                    }
                    .audio-preview-box audio {
                        width: 92%;
                        height: 40px;
                        display: block;
                    }

                    .audio-info-box {
                        padding: 12px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        background: #ffffff;
                    }
                    .audio-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .audio-badge {
                        font-size: 10px;
                        font-weight: 700;
                        color: #ffffff;
                        background-color: #ec4899;
                        padding: 3px 8px;
                        border-radius: 20px;
                        letter-spacing: 0.5px;
                    }
                    .audio-index {
                        font-size: 12px;
                        font-weight: 700;
                        color: #94a3b8;
                    }
                    
                    .audio-url-input {
                        width: 100%;
                        font-size: 11px;
                        font-family: 'Courier New', Courier, monospace;
                        padding: 8px;
                        border: 1px solid #e2e8f0;
                        border-radius: 6px;
                        background: #f8fafc;
                        color: #334155;
                        box-sizing: border-box;
                        text-overflow: ellipsis;
                        transition: border-color 0.2s;
                    }
                    .audio-url-input:focus {
                        border-color: var(--widget-brand, #ec4899);
                        outline: none;
                        background: #ffffff;
                    }
                    
                    .audio-copy-btn {
                        background: #f1f5f9;
                        border: 1px solid #e2e8f0;
                        color: #475569;
                        font-size: 11px;
                        font-weight: 600;
                        padding: 8px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 6px;
                    }
                    .audio-copy-btn:hover {
                        background: #e2e8f0;
                        color: #0f172a;
                    }
                    .audio-copy-btn.success {
                        background: #10b981;
                        color: #ffffff;
                        border-color: #10b981;
                    }
                </style>
            `
        }
    ]
},
{
    "type": "cat",
    "name": "🗄️ Universal Scraper",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="us-scraper-container">
                    <button class="us-scan-btn" onclick="
                        (function() {
                            const gallery = document.getElementById('us-gallery-root');
                            gallery.innerHTML = '';
                            
                            /* Grab EVERYTHING with a src attribute, plus stylesheets with href */
                            const elements = document.querySelectorAll('[src], link[rel=&quot;stylesheet&quot;][href]');
                            
                            const rawSources = [];
                            
                            elements.forEach(el => {
                                const srcUrl = el.src || el.href;
                                if (!srcUrl) return;
                                
                                let tag = el.tagName.toUpperCase();
                                
                                /* Fix for <source> tags inside <video> or <audio> */
                                if (tag === 'SOURCE' && el.parentElement) {
                                    tag = el.parentElement.tagName.toUpperCase();
                                }
                                
                                /* Assign colors and icons based on media/tag type */
                                let color = '#64748b'; let icon = '🔗'; /* default gray */
                                if (tag === 'IMG') { color = '#10b981'; icon = '🖼️'; }
                                else if (tag === 'VIDEO') { color = '#8b5cf6'; icon = '🎬'; }
                                else if (tag === 'AUDIO') { color = '#ec4899'; icon = '🎵'; }
                                else if (tag === 'SCRIPT') { color = '#f59e0b'; icon = '📜'; }
                                else if (tag === 'IFRAME') { color = '#ef4444'; icon = '🪟'; }
                                else if (tag === 'LINK') { color = '#3b82f6'; icon = '🎨'; }
                                
                                rawSources.push({ tag, url: srcUrl, color, icon });
                            });
                            
                            /* Filter out duplicate URLs */
                            const uniqueSources = [];
                            const seenUrls = new Set();
                            rawSources.forEach(item => {
                                if (!seenUrls.has(item.url)) {
                                    seenUrls.add(item.url);
                                    uniqueSources.push(item);
                                }
                            });
                            
                            if (uniqueSources.length === 0) {
                                gallery.innerHTML = '<div class=&quot;us-empty-state&quot;>👻 No media or sources found on this page.</div>';
                                return;
                            }
                            
                            uniqueSources.forEach((item, index) => {
                                const card = document.createElement('div');
                                card.className = 'us-item-card';
                                
                                /* PREVIEW BOX LOGIC */
                                const pBox = document.createElement('div');
                                pBox.className = 'us-preview-box';
                                
                                if (item.tag === 'IMG') {
                                    const media = document.createElement('img');
                                    media.src = item.url;
                                    pBox.appendChild(media);
                                } else if (item.tag === 'VIDEO') {
                                    const media = document.createElement('video');
                                    media.src = item.url;
                                    media.controls = true;
                                    pBox.appendChild(media);
                                } else if (item.tag === 'AUDIO') {
                                    /* Custom styling for Audio box */
                                    pBox.style.background = '#fdf2f8';
                                    const media = document.createElement('audio');
                                    media.src = item.url;
                                    media.controls = true;
                                    media.style.width = '90%';
                                    media.style.height = '40px';
                                    pBox.appendChild(media);
                                } else {
                                    /* Placeholder for scripts, iframes, styles */
                                    const placeholder = document.createElement('span');
                                    placeholder.innerText = '<' + item.tag + '>';
                                    placeholder.className = 'us-code-placeholder';
                                    pBox.appendChild(placeholder);
                                }
                                
                                /* INFO BOX LOGIC */
                                const iBox = document.createElement('div');
                                iBox.className = 'us-info-box';
                                
                                const header = document.createElement('div');
                                header.className = 'us-card-header';
                                
                                const badge = document.createElement('span');
                                badge.className = 'us-badge';
                                badge.style.backgroundColor = item.color;
                                badge.innerText = item.icon + ' ' + item.tag;
                                
                                const idx = document.createElement('span');
                                idx.className = 'us-index';
                                idx.innerText = '#' + (index + 1);
                                
                                header.appendChild(badge);
                                header.appendChild(idx);
                                
                                const inp = document.createElement('input');
                                inp.type = 'text';
                                inp.className = 'us-url-input';
                                inp.value = item.url;
                                inp.readOnly = true;
                                inp.onclick = function() { this.select(); };
                                
                                const btn = document.createElement('button');
                                btn.className = 'us-copy-btn';
                                btn.innerHTML = '📋 Copy URL';
                                btn.onclick = function() {
                                    navigator.clipboard.writeText(item.url);
                                    const originalHTML = this.innerHTML;
                                    this.innerHTML = '✅ Copied!';
                                    this.classList.add('success');
                                    setTimeout(() => {
                                        this.innerHTML = originalHTML;
                                        this.classList.remove('success');
                                    }, 1500);
                                };
                                
                                iBox.appendChild(header);
                                iBox.appendChild(inp);
                                iBox.appendChild(btn);
                                
                                card.appendChild(pBox);
                                card.appendChild(iBox);
                                gallery.appendChild(card);
                            });
                        })();
                    ">✨ Scan Media & Sources</button>
                    
                    <div id="us-gallery-root" class="us-gallery-grid">
                        <div class="us-empty-state">👆 Click the button above to discover hidden media and sources.</div>
                    </div>
                </div>

                <style>
                    .us-scraper-container {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    
                    .us-scan-btn {
                        width: 100%;
                        margin: 0 0 16px 0;
                        padding: 12px;
                        background: linear-gradient(135deg, var(--widget-brand, #3b82f6) 0%, #2563eb 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 13px;
                        cursor: pointer;
                        box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .us-scan-btn:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 6px 8px -1px rgba(37, 99, 235, 0.3);
                    }
                    .us-scan-btn:active {
                        transform: translateY(1px);
                    }

                    .us-gallery-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                        gap: 16px;
                        max-height: 450px;
                        overflow-y: auto;
                        padding: 4px 8px 12px 4px;
                    }
                    
                    /* Custom Scrollbar */
                    .us-gallery-grid::-webkit-scrollbar {
                        width: 6px;
                    }
                    .us-gallery-grid::-webkit-scrollbar-track {
                        background: #f1f5f9;
                        border-radius: 4px;
                    }
                    .us-gallery-grid::-webkit-scrollbar-thumb {
                        background: #cbd5e1;
                        border-radius: 4px;
                    }
                    .us-gallery-grid::-webkit-scrollbar-thumb:hover {
                        background: #94a3b8;
                    }

                    .us-empty-state {
                        grid-column: 1 / -1;
                        padding: 30px 10px;
                        text-align: center;
                        font-size: 13px;
                        color: #64748b;
                        background: #f8fafc;
                        border: 2px dashed #cbd5e1;
                        border-radius: 12px;
                    }

                    .us-item-card {
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                        transition: all 0.2s ease;
                    }
                    .us-item-card:hover {
                        transform: translateY(-3px);
                        box-shadow: 0 8px 15px rgba(0,0,0,0.08);
                        border-color: #cbd5e1;
                    }

                    .us-preview-box {
                        width: 100%;
                        height: 110px;
                        background: #0f172a; 
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        border-bottom: 1px solid #e2e8f0;
                    }
                    .us-preview-box img, .us-preview-box video {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                    .us-code-placeholder {
                        color: #94a3b8;
                        font-weight: 700;
                        font-size: 14px;
                        letter-spacing: 1px;
                        font-family: 'Courier New', monospace;
                    }

                    .us-info-box {
                        padding: 12px;
                        display: flex;
                        flex-direction: column;
                        gap: 10px;
                        background: #ffffff;
                    }
                    .us-card-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .us-badge {
                        font-size: 10px;
                        font-weight: 700;
                        color: #ffffff;
                        padding: 3px 8px;
                        border-radius: 20px;
                        letter-spacing: 0.5px;
                        display: flex;
                        align-items: center;
                        gap: 4px;
                    }
                    .us-index {
                        font-size: 12px;
                        font-weight: 700;
                        color: #94a3b8;
                    }
                    
                    .us-url-input {
                        width: 100%;
                        font-size: 11px;
                        font-family: 'Courier New', Courier, monospace;
                        padding: 8px;
                        border: 1px solid #e2e8f0;
                        border-radius: 6px;
                        background: #f8fafc;
                        color: #334155;
                        box-sizing: border-box;
                        text-overflow: ellipsis;
                        transition: border-color 0.2s;
                    }
                    .us-url-input:focus {
                        border-color: var(--widget-brand, #3b82f6);
                        outline: none;
                        background: #ffffff;
                    }
                    
                    .us-copy-btn {
                        background: #f1f5f9;
                        border: 1px solid #e2e8f0;
                        color: #475569;
                        font-size: 11px;
                        font-weight: 600;
                        padding: 8px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 6px;
                    }
                    .us-copy-btn:hover {
                        background: #e2e8f0;
                        color: #0f172a;
                    }
                    .us-copy-btn.success {
                        background: #10b981;
                        color: #ffffff;
                        border-color: #10b981;
                    }
                </style>
            `
        }
    ]
},
            ]
        },
                {
                    "type": "cat",
                    "name": "📂 MAIN HTML",
                    "value": [
                        {
    "type": "cat",
    "name": "💻 Source Code (HTML Copier)",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="html-copier-container">
                    <button class="hc-scan-btn" onclick="
                        (function() {
                            const root = document.getElementById('html-copier-root');
                            root.innerHTML = '';
                            
                            /* Get the entire HTML code from the current page */
                            const currentHtml = document.documentElement.outerHTML;
                            
                            const box = document.createElement('div');
                            box.className = 'hc-view-box';
                            
                            const txt = document.createElement('textarea');
                            txt.className = 'hc-textarea';
                            txt.value = currentHtml;
                            txt.readOnly = true;
                            txt.onclick = function() { this.select(); };
                            
                            const btn = document.createElement('button');
                            btn.className = 'hc-copy-btn';
                            btn.innerHTML = '📋 Copy Entire HTML Code';
                            btn.onclick = function() {
                                txt.select();
                                navigator.clipboard.writeText(currentHtml);
                                const originalHTML = this.innerHTML;
                                this.innerHTML = '✅ HTML Code Copied!';
                                this.classList.add('success');
                                setTimeout(() => {
                                    this.innerHTML = originalHTML;
                                    this.classList.remove('success');
                                }, 2000);
                            };
                            
                            box.appendChild(txt);
                            box.appendChild(btn);
                            root.appendChild(box);
                        })();
                    ">🔍 Get HTML Source Code</button>
                    
                    <div id="html-copier-root">
                        <div class="hc-empty-state">👆 Click the button above to extract and inspect the full page source code.</div>
                    </div>
                </div>

                <style>
                    .html-copier-container {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    }
                    
                    .hc-scan-btn {
                        width: 100%;
                        margin: 0 0 16px 0;
                        padding: 12px;
                        background: linear-gradient(135deg, var(--widget-brand, #6366f1) 0%, #4f46e5 100%);
                        color: white;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 13px;
                        cursor: pointer;
                        box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.2);
                        transition: transform 0.2s, box-shadow 0.2s;
                    }
                    .hc-scan-btn:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 6px 8px -1px rgba(99, 102, 241, 0.3);
                    }
                    .hc-scan-btn:active {
                        transform: translateY(1px);
                    }

                    .hc-empty-state {
                        padding: 30px 15px;
                        text-align: center;
                        font-size: 13px;
                        color: #64748b;
                        background: #f8fafc;
                        border: 2px dashed #cbd5e1;
                        border-radius: 12px;
                        line-height: 1.5;
                    }

                    .hc-view-box {
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 12px;
                        padding: 12px;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.03);
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                    }

                    .hc-textarea {
                        width: 100%;
                        height: 250px;
                        font-family: 'Fira Code', 'Courier New', Courier, monospace;
                        font-size: 11px;
                        line-height: 1.6;
                        padding: 12px;
                        border: 1px solid #334155;
                        border-radius: 8px;
                        background: #0f172a; /* Premium Dark Theme for Code */
                        color: #e2e8f0;
                        resize: vertical;
                        box-sizing: border-box;
                        outline: none;
                    }
                    /* Custom Scrollbar for Textarea */
                    .hc-textarea::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                    .hc-textarea::-webkit-scrollbar-track {
                        background: #1e293b;
                    }
                    .hc-textarea::-webkit-scrollbar-thumb {
                        background: #475569;
                        border-radius: 4px;
                    }
                    .hc-textarea::-webkit-scrollbar-thumb:hover {
                        background: #64748b;
                    }

                    .hc-copy-btn {
                        background: #10b981;
                        color: #ffffff;
                        border: 1px solid #10b981;
                        font-size: 12px;
                        font-weight: 600;
                        padding: 10px;
                        border-radius: 6px;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        gap: 6px;
                        box-shadow: 0 2px 4px rgba(16, 185, 129, 0.1);
                    }
                    .hc-copy-btn:hover {
                        background: #059669;
                        border-color: #059669;
                        box-shadow: 0 4px 6px rgba(16, 185, 129, 0.2);
                    }
                    .hc-copy-btn.success {
                        background: #3b82f6;
                        border-color: #3b82f6;
                        box-shadow: 0 4px 6px rgba(59, 130, 246, 0.2);
                    }
                </style>
            `
        }
    ]
},
                        {
    "type": "cat",
    "name": "🎛️ Advanced Element Inspector",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="aei-container">
                    <div class="aei-card">
                        <div class="aei-card-title">🔍 Class & Tag Selector</div>
                        <p class="aei-card-desc">Prefix with a dot (e.g., <code>.title</code>) for Classes, or type the tag name directly (e.g., <code>video</code>, <code>img</code>) for objects.</p>
                        
                        <div class="aei-input-group">
                            <input type="text" id="cts-input" class="aei-input" placeholder="e.g., .hero-banner or video" />
                            <button class="aei-btn primary" onclick="
                                (function() {
                                    let query = document.getElementById('cts-input').value.trim();
                                    const gallery = document.getElementById('cts-gallery-root');
                                    gallery.innerHTML = '';
                                    
                                    if (!query) return;
                                    
                                    let elements;
                                    try {
                                        elements = document.querySelectorAll(query);
                                    } catch(e) {
                                        gallery.innerHTML = '<div class=&quot;aei-error-state&quot;>⚠️ Invalid selector syntax!</div>';
                                        return;
                                    }
                                    
                                    if (elements.length === 0) {
                                        gallery.innerHTML = '<div class=&quot;aei-empty-state&quot;>👻 No elements found on this page.</div>';
                                        return;
                                    }
                                    
                                    elements.forEach((el, index) => {
                                        const tag = el.tagName.toUpperCase();
                                        const card = document.createElement('div');
                                        card.className = 'aei-sub-card';
                                        
                                        if (tag === 'IMG' || tag === 'VIDEO' || tag === 'AUDIO') {
                                            let srcUrl = el.src;
                                            if (!srcUrl && tag !== 'IMG') {
                                                const sourceEl = el.querySelector('source');
                                                if (sourceEl) srcUrl = sourceEl.src;
                                            }
                                            
                                            const pBox = document.createElement('div');
                                            pBox.className = 'aei-media-preview';
                                            
                                            if (tag === 'IMG' && srcUrl) {
                                                const media = document.createElement('img'); media.src = srcUrl; pBox.appendChild(media);
                                            } else if (tag === 'VIDEO' && srcUrl) {
                                                const media = document.createElement('video'); media.src = srcUrl; media.controls = true; pBox.appendChild(media);
                                            } else if (tag === 'AUDIO' && srcUrl) {
                                                pBox.style.background = '#f8fafc';
                                                const media = document.createElement('audio'); media.src = srcUrl; media.controls = true; media.style.width = '95%'; pBox.appendChild(media);
                                            } else {
                                                pBox.innerHTML = '<span class=&quot;aei-placeholder-text&quot;>[Media without source URL]</span>';
                                            }
                                            card.appendChild(pBox);
                                        } 
                                        else {
                                            const codeBox = document.createElement('textarea');
                                            codeBox.className = 'aei-textarea-dark';
                                            codeBox.value = el.outerHTML;
                                            codeBox.readOnly = true;
                                            codeBox.onclick = function() { this.select(); };
                                            card.appendChild(codeBox);
                                        }
                                        
                                        const footer = document.createElement('div');
                                        footer.className = 'aei-card-footer';
                                        footer.innerHTML = '<span class=&quot;aei-tag-badge&quot;>&lt;' + tag + '&gt; #' + (index + 1) + '</span>';
                                        
                                        const cpBtn = document.createElement('button');
                                        cpBtn.className = 'aei-action-btn';
                                        cpBtn.innerHTML = '📋 Copy';
                                        cpBtn.onclick = function() {
                                            const content = tag === 'IMG' || tag === 'VIDEO' || tag === 'AUDIO' ? (el.src || el.outerHTML) : el.outerHTML;
                                            navigator.clipboard.writeText(content);
                                            this.innerHTML = '✅ Copied!';
                                            setTimeout(() => { this.innerHTML = '📋 Copy'; }, 1500);
                                        };
                                        
                                        footer.appendChild(cpBtn);
                                        card.appendChild(footer);
                                        gallery.appendChild(card);
                                    });
                                })();
                            ">✨ Scan Selector</button>
                        </div>
                        
                        <div id="cts-gallery-root" class="aei-scroll-grid">
                            <div class="aei-empty-state">Scan results will appear here...</div>
                        </div>
                    </div>
                    
                    <hr class="aei-divider" />

                    <div class="aei-card">
                        <div class="aei-card-title">🆔 ID Inspector & Live Replacer</div>
                        <p class="aei-card-desc">Search a single element by its ID to inspect its source code, preview media, or live-replace its outer HTML structure code.</p>
                        
                        <div class="aei-input-group">
                            <input type="text" id="id-search-input" class="aei-input" placeholder="Enter ID name (without #)" />
                            <button class="aei-btn secondary" onclick="
                                (function() {
                                    let idName = document.getElementById('id-search-input').value.trim().replace('#', '');
                                    const displayRoot = document.getElementById('id-inspector-root');
                                    displayRoot.innerHTML = '';
                                    
                                    if (!idName) return;
                                    
                                    const targetEl = document.getElementById(idName);
                                    if (!targetEl) {
                                        displayRoot.innerHTML = '<div class=&quot;aei-error-state&quot;>❌ Element with ID &quot;' + idName + '&quot; not found on this page.</div>';
                                        return;
                                    }
                                    
                                    const tag = targetEl.tagName.toUpperCase();
                                    const inspectorBox = document.createElement('div');
                                    inspectorBox.className = 'aei-inspector-box';
                                    
                                    if (tag === 'IMG' || tag === 'VIDEO' || tag === 'AUDIO') {
                                        const mHeader = document.createElement('div');
                                        mHeader.className = 'aei-preview-title';
                                        mHeader.innerText = '🖼️ Live Media Player Preview:';
                                        inspectorBox.appendChild(mHeader);
                                        
                                        const pBox = document.createElement('div');
                                        pBox.className = 'aei-media-preview intense';
                                        let srcUrl = targetEl.src;
                                        
                                        if (tag === 'IMG') {
                                            const m = document.createElement('img'); m.src = srcUrl; pBox.appendChild(m);
                                        } else if (tag === 'VIDEO') {
                                            if(!srcUrl && targetEl.querySelector('source')) srcUrl = targetEl.querySelector('source').src;
                                            const m = document.createElement('video'); m.src = srcUrl; m.controls = true; pBox.appendChild(m);
                                        } else if (tag === 'AUDIO') {
                                            if(!srcUrl && targetEl.querySelector('source')) srcUrl = targetEl.querySelector('source').src;
                                            const m = document.createElement('audio'); m.src = srcUrl; m.controls = true; m.style.width = '95%'; pBox.appendChild(m);
                                        }
                                        inspectorBox.appendChild(pBox);
                                    }
                                    
                                    const cHeader = document.createElement('div');
                                    cHeader.className = 'aei-preview-title';
                                    cHeader.innerHTML = '🛠️ Outer HTML Code Editor (Editable):';
                                    inspectorBox.appendChild(cHeader);
                                    
                                    const editor = document.createElement('textarea');
                                    editor.className = 'aei-textarea-dark main-editor';
                                    editor.value = targetEl.outerHTML;
                                    inspectorBox.appendChild(editor);
                                    
                                    const controlPanel = document.createElement('div');
                                    controlPanel.className = 'aei-control-panel';
                                    
                                    const copyBtn = document.createElement('button');
                                    copyBtn.className = 'aei-btn info-btn';
                                    copyBtn.innerHTML = '📋 Copy Code';
                                    copyBtn.onclick = function() {
                                        navigator.clipboard.writeText(editor.value);
                                        this.innerHTML = '✅ Copied!';
                                        setTimeout(() => { this.innerHTML = '📋 Copy Code'; }, 1500);
                                    };
                                    
                                    const updateBtn = document.createElement('button');
                                    updateBtn.className = 'aei-btn success-btn';
                                    updateBtn.innerHTML = '🚀 Replace Live HTML';
                                    updateBtn.onclick = function() {
                                        try {
                                            targetEl.outerHTML = editor.value;
                                            alert('✅ Element code successfully updated live!');
                                        } catch(err) {
                                            alert('❌ Target update failed: ' + err.message);
                                        }
                                    };
                                    
                                    controlPanel.appendChild(copyBtn);
                                    controlPanel.appendChild(updateBtn);
                                    inspectorBox.appendChild(controlPanel);
                                    
                                    displayRoot.appendChild(inspectorBox);
                                })();
                            ">🔍 Find & Inspect ID</button>
                        </div>
                        
                        <div id="id-inspector-root">
                            <div class="aei-empty-state">ID inspection console will appear here...</div>
                        </div>
                    </div>
                </div>

                <style>
                    /* Global safe resetting inside widget */
                    .aei-container, .aei-container * {
                        box-sizing: border-box !important;
                    }
                    
                    .aei-container {
                        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                        display: flex;
                        flex-direction: column;
                        gap: 16px;
                        width: 100%;
                        max-width: 100%;
                        overflow-x: hidden;
                    }
                    
                    .aei-card {
                        background: #ffffff;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        width: 100%;
                    }
                    
                    .aei-card-title {
                        font-size: 14px;
                        font-weight: 700;
                        color: #0f172a;
                    }
                    
                    .aei-card-desc {
                        font-size: 11px;
                        color: #64748b;
                        margin: 0;
                        line-height: 1.4;
                    }
                    
                    /* Vertical Column Flow on Mobile to completely fix layout overflows */
                    .aei-input-group {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        width: 100%;
                        margin-top: 4px;
                    }
                    
                    .aei-input {
                        width: 100%;
                        font-size: 13px;
                        padding: 10px 12px;
                        border: 1px solid #cbd5e1;
                        border-radius: 8px;
                        background: #f8fafc;
                        color: #334155;
                        outline: none;
                        transition: all 0.2s;
                    }
                    .aei-input:focus {
                        border-color: var(--widget-brand, #3b82f6);
                        background: #ffffff;
                        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                    }
                    
                    .aei-btn {
                        width: 100%;
                        padding: 11px 16px;
                        border: none;
                        border-radius: 8px;
                        font-weight: 600;
                        font-size: 13px;
                        cursor: pointer;
                        text-align: center;
                        transition: transform 0.1s, filter 0.2s;
                    }
                    .aei-btn:active { transform: scale(0.99); }
                    .aei-btn.primary { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; }
                    .aei-btn.secondary { background: linear-gradient(135deg, #8b5cf6, #6d28d9); color: white; }
                    .aei-btn.info-btn { background: #475569; color: white; }
                    .aei-btn.success-btn { background: #10b981; color: white; }
                    
                    .aei-divider {
                        border: 0;
                        height: 1px;
                        background: #e2e8f0;
                        margin: 4px 0;
                    }
                    
                    .aei-scroll-grid {
                        display: flex;
                        flex-direction: column;
                        gap: 12px;
                        max-height: 320px;
                        overflow-y: auto;
                        padding-right: 2px;
                        margin-top: 8px;
                        width: 100%;
                    }
                    .aei-scroll-grid::-webkit-scrollbar, .aei-textarea-dark::-webkit-scrollbar {
                        width: 5px; height: 5px;
                    }
                    .aei-scroll-grid::-webkit-scrollbar-thumb, .aei-textarea-dark::-webkit-scrollbar-thumb {
                        background: #cbd5e1; border-radius: 4px;
                    }
                    
                    .aei-empty-state, .aei-error-state {
                        padding: 20px 12px;
                        text-align: center;
                        font-size: 12px;
                        color: #64748b;
                        background: #f8fafc;
                        border: 1px dashed #cbd5e1;
                        border-radius: 10px;
                        width: 100%;
                    }
                    .aei-error-state { color: #ef4444; background: #fef2f2; border-color: #fca5a5; }
                    
                    .aei-sub-card, .aei-inspector-box {
                        background: #ffffff;
                        border: 1px solid #e2e8f0;
                        border-radius: 10px;
                        padding: 10px;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        width: 100%;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.01);
                    }
                    
                    .aei-media-preview {
                        width: 100%;
                        height: auto;
                        background: #0f172a;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        overflow: hidden;
                        border-radius: 6px;
                        padding: 4px;
                    }
                    .aei-media-preview img, .aei-media-preview video {
                        width: 100%; height: auto; max-height: 180px; display: block; object-fit: contain;
                    }
                    .aei-media-preview.intense { background: #020617; border: 1px solid #1e293b; }
                    .aei-placeholder-text { font-size: 11px; color: #64748b; padding: 12px; }
                    
                    .aei-textarea-dark {
                        width: 100%;
                        height: 100px;
                        font-family: 'Fira Code', 'Courier New', monospace;
                        font-size: 11px;
                        line-height: 1.5;
                        padding: 10px;
                        border: 1px solid #1e293b;
                        border-radius: 6px;
                        background: #0f172a;
                        color: #e2e8f0;
                        resize: vertical;
                        outline: none;
                    }
                    .aei-textarea-dark.main-editor { height: 160px; }
                    
                    .aei-card-footer {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        width: 100%;
                    }
                    .aei-tag-badge {
                        font-size: 10px;
                        font-weight: 700;
                        color: #475569;
                        background: #e2e8f0;
                        padding: 3px 6px;
                        border-radius: 4px;
                        font-family: monospace;
                    }
                    .aei-action-btn {
                        background: #f1f5f9;
                        border: 1px solid #e2e8f0;
                        color: #334155;
                        font-size: 11px;
                        font-weight: 600;
                        padding: 5px 12px;
                        border-radius: 6px;
                        cursor: pointer;
                    }
                    
                    .aei-preview-title {
                        font-size: 11px;
                        font-weight: 700;
                        color: #475569;
                        margin-top: 2px;
                    }
                    
                    /* Control panel splits buttons stacked symmetrically on mobile screen width */
                    .aei-control-panel {
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        width: 100%;
                        margin-top: 2px;
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
                            const vidPreview = document.getElementById('fetch-video-preview');
                            const audPreview = document.getElementById('fetch-audio-preview');
                            const actionBtns = document.getElementById('fetch-action-btns');
                            
                            if (!urlStr) return; 
                            
                            /* Reset UI */
                            textArea.style.display = 'none';
                            imgPreview.style.display = 'none';
                            vidPreview.style.display = 'none';
                            audPreview.style.display = 'none';
                            actionBtns.style.display = 'none';
                            
                            /* Stop any playing media */
                            vidPreview.pause();
                            vidPreview.src = '';
                            audPreview.pause();
                            audPreview.src = '';
                            imgPreview.src = '';
                            
                            resultBox.style.display = 'block';
                            
                            const urlLower = urlStr.toLowerCase();
                            const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.avif', '.ico', '.bmp'];
                            const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.mkv'];
                            const audioExtensions = ['.mp3', '.wav', '.flac', '.m4a', '.aac', '.oga'];
                            
                            const isImageUrl = imageExtensions.some(ext => urlLower.includes(ext));
                            const isVideoUrl = videoExtensions.some(ext => urlLower.includes(ext));
                            const isAudioUrl = audioExtensions.some(ext => urlLower.includes(ext));
                            
                            /* 1. If Image (0 Lag) */
                            if (isImageUrl) {
                                imgPreview.src = urlStr;
                                imgPreview.style.display = 'block';
                                return;
                            }
                            
                            /* 2. If Video (0 Lag) */
                            if (isVideoUrl) {
                                vidPreview.src = urlStr;
                                vidPreview.style.display = 'block';
                                return;
                            }

                            /* 3. If Audio (0 Lag) */
                            if (isAudioUrl) {
                                audPreview.src = urlStr;
                                audPreview.style.display = 'block';
                                return;
                            }
                            
                            /* 4. If unknown, fetch it to check headers or read as text */
                            textArea.style.display = 'block';
                            textArea.value = '⏳ Fetching data...';
                            
                            try {
                                const response = await fetch(urlStr);
                                if (!response.ok) throw new Error('HTTP error! status: ' + response.status);
                                
                                const contentType = response.headers.get('content-type') || '';
                                
                                if (contentType.startsWith('image/')) {
                                    textArea.style.display = 'none';
                                    imgPreview.src = urlStr;
                                    imgPreview.style.display = 'block';
                                    
                                } else if (contentType.startsWith('video/')) {
                                    textArea.style.display = 'none';
                                    vidPreview.src = urlStr;
                                    vidPreview.style.display = 'block';
                                    
                                } else if (contentType.startsWith('audio/')) {
                                    textArea.style.display = 'none';
                                    audPreview.src = urlStr;
                                    audPreview.style.display = 'block';
                                    
                                } else {
                                    /* It's text/code */
                                    const text = await response.text();
                                    textArea.value = text;
                                    actionBtns.style.display = 'flex';
                                }
                            } catch (e) {
                                textArea.style.display = 'block';
                                actionBtns.style.display = 'flex';
                                textArea.value = '❌ Failed to retrieve data\\n\\n' + e.toString() + '\\n\\n(Note: Make sure the URL is valid and the destination server supports CORS.)';
                            }
                        })();
                    ">📥 Fetch Data</button>

                    <div id="fetch-result-box" style="display: none; margin-top: 12px; border-top: 1px solid #e5e7eb; padding-top: 12px;">
                        <span style="font-size: 12px; font-weight: bold; margin-bottom: 6px; display: block;">Result:</span>
                        
                        <textarea id="fetch-textarea" class="fetch-textarea"></textarea>
                        
                        <div style="text-align: center; display: flex; flex-direction: column; gap: 8px;">
                            <img id="fetch-img-preview" style="display: none; max-width: 100%; border-radius: 6px; border: 1px solid #d1d5db; margin: 0 auto;" />
                            <video id="fetch-video-preview" controls style="display: none; max-width: 100%; border-radius: 6px; border: 1px solid #d1d5db; margin: 0 auto; background: #000;"></video>
                            <audio id="fetch-audio-preview" controls style="display: none; width: 100%; margin: 0 auto;"></audio>
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
                        border-color: var(--widget-brand, #3b82f6);
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
},
{
    "type": "cat",
    "name": "🔗 JS Runner",
    "value": [
        {
            "type": "raw",
            "html": `
                <div class="js-runner-container">
                    <p style="font-size: 12px; color: #4b5563; margin: 0 0 8px 0;">Write JavaScript Code:</p>
                    <textarea id="js-code-input" class="js-code-textarea" placeholder="Input javascript code here..."></textarea>
                    
                    <div style="display: flex; gap: 8px; margin-top: 8px;">
                        <button class="widget-btn" style="flex: 1; background: #10b981; color: white; text-align: center;" onclick="
                            (function() {
                                const code = document.getElementById('js-code-input').value;
                                if (!code.trim()) return;
                                
                                try {
                                    /* Execute the code globally */
                                    const result = window.eval(code);
                                    
                                    /* If the code returns something (not undefined), print it to the console */
                                    if (result !== undefined) {
                                        console.log(result);
                                    }
                                } catch (e) {
                                    /* Catch any syntax or execution errors and print to console as error */
                                    console.error(e);
                                }
                            })();
                        ">▶️ Run Code</button>
                        
                        <button class="widget-btn" style="flex: 1; background: #ef4444; color: white; text-align: center;" onclick="
                            document.getElementById('js-console-output').innerHTML = '';
                        ">🗑️ Clear Console</button>
                    </div>

                    <div style="margin-top: 12px; border-top: 1px solid #e5e7eb; padding-top: 12px;">
                        <span style="font-size: 12px; font-weight: bold; margin-bottom: 6px; display: block;">Console Viewer:</span>
                        <div id="js-console-output" class="js-console-box"></div>
                    </div>

                    <img src="x" style="display: none;" onerror="
                        (function() {
                            /* Ensure we only intercept the console once */
                            if (!window._isConsoleIntercepted) {
                                const originalLog = console.log;
                                const originalError = console.error;
                                const originalWarn = console.warn;
                                
                                function printToUI(type, args) {
                                    const box = document.getElementById('js-console-output');
                                    if (!box) return;
                                    
                                    /* Convert objects/arrays to strings safely */
                                    const msg = Array.from(args).map(a => {
                                        if (a instanceof Error) return a.toString();
                                        if (typeof a === 'object') {
                                            try { return JSON.stringify(a); } 
                                            catch(err) { return String(a); }
                                        }
                                        return String(a);
                                    }).join(' ');
                                    
                                    const el = document.createElement('div');
                                    el.className = 'console-line ' + type;
                                    el.innerText = '> ' + msg;
                                    
                                    box.appendChild(el);
                                    
                                    /* Auto-scroll to the bottom */
                                    box.scrollTop = box.scrollHeight;
                                }
                                
                                console.log = function(...args) { 
                                    originalLog.apply(console, args); 
                                    printToUI('log', args); 
                                };
                                console.error = function(...args) { 
                                    originalError.apply(console, args); 
                                    printToUI('error', args); 
                                };
                                console.warn = function(...args) { 
                                    originalWarn.apply(console, args); 
                                    printToUI('warn', args); 
                                };
                                
                                window._isConsoleIntercepted = true;
                                
                            }
                        })();
                    " />
                </div>

                <style>
                    .js-runner-container {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    }
                    .js-code-textarea {
                        width: 100%;
                        height: 120px;
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 12px;
                        padding: 10px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        background: #f9fafb;
                        color: #1f2937;
                        resize: vertical;
                        box-sizing: border-box;
                        outline: none;
                        transition: border-color 0.2s;
                    }
                    .js-code-textarea:focus {
                        border-color: var(--widget-brand, #3b82f6);
                        background: #ffffff;
                    }
                    .js-console-box {
                        width: 100%;
                        height: 150px;
                        background: #1e293b; /* Dark theme for console */
                        border-radius: 6px;
                        overflow-y: auto;
                        box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
                        padding: 4px 0;
                        box-sizing: border-box;
                    }
                    .console-line {
                        font-family: 'Courier New', Courier, monospace;
                        font-size: 11px;
                        padding: 4px 8px;
                        border-bottom: 1px solid #334155;
                        word-break: break-all;
                    }
                    .console-line.log {
                        color: #a7f3d0; /* Soft green */
                    }
                    .console-line.warn {
                        color: #fde68a; /* Soft yellow */
                        background: rgba(217, 119, 6, 0.1);
                    }
                    .console-line.error {
                        color: #fca5a5; /* Soft red */
                        background: rgba(153, 27, 27, 0.2);
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
