// Playlist minimizada
export function openSpotifyModal(playlistUrl){
    if (!playlistUrl) return;
    // Si ya está, actualiza y muestra
    let modal = document.getElementById('spotify-modal');
    if (!modal){
        modal = document.createElement('div');
        modal.id = 'spotify-modal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="max-width:760px; padding: 18px;">
                <button class="modal-close" id="spotify-close">&times;</button>
                <h3 class="modal-title">Escuchar playlist</h3>
                <div style="margin:12px 0; display:flex; gap:8px; align-items:center;">
                    <a id="spotify-open-external" class="btn btn-small" target="_blank" rel="noopener">Abrir en Spotify</a>
                    <div style="flex:1"></div>
                </div>
                <div style="position:relative; padding-top:56.25%;">
                    <iframe id="spotify-iframe" src="" width="100%" height="100%" style="position:absolute; inset:0; border:0;" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('spotify-close').addEventListener('click', ()=> modal.remove());
    }
    const iframe = document.getElementById('spotify-iframe');
    const openExternal = document.getElementById('spotify-open-external');
    let embedUrl = playlistUrl;
    if (playlistUrl.includes('open.spotify.com') && !playlistUrl.includes('/embed/')){
        embedUrl = playlistUrl.replace('open.spotify.com', 'open.spotify.com/embed');
    }
    iframe.src = embedUrl;
    openExternal.href = playlistUrl;
}
