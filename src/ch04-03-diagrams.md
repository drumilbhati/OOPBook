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

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Which diagram is best for modeling the lifecycle of a "Vending Machine"? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch04_03_1" id="q_ch04_03_1_a" data-correct="false"><label for="q_ch04_03_1_a">A) Class Diagram.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch04_03_1" id="q_ch04_03_1_b" data-correct="true"><label for="q_ch04_03_1_b">B) State Diagram.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch04_03_1" id="q_ch04_03_1_c" data-correct="false"><label for="q_ch04_03_1_c">C) Activity Diagram.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">2. In an Activity Diagram, what does a Diamond represent? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch04_03_2" id="q_ch04_03_2_a" data-correct="false"><label for="q_ch04_03_2_a">A) A State.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch04_03_2" id="q_ch04_03_2_b" data-correct="true"><label for="q_ch04_03_2_b">B) A Decision/Branch.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch04_03_2" id="q_ch04_03_2_c" data-correct="false"><label for="q_ch04_03_2_c">C) The start of the process.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">3. If you need to show that two tasks happen simultaneously, you should use: <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ch04_03_3" id="q_ch04_03_3_a" data-correct="true"><label for="q_ch04_03_3_a">A) A Fork (thick line).</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch04_03_3" id="q_ch04_03_3_b" data-correct="false"><label for="q_ch04_03_3_b">B) A Rounded Rectangle.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ch04_03_3" id="q_ch04_03_3_c" data-correct="false"><label for="q_ch04_03_3_c">C) A dashed arrow.</label></li>
        </ul>
    </div>
    <button class="quiz-check-btn">Check Answers</button>
    <div class="quiz-feedback-main"></div>
</div>
