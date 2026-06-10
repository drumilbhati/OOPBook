# Classes and Objects: The Blueprints of Java

Object-Oriented Programming (OOP) is centered around the concept of modeling real-world entities. In Java, this starts with Classes and Objects.

### The Class: A Blueprint
A **Class** is a template or blueprint that defines the state (fields) and behavior (methods) that objects of that type will have. It doesn't occupy memory for data until an object is instantiated.

### The Object: An Instance
An **Object** is an instance of a class. When you create an object using the `new` keyword, memory is allocated on the Heap.

```java
public class Car {
    // State (Fields)
    String model;
    int year;

    // Constructor
    public Car(String model, int year) {
        this.model = model;
        this.year = year;
    }

    // Behavior (Method)
    void drive() {
        System.out.println(model + " is driving.");
    }
}

// Usage
Car myCar = new Car("Tesla", 2023); // Object creation
```

### The 'this' Keyword
The `this` keyword refers to the **current instance** of the class. It is commonly used to:
1.  Differentiate between instance variables and parameters with the same name (as seen in the constructor above).
2.  Pass the current object as a parameter to other methods.
3.  Invoke another constructor from the same class (Constructor Chaining).

### Constructors
Constructors are special methods used to initialize objects.
- They have the **same name** as the class.
- They have **no return type** (not even `void`).
- If you don't define any constructor, Java provides a default "no-arg" constructor. If you define *any* constructor, the default one is no longer provided.

> **Design Tip:** In LLD, use **Private Constructors** when you want to prevent instantiation (e.g., in a Singleton pattern or a Utility class).

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. What happens if you define a constructor with a return type (e.g., public void MyClass())? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_co_1" id="q_co_1_a" data-correct="false"><label for="q_co_1_a">It remains a valid constructor.</label></li>
<li class="quiz-option"><input type="radio" name="q_co_1" id="q_co_1_b" data-correct="true"><label for="q_co_1_b">It is treated as a regular method and is no longer a constructor.</label></li>
<li class="quiz-option"><input type="radio" name="q_co_1" id="q_co_1_c" data-correct="false"><label for="q_co_1_c">The compiler throws an error.</label></li>
<li class="quiz-option"><input type="radio" name="q_co_1" id="q_co_1_d" data-correct="false"><label for="q_co_1_d">It becomes a static initializer.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answers</button>
</div>

