# Control Flow: Decisions and Loops

Control flow statements determine the order in which code is executed. In LLD, clean control flow is the difference between a maintainable system and "spaghetti code."

### Decision Making: If-Else and Switch

While `if-else` is straightforward, the `switch` statement has seen significant upgrades in recent Java versions.

#### Modern Switch (Java 14+)
The new switch expressions are more concise and less error-prone (no more missing `break` bugs).

```java
// Traditional Switch
switch (day) {
    case MONDAY:
    case FRIDAY:
        System.out.println("Work");
        break;
    default:
        System.out.println("Rest");
}

// Modern Switch Expression
String activity = switch (day) {
    case MONDAY, FRIDAY -> "Work";
    case SATURDAY, SUNDAY -> "Rest";
    default -> "Sleep";
};
```

### Looping Mechanisms
Java provides `for`, `while`, and `do-while` loops. For LLD, we often prefer the "Enhanced For-Loop" (for-each) or "Streams" for readability.

```java
List<String> items = List.of("A", "B", "C");

// Enhanced for-loop
for (String item : items) {
    System.out.println(item);
}

// Stream API (Functional approach)
items.forEach(System.out::println);
```

### The "S" in SOLID: Avoiding Complex Branching
From a design perspective, if you find yourself with deeply nested `if-else` or massive `switch` blocks, it's a "code smell." You should likely use the **Strategy Pattern** or **State Pattern** (which we will cover later) to delegate logic to specific classes.

> **Design Note:** Use `switch` for simple branching on enums or constants. Use Polymorphism for complex behavioral branching.

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. Which Java version introduced the 'arrow' (->) syntax for switch expressions as a standard feature? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_cf_1" id="q_cf_1_a" data-correct="false"><label for="q_cf_1_a">Java 8</label></li>
<li class="quiz-option"><input type="radio" name="q_cf_1" id="q_cf_1_b" data-correct="false"><label for="q_cf_1_b">Java 11</label></li>
<li class="quiz-option"><input type="radio" name="q_cf_1" id="q_cf_1_c" data-correct="true"><label for="q_cf_1_c">Java 14</label></li>
<li class="quiz-option"><input type="radio" name="q_cf_1" id="q_cf_1_d" data-correct="false"><label for="q_cf_1_d">Java 17</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answers</button>
</div>

