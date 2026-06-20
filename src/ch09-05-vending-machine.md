# 5. Vending Machine

**Difficulty:** Easy

### Scenario
Design a Vending Machine that dispenses products upon coin/cash validation.

### Requirements
*   **Workflow:** Accept inserted coins, select product, dispense product, and return change.
*   **State Management:** State transitions: Idle, Accepting Coins, Dispensing.
*   **Verification:** Ensure no product is dispensed if inserted balance is less than product price.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
Using the **State Pattern** allows the machine behavior to be cleanly delegated based on state values. Although states can be fully modeled as classes, a simplified state-machine workflow with conditional state transition is highly readable.

### Java Implementation
```java
import java.util.HashMap;
import java.util.Map;

enum MachineState { IDLE, ACCEPTING_COINS, DISPENSING }

class Item {
    final String name;
    final double price;
    Item(String name, double price) {
        this.name = name;
        this.price = price;
    }
}

public class VendingMachine {
    private final Map<String, Item> inventory = new HashMap<>();
    private final Map<String, Integer> stock = new HashMap<>();
    private MachineState currentState = MachineState.IDLE;
    private double balance = 0.0;
    private String selectedItem = null;

    public void addItem(String code, Item item, int quantity) {
        inventory.put(code, item);
        stock.put(code, quantity);
    }

    public synchronized void insertCoin(double amount) {
        if (currentState == MachineState.DISPENSING) {
            System.out.println("Wait, dispensing in progress.");
            return;
        }
        balance += amount;
        currentState = MachineState.ACCEPTING_COINS;
        System.out.println("Balance updated: " + balance);
    }

    public synchronized void selectItem(String code) {
        if (!inventory.containsKey(code) || stock.get(code) <= 0) {
            System.out.println("Item out of stock or invalid.");
            return;
        }
        Item item = inventory.get(code);
        if (balance < item.price) {
            System.out.println("Insufficient balance. Requires: " + item.price);
            return;
        }
        selectedItem = code;
        currentState = MachineState.DISPENSING;
        dispense();
    }

    private void dispense() {
        Item item = inventory.get(selectedItem);
        stock.put(selectedItem, stock.get(selectedItem) - 1);
        balance -= item.price;
        System.out.println("Dispensed: " + item.name);
        refundChange();
    }

    public synchronized void refundChange() {
        if (balance > 0) {
            System.out.println("Returned change: " + balance);
            balance = 0;
        }
        selectedItem = null;
        currentState = MachineState.IDLE;
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In a complex vending machine supporting inventory-refill events, diagnostics, and multiple custom states, why is the State Pattern preferred over large switch-case conditionals? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_05_1" id="q_ch09_05_1_a" data-correct="false"><label for="q_ch09_05_1_a">A) Switch-cases cannot evaluate floating-point values.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_05_1" id="q_ch09_05_1_b" data-correct="false"><label for="q_ch09_05_1_b">B) It decreases code execution latency.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_05_1" id="q_ch09_05_1_c" data-correct="true"><label for="q_ch09_05_1_c">C) It separates state-specific behaviors into individual classes, adhering to the Single Responsibility Principle and making transitions easy to extend without altering existing code.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_05_1" id="q_ch09_05_1_d" data-correct="false"><label for="q_ch09_05_1_d">D) It automatically synchronizes the methods across multiple threads.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
