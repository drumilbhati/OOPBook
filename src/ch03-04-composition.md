# Composition over Inheritance

One of the most important lessons in Low-Level Design is choosing the right relationship between classes. While inheritance is a core pillar of OOP, overusing it often leads to rigid and fragile code.

## The "Is-a" vs "Has-a" Debate

- **Inheritance (Is-a):** Represents a strict hierarchy. A `Dog` *is a* `Mammal`.
- **Composition (Has-a):** Represents a component-based approach. A `Car` *has an* `Engine`.

### The Problem with Inheritance

Inheritance is **static**. You cannot change the parent class of an object at runtime. Furthermore, it exposes the subclass to the implementation details of the parent, often called the "Fragile Base Class" problem.

Imagine a `Bird` class. You create `FlyingBird` and `NonFlyingBird` subclasses. What happens if you need to add `Swimming` behavior? You end up with a combinatorial explosion of classes: `FlyingSwimmingBird`, `NonFlyingSwimmingBird`, etc.

### The Power of Composition

Composition allows you to build complex behavior by combining simple, independent components.

```java
// Interfaces define behaviors
interface FlyBehavior { void fly(); }
interface QuackBehavior { void quack(); }

// Concrete implementations
class FlyWithWings implements FlyBehavior {
    public void fly() { System.out.println("Flying with wings!"); }
}

class Squeak implements QuackBehavior {
    public void quack() { System.out.println("Squeak!"); }
}

// The Duck class "Has-a" fly and quack behavior
public class Duck {
    private FlyBehavior flyBehavior;
    private QuackBehavior quackBehavior;

    public Duck(FlyBehavior fb, QuackBehavior qb) {
        this.flyBehavior = fb;
        this.quackBehavior = qb;
    }

    public void performFly() { flyBehavior.fly(); }
    public void performQuack() { quackBehavior.quack(); }

    // Behaviors can be changed at runtime!
    public void setFlyBehavior(FlyBehavior fb) {
        this.flyBehavior = fb;
    }
}
```

## Why Composition is Preferred

1. **Flexibility:** Behaviors can be swapped at runtime (using the Strategy Pattern, as shown above).
2. **Looser Coupling:** The `Duck` class doesn't need to know *how* `fly()` is implemented; it just knows the interface.
3. **Avoids Deep Hierarchies:** Deep inheritance trees are hard to navigate and maintain. Composition keeps the structure flat.
4. **Unit Testing:** It's easier to mock a composed component than a parent class.

---

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Which relationship represents Composition? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch03_04_1" id="q_ch03_04_1_a" data-correct="false"><label for="q_ch03_04_1_a">A) Is-a</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_04_1" id="q_ch03_04_1_b" data-correct="true"><label for="q_ch03_04_1_b">B) Has-a</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_04_1" id="q_ch03_04_1_c" data-correct="false"><label for="q_ch03_04_1_c">C) Was-a</label></li>
        </ul>
    </div>

    <div class="quiz-question-wrapper">
        <div class="quiz-question">2. What is a major disadvantage of deep inheritance hierarchies? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch03_04_2" id="q_ch03_04_2_a" data-correct="false"><label for="q_ch03_04_2_a">A) They are too fast.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_04_2" id="q_ch03_04_2_b" data-correct="true"><label for="q_ch03_04_2_b">B) They make the code rigid and hard to modify (Fragile Base Class).</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_04_2" id="q_ch03_04_2_c" data-correct="false"><label for="q_ch03_04_2_c">C) They use too little memory.</label></li>
        </ul>
    </div>

    <div class="quiz-question-wrapper">
        <div class="quiz-question">3. Can you change a class's parent at runtime in Java? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch03_04_3" id="q_ch03_04_3_a" data-correct="false"><label for="q_ch03_04_3_a">A) Yes, using the extends keyword.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_04_3" id="q_ch03_04_3_b" data-correct="true"><label for="q_ch03_04_3_b">B) No, inheritance is static.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_04_3" id="q_ch03_04_3_c" data-correct="false"><label for="q_ch03_04_3_c">C) Only if the parent is an interface.</label></li>
        </ul>
    </div>

    <div class="quiz-feedback-main"></div>
    <button class="quiz-check-btn">Check Answers</button>
</div>
