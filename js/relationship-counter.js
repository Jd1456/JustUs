(function(){
    const START_DATE = '2024-10-24'; // AAAA-MM-DD

    function daysInMonth(year, monthIndex){
        return new Date(year, monthIndex + 1, 0).getDate();
    }

    function diffDates(start, end){
        let sy = start.getFullYear(), sm = start.getMonth(), sd = start.getDate();
        let ey = end.getFullYear(), em = end.getMonth(), ed = end.getDate();

        let years = ey - sy;
        let months = em - sm;
        let days = ed - sd;

        if (days < 0){
            const prevMonthIndex = (em - 1 + 12) % 12;
            const prevMonthYear = em === 0 ? ey - 1 : ey;
            const prevMonthDays = daysInMonth(prevMonthYear, prevMonthIndex);
            days += prevMonthDays;
            months -= 1;
        }
        if (months < 0){
            months += 12;
            years -= 1;
        }
        if (years < 0){ years = months = days = 0; }
        return { years, months, days };
    }

    function plural(n, s, p){ return n === 1 ? `${n} ${s}` : `${n} ${p}`; }

    function formatDiff(d){
        const parts = [];
        if (d.years) parts.push(plural(d.years, 'año', 'años'));
        if (d.months) parts.push(plural(d.months, 'mes', 'meses'));
        if (d.days || parts.length === 0) parts.push(plural(d.days, 'día', 'días'));
        return parts.join(', ');
    }

    function render(){
        const el = document.getElementById('relationship-counter');
        if (!el) return;
        const now = new Date();
        const start = new Date(START_DATE + 'T00:00:00');
        const diff = diffDates(start, now);
        const totalDays = Math.floor((now - start) / (1000 * 60 * 60 * 24));
        const parts = [];
        if (diff.years) parts.push(`<strong>${diff.years}</strong> ${diff.years === 1 ? 'año' : 'años'}`);
        if (diff.months) parts.push(`<strong>${diff.months}</strong> ${diff.months === 1 ? 'mes' : 'meses'}`);
        if (diff.days || parts.length === 0) parts.push(`<strong>${diff.days}</strong> ${diff.days === 1 ? 'día' : 'días'}`);
        el.innerHTML = `<span class="heart-inline">❤</span> <span class="counter-text">Llevamos ${parts.join(', ')} juntos</span><small>Vamos en: <strong>${totalDays} días</strong></small>`;
    }

    document.addEventListener('DOMContentLoaded', ()=>{
        let el = document.getElementById('relationship-counter');
        if (!el){
            el = document.createElement('div');
            el.id = 'relationship-counter';
            el.className = 'relationship-counter';
            el.setAttribute('role','status');
            el.setAttribute('aria-live','polite');
            document.body.appendChild(el);
        }
        render();
        // abrir modal con detalles al hacer clic
        el.style.cursor = 'pointer';
        el.addEventListener('click', openDetails);

        // actualizar cada minuto
        setInterval(render, 60 * 1000);

        // cerrar modal con escape
        document.addEventListener('keydown', (e)=>{ if (e.key === 'Escape') closeModal(); });
    });

    function closeModal(){
        const existing = document.getElementById('relationship-modal');
        if (existing) existing.remove();
    }

    function openDetails(){
        closeModal();
        const now = new Date();
        const start = new Date(START_DATE + 'T00:00:00');
        const diff = diffDates(start, now);
        const modal = document.createElement('div');
        modal.id = 'relationship-modal';
        modal.className = 'relationship-modal';
        modal.innerHTML = `
            <div class="modal-card">
                <h3>Nuestra historia</h3>
                <p><strong>Inicio:</strong> ${START_DATE}</p>
                <p><strong>Tiempo juntos:</strong> ${diff.years} ${diff.years === 1 ? 'año' : 'años'}, ${diff.months} ${diff.months === 1 ? 'mes' : 'meses'} y ${diff.days} ${diff.days === 1 ? 'día' : 'días'}</p>
                <button class="close-btn" onclick="(function(){document.getElementById('relationship-modal')?.remove()})()">Cerrar</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
})();