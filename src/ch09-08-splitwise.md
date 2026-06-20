# 8. Splitwise (Expense Sharing Application)

**Difficulty:** Medium

### Scenario
Design an expense sharing system like Splitwise where users can add expenses, split them in various ways (equally, exactly, or by percentage), track outstanding balances, and view net balances.

### Requirements
*   **Split Types:** Support EQUAL, EXACT, and PERCENT splits.
*   **Balance Tracking:** Compute net balances between users.
*   **Verification:** Ensure that split amounts add up to the total expense.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We use the **Strategy Pattern** for the split validation and calculations. We define a base `Split` class, specialized split classes (`EqualSplit`, `ExactSplit`, `PercentSplit`), and an `Expense` model that aggregates them.

### Java Implementation
```java
import java.util.*;

enum SplitType { EQUAL, EXACT, PERCENT }

abstract class Split {
    private final String userId;
    protected double amount;

    public Split(String userId) { this.userId = userId; }
    public String getUserId() { return userId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}

class EqualSplit extends Split { public EqualSplit(String userId) { super(userId); } }
class ExactSplit extends Split {
    public ExactSplit(String userId, double amount) {
        super(userId);
        this.amount = amount;
    }
}
class PercentSplit extends Split {
    private final double percent;
    public PercentSplit(String userId, double percent) {
        super(userId);
        this.percent = percent;
    }
    public double getPercent() { return percent; }
}

class Expense {
    private final String id;
    private final String paidBy;
    private final double amount;
    private final List<Split> splits;

    public Expense(String id, String paidBy, double amount, List<Split> splits) {
        this.id = id;
        this.paidBy = paidBy;
        this.amount = amount;
        this.splits = splits;
    }

    public boolean validate() {
        double sum = 0;
        for (Split s : splits) {
            sum += s.getAmount();
        }
        return Math.abs(sum - amount) < 0.01;
    }
}

public class ExpenseManager {
    private final Map<String, Map<String, Double>> balanceSheet = new HashMap<>();

    public void addExpense(String paidBy, double amount, List<Split> splits, SplitType splitType) {
        if (splitType == SplitType.EQUAL) {
            double splitAmount = amount / splits.size();
            for (Split s : splits) {
                s.setAmount(splitAmount);
            }
        } else if (splitType == SplitType.PERCENT) {
            for (Split s : splits) {
                PercentSplit ps = (PercentSplit) s;
                s.setAmount((amount * ps.getPercent()) / 100.0);
            }
        }

        Expense expense = new Expense(UUID.randomUUID().toString(), paidBy, amount, splits);
        if (!expense.validate()) {
            throw new IllegalArgumentException("Splits must sum up to the total amount.");
        }

        for (Split s : splits) {
            String oweTo = s.getUserId();
            if (oweTo.equals(paidBy)) continue;

            balanceSheet.putIfAbsent(paidBy, new HashMap<>());
            balanceSheet.putIfAbsent(oweTo, new HashMap<>());

            Map<String, Double> payerBalances = balanceSheet.get(paidBy);
            payerBalances.put(oweTo, payerBalances.getOrDefault(oweTo, 0.0) + s.getAmount());

            Map<String, Double> owerBalances = balanceSheet.get(oweTo);
            owerBalances.put(paidBy, owerBalances.getOrDefault(paidBy, 0.0) - s.getAmount());
        }
    }

    public void printBalances() {
        for (String user : balanceSheet.keySet()) {
            for (Map.Entry<String, Double> entry : balanceSheet.get(user).entrySet()) {
                if (entry.getValue() > 0) {
                    System.out.println(user + " gets back " + entry.getValue() + " from " + entry.getKey());
                }
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
<div class="quiz-question">1. Which software design pattern is most appropriate for validating the dynamic check-sums of split allocations (EQUAL vs PERCENT) without hardcoding business rules in the main expense manager? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_08_1" id="q_ch09_08_1_a" data-correct="false"><label for="q_ch09_08_1_a">A) Observer Pattern</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_08_1" id="q_ch09_08_1_b" data-correct="true"><label for="q_ch09_08_1_b">B) Strategy Pattern</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_08_1" id="q_ch09_08_1_c" data-correct="false"><label for="q_ch09_08_1_c">C) Factory Pattern</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_08_1" id="q_ch09_08_1_d" data-correct="false"><label for="q_ch09_08_1_d">D) Decorator Pattern</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
