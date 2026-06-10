# Inheritance and Polymorphism: Reusing and Redefining

Inheritance and Polymorphism allow us to build hierarchical structures and write code that is flexible enough to handle different types through a common interface.

### Inheritance: 'extends' vs 'implements'
- **extends:** Used for class-to-class or interface-to-interface inheritance. Java supports only **single inheritance** for classes (a class can have only one direct superclass).
- **implements:** Used when a class adopts the contract of an interface. A class can implement multiple interfaces.

### Polymorphism: Many Forms
Polymorphism allows an object to be treated as an instance of its parent class or interface.

1.  **Compile-time Polymorphism (Method Overloading):** Multiple methods in the same class with the same name but different parameters.
2.  **Runtime Polymorphism (Method Overriding):** A subclass provides a specific implementation of a method already defined in its superclass. The JVM determines which method to call at runtime based on the actual object type.

```java
class Animal {
    void makeSound() { System.out.println("Generic sound"); }
}

class Dog extends Animal {
    @Override
    void makeSound() { System.out.println("Bark"); }
}

// Runtime Polymorphism
Animal myPet = new Dog();
myPet.makeSound(); // Prints "Bark"
```

### The 'super' Keyword
The `super` keyword is used to refer to the immediate parent class.
- `super()` calls the parent's constructor.
- `super.methodName()` calls the parent's version of an overridden method.

### "Composition over Inheritance"
Inheritance creates a tight coupling ("is-a" relationship). In LLD, we often prefer **Composition** ("has-a" relationship) because it is more flexible and easier to change at runtime. If you find yourself using inheritance just to reuse code, consider composition instead.

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">What determines which version of an overridden method is executed in Java?</div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_ip_1" id="q_ip_1_a" data-correct="false"><label for="q_ip_1_a">The type of the reference variable at compile time.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ip_1" id="q_ip_1_b" data-correct="true"><label for="q_ip_1_b">The actual type of the object at runtime.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ip_1" id="q_ip_1_c" data-correct="false"><label for="q_ip_1_c">The order in which classes are defined in the file.</label></li>
            <li class="quiz-option"><input type="radio" name="q_ip_1" id="q_ip_1_d" data-correct="false"><label for="q_ip_1_d">The use of the 'static' keyword.</label></li>
        </ul>
        <div class="quiz-feedback"></div>
    </div>
    <div class="quiz-feedback-main">
        <button class="quiz-check-btn">Check Answer</button>
        <p class="quiz-result"></p>
    </div>
</div>
