# 1. Thread-Safe Generic Stack

**Difficulty:** Easy

### Scenario
Design a generic stack data structure in Java that supports standard operations (`push`, `pop`, `peek`, `isEmpty`, `size`) and is thread-safe for concurrent read/write operations.

### Requirements
*   **Generics:** Stack must support any reference type `T`.
*   **Thread Safety:** Allow concurrent read operations (`peek`, `isEmpty`, `size`) while keeping writes (`push`, `pop`) exclusive.
*   **Edge Cases:** Throw a custom or standard empty stack exception when popping or peeking from an empty stack.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
Using `ReentrantReadWriteLock` lets multiple threads execute concurrent read-only queries safely, while write locks ensure exclusive thread access during write operations.

### Java Implementation
```java
import java.util.ArrayList;
import java.util.EmptyStackException;
import java.util.List;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ConcurrentStack<T> {
    private final List<T> list = new ArrayList<>();
    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();

    public void push(T item) {
        rwl.writeLock().lock();
        try {
            list.add(item);
        } finally {
            rwl.writeLock().unlock();
        }
    }

    public T pop() {
        rwl.writeLock().lock();
        try {
            if (list.isEmpty()) {
                throw new EmptyStackException();
            }
            return list.remove(list.size() - 1);
        } finally {
            rwl.writeLock().unlock();
        }
    }

    public T peek() {
        rwl.readLock().lock();
        try {
            if (list.isEmpty()) {
                throw new EmptyStackException();
            }
            return list.get(list.size() - 1);
        } finally {
            rwl.readLock().unlock();
        }
    }

    public boolean isEmpty() {
        rwl.readLock().lock();
        try {
            return list.isEmpty();
        } finally {
            rwl.readLock().unlock();
        }
    }

    public int size() {
        rwl.readLock().lock();
        try {
            return list.size();
        } finally {
            rwl.readLock().unlock();
        }
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. Under what condition is using ReentrantReadWriteLock more performant than a simple synchronized block? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_01_1" id="q_ch09_01_1_a" data-correct="false"><label for="q_ch09_01_1_a">A) When there are only write threads updating the stack.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_01_1" id="q_ch09_01_1_b" data-correct="true"><label for="q_ch09_01_1_b">B) When read operations significantly outnumber write operations, allowing multiple read threads to work concurrently.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_01_1" id="q_ch09_01_1_c" data-correct="false"><label for="q_ch09_01_1_c">C) In single-threaded applications.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_01_1" id="q_ch09_01_1_d" data-correct="false"><label for="q_ch09_01_1_d">D) When memory capacity is the primary constraint.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
