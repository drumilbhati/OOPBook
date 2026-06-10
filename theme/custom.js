// Event delegation for Quiz Interactivity
// This ensures quizzes work even when navigating between chapters via mdBook's AJAX mechanism.
document.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('quiz-check-btn')) {
        const container = e.target.closest('.quiz-container');
        if (!container) return;

        const selectedOption = container.querySelector('input[type="radio"]:checked');
        const feedback = container.querySelector('.quiz-feedback');
        
        if (!selectedOption) {
            feedback.textContent = "Please select an answer.";
            feedback.style.display = "block";
            feedback.className = "quiz-feedback incorrect";
            return;
        }
        
        const isCorrect = selectedOption.dataset.correct === "true";
        
        if (isCorrect) {
            feedback.textContent = "Correct! Well done.";
            feedback.className = "quiz-feedback correct";
        } else {
            feedback.textContent = "Incorrect. Try again!";
            feedback.className = "quiz-feedback incorrect";
        }
        feedback.style.display = "block";
    }
});
