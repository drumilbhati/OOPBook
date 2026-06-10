# SOLID Principles - Part 2

In this section, we conclude our deep dive into SOLID with the final three principles: **LSP**, **ISP**, and **DIP**.

## 3. Liskov Substitution Principle (LSP)

> "Subtypes must be substitutable for their base types."

If class `B` is a subclass of class `A`, we should be able to pass an object of class `B` to any method that expects an object of class `A` without the method behaving unexpectedly.

### Violation (The Classic Bird Problem)

```java
public class Bird {
    public void fly() { System.out.println("Flying..."); }
}

public class Ostrich extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException("Ostriches can't fly!");
    }
}
```

If a method expects a `Bird` and calls `fly()`, it will crash when it receives an `Ostrich`. This violates LSP.

### Refactored

We should only inherit behavior that actually applies.

```java
public class Bird { /* general bird properties */ }

public class FlyingBird extends Bird {
    public void fly() { System.out.println("Flying..."); }
}

public class Ostrich extends Bird { /* Ostrich specific logic */ }
```

---

## 4. Interface Segregation Principle (ISP)

> "No client should be forced to depend on methods it does not use."

Instead of one "fat" interface, create many small, specific interfaces.

### Before ISP (Violation)

```java
public interface SmartDevice {
    void print();
    void fax();
    void scan();
}

public class BasicPrinter implements SmartDevice {
    public void print() { /* implementation */ }
    public void fax() { throw new UnsupportedOperationException(); }
    public void scan() { throw new UnsupportedOperationException(); }
}
```

The `BasicPrinter` is forced to "implement" `fax` and `scan` even though it can't perform those actions.

### After ISP (Refactored)

```java
public interface Printer { void print(); }
public interface Fax { void fax(); }
public interface Scanner { void scan(); }

public class BasicPrinter implements Printer {
    public void print() { /* implementation */ }
}

public class AllInOnePrinter implements Printer, Fax, Scanner {
    public void print() { ... }
    public void fax() { ... }
    public void scan() { ... }
}
```

---

## 5. Dependency Inversion Principle (DIP)

> "Depend on abstractions, not on concretions."

High-level modules (business logic) should not depend on low-level modules (DB, API). Both should depend on abstractions (Interfaces).

### Before DIP (Violation)

`UserLogic` is tightly coupled to `MySQLDatabase`. If we want to switch to MongoDB, we must modify `UserLogic`.

```java
public class MySQLDatabase {
    public void save(String data) { /* save to MySQL */ }
}

public class UserLogic {
    private MySQLDatabase db = new MySQLDatabase();

    public void saveUser(String user) {
        db.save(user);
    }
}
```

### After DIP (Refactored)

```java
public interface Database {
    void save(String data);
}

public class MySQLDatabase implements Database {
    public void save(String data) { ... }
}

public class UserLogic {
    private Database db;

    // Dependency Injection
    public UserLogic(Database db) {
        this.db = db;
    }

    public void saveUser(String user) {
        db.save(user);
    }
}
```

---

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Which principle is violated if a subclass throws an UnsupportedOperationException for a method defined in the parent? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch03_03_1" id="q_ch03_03_1_a" data-correct="false"><label for="q_ch03_03_1_a">A) ISP</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_03_1" id="q_ch03_03_1_b" data-correct="true"><label for="q_ch03_03_1_b">B) LSP</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_03_1" id="q_ch03_03_1_c" data-correct="false"><label for="q_ch03_03_1_c">C) DIP</label></li>
        </ul>
    </div>

    <div class="quiz-question-wrapper">
        <div class="quiz-question">2. What does the "I" in SOLID stand for? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch03_03_2" id="q_ch03_03_2_a" data-correct="false"><label for="q_ch03_03_2_a">A) Internal Segregation</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_03_2" id="q_ch03_03_2_b" data-correct="true"><label for="q_ch03_03_2_b">B) Interface Segregation</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_03_2" id="q_ch03_03_2_c" data-correct="false"><label for="q_ch03_03_2_c">C) Instant Substitution</label></li>
        </ul>
    </div>

    <div class="quiz-question-wrapper">
        <div class="quiz-question">3. Dependency Inversion suggests that high-level modules should depend on: <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch03_03_3" id="q_ch03_03_3_a" data-correct="false"><label for="q_ch03_03_3_a">A) Concrete implementations.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_03_3" id="q_ch03_03_3_b" data-correct="true"><label for="q_ch03_03_3_b">B) Abstractions (Interfaces).</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch03_03_3" id="q_ch03_03_3_c" data-correct="false"><label for="q_ch03_03_3_c">C) Low-level modules.</label></li>
        </ul>
    </div>

    <div class="quiz-feedback-main"></div>
    <button class="quiz-check-btn">Check Answers</button>
</div>
