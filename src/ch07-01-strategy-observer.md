# Strategy & Observer Patterns

Behavioral patterns focus on how objects communicate and interact. **Strategy** allows algorithms to vary independently from the clients that use them, while **Observer** defines a notification mechanism for state changes.

---

## The Strategy Pattern

The **Strategy** pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It lets the algorithm vary independently from the clients that use it.

### When to Use
- **Interchangeable Logic:** When you have multiple ways to perform a task (e.g., different sorting algorithms, different compression formats).
- **Avoiding Conditionals:** Instead of a giant `switch` or `if-else` block to select behavior, you use a strategy object.

### Example: Payment System
A shopping cart can accept different payment methods.

```java
// Strategy Interface
interface PaymentStrategy {
    void pay(int amount);
}

// Concrete Strategies
class CreditCardPayment implements PaymentStrategy {
    public void pay(int amount) { System.out.println("Paid " + amount + " via Credit Card."); }
}

class PayPalPayment implements PaymentStrategy {
    public void pay(int amount) { System.out.println("Paid " + amount + " via PayPal."); }
}

// Context
class ShoppingCart {
    private PaymentStrategy strategy;
    public void setPaymentStrategy(PaymentStrategy s) { this.strategy = s; }
    public void checkout(int amount) { strategy.pay(amount); }
}
```

---

## The Observer Pattern

The **Observer** pattern (also known as Pub-Sub) defines a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

### When to Use
- **Event Handling:** When an abstraction has two aspects, one dependent on the other.
- **Broadcasting:** When a change to one object requires changing others, and you don't know how many objects need to be changed.

### Example: News Agency
A news agency notifies all registered news channels when a new story breaks.

```java
import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(String news);
}

class NewsAgency {
    private List<Observer> channels = new ArrayList<>();

    public void addObserver(Observer channel) { channels.add(channel); }
    public void broadcast(String news) {
        for (Observer channel : channels) {
            channel.update(news);
        }
    }
}

class NewsChannel implements Observer {
    private String name;
    public NewsChannel(String name) { this.name = name; }
    public void update(String news) { System.out.println(name + " received: " + news); }
}
```

---

## Real-World Examples
- **`Collections.sort()`**: Accepts a `Comparator` as a strategy.
- **Java Swing/AWT**: Uses observers for button clicks (ActionListeners).
- **Spring ApplicationEvents**: A full-featured event/observer system.

---

## Module Quiz

1. How does the Strategy pattern help in adhering to the Open/Closed Principle?
2. In the Observer pattern, what is the difference between a "Push" and a "Pull" model?
3. What is the main benefit of using a Strategy over a simple `if-else` block?
4. True/False: The Observer pattern promotes tight coupling between the Subject and the Observers.

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Which pattern defines a one-to-many dependency so that when one object changes state, all its dependents are notified automatically?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q07_01" id="q07_01_a" data-correct="false"><label for="q07_01_a">Strategy</label></li>
        <li class="quiz-option"><input type="radio" name="q07_01" id="q07_01_b" data-correct="true"><label for="q07_01_b">Observer</label></li>
        <li class="quiz-option"><input type="radio" name="q07_01" id="q07_01_c" data-correct="false"><label for="q07_01_c">Command</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

---
