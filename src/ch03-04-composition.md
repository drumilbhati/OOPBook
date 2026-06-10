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

1. **Which relationship represents Composition?**
   - A) Is-a
   - B) Has-a
   - C) Was-a

2. **What is a major disadvantage of deep inheritance hierarchies?**
   - A) They are too fast.
   - B) They make the code rigid and hard to modify (Fragile Base Class).
   - C) They use too little memory.

3. **Can you change a class's parent at runtime in Java?**
   - A) Yes, using the `extends` keyword.
   - B) No, inheritance is static.
   - C) Only if the parent is an interface.

**Answers:** 1: B, 2: B, 3: B

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Why is "Composition over Inheritance" often recommended in Low-Level Design?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q03_04" id="q03_04_a" data-correct="false"><label for="q03_04_a">Because inheritance is not supported in modern Java.</label></li>
        <li class="quiz-option"><input type="radio" name="q03_04" id="q03_04_b" data-correct="true"><label for="q03_04_b">Because composition provides more flexibility by allowing behaviors to be swapped at runtime.</label></li>
        <li class="quiz-option"><input type="radio" name="q03_04" id="q03_04_c" data-correct="false"><label for="q03_04_c">Because composition makes the code slower but more secure.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
