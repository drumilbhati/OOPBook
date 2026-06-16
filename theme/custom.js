// Event delegation for Multi-Question Quiz Interactivity
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('quiz-check-btn')) {
        const container = e.target.closest('.quiz-container');
        if (!container) return;

        const questionWrappers = container.querySelectorAll('.quiz-question-wrapper');
        let totalQuestions = questionWrappers.length;
        let correctCount = 0;
        let answeredCount = 0;

        questionWrappers.forEach(wrapper => {
            const selectedOption = wrapper.querySelector('input[type="radio"]:checked');
            const feedback = wrapper.querySelector('.quiz-feedback-inline');
            
            if (selectedOption) {
                answeredCount++;
                const isCorrect = selectedOption.dataset.correct === "true";
                if (isCorrect) {
                    correctCount++;
                    feedback.textContent = "✓ Correct";
                    feedback.className = "quiz-feedback-inline correct";
                } else {
                    feedback.textContent = "✗ Incorrect";
                    feedback.className = "quiz-feedback-inline incorrect";
                }
                feedback.style.display = "inline-block";
            } else {
                feedback.textContent = "! Missing";
                feedback.className = "quiz-feedback-inline warning";
                feedback.style.display = "inline-block";
            }
        });

        const mainFeedback = container.querySelector('.quiz-feedback-main');
        if (answeredCount < totalQuestions) {
            mainFeedback.textContent = `Please answer all questions. (${answeredCount}/${totalQuestions} completed)`;
            mainFeedback.className = "quiz-feedback-main warning";
        } else {
            mainFeedback.textContent = `Quiz Complete! You got ${correctCount} out of ${totalQuestions} correct.`;
            mainFeedback.className = correctCount === totalQuestions ? "quiz-feedback-main correct" : "quiz-feedback-main incorrect";
        }
        mainFeedback.style.display = "block";
    }
});

(function readingProgressBookmark() {
    const BOOKMARK_KEY = 'oopbook-bookmark';
    const PENDING_KEY = 'oopbook-pending-bookmark';

    const bookmarkToggle = document.getElementById('oopbook-bookmark-toggle');
    const bookmarkMenu = document.getElementById('oopbook-bookmark-menu');
    const statusText = document.getElementById('oopbook-bookmark-status');
    const goButton = document.getElementById('oopbook-bookmark-go');
    const saveButton = document.getElementById('oopbook-bookmark-save');

    if (!bookmarkToggle || !bookmarkMenu || !statusText || !goButton || !saveButton) {
        return;
    }

    function storageGet(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function storageSet(key, value) {
        try {
            localStorage.setItem(key, value);
            return true;
        } catch (error) {
            return false;
        }
    }

    function currentPath() {
        return window.location.pathname.replace(/\/index\.html$/, '/');
    }

    function formatPathLabel(path) {
        const cleanPath = path
            .replace(/\/index\.html$/, '/')
            .replace(/^\//, '')
            .replace(/\/$/, '');

        return cleanPath || 'Home';
    }

    function readBookmark() {
        const raw = storageGet(BOOKMARK_KEY);
        if (!raw) {
            return null;
        }

        try {
            const parsed = JSON.parse(raw);
            return parsed && typeof parsed === 'object' ? parsed : null;
        } catch (error) {
            return null;
        }
    }

    function writeBookmark(bookmark) {
        if (!bookmark) {
            return;
        }

        storageSet(BOOKMARK_KEY, JSON.stringify(bookmark));
    }

    function maxScroll() {
        return Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            document.body.scrollHeight - window.innerHeight,
            0
        );
    }

    function getCurrentBookmark() {
        const max = maxScroll();
        const scrollY = Math.max(window.scrollY || document.documentElement.scrollTop || 0, 0);
        const scrollPercent = max > 0 ? Math.min((scrollY / max) * 100, 100) : 0;

        return {
            path: currentPath(),
            title: document.title,
            href: `${window.location.origin}${currentPath()}${window.location.search}`,
            scrollY: Math.round(scrollY),
            scrollPercent: Math.round(scrollPercent * 10) / 10,
            updatedAt: new Date().toISOString(),
        };
    }

    function updateActionStates() {
        const saved = readBookmark();

        bookmarkToggle.classList.toggle('oopbook-bookmark-active', Boolean(saved));
        goButton.disabled = !saved;

        if (!saved) {
            statusText.textContent = 'No bookmark saved';
            return;
        }

        const locationLabel = `${saved.title} (${formatPathLabel(saved.path)})`;
        statusText.textContent = `${locationLabel} at ${saved.scrollPercent || 0}%`;
    }

    function saveCurrentState() {
        writeBookmark(getCurrentBookmark());
        updateActionStates();
    }

    function restoreBookmark(bookmark) {
        if (!bookmark) {
            return;
        }

        const targetY = Math.min(bookmark.scrollY || 0, maxScroll());
        window.scrollTo({ top: targetY, behavior: 'smooth' });
    }

    function goToBookmark() {
        const saved = readBookmark();
        if (!saved) {
            return;
        }

        if (saved.path === currentPath()) {
            restoreBookmark(saved);
            return;
        }

        storageSet(PENDING_KEY, JSON.stringify(saved));
        window.location.href = saved.href;
    }

    function toggleMenu(forceOpen) {
        const isOpen = bookmarkMenu.style.display === 'block';
        const shouldOpen = typeof forceOpen === 'boolean' ? forceOpen : !isOpen;

        bookmarkMenu.style.display = shouldOpen ? 'block' : 'none';
        bookmarkToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
    }

    function restorePendingBookmark() {
        const raw = storageGet(PENDING_KEY);
        if (!raw) {
            return;
        }

        try {
            const pendingBookmark = JSON.parse(raw);
            if (pendingBookmark && pendingBookmark.path === currentPath()) {
                window.setTimeout(() => restoreBookmark(pendingBookmark), 150);
            }
        } catch (error) {
            // Ignore invalid pending bookmark data.
        }

        try {
            localStorage.removeItem(PENDING_KEY);
        } catch (error) {
            // Ignore storage cleanup errors.
        }
    }

    bookmarkMenu.style.display = 'none';
    updateActionStates();
    restorePendingBookmark();

    bookmarkToggle.addEventListener('click', event => {
        event.stopPropagation();
        toggleMenu();
    });

    bookmarkMenu.addEventListener('click', event => {
        event.stopPropagation();
    });

    document.addEventListener('click', event => {
        if (!bookmarkMenu.contains(event.target) && event.target !== bookmarkToggle) {
            toggleMenu(false);
        }
    });

    goButton.addEventListener('click', goToBookmark);
    saveButton.addEventListener('click', saveCurrentState);
})();
