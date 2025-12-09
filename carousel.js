document.addEventListener('DOMContentLoaded', () => {
    // YENİ KOD BLOĞUNUN SONU
    // --- Gerekli HTML elemanlarını seçme ---
    const track = document.querySelector('.product-track');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');

    // Eğer sayfada karusel yoksa, script'in çalışmasını durdur.
    if (!track || !prevButton || !nextButton || track.children.length === 0) {
        return;
    }

    // --- Değişkenler ---
    let scrollInterval;
    let isAnimating = false;
    const animationDuration = 0.4; // saniye
    const intervalTime = 2500; // milisaniye

    // --- Fonksiyonlar ---

    // Otomatik kaydırmayı sıfırlayıp yeniden başlatan fonksiyon
    const resetAutoScroll = () => {
        clearInterval(scrollInterval);
        scrollInterval = setInterval(scrollNext, intervalTime);
    };

    // Karuseli bir sonraki elemana kaydıran fonksiyon
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

    // Karuseli bir önceki elemana kaydıran fonksiyon
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

    // Kullanıcının giriş yapıp yapmadığını kontrol eden (şimdilik sahte) fonksiyon
    function isUserLoggedIn() {
        // GERÇEK PROJEDE BURASI DEĞİŞECEK
        // Örn: return localStorage.getItem('userToken') !== null;
        return false;
    }

    // --- Olay Dinleyicileri (Event Listeners) ---

    // İleri butonuna tıklandığında
    nextButton.addEventListener('click', () => {
        scrollNext();
        resetAutoScroll(); // Otomatik kaydırmayı sıfırla
    });

    // Geri butonuna tıklandığında
    prevButton.addEventListener('click', () => {
        scrollPrev();
        resetAutoScroll(); // Otomatik kaydırmayı sıfırla
    });

    // Favori butonlarına tıklama mantığı (sepet.js'den geldi)
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            if (isUserLoggedIn()) {
                button.classList.toggle('favorited');
                // Gerçek projede burada API'ye istek atılır
            } else {
                // Eğer script.js'deki openModal fonksiyonu varsa onu çağır
                if (typeof openModal === 'function') {
                    openModal(event);
                }
            }
        });
    });

    // Ürün kartı linklerinin varsayılan davranışını engelleme
    const productCardLinks = document.querySelectorAll('.product-card a');
    productCardLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
        });
    });

    // --- Başlangıç ---
    resetAutoScroll(); // Sayfa yüklendiğinde otomatik kaydırmayı başlat
});