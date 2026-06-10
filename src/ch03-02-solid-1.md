# SOLID Principles - Part 1

SOLID is an acronym for five design principles intended to make software designs more understandable, flexible, and maintainable. In this section, we cover the first two: **SRP** and **OCP**.

## 1. Single Responsibility Principle (SRP)

> "A class should have one, and only one, reason to change."

This principle states that a class should focus on a single piece of functionality. If a class has multiple responsibilities, they become coupled. A change to one responsibility may impair or inhibit the class's ability to meet the others.

### Before SRP (Violation)

Here, the `Invoice` class handles calculation, printing, and database persistence.

```java
public class Invoice {
    private double amount;

    public Invoice(double amount) { this.amount = amount; }

    public void calculateTotal() { /* calculation logic */ }

    public void printInvoice() {
        System.out.println("Printing invoice...");
    }

    public void saveToDatabase() {
        System.out.println("Saving to DB...");
    }
}
```

### After SRP (Refactored)

We split the responsibilities into three distinct classes. Now, if the database schema changes, only `InvoiceRepository` needs an update.

```java
public class Invoice {
    private double amount;
    // Only calculation logic
}

public class InvoicePrinter {
    public void print(Invoice invoice) { /* printing logic */ }
}

public class InvoiceRepository {
    public void save(Invoice invoice) { /* persistence logic */ }
}
```

---

## 2. Open/Closed Principle (OCP)

> "Software entities should be open for extension, but closed for modification."

This means you should be able to add new functionality without changing existing code. This is usually achieved using interfaces and polymorphism.

### Before OCP (Violation)

If we want to add a new notification type (e.g., SMS), we have to modify the `NotificationService` class, which risks breaking the Email logic.

```java
public class NotificationService {
    public void sendNotification(String type, String message) {
        if (type.equals("Email")) {
            // send email
        } else if (type.equals("WhatsApp")) {
            // send WhatsApp
        }
    }
}
```

### After OCP (Refactored)

We define an interface and implement it for each notification type. To add SMS, we simply create a new class `SmsNotification` without touching `NotificationSender`.

```java
public interface Notification {
    void send(String message);
}

public class EmailNotification implements Notification {
    public void send(String message) { /* Email logic */ }
}

public class WhatsAppNotification implements Notification {
    public void send(String message) { /* WhatsApp logic */ }
}

public class NotificationSender {
    public void notify(Notification notification, String message) {
        notification.send(message);
    }
}
```

---

## Module Quiz

1. **What is the main goal of SRP?**
   - A) To make classes as large as possible.
   - B) To ensure a class has only one reason to change, reducing coupling.
   - C) To allow a class to handle UI and Database logic together.

2. **Which technique is most commonly used to follow OCP?**
   - A) Massive `if-else` or `switch` blocks.
   - B) Inheritance and Interfaces.
   - C) Making all fields public.

3. **If you find yourself modifying an existing class every time a new feature is added, which principle are you likely violating?**
   - A) SRP
   - B) OCP
   - C) LSP

**Answers:** 1: B, 2: B, 3: B

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Which SOLID principle is violated if a class handles both business logic and database persistence?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q03_02" id="q03_02_a" data-correct="true"><label for="q03_02_a">Single Responsibility Principle (SRP)</label></li>
        <li class="quiz-option"><input type="radio" name="q03_02" id="q03_02_b" data-correct="false"><label for="q03_02_b">Open/Closed Principle (OCP)</label></li>
        <li class="quiz-option"><input type="radio" name="q03_02" id="q03_02_c" data-correct="false"><label for="q03_02_c">Liskov Substitution Principle (LSP)</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
