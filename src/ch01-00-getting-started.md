# Getting Started with Java

Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible. It is a general-purpose programming language intended to let application developers write once, run anywhere (WORA), meaning that compiled Java code can run on all platforms that support Java without the need for recompilation.

## Why Java for LLD?

Java is one of the most popular languages for technical interviews, especially for Low Level Design (LLD), because:

1. **Strict Object-Oriented nature**: Java forces you to think in terms of classes and objects from day one.
2. **Strong Typing**: Helps catch errors at compile-time, which is crucial when designing complex systems.
3. **Rich Ecosystem**: Extensive libraries for collections, concurrency, and networking.
4. **Standard in Industry**: Many large-scale systems are built using Java (or JVM languages).

## Java Basics

In this chapter, we will cover the foundational building blocks of Java. If you are already familiar with Java, feel free to skip to the next chapter.

### What's in this Chapter?

- [Environment Setup](./ch01-01-env-setup.md)
- [Variables and Data Types](./ch01-02-variables.md)
- [Control Flow](./ch01-03-control-flow.md)
- [Methods and Memory Management](./ch01-04-methods.md)
- [Collections Framework Basics](./ch01-05-collections.md)

---

### Module 1.0 Quiz

<div class="quiz-container">
    <div class="quiz-question">Which of the following is a core philosophy of Java?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q1_0" id="q1_0a" data-correct="false"><label for="q1_0a">Write Once, Debug Everywhere</label></li>
        <li class="quiz-option"><input type="radio" name="q1_0" id="q1_0b" data-correct="true"><label for="q1_0b">Write Once, Run Anywhere</label></li>
        <li class="quiz-option"><input type="radio" name="q1_0" id="q1_0c" data-correct="false"><label for="q1_0c">Compile Once, Run Never</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

---

### Chapter 1 Programming Exercise

<div class="exercise-container">
    <div class="exercise-header">
        <span class="exercise-badge">Exercise</span>
        <span class="exercise-title">Basic Arithmetic CLI</span>
    </div>
    <div class="exercise-statement">
        Create a simple Java program that takes two numbers and an operator (+, -, *, /) as input from the console and performs the operation.
    </div>
<div class="exercise-solution">
<details>
<summary>View Solution</summary>

```java
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Enter first number: ");
        double num1 = scanner.nextDouble();

        System.out.print("Enter second number: ");
        double num2 = scanner.nextDouble();

        System.out.print("Enter operator (+, -, *, /): ");
        char operator = scanner.next().charAt(0);

        double result;

        switch (operator) {
            case '+': result = num1 + num2; break;
            case '-': result = num1 - num2; break;
            case '*': result = num1 * num2; break;
            case '/': result = num1 / num2; break;
            default:
                System.out.println("Invalid operator!");
                return;
        }

        System.out.println("Result: " + result);
    }
}
```

</details>
</div>
</div>
