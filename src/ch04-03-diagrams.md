# Behavioral Diagrams

While Class Diagrams show the *static* structure of a system, Behavioral Diagrams show the *dynamic* flow. In Low-Level Design, the two most useful behavioral diagrams are **State Diagrams** and **Activity Diagrams**.

## 1. State Diagrams

A State Diagram shows the different states an object can be in and the transitions between those states. This is incredibly useful for modeling lifecycles (e.g., an Order, a Thread, or a Vending Machine).

### Key Elements
- **Initial State:** A filled circle.
- **State:** A rounded rectangle.
- **Transition:** An arrow labeled with the event that triggers it.
- **Final State:** A circle with a dot inside.

*Example (Order Lifecycle):*
1. `CREATED` -> (Event: Pay) -> `PAID`
2. `PAID` -> (Event: Ship) -> `SHIPPED`
3. `SHIPPED` -> (Event: Deliver) -> `DELIVERED`
4. `CREATED` -> (Event: Cancel) -> `CANCELLED`

In Java, this is often implemented using the **State Design Pattern** or an **Enum**.

## 2. Activity Diagrams

Think of an Activity Diagram as a glorified flowchart. It shows the flow from one activity to another, including branching logic and parallel processing.

### Key Elements
- **Action:** A rounded rectangle.
- **Decision:** A diamond (if/else).
- **Fork/Join:** A thick horizontal or vertical line (for parallel tasks).
- **Merge:** A diamond where multiple flows come together.

*Example (User Login):*
1. Start.
2. Enter Credentials.
3. Decision: Is password valid?
   - Yes: Redirect to Dashboard.
   - No: Show error and return to step 2.

## When to use which?

- **Use State Diagrams** when the behavior of an object changes based on its current state (e.g., you can't "Ship" an order that hasn't been "Paid").
- **Use Activity Diagrams** to model a complex business process or workflow involving multiple objects and steps.

---

## Module Quiz

1. **Which diagram is best for modeling the lifecycle of a "Vending Machine"?**
   - A) Class Diagram.
   - B) State Diagram.
   - C) Activity Diagram.

2. **In an Activity Diagram, what does a Diamond represent?**
   - A) A State.
   - B) A Decision/Branch.
   - C) The start of the process.

3. **If you need to show that two tasks happen simultaneously, you should use:**
   - A) A Fork (thick line).
   - B) A Rounded Rectangle.
   - C) A dashed arrow.

**Answers:** 1: B, 2: B, 3: A

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Which diagram is best suited for modeling the sequential steps of a business process involving branching logic?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q04_03" id="q04_03_a" data-correct="false"><label for="q04_03_a">Class Diagram</label></li>
        <li class="quiz-option"><input type="radio" name="q04_03" id="q04_03_b" data-correct="false"><label for="q04_03_b">State Diagram</label></li>
        <li class="quiz-option"><input type="radio" name="q04_03" id="q04_03_c" data-correct="true"><label for="q04_03_c">Activity Diagram</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
