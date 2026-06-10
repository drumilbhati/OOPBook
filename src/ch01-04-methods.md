# Methods: Pass-by-Value and Memory Management

Methods are the building blocks of behavior in Java. Understanding how Java handles arguments and memory during method execution is vital for debugging side effects in complex systems.

### The Great Debate: Pass-by-Value
There is a common misconception that Java is "Pass-by-Reference" for objects. **This is false.** Java is strictly **Pass-by-Value**.

- For **Primitives**, the actual value is copied.
- For **Objects**, the *value of the reference* (the memory address) is copied.

```java
void modify(int x, Balloon b) {
    x = 100; // Original 'x' remains unchanged
    b.setColor("Red"); // Original balloon's color changes (we followed the copied address)
    b = new Balloon("Blue"); // Original 'b' reference in the caller still points to the Red balloon
}
```

### Stack vs. Heap: A Closer Look
1.  **Stack:** Used for method execution. It stores primitive local variables and the references to objects. Each thread has its own Stack. When a method finishes, its "Stack Frame" is popped, and memory is reclaimed instantly.
2.  **Heap:** Used for dynamic memory allocation. All objects live here. The Heap is shared among all threads. Memory is reclaimed by the **Garbage Collector (GC)** when objects are no longer reachable.

### Why this matters for LLD?
- **Thread Safety:** Variables on the Stack are thread-safe (local to the thread). Objects on the Heap are not; they require synchronization if accessed by multiple threads.
- **Memory Leaks:** If you keep a reference to an object on the Heap longer than needed (e.g., in a static collection), the GC cannot reclaim it, leading to a memory leak.

> **Best Practice:** Keep method scopes small. This ensures Stack frames are cleared quickly and helps the JIT compiler optimize your code.

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In Java, what happens when you pass an object to a method? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_meth_1" id="q_meth_1_a" data-correct="false"><label for="q_meth_1_a">A copy of the entire object is created on the Stack.</label></li>
<li class="quiz-option"><input type="radio" name="q_meth_1" id="q_meth_1_b" data-correct="true"><label for="q_meth_1_b">A copy of the reference (memory address) is passed by value.</label></li>
<li class="quiz-option"><input type="radio" name="q_meth_1" id="q_meth_1_c" data-correct="false"><label for="q_meth_1_c">The original reference is used (Pass-by-Reference).</label></li>
<li class="quiz-option"><input type="radio" name="q_meth_1" id="q_meth_1_d" data-correct="false"><label for="q_meth_1_d">The object is moved from the caller's stack to the callee's stack.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answers</button>
</div>

