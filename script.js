document.addEventListener('DOMContentLoaded', () => {

    const body = document.body;

    const isOverlayOpen = () => {
        return body.classList.contains('search-overlay-is-open') ||
            body.classList.contains('modal-is-open');
    };

    const searchTrigger = document.getElementById('search-trigger');
    const searchOverlay = document.getElementById('fullscreen-search-overlay');
    if (searchTrigger && searchOverlay) {
        const closeSearchBtn = searchOverlay.querySelector('.cancel-btn');
        const fullscreenSearchInput = searchOverlay.querySelector('#fullscreen-search-input');

        const openSearch = () => {
            searchOverlay.classList.add('active');
            body.classList.add('search-overlay-is-open');
            setTimeout(() => fullscreenSearchInput.focus(), 400);
        };
        const closeSearch = () => {
            searchOverlay.classList.remove('active');
            body.classList.remove('search-overlay-is-open');
        };

        searchTrigger.addEventListener('click', openSearch);
        closeSearchBtn.addEventListener('click', closeSearch);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
                closeSearch();
            }
        });
    }

    const authModal = document.getElementById('auth-modal');
    const loginModalTrigger = document.getElementById('login-modal-trigger');
    if (authModal && loginModalTrigger) {
        const closeModalBtn = authModal.querySelector('.close-modal-btn');
        const authViews = authModal.querySelectorAll('.auth-view');
        const formSwitchLinks = authModal.querySelectorAll('.form-link[data-view]');
        const passwordToggles = authModal.querySelectorAll('.password-toggle-btn');
        const modalSignupForm = document.getElementById('modal-signup-form');

        const resetAuthForms = () => {
            const forms = authModal.querySelectorAll('form');
            forms.forEach(form => {
                form.reset();

                const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="tel"]');
                inputs.forEach(input => {
                    input.value = '';
                });
            });

            const errorMessages = authModal.querySelectorAll('.error-message');
            errorMessages.forEach(msg => {
                msg.style.display = 'none';
            });
            const errorInputs = authModal.querySelectorAll('.input-group.error');
            errorInputs.forEach(inputGroup => {
                inputGroup.classList.remove('error');
            });
        };

        const openModal = (e) => {
            e.preventDefault();
            authModal.querySelector('#login-view').classList.add('active');
            authModal.querySelector('#signup-view').classList.remove('active');
            const checkboxes = authModal.querySelectorAll('input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
            authModal.classList.add('active');
            body.classList.add('modal-is-open');
        };

        const closeModal = () => {
            authModal.classList.remove('active');
            body.classList.remove('modal-is-open');
            setTimeout(resetAuthForms, 300);
        };

        loginModalTrigger.addEventListener('click', openModal);
        const extraLoginTriggers = document.querySelectorAll('.login-trigger-button');
        extraLoginTriggers.forEach(trigger => {
            trigger.addEventListener('click', openModal);
        });

        closeModalBtn.addEventListener('click', closeModal);
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && authModal.classList.contains('active')) closeModal();
        });
        formSwitchLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetViewId = link.getAttribute('data-view');
                authViews.forEach(view => {
                    view.classList.remove('active');
                    if (view.id === targetViewId) view.classList.add('active');
                });
            });
        });
        passwordToggles.forEach(btn => {
            btn.addEventListener('click', () => {
                const passwordInput = btn.closest('.input-group').querySelector('input');
                if (passwordInput.type === 'password') {
                    passwordInput.type = 'text';
                    btn.textContent = 'Gizle';
                } else {
                    passwordInput.type = 'password';
                    btn.textContent = 'Göster';
                }
            });
        });

        const daySelect = document.getElementById('modal-signup-day');
        const monthSelect = document.getElementById('modal-signup-month');
        const yearSelect = document.getElementById('modal-signup-year');

        const updateDays = () => {
            const selectedMonth = parseInt(monthSelect.value);
            const selectedYear = parseInt(yearSelect.value);
            const selectedDay = parseInt(daySelect.value);
            daySelect.innerHTML = '<option value="" disabled selected>Gün</option>';
            if (!selectedMonth || !selectedYear) {
                for (let i = 1; i <= 31; i++) {
                    const option = document.createElement('option');
                    option.value = i;
                    option.textContent = i;
                    daySelect.appendChild(option);
                }
                if (selectedDay) daySelect.value = selectedDay;
                return;
            }
            const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
            for (let i = 1; i <= daysInMonth; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }
            if (selectedDay <= daysInMonth) {
                daySelect.value = selectedDay;
            }
        };

        const populateDateDropdowns = () => {
            const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
            for (let i = 1; i <= 31; i++) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                daySelect.appendChild(option);
            }
            months.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = index + 1;
                option.textContent = month;
                monthSelect.appendChild(option);
            });
            const currentYear = new Date().getFullYear();
            for (let i = currentYear; i >= currentYear - 100; i--) {
                const option = document.createElement('option');
                option.value = i;
                option.textContent = i;
                yearSelect.appendChild(option);
            }
            monthSelect.addEventListener('change', updateDays);
            yearSelect.addEventListener('change', updateDays);
        };
        populateDateDropdowns();

        const phoneInput = document.getElementById('modal-signup-phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let cleaned = ('' + e.target.value).replace(/\D/g, '');

                if (cleaned.length > 10) {
                    cleaned = cleaned.substring(0, 10);
                }

                let formatted = '';
                if (cleaned.length > 0) {
                    formatted = cleaned.substring(0, 3);
                }
                if (cleaned.length > 3) {
                    formatted += ' ' + cleaned.substring(3, 6);
                }
                if (cleaned.length > 6) {
                    formatted += ' ' + cleaned.substring(6, 8);
                }
                if (cleaned.length > 8) {
                    formatted += ' ' + cleaned.substring(8, 10);
                }

                e.target.value = formatted;
            });
        }

        if (modalSignupForm) {
            modalSignupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const passwordInput = document.getElementById('modal-signup-password');
                const passwordConfirmInput = document.getElementById('modal-signup-password-confirm');
                const errorContainer = passwordConfirmInput.closest('.input-group');
                const errorMessage = errorContainer.querySelector('.error-message');
                if (passwordInput.value !== passwordConfirmInput.value) {
                    errorContainer.classList.add('error');
                    errorMessage.style.display = 'block';
                } else {
                    errorContainer.classList.remove('error');
                    errorMessage.style.display = 'none';
                }
            });
        }
    }

    const container = document.querySelector('.scroll-container');
    if (container) {
        const sections = document.querySelectorAll('.fullpage-section');
        const navLinks = document.querySelectorAll('.main-nav a');
        const logoLink = document.getElementById('logo-link');
        const totalSections = sections.length;
        let currentSectionIndex = 0;
        let isScrolling = false;
        const updateNav = (activeIndex) => {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (parseInt(link.getAttribute('data-index')) === activeIndex) {
                    link.classList.add('active');
                }
            });
        };
        const goToSection = (index) => {
            if (index >= 0 && index < totalSections) {
                isScrolling = true;
                currentSectionIndex = index;
                container.style.transform = `translateY(-${currentSectionIndex * 100}vh)`;
                updateNav(currentSectionIndex);
                setTimeout(() => { isScrolling = false; }, 1000);
            }
        };
        if (logoLink) {
            logoLink.addEventListener('click', (event) => {
                event.preventDefault();
                goToSection(0);
            });
        }
        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetIndex = parseInt(link.getAttribute('data-index'));
                goToSection(targetIndex);
            });
        });
        document.addEventListener('wheel', event => {
            if (isScrolling || isOverlayOpen()) return;
            const scrollDirection = event.deltaY > 0 ? 1 : -1;
            const newIndex = currentSectionIndex + scrollDirection;
            if (newIndex >= 0 && newIndex < totalSections) {
                goToSection(newIndex);
            }
        });
        let touchstartY = 0;
        document.addEventListener('touchstart', event => {
            touchstartY = event.touches[0].clientY;
        });
        document.addEventListener('touchend', event => {
            if (isScrolling || isOverlayOpen()) return;
            let touchendY = event.changedTouches[0].clientY;
            let swipeDistance = touchstartY - touchendY;
            if (Math.abs(swipeDistance) > 50) {
                const swipeDirection = swipeDistance > 0 ? 1 : -1;
                const newIndex = currentSectionIndex + swipeDirection;
                if (newIndex >= 0 && newIndex < totalSections) {
                    goToSection(newIndex);
                }
            }
        });
        updateNav(currentSectionIndex);
    }


    // FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Close all other items
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});