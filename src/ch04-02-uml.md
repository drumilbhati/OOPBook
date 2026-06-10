# Unified Modeling Language (UML)

UML is the standard language for visualizing the architecture of a system. In Low-Level Design, we primarily focus on **Class Diagrams** to represent the static structure of the application.

## Class Diagram Components

A class is represented by a box with three compartments:
1. **Top:** Class Name.
2. **Middle:** Attributes (fields).
3. **Bottom:** Operations (methods).

Visibility Modifiers:
- `+` Public
- `-` Private
- `#` Protected
- `~` Package-private

## Relationships

Understanding the arrows in a UML diagram is crucial for reading design documents.

### 1. Generalization (Inheritance)
Represented by a **solid line with a hollow arrow**. It shows an "Is-a" relationship.
*Example:* `Car` extends `Vehicle`.

### 2. Realization (Implementation)
Represented by a **dashed line with a hollow arrow**.
*Example:* `PayPalPayment` implements `PaymentStrategy`.

### 3. Association
A simple link between two classes. Represented by a **solid line**.
*Example:* `Student` is enrolled in `Course`.

### 4. Aggregation ("Has-a" - Weak)
A "part-of" relationship where the child can exist independently of the parent. Represented by a **solid line with a hollow diamond**.
*Example:* `Department` and `Professor`. If the department is deleted, the professor still exists.

### 5. Composition ("Has-a" - Strong)
A "part-of" relationship where the child cannot exist without the parent. Represented by a **solid line with a filled diamond**.
*Example:* `House` and `Room`. If the house is destroyed, the rooms are also destroyed.

### 6. Dependency
A weak relationship where one class uses another temporarily (e.g., as a parameter). Represented by a **dashed line with an open arrow**.

## Multiplicity
Indicates how many instances of one class are linked to one instance of another.
- `1`: Exactly one.
- `0..*`: Zero or more.
- `1..*`: One or more.

---

## Module Quiz

1. **Which symbol represents a Private field in UML?**
   - A) +
   - B) -
   - C) #

2. **What is the difference between Aggregation and Composition?**
   - A) Aggregation is for classes, Composition is for interfaces.
   - B) In Composition, the child cannot exist without the parent; in Aggregation, it can.
   - C) There is no difference.

3. **A solid line with a hollow arrow represents:**
   - A) Composition.
   - B) Generalization (Inheritance).
   - C) Dependency.

**Answers:** 1: B, 2: B, 3: B

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">In UML, which relationship is represented by a solid line with a filled diamond?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q04_02" id="q04_02_a" data-correct="false"><label for="q04_02_a">Aggregation (Weak Has-a)</label></li>
        <li class="quiz-option"><input type="radio" name="q04_02" id="q04_02_b" data-correct="true"><label for="q04_02_b">Composition (Strong Has-a)</label></li>
        <li class="quiz-option"><input type="radio" name="q04_02" id="q04_02_c" data-correct="false"><label for="q04_02_c">Generalization (Is-a)</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
