# Real-World LLD Case Studies

In this chapter, we will look at how to apply everything we've learned—SOLID principles, design patterns, and UML—to solve comprehensive Low-Level Design (LLD) problems. These are the types of questions frequently asked in senior engineering interviews at top tech companies.

---

## Programming Exercise: LLD: Design a Stack Overflow

**Scenario:** Design a question-and-answer platform similar to Stack Overflow.

**Requirements:**
1. **Users:** Can post questions, answer questions, and add comments.
2. **Voting:** Users can upvote or downvote questions and answers.
3. **Reputation:** Users earn or lose reputation points based on the votes their posts receive.
4. **Notifications:** Users should be notified when their questions are answered or when someone comments on their posts.
5. **Search:** Support searching for questions by tags, text, or user.

**Pattern Interaction Task:**
Explain how the following patterns would interact in this system:
- **Observer Pattern:** For the notification system.
- **Strategy Pattern:** For different search and ranking algorithms.
- **State Pattern:** To manage the status of a question (e.g., Open, Closed, Flagged, Duplicate).
- **Factory Pattern:** To create different types of "Post" objects (Question, Answer, Comment).

<details>
<summary>View Solution & Pattern Analysis</summary>

### Pattern Interactions:

1.  **Observer Pattern:**
    *   The `Question` and `Answer` objects act as **Subjects**.
    *   The `User` or a `NotificationService` acts as an **Observer**.
    *   When a new answer is added to a `Question`, it notifies all registered observers (the question author and anyone "following" the question).

2.  **Strategy Pattern:**
    *   The `SearchEngine` uses a `SearchStrategy` interface.
    *   Concrete strategies include `TagSearchStrategy`, `TextSearchStrategy`, and `UserSearchStrategy`.
    *   This allows the system to switch between simple database queries and complex full-text search engines (like Elasticsearch) without changing the core business logic.

3.  **State Pattern:**
    *   A `Question` has a `QuestionState` object.
    *   States like `OpenState`, `ClosedState`, and `ArchiveState` define what actions are allowed (e.g., you can't add an answer to a `ClosedState` question).

4.  **Factory Pattern:**
    *   A `PostFactory` can be used to instantiate `Question`, `Answer`, or `Comment` objects, ensuring that common initialization logic (like setting timestamps or initial reputation) is centralized.

### High-Level Class Structure:

```java
// Simplified Structure
interface Post {
    void addVote(int value);
    User getAuthor();
}

class Question implements Post {
    private List<Answer> answers;
    private List<Observer> observers;
    private QuestionState state;
    
    public void addAnswer(Answer a) {
        if(state.canAddAnswer()) {
            answers.add(a);
            notifyObservers("New answer added!");
        }
    }
    
    private void notifyObservers(String message) {
        observers.forEach(o -> o.update(message));
    }
}

class SearchService {
    private SearchStrategy strategy;
    public List<Question> search(String query) {
        return strategy.execute(query);
    }
}
```

</details>

---

### Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Why are Case Studies important in Low-Level Design? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q08_00_1" id="q08_00_1_a" data-correct="false"><label for="q08_00_1_a">A) To memorize specific code implementations for interviews.</label></li>
            <li class="quiz-option"><input type="radio" name="q08_00_1" id="q08_00_1_b" data-correct="true"><label for="q08_00_1_b">B) To see how design principles and patterns are applied together to solve complex, real-world problems.</label></li>
            <li class="quiz-option"><input type="radio" name="q08_00_1" id="q08_00_1_c" data-correct="false"><label for="q08_00_1_c">C) To avoid having to write any original code.</label></li>
        </ul>
    </div>
    <div class="quiz-feedback-main"></div>
    <button class="quiz-check-btn">Check Answer</button>
</div>
