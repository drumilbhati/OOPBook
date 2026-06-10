# Behavioral Design Patterns

Behavioral design patterns are concerned with algorithms and the assignment of responsibilities between objects. They describe not just patterns of objects or classes but also the patterns of communication between them. These patterns characterize complex control flow that is difficult to follow at runtime.

---

## Programming Exercise: Logistics & Shipping Strategy

**Scenario:** You are developing a system for a global logistics company. The system needs to calculate shipping costs based on different carriers (FedEx, UPS, DHL) and various shipping methods (Ground, Air, Express). The business frequently adds new carriers and shipping rules.

**Task:** 
1. Define a `ShippingStrategy` interface.
2. Implement concrete strategies for `FedExStrategy`, `UPSStrategy`, and `DHLStrategy`.
3. Create a `ShippingContext` that can switch between these strategies at runtime.

<details>
<summary>View Solution</summary>

```java
// Strategy Interface
interface ShippingStrategy {
    double calculate(double weight, double distance);
}

// Concrete Strategy: FedEx
class FedExStrategy implements ShippingStrategy {
    public double calculate(double weight, double distance) {
        return weight * 0.5 + distance * 0.1;
    }
}

// Concrete Strategy: UPS
class UPSStrategy implements ShippingStrategy {
    public double calculate(double weight, double distance) {
        return weight * 0.45 + distance * 0.12;
    }
}

// Context
class ShippingContext {
    private ShippingStrategy strategy;

    public void setStrategy(ShippingStrategy strategy) {
        this.strategy = strategy;
    }

    public double calculateCost(double weight, double distance) {
        if (strategy == null) throw new IllegalStateException("Strategy not set");
        return strategy.calculate(weight, distance);
    }
}

// Client Code
public class Main {
    public static void main(String[] args) {
        ShippingContext context = new ShippingContext();
        
        context.setStrategy(new FedExStrategy());
        System.out.println("FedEx Cost: " + context.calculateCost(10, 100));
        
        context.setStrategy(new UPSStrategy());
        System.out.println("UPS Cost: " + context.calculateCost(10, 100));
    }
}
```

</details>

---

### Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. What is the primary focus of Behavioral Design Patterns? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q07_00_1" id="q07_00_1_a" data-correct="false"><label for="q07_00_1_a">A) The best way to create objects.</label></li>
            <li class="quiz-option"><input type="radio" name="q07_00_1" id="q07_00_1_b" data-correct="true"><label for="q07_00_1_b">B) How classes and objects interact and distribute responsibilities.</label></li>
            <li class="quiz-option"><input type="radio" name="q07_00_1" id="q07_00_1_c" data-correct="false"><label for="q07_00_1_c">C) The composition of objects into larger structures.</label></li>
        </ul>
    </div>
    <div class="quiz-feedback-main"></div>
    <button class="quiz-check-btn">Check Answer</button>
</div>
