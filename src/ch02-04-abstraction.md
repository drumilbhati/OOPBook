# Abstraction: Hiding Complexity

Abstraction is the process of hiding the internal details and showing only the functionality. It helps reduce complexity by allowing the developer to focus on *what* an object does rather than *how* it does it.

### Abstract Classes vs Interfaces

This is perhaps the most important architectural choice in LLD.

| Feature | Abstract Class | Interface |
| :--- | :--- | :--- |
| **Relationship** | "is-a" | "can-do" (Contract) |
| **Methods** | Can have both abstract and concrete methods. | Mostly abstract (until Java 8). Now can have `default` and `static`. |
| **State** | Can have instance variables (fields). | Can only have constants (`public static final`). |
| **Inheritance** | Single inheritance. | Multiple inheritance (can implement many). |
| **Constructor** | Can have constructors. | Cannot have constructors. |

### When to use which?
- Use **Abstract Classes** when you have a common base with shared state or complex logic that subclasses should inherit.
- Use **Interfaces** when you want to define a contract that unrelated classes can implement (e.g., `Serializable`, `Comparable`).

```java
// Interface for behavior
interface Flyable {
    void fly();
}

// Abstract class for identity
abstract class Bird {
    abstract void eat();
    void breath() { System.out.println("Breathing..."); }
}

class Eagle extends Bird implements Flyable {
    void eat() { System.out.println("Eating meat"); }
    public void fly() { System.out.println("Flying high"); }
}
```

### Abstraction in System Design
In LLD, always **Program to an Interface, not an Implementation**. This decouples your high-level logic from low-level details. For example, your `PaymentService` should depend on a `PaymentGateway` interface, not a specific `StripeGateway` class. This allows you to swap Stripe for PayPal without changing your core service logic.

## Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">Which of the following can have instance variables (non-static, non-final fields)? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_abs_1" id="q_abs_1_a" data-correct="true"><label for="q_abs_1_a">Abstract Class</label></li>
<li class="quiz-option"><input type="radio" name="q_abs_1" id="q_abs_1_b" data-correct="false"><label for="q_abs_1_b">Interface</label></li>
<li class="quiz-option"><input type="radio" name="q_abs_1" id="q_abs_1_c" data-correct="false"><label for="q_abs_1_c">Both</label></li>
<li class="quiz-option"><input type="radio" name="q_abs_1" id="q_abs_1_d" data-correct="false"><label for="q_abs_1_d">Neither</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
