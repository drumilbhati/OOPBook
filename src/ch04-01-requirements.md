# Gathering Requirements for LLD

Before you write a single line of code or draw a class diagram, you must understand exactly what you are building. In an LLD interview or a real-world project, this is the most critical phase.

## The Two Types of Requirements

### 1. Functional Requirements
These define the specific behaviors and features of the system. They answer the question: **"What should the system do?"**

*Example (Parking Lot):*
- Users should be able to park a vehicle.
- The system should support different vehicle types (Car, Truck, Bike).
- The system should generate a ticket with a timestamp.

### 2. Non-Functional Requirements
These define the constraints and quality attributes of the system. They answer the question: **"How should the system perform?"**

In LLD, non-functional requirements often focus on:
- **Extensibility:** Can we add new vehicle types easily?
- **Readability:** Is the code easy for other engineers to understand?
- **Thread Safety:** Can multiple users book a spot simultaneously without corruption?

## The Art of Clarifying Questions

Never start designing based on a vague prompt like "Design a Movie Booking System." You must ask clarifying questions to narrow the scope.

**Good questions to ask:**
1. **Who are the actors?** (Admin, Customer, Guest)
2. **What is the scale?** (Is it a single parking lot or a global chain?) Note: LLD usually focuses on the internal logic, but scale informs your choice of data structures.
3. **What are the edge cases?** (What happens if the lot is full? What if a user loses their ticket?)
4. **What are the constraints?** (Do we need to support offline payments?)

## Establishing Scope

Once you have answers, list the "In-Scope" and "Out-of-Scope" features.

*   **In-Scope:** Booking, Payment, Seat selection.
*   **Out-of-Scope:** User registration, Recommendation engine, Analytics dashboard.

Setting these boundaries prevents "Scope Creep" and ensures you finish the core design within the allotted time.

---

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question">1. "The system should be able to handle 10,000 concurrent requests" is an example of:</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q_ch04_01_1" id="q_ch04_01_1_a" data-correct="false"><label for="q_ch04_01_1_a">A) Functional Requirement.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch04_01_1" id="q_ch04_01_1_b" data-correct="true"><label for="q_ch04_01_1_b">B) Non-Functional Requirement.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch04_01_1" id="q_ch04_01_1_c" data-correct="false"><label for="q_ch04_01_1_c">C) A Clarifying Question.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

<div class="quiz-container">
    <div class="quiz-question">2. Why is it important to define "Out-of-Scope" features?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q_ch04_01_2" id="q_ch04_01_2_a" data-correct="false"><label for="q_ch04_01_2_a">A) To make the project take longer.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch04_01_2" id="q_ch04_01_2_b" data-correct="true"><label for="q_ch04_01_2_b">B) To focus on the core logic and prevent unnecessary complexity during design.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch04_01_2" id="q_ch04_01_2_c" data-correct="false"><label for="q_ch04_01_2_c">C) To avoid writing any code at all.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

<div class="quiz-container">
    <div class="quiz-question">3. What is a "Functional Requirement" for an ATM?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q_ch04_01_3" id="q_ch04_01_3_a" data-correct="false"><label for="q_ch04_01_3_a">A) The system should be written in Java.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch04_01_3" id="q_ch04_01_3_b" data-correct="true"><label for="q_ch04_01_3_b">B) The user should be able to withdraw cash.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch04_01_3" id="q_ch04_01_3_c" data-correct="false"><label for="q_ch04_01_3_c">C) The system should be highly secure.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
