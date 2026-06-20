# 13. ATM (Automated Teller Machine)

**Difficulty:** Medium

### Scenario
Design an Automated Teller Machine that handles card verification, PIN entry, balances, withdrawals, and cash dispensing.

### Requirements
*   **States:** Manage transitions: IDLE, VALID_CARD, VALID_PIN, DISPENSING.
*   **Notes Dispenser:** Dispense requested cash using the minimum number of bills ($2000, $500, $100) using a Chain of Responsibility.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We use the **Chain of Responsibility Pattern** to handle cash dispensing. Each dispenser node processes a specific denomination and forwards the remaining balance to the next node.

### Java Implementation
```java
abstract class CashDispenser {
    protected CashDispenser next;
    public void setNext(CashDispenser next) { this.next = next; }
    public abstract void dispense(int amount);
}

class DenominationDispenser extends CashDispenser {
    private final int value;

    public DenominationDispenser(int value) { this.value = value; }

    public void dispense(int amount) {
        if (amount >= value) {
            int numBills = amount / value;
            int remainder = amount % value;
            System.out.println("Dispensing " + numBills + " bills of value: " + value);
            if (remainder > 0 && next != null) {
                next.dispense(remainder);
            }
        } else if (next != null) {
            next.dispense(amount);
        } else {
            System.out.println("Invalid amount remainder cannot be dispensed: " + amount);
        }
    }
}

public class ATMEngine {
    private final CashDispenser chain;

    public ATMEngine() {
        CashDispenser c1 = new DenominationDispenser(2000);
        CashDispenser c2 = new DenominationDispenser(500);
        CashDispenser c3 = new DenominationDispenser(100);
        c1.setNext(c2);
        c2.setNext(c3);
        this.chain = c1;
    }

    public void withdraw(int amount) {
        if (amount % 100 != 0) {
            System.out.println("Amount must be in multiples of 100.");
            return;
        }
        chain.dispense(amount);
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this design, what happens if the withdrawal amount is $700? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_13_1" id="q_ch09_13_1_a" data-correct="false"><label for="q_ch09_13_1_a">A) The ATM errors because $700 cannot be divided by $2000.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_13_1" id="q_ch09_13_1_b" data-correct="true"><label for="q_ch09_13_1_b">B) The $2000 dispenser passes it to the $500 dispenser (dispensing 1 bill), and the remaining $200 is passed to the $100 dispenser (dispensing 2 bills).</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_13_1" id="q_ch09_13_1_c" data-correct="false"><label for="q_ch09_13_1_c">C) The system dispenses seven $100 bills directly.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_13_1" id="q_ch09_13_1_d" data-correct="false"><label for="q_ch09_13_1_d">D) It displays a connection error.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
