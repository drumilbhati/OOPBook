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
    const RESTORE_RETRY_MS = 100;
    const RESTORE_MAX_MS = 5000;
    const RESTORE_STABLE_CHECKS = 5;
    const RESTORE_TOLERANCE_PX = 4;

    const bookmarkToggle = document.getElementById('oopbook-bookmark-toggle');
    const bookmarkMenu = document.getElementById('oopbook-bookmark-menu');
    const statusText = document.getElementById('oopbook-bookmark-status');
    const goButton = document.getElementById('oopbook-bookmark-go');
    const saveButton = document.getElementById('oopbook-bookmark-save');
    const contentRoot = document.querySelector('#mdbook-content main');

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

    function emptyReaderState() {
        return {
            bookmark: null,
            highlights: {},
        };
    }

    function normalizeReaderState(parsed) {
        if (!parsed || typeof parsed !== 'object') {
            return emptyReaderState();
        }

        if ('bookmark' in parsed || 'highlights' in parsed) {
            return {
                bookmark: parsed.bookmark || null,
                highlights: parsed.highlights && typeof parsed.highlights === 'object' ? parsed.highlights : {},
            };
        }

        return {
            bookmark: parsed,
            highlights: {},
        };
    }

    function readReaderState() {
        const raw = storageGet(BOOKMARK_KEY);
        if (!raw) {
            return emptyReaderState();
        }

        try {
            const parsed = JSON.parse(raw);
            return normalizeReaderState(parsed);
        } catch (error) {
            return emptyReaderState();
        }
    }

    function writeReaderState(state) {
        storageSet(BOOKMARK_KEY, JSON.stringify({
            bookmark: state.bookmark || null,
            highlights: state.highlights || {},
        }));
    }

    function readBookmark() {
        return readReaderState().bookmark;
    }

    function writeBookmark(bookmark) {
        if (!bookmark) {
            return;
        }

        const state = readReaderState();
        state.bookmark = bookmark;
        writeReaderState(state);
    }

    function maxScroll() {
        return Math.max(
            document.documentElement.scrollHeight - window.innerHeight,
            document.body.scrollHeight - window.innerHeight,
            0
        );
    }

    function targetScrollY(bookmark) {
        return Math.max(bookmark.scrollY || 0, 0);
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

    function clearPendingBookmark() {
        try {
            localStorage.removeItem(PENDING_KEY);
        } catch (error) {
            // Ignore storage cleanup errors.
        }
    }

    function safeBookmarkUrl(bookmark) {
        if (!bookmark || typeof bookmark.href !== 'string') {
            return null;
        }

        try {
            const url = new URL(bookmark.href, window.location.href);
            const isSafeProtocol = url.protocol === 'http:' || url.protocol === 'https:';
            const isSameOrigin = url.origin === window.location.origin;

            return isSafeProtocol && isSameOrigin ? url : null;
        } catch (error) {
            return null;
        }
    }

    function goToBookmark() {
        const saved = readBookmark();
        if (!saved) {
            return;
        }

        const targetUrl = safeBookmarkUrl(saved);
        if (!targetUrl) {
            return;
        }

        if (saved.path === currentPath()) {
            restoreBookmark(saved);
            return;
        }

        storageSet(PENDING_KEY, JSON.stringify(saved));
        window.location.href = targetUrl.href;
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
                retryRestorePendingBookmark(pendingBookmark);
            }
        } catch (error) {
            clearPendingBookmark();
            // Ignore invalid pending bookmark data.
        }
    }

    function retryRestorePendingBookmark(bookmark) {
        const startedAt = Date.now();
        let lastHeight = 0;
        let stableChecks = 0;

        function attemptRestore() {
            const currentHeight = document.documentElement.scrollHeight;
            stableChecks = currentHeight === lastHeight ? stableChecks + 1 : 0;
            lastHeight = currentHeight;

            const targetY = targetScrollY(bookmark);
            window.scrollTo({ top: targetY, behavior: 'auto' });

            const currentY = window.scrollY || document.documentElement.scrollTop || 0;
            const isRestored = Math.abs(currentY - targetY) <= RESTORE_TOLERANCE_PX;
            if (isRestored) {
                clearPendingBookmark();
                return;
            }

            const timedOut = Date.now() - startedAt >= RESTORE_MAX_MS;
            const heightStabilized = stableChecks >= RESTORE_STABLE_CHECKS;
            if (!timedOut && !heightStabilized) {
                window.setTimeout(attemptRestore, RESTORE_RETRY_MS);
                return;
            }

            clearPendingBookmark();
        }

        attemptRestore();
    }

    function pageHighlights() {
        const state = readReaderState();
        return Array.isArray(state.highlights[currentPath()]) ? state.highlights[currentPath()] : [];
    }

    function writePageHighlights(highlights) {
        const state = readReaderState();
        state.highlights[currentPath()] = highlights;
        writeReaderState(state);
    }

    function closestElement(node) {
        return node && node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    }

    function allowedHighlightBlock(node) {
        const element = closestElement(node);
        return element ? element.closest('p, li, blockquote, dd, dt, td, th, h1, h2, h3, h4, h5, h6') : null;
    }

    function selectionCanBeHighlighted(range) {
        if (!contentRoot || !contentRoot.contains(range.commonAncestorContainer)) {
            return false;
        }

        const startElement = closestElement(range.startContainer);
        const endElement = closestElement(range.endContainer);
        if (!startElement || !endElement) {
            return false;
        }

        if (
            startElement.closest('pre, code, button, input, textarea, select') ||
            endElement.closest('pre, code, button, input, textarea, select') ||
            startElement.closest('mark.oopbook-highlight') ||
            endElement.closest('mark.oopbook-highlight')
        ) {
            return false;
        }

        return allowedHighlightBlock(range.startContainer) === allowedHighlightBlock(range.endContainer);
    }

    function textOffsetFor(node, offset) {
        const range = document.createRange();
        range.setStart(contentRoot, 0);
        range.setEnd(node, offset);
        return range.toString().length;
    }

    function rangeFromTextOffsets(startOffset, endOffset) {
        if (!Number.isFinite(startOffset) || !Number.isFinite(endOffset) || startOffset >= endOffset) {
            return null;
        }

        const walker = document.createTreeWalker(contentRoot, NodeFilter.SHOW_TEXT);
        const range = document.createRange();
        let currentOffset = 0;
        let startSet = false;
        let endSet = false;
        let node = walker.nextNode();

        while (node) {
            const nextOffset = currentOffset + node.nodeValue.length;

            if (!startSet && startOffset >= currentOffset && startOffset <= nextOffset) {
                range.setStart(node, startOffset - currentOffset);
                startSet = true;
            }

            if (!endSet && endOffset >= currentOffset && endOffset <= nextOffset) {
                range.setEnd(node, endOffset - currentOffset);
                endSet = true;
                break;
            }

            currentOffset = nextOffset;
            node = walker.nextNode();
        }

        return startSet && endSet ? range : null;
    }

    function matchingRangeForHighlight(highlight) {
        const text = typeof highlight.text === 'string' ? highlight.text : '';
        const prefix = typeof highlight.prefix === 'string' ? highlight.prefix : '';
        const suffix = typeof highlight.suffix === 'string' ? highlight.suffix : '';
        if (!text) {
            return null;
        }

        let range = rangeFromTextOffsets(highlight.startOffset, highlight.endOffset);
        if (range && range.toString() === text) {
            return range;
        }

        const fullText = contentRoot.textContent;
        let index = fullText.indexOf(text);
        while (index !== -1) {
            const prefixStart = Math.max(0, index - prefix.length);
            const currentPrefix = fullText.slice(prefixStart, index);
            const currentSuffix = fullText.slice(index + text.length, index + text.length + suffix.length);

            if (currentPrefix.endsWith(prefix) && currentSuffix.startsWith(suffix)) {
                range = rangeFromTextOffsets(index, index + text.length);
                if (range) {
                    return range;
                }
            }

            index = fullText.indexOf(text, index + text.length);
        }

        return null;
    }

    function applyHighlight(highlight) {
        if (!contentRoot || !highlight.text) {
            return;
        }

        const range = matchingRangeForHighlight(highlight);
        if (!range || !selectionCanBeHighlighted(range)) {
            return;
        }

        const mark = document.createElement('mark');
        mark.className = 'oopbook-highlight';
        mark.dataset.highlightId = highlight.id;
        mark.title = 'Click to remove highlight';

        try {
            const fragment = range.extractContents();
            mark.appendChild(fragment);
            range.insertNode(mark);
        } catch (error) {
            // Ignore ranges that cannot be safely wrapped.
        }
    }

    function restoreHighlights() {
        if (!contentRoot) {
            return;
        }

        pageHighlights()
            .slice()
            .sort((first, second) => second.startOffset - first.startOffset)
            .forEach(applyHighlight);
    }

    function selectedHighlightData(range) {
        const startOffset = textOffsetFor(range.startContainer, range.startOffset);
        const endOffset = textOffsetFor(range.endContainer, range.endOffset);
        const text = range.toString();
        const fullText = contentRoot.textContent;

        return {
            id: `hl-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            text,
            startOffset,
            endOffset,
            prefix: fullText.slice(Math.max(0, startOffset - 40), startOffset),
            suffix: fullText.slice(endOffset, endOffset + 40),
            createdAt: new Date().toISOString(),
        };
    }

    function saveHighlightFromRange(range) {
        const highlight = selectedHighlightData(range);
        if (!highlight.text.trim()) {
            return;
        }

        const highlights = pageHighlights();
        highlights.push(highlight);
        writePageHighlights(highlights);
        applyHighlight(highlight);
    }

    function removeHighlight(mark) {
        const highlightId = mark.dataset.highlightId;
        const highlights = pageHighlights().filter(highlight => highlight.id !== highlightId);
        writePageHighlights(highlights);
        mark.replaceWith(...mark.childNodes);
    }

    function initHighlighter() {
        if (!contentRoot) {
            return;
        }

        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'oopbook-highlight-button';
        button.textContent = 'Highlight';
        button.hidden = true;
        document.body.appendChild(button);

        let activeRange = null;

        function hideButton() {
            button.hidden = true;
            activeRange = null;
        }

        function updateButton() {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0 || selection.isCollapsed) {
                hideButton();
                return;
            }

            const range = selection.getRangeAt(0);
            if (!selectionCanBeHighlighted(range) || !range.toString().trim()) {
                hideButton();
                return;
            }

            activeRange = range.cloneRange();
            const rect = range.getBoundingClientRect();
            button.style.left = `${window.scrollX + rect.left + (rect.width / 2)}px`;
            button.style.top = `${window.scrollY + rect.top - 38}px`;
            button.hidden = false;
        }

        button.addEventListener('mousedown', event => event.preventDefault());
        button.addEventListener('click', () => {
            if (activeRange) {
                saveHighlightFromRange(activeRange);
            }

            const selection = window.getSelection();
            if (selection) {
                selection.removeAllRanges();
            }
            hideButton();
        });

        contentRoot.addEventListener('mouseup', () => window.setTimeout(updateButton, 0));
        contentRoot.addEventListener('keyup', updateButton);
        document.addEventListener('scroll', hideButton, { passive: true });
        document.addEventListener('click', event => {
            const target = closestElement(event.target);
            const mark = target ? target.closest('mark.oopbook-highlight') : null;
            if (mark && contentRoot.contains(mark)) {
                removeHighlight(mark);
            }
        });

        restoreHighlights();
    }

    bookmarkMenu.style.display = 'none';
    updateActionStates();
    restorePendingBookmark();
    initHighlighter();

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
