# Programming Exercise: Payment Gateway Factory

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
