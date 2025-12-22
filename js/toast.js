// Sistema para las alertas, no me gusta como se ven con el Alert entonces uso toasts
export function showToast(message, type = 'info', duration = 4000) {
    if (!message) return;
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);
    void toast.offsetWidth;
    toast.classList.add('toast-show');

    const timeout = setTimeout(() => {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    }, duration);

    // Clic para cerrar
    toast.addEventListener('click', () => {
        clearTimeout(timeout);
        toast.remove();
    });
}
