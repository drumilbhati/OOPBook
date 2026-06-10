# Decorator & Proxy Patterns

Decorator and Proxy are often confused because they both use composition and "wrap" another object. However, their **intent** is entirely different. A Decorator adds new behavior, while a Proxy controls access.

---

## The Decorator Pattern

The **Decorator** pattern allows you to attach new responsibilities to an object dynamically. It provides a flexible alternative to subclassing for extending functionality.

### When to Use
- **Dynamic Extensions:** When you want to add behavior to individual objects without affecting other objects of the same class.
- **Legacy Code:** When you can't or don't want to modify the source code of the class you are extending.

### Example: Coffee Shop
Instead of creating classes like `LatteWithSugarAndMilk`, you decorate a base `Coffee` object.

```java
interface Beverage {
    String getDescription();
    double cost();
}

class PlainCoffee implements Beverage {
    public String getDescription() { return "Plain Coffee"; }
    public double cost() { return 2.0; }
}

abstract class BeverageDecorator implements Beverage {
    protected Beverage beverage;
    public BeverageDecorator(Beverage b) { this.beverage = b; }
}

class Milk extends BeverageDecorator {
    public Milk(Beverage b) { super(b); }
    public String getDescription() { return beverage.getDescription() + ", Milk"; }
    public double cost() { return beverage.cost() + 0.5; }
}

// Usage:
Beverage coffee = new Milk(new PlainCoffee());
```

---

## The Proxy Pattern

The **Proxy** pattern provides a surrogate or placeholder for another object to control access to it.

### Common Types
1. **Virtual Proxy:** Delays the creation of an expensive object until it's actually needed (Lazy Loading).
2. **Protection Proxy:** Controls access based on permissions.
3. **Remote Proxy:** Represents an object located in a different address space (e.g., RMI, gRPC).

### Example: Virtual Proxy for Images
An image is only loaded from disk/network when the `display()` method is called.

```java
interface Image {
    void display();
}

class RealImage implements Image {
    private String fileName;
    public RealImage(String fileName) {
        this.fileName = fileName;
        loadFromDisk();
    }
    private void loadFromDisk() { System.out.println("Loading " + fileName); }
    public void display() { System.out.println("Displaying " + fileName); }
}

class ProxyImage implements Image {
    private RealImage realImage;
    private String fileName;

    public ProxyImage(String fileName) { this.fileName = fileName; }

    @Override
    public void display() {
        if (realImage == null) {
            realImage = new RealImage(fileName); // Lazy loading
        }
        realImage.display();
    }
}
```

---

## Decorator vs. Proxy

| Feature | Decorator | Proxy |
|---------|-----------|-------|
| **Intent** | Adds new responsibilities dynamically. | Controls access to the original object. |
| **Object Lifecycle** | Client usually creates the "core" object and then wraps it. | Proxy often manages the lifecycle of the "real" object. |
| **Transparency** | Client is aware of the decoration (nested calls). | Proxy usually provides the exact same interface seamlessly. |

---

## Real-World Examples
- **Java I/O:** `BufferedInputStream` is a decorator for `FileInputStream`.
- **Spring AOP:** Uses proxies to inject cross-cutting concerns like logging or transaction management.
- **Hibernate:** Uses proxies for "Lazy Loading" of database entities.

---

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Which pattern is used to implement "Lazy Loading"? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_02_1" id="q06_02_1_a" data-correct="false"><label for="q06_02_1_a">A) Decorator</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_1" id="q06_02_1_b" data-correct="true"><label for="q06_02_1_b">B) Proxy</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_1" id="q06_02_1_c" data-correct="false"><label for="q06_02_1_c">C) Facade</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">2. What is a common problem with using inheritance instead of the Decorator pattern for adding features? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_02_2" id="q06_02_2_a" data-correct="false"><label for="q06_02_2_a">A) It makes the code run slower.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_2" id="q06_02_2_b" data-correct="true"><label for="q06_02_2_b">B) Class explosion (having to create a new class for every possible combination of features).</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_2" id="q06_02_2_c" data-correct="false"><label for="q06_02_2_c">C) Inheritance does not support polymorphism.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">3. How does a Protection Proxy differ from a Virtual Proxy? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_02_3" id="q06_02_3_a" data-correct="false"><label for="q06_02_3_a">A) Protection Proxy is for remote objects.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_3" id="q06_02_3_b" data-correct="true"><label for="q06_02_3_b">B) Protection Proxy controls access based on permissions, while Virtual Proxy handles lazy loading of expensive objects.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_3" id="q06_02_3_c" data-correct="false"><label for="q06_02_3_c">C) There is no difference.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">4. True/False: In the Decorator pattern, the decorator and the object it decorates must implement the same interface. <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_02_4" id="q06_02_4_a" data-correct="true"><label for="q06_02_4_a">A) True</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_4" id="q06_02_4_b" data-correct="false"><label for="q06_02_4_b">B) False</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">5. Which pattern is specifically used to control access to an object, such as implementing permissions or lazy loading? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_02_5" id="q06_02_5_a" data-correct="false"><label for="q06_02_5_a">A) Decorator</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_5" id="q06_02_5_b" data-correct="true"><label for="q06_02_5_b">B) Proxy</label></li>
            <li class="quiz-option"><input type="radio" name="q06_02_5" id="q06_02_5_c" data-correct="false"><label for="q06_02_5_c">C) Composite</label></li>
        </ul>
    </div>
    <button class="quiz-check-btn">Check Answers</button>
    <div class="quiz-feedback-main"></div>
</div>
