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

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. How does the Strategy pattern help in adhering to the Open/Closed Principle? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_01_1" id="q07_01_1_a" data-correct="false"><label for="q07_01_1_a">A) By using private constructors.</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_1" id="q07_01_1_b" data-correct="true"><label for="q07_01_1_b">B) It allows you to add new algorithms (strategies) without modifying the existing client code.</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_1" id="q07_01_1_c" data-correct="false"><label for="q07_01_1_c">C) By preventing inheritance.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">2. In the Observer pattern, what is a "Push" model? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_01_2" id="q07_01_2_a" data-correct="true"><label for="q07_01_2_a">A) The Subject sends detailed state information to all Observers regardless of whether they need it.</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_2" id="q07_01_2_b" data-correct="false"><label for="q07_01_2_b">B) The Observers request information from the Subject when they are ready.</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_2" id="q07_01_2_c" data-correct="false"><label for="q07_01_2_c">C) The Subject is deleted once all Observers are notified.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">3. What is a primary benefit of using a Strategy over a simple if-else block? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_01_3" id="q07_01_3_a" data-correct="false"><label for="q07_01_3_a">A) It makes the code run faster.</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_3" id="q07_01_3_b" data-correct="true"><label for="q07_01_3_b">B) It promotes cleaner code, better extensibility, and separation of concerns by encapsulating algorithm-specific logic.</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_3" id="q07_01_3_c" data-correct="false"><label for="q07_01_3_c">C) It eliminates the need for interfaces.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">4. True/False: The Observer pattern promotes loose coupling between the Subject and its Observers. <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_01_4" id="q07_01_4_a" data-correct="true"><label for="q07_01_4_a">A) True</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_4" id="q07_01_4_b" data-correct="false"><label for="q07_01_4_b">B) False</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">5. Which pattern defines a one-to-many dependency so that when one object changes state, all its dependents are notified automatically? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_01_5" id="q07_01_5_a" data-correct="false"><label for="q07_01_5_a">A) Strategy</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_5" id="q07_01_5_b" data-correct="true"><label for="q07_01_5_b">B) Observer</label></li>
<li class="quiz-option"><input type="radio" name="q07_01_5" id="q07_01_5_c" data-correct="false"><label for="q07_01_5_c">C) Command</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>

