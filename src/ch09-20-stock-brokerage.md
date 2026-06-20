# 20. Stock Brokerage System (Robinhood/Zerodha)

**Difficulty:** Hard

### Scenario
Design the order execution backend for a stock brokerage platform, including an in-memory order book matching engine.

### Requirements
*   **Order Creation:** Accept Limit and Market orders.
*   **Order Matching Engine:** Match matching Buy and Sell orders based on price priority (Buy price $\ge$ Sell price).
*   **Portfolio Management:** Check balances, update cash positions, and update portfolio shares.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We maintain two priority queues: `buyOrders` (max-heap sorted by price) and `sellOrders` (min-heap sorted by price). When prices overlap, the engine completes matching transactions.

### Java Implementation
```java
import java.util.PriorityQueue;

enum OrderAction { BUY, SELL }
enum OrderType { LIMIT, MARKET }

class Order {
    final String id;
    final String symbol;
    final OrderAction action;
    final double price;
    int quantity;

    Order(String id, String symbol, OrderAction action, double price, int qty) {
        this.id = id;
        this.symbol = symbol;
        this.action = action;
        this.price = price;
        this.quantity = qty;
    }
}

public class OrderBook {
    private final PriorityQueue<Order> buyOrders = new PriorityQueue<>((a, b) -> Double.compare(b.price, a.price));
    private final PriorityQueue<Order> sellOrders = new PriorityQueue<>((a, b) -> Double.compare(a.price, b.price));

    public synchronized void addOrder(Order order) {
        if (order.action == OrderAction.BUY) {
            buyOrders.offer(order);
        } else {
            sellOrders.offer(order);
        }
        match();
    }

    private void match() {
        while (!buyOrders.isEmpty() && !sellOrders.isEmpty()) {
            Order buy = buyOrders.peek();
            Order sell = sellOrders.peek();

            if (buy.price >= sell.price) {
                int matchedQty = Math.min(buy.quantity, sell.quantity);
                double executionPrice = sell.price;

                System.out.println("Execution Match: " + matchedQty + " shares at $" + executionPrice);

                buy.quantity -= matchedQty;
                sell.quantity -= matchedQty;

                if (buy.quantity == 0) buyOrders.poll();
                if (sell.quantity == 0) sellOrders.poll();
            } else {
                break;
            }
        }
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this design, why is the executionPrice derived from sell.price instead of buy.price? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_20_1" id="q_ch09_20_1_a" data-correct="false"><label for="q_ch09_20_1_a">A) Sell orders have larger quantities.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_20_1" id="q_ch09_20_1_b" data-correct="true"><label for="q_ch09_20_1_b">B) By using the price of the resting order that was already in the book (sell order price in FIFO matches), the executing buyer gets price improvement if they bid higher than the ask.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_20_1" id="q_ch09_20_1_c" data-correct="false"><label for="q_ch09_20_1_c">C) The exchange charges lower taxes on seller execution prices.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_20_1" id="q_ch09_20_1_d" data-correct="false"><label for="q_ch09_20_1_d">D) It prevents short-selling conflicts.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
