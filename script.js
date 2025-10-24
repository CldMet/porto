// script.js

document.addEventListener('DOMContentLoaded', () => {
    const scroller = document.getElementById('skillScroller');
    const track = document.getElementById('skillImages');
    if (!scroller || !track) return;

    const clone = track.cloneNode(true);
    track.parentNode.appendChild(clone);

    const imageWidth = 120;
    const oneSetPx = track.children.length * imageWidth;

    let rafId = null;
    let lastTime = 0;
    let accumulated = 0;
    let direction = 0;
    const speedPxPerSec = 150;

    function animate(timestamp) {
        if (!lastTime) lastTime = timestamp;
        const deltaSec = (timestamp - lastTime) / 1000;
        lastTime = timestamp;

        if (direction !== 0) {
            const deltaPx = deltaSec * speedPxPerSec * direction;
            accumulated += deltaPx;
            const offset = accumulated % oneSetPx;
            const move = direction === 1 ? -offset : offset;

            track.style.transform = `translateX(${move}px)`;
            clone.style.transform = `translateX(${move}px)`;
        }
        rafId = requestAnimationFrame(animate);
    }   

    scroller.addEventListener('mouseleave', () => direction = 0);
    scroller.addEventListener('mouseenter', () => direction = 1);

    scroller.addEventListener('touchstart', () => direction = 1);
    scroller.addEventListener('touchend', () => direction = 0);

    rafId = requestAnimationFrame(animate);
    window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId))
});
