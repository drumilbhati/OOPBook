# Encapsulation: Protecting Your Data

Encapsulation is the technique of wrapping data (variables) and code (methods) together as a single unit. It is the first pillar of OOP and is essential for maintaining the **integrity** of an object's state.

### Access Modifiers
Java provides four levels of access control:

1.  **private:** Accessible only within the same class. (Highest restriction)
2.  **default (package-private):** Accessible within the same package. No keyword is used.
3.  **protected:** Accessible within the same package and by subclasses (even in different packages).
4.  **public:** Accessible from anywhere.

### The "Black Box" Principle
In LLD, an object should be a "black box." Other objects should only interact with its public API, not its internal state. This allows you to change the internal implementation without breaking the rest of the system.

```java
public class BankAccount {
    private double balance; // Hidden from outside

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount; // Logic-controlled access
        }
    }

    public double getBalance() {
        return balance;
    }
}
```

### Getters and Setters: Why bother?
You might ask: "Why not just make the field public?"
1.  **Validation:** You can prevent invalid data (e.g., setting a negative age).
2.  **Read-only/Write-only:** You can provide only a getter to make a field read-only.
3.  **Flexibility:** You can change how a value is calculated or stored internally later without changing the public method signature.

> **Senior Perspective:** Over-using getters/setters can lead to an "Anemic Domain Model" where objects are just data bags. Aim for "Tell, Don't Ask"—tell the object what to do, rather than asking for its data to do it yourself.

<div class="quiz-container">
    <div class="quiz-question">Which access modifier allows access within the same package and to subclasses in different packages?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q_enc_1" id="q_enc_1_a" data-correct="false"><label for="q_enc_1_a">private</label></li>
        <li class="quiz-option"><input type="radio" name="q_enc_1" id="q_enc_1_b" data-correct="false"><label for="q_enc_1_b">default</label></li>
        <li class="quiz-option"><input type="radio" name="q_enc_1" id="q_enc_1_c" data-correct="true"><label for="q_enc_1_c">protected</label></li>
        <li class="quiz-option"><input type="radio" name="q_enc_1" id="q_enc_1_d" data-correct="false"><label for="q_enc_1_d">public</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
