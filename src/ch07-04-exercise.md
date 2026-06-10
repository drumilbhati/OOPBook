# Programming Exercise: Logistics & Shipping Strategy

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
