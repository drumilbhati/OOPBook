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
