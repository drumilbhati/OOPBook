# Programming Exercise: Basic Arithmetic CLI

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
