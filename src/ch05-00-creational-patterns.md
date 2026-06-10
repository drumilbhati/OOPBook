# Creational Design Patterns

Creational design patterns are all about **object creation**. They provide various mechanisms to create objects in a way that increases flexibility and reuse of existing code. Instead of instantiating objects directly (using `new`), these patterns abstract the instantiation process.

## Why use Creational Patterns?
- **Decoupling:** They decouple the client from the concrete classes being instantiated.
- **Control:** They give you more control over the creation process (e.g., ensuring only one instance exists, or creating complex objects step-by-step).
- **Flexibility:** They make it easy to introduce new types of objects without changing the client code.

---

## Programming Exercise: The Payment Gateway Factory

**Problem Statement:**
You are building a payment gateway that supports multiple payment methods: **Credit Card**, **PayPal**, and **Google Pay**. Each payment method has its own logic for processing payments. Use the **Factory Pattern** to create a system where the client can request a payment processor without knowing the details of its implementation.

**Requirements:**
1. Define a `PaymentProcessor` interface with a method `void process(double amount)`.
2. Implement three concrete classes: `CreditCardProcessor`, `PayPalProcessor`, and `GooglePayProcessor`.
3. Create a `PaymentFactory` class with a static method `getProcessor(String type)` that returns the appropriate `PaymentProcessor`.
4. If an invalid type is provided, return `null` or throw an exception.

<details>
<summary><b>View Solution</b></summary>

```java
// 1. Product Interface
interface PaymentProcessor {
    void process(double amount);
}

// 2. Concrete Products
class CreditCardProcessor implements PaymentProcessor {
    public void process(double amount) {
        System.out.println("Processing Credit Card payment of $" + amount);
    }
}

class PayPalProcessor implements PaymentProcessor {
    public void process(double amount) {
        System.out.println("Processing PayPal payment of $" + amount);
    }
}

class GooglePayProcessor implements PaymentProcessor {
    public void process(double amount) {
        System.out.println("Processing Google Pay payment of $" + amount);
    }
}

// 3. Factory Class
class PaymentFactory {
    public static PaymentProcessor getProcessor(String type) {
        if (type == null) return null;
        if (type.equalsIgnoreCase("CREDIT_CARD")) return new CreditCardProcessor();
        if (type.equalsIgnoreCase("PAYPAL")) return new PayPalProcessor();
        if (type.equalsIgnoreCase("GOOGLE_PAY")) return new GooglePayProcessor();
        return null;
    }
}

// 4. Client Code
public class Main {
    public static void main(String[] args) {
        PaymentProcessor processor = PaymentFactory.getProcessor("PAYPAL");
        if (processor != null) {
            processor.process(100.0);
        }
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. What is the main purpose of Creational Design Patterns? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_00" id="q05_00_a" data-correct="true"><label for="q05_00_a">To manage object creation mechanisms, increasing flexibility and reuse of existing code.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_00" id="q05_00_b" data-correct="false"><label for="q05_00_b">To identify and realize common communication patterns between objects.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_00" id="q05_00_c" data-correct="false"><label for="q05_00_c">To simplify the structure by identifying a simple way to realize relationships between entities.</label></li>
        </ul>
    </div>
    <button class="quiz-check-btn">Check Answers</button>
    <div class="quiz-feedback-main"></div>
</div>
