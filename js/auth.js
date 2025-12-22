import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from './firebase-init.js';
import { showToast } from './toast.js';

export function initAuthArea(id = 'auth-area'){
    const authArea = document.getElementById(id);
    if (!authArea) return console.warn('initAuthArea: element not found', id);

    function render(user){
        authArea.innerHTML = '';
        if (user){
            const name = user.displayName || user.email || 'Usuario';
            authArea.innerHTML = `<span style="margin-right:8px; font-weight:600">${name}</span><button id=\"btn-logout\" class=\"btn btn-small\">Salir</button>`;
            const btn = document.getElementById('btn-logout');
            if (btn) btn.addEventListener('click', async ()=>{ try{ await signOut(auth); } catch(e){ console.error(e); showToast('Error al cerrar sesión','error'); } });
        } else {
            authArea.innerHTML = `<button id=\"btn-login\" class=\"btn btn-small\">Iniciar sesión</button>`;
            const btn = document.getElementById('btn-login');
            if (btn) btn.addEventListener('click', async ()=>{ try{ await signInWithPopup(auth, provider); } catch(e){ console.error(e); showToast('Error al iniciar sesión: '+(e.message||e.code||''), 'error'); } });
        }
    }

    onAuthStateChanged(auth, (user)=>{ render(user); });
}
