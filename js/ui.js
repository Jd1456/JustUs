import { openSpotifyModal } from './player.js';
import { showToast } from './toast.js';

export function initUI(){
    // Muestras de la playlist
    document.querySelectorAll('[data-playlist]').forEach(el=>{
        el.addEventListener('click', (e)=>{
            e.preventDefault();
            const url = el.getAttribute('data-playlist');
            if (!url) return;
            try { openSpotifyModal(url); } catch(err){ console.error(err); showToast('No se pudo abrir la playlist', 'error'); }
        });
    });

    // Pulse para nuevos botones
    const pulseTargets = document.querySelectorAll('#btn-nueva-carta, #btn-nueva-meta');
    pulseTargets.forEach(t => t.classList.add('pulse'));
    // Remover el pulse al hacer click
    pulseTargets.forEach(t => t.addEventListener('click', ()=> t.classList.remove('pulse')));

    // Mejora el area del botón para telefono
    // (Handled by CSS, this placeholder exists to allow future JS interactions.)
}

// auto iniciar al cargar la página
window.addEventListener('load', ()=>{ try { initUI(); } catch(e) { console.error('initUI error', e); } });