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

1. **"The system should be able to handle 10,000 concurrent requests" is an example of:**
   - A) Functional Requirement.
   - B) Non-Functional Requirement.
   - C) A Clarifying Question.

2. **Why is it important to define "Out-of-Scope" features?**
   - A) To make the project take longer.
   - B) To focus on the core logic and prevent unnecessary complexity during design.
   - C) To avoid writing any code at all.

3. **What is a "Functional Requirement" for an ATM?**
   - A) The system should be written in Java.
   - B) The user should be able to withdraw cash.
   - C) The system should be highly secure.

**Answers:** 1: B, 2: B, 3: B

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Which of the following is an example of a Non-Functional Requirement (NFR)?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q04_01" id="q04_01_a" data-correct="false"><label for="q04_01_a">The system must allow users to reset their passwords.</label></li>
        <li class="quiz-option"><input type="radio" name="q04_01" id="q04_01_b" data-correct="true"><label for="q04_01_b">The system should be able to scale horizontally to handle increased traffic.</label></li>
        <li class="quiz-option"><input type="radio" name="q04_01" id="q04_01_c" data-correct="false"><label for="q04_01_c">The system must provide a search bar on the home page.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
