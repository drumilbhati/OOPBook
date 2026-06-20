# 9. Online Shopping Platform (E-commerce)

**Difficulty:** Medium

### Scenario
Design an online shopping cart and checkout platform with product listings, inventory management, and orders.

### Requirements
*   **Catalog & Search:** Users can browse/search products.
*   **Cart & Checkout:** Add products to a cart, compute taxes, and apply discount strategies.
*   **Payment & Notification:** Support credit card or mobile payments; update inventory.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We apply the **Strategy Pattern** for dynamic discount checking and checkout payments, and the **State Pattern** to manage order lifecycle.

### Java Implementation
```java
import java.util.*;

interface PaymentStrategy { void pay(double amount); }
class CreditCardPayment implements PaymentStrategy {
    public void pay(double amount) { System.out.println("Paid " + amount + " via Card."); }
}

enum OrderStatus { PLACED, SHIPPED, DELIVERED }

class Order {
    private final String orderId;
    private final Map<String, Integer> items;
    private double totalAmount;
    private OrderStatus status = OrderStatus.PLACED;

    public Order(String orderId, Map<String, Integer> items, double amount) {
        this.orderId = orderId;
        this.items = items;
        this.totalAmount = amount;
    }
    public void ship() { this.status = OrderStatus.SHIPPED; }
    public OrderStatus getStatus() { return status; }
}

public class ShoppingEngine {
    private final Map<String, Integer> inventory = new HashMap<>();

    public synchronized boolean checkout(Map<String, Integer> cart, PaymentStrategy payment, double total) {
        for (Map.Entry<String, Integer> item : cart.entrySet()) {
            if (inventory.getOrDefault(item.getKey(), 0) < item.getValue()) {
                System.out.println("Insufficient inventory for: " + item.getKey());
                return false;
            }
        }
        for (Map.Entry<String, Integer> item : cart.entrySet()) {
            inventory.put(item.getKey(), inventory.get(item.getKey()) - item.getValue());
        }
        payment.pay(total);
        new Order(UUID.randomUUID().toString(), cart, total);
        return true;
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this design, why is checkout synchronized? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_09_1" id="q_ch09_09_1_a" data-correct="false"><label for="q_ch09_09_1_a">A) To make sure payment processing occurs on the client side.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_09_1" id="q_ch09_09_1_b" data-correct="true"><label for="q_ch09_09_1_b">B) To prevent race conditions where multiple customers attempt to purchase the last available stock of an item concurrently, causing a negative inventory state.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_09_1" id="q_ch09_09_1_c" data-correct="false"><label for="q_ch09_09_1_c">C) To speed up searching operations.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_09_1" id="q_ch09_09_1_d" data-correct="false"><label for="q_ch09_09_1_d">D) It does not need to be synchronized.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
