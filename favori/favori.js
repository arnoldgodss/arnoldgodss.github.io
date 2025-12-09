document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.product-track');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');

    if (!track || !prevButton || !nextButton || track.children.length === 0) {
        return;
    }

    let scrollInterval;
    let isAnimating = false;
    const animationDuration = 0.4;
    const intervalTime = 2200;

    const resetAutoScroll = () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(scrollNext, intervalTime);
    };

    const scrollNext = () => {
        if (isAnimating) return;
        isAnimating = true;

        track.style.transition = `transform ${animationDuration}s ease-in-out`;
        const cardWidth = track.children[0].offsetWidth;
        track.style.transform = `translateX(-${cardWidth}px)`;

        const handleTransitionEnd = () => {
            const firstCard = track.children[0];
            track.style.transition = 'none';
            track.appendChild(firstCard);
            track.style.transform = 'translateX(0)';
            isAnimating = false;
        };
        track.addEventListener('transitionend', handleTransitionEnd, { once: true });
    };

    const scrollPrev = () => {
        if (isAnimating) return;
        isAnimating = true;

        const cardWidth = track.children[0].offsetWidth;
        const lastCard = track.lastElementChild;
        track.style.transition = 'none';
        track.insertBefore(lastCard, track.firstElementChild);
        track.style.transform = `translateX(-${cardWidth}px)`;

        setTimeout(() => {
            track.style.transition = `transform ${animationDuration}s ease-in-out`;
            track.style.transform = 'translateX(0)';
        }, 20);

        const handleTransitionEnd = () => {
            isAnimating = false;
        };
        track.addEventListener('transitionend', handleTransitionEnd, { once: true });
    };
    
    nextButton.addEventListener('click', () => {
        scrollNext();
        resetAutoScroll();
    });

    prevButton.addEventListener('click', () => {
        scrollPrev();
        resetAutoScroll();
    });

    resetAutoScroll();

    const productCardLinks = document.querySelectorAll('.product-card a');
    productCardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });
});