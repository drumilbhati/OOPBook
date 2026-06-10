# Prototype Pattern

The Prototype pattern allows you to create new objects by copying an existing object (the prototype) rather than creating them from scratch using `new`. This is particularly useful when the cost of creating an object is expensive or complex.

---

## When to Use
- **Expensive Initialization:** When object creation involves heavy database queries or network calls.
- **Dynamic Configuration:** When you have a set of pre-configured objects and want to create "variations" of them.
- **Reducing Subclasses:** Instead of having many subclasses that only differ in their initial state, you use prototypes with different states.

---

## Shallow vs. Deep Copy

Understanding the difference between shallow and deep copying is critical when implementing this pattern.

### Shallow Copy
Only the object itself and its primitive fields are copied. If the object contains references to other objects, only the **references** are copied. Both the original and the clone will point to the same internal objects.

### Deep Copy
The object and all objects it references are recursively copied. The clone is a completely independent copy of the original.

```java
import java.util.ArrayList;
import java.util.List;

class Document implements Cloneable {
    private String title;
    private List<String> tags;

    public Document(String title) {
        this.title = title;
        this.tags = new ArrayList<>();
    }

    // Shallow Copy Implementation
    @Override
    public Document clone() throws CloneNotSupportedException {
        return (Document) super.clone();
    }

    // Deep Copy Implementation (Preferred)
    public Document deepClone() {
        Document copy = new Document(this.title);
        copy.tags = new ArrayList<>(this.tags); // Copy the list content
        return copy;
    }
}
```

---

## The `Cloneable` Interface Pitfall
In Java, the `Cloneable` interface is a marker interface. It doesn't actually contain the `clone()` method (which is in the `Object` class). Using it is often considered a design flaw because:
1. It forces you to handle `CloneNotSupportedException`.
2. It doesn't allow for `final` fields to be set in the clone.
3. It bypasses the constructor.

### Alternative: Copy Constructors
A more idiomatic Java approach is using a copy constructor.

```java
public class UserProfile {
    private String username;
    private Settings settings;

    // Standard constructor
    public UserProfile(String username, Settings settings) {
        this.username = username;
        this.settings = settings;
    }

    // Copy constructor for Deep Copy
    public UserProfile(UserProfile other) {
        this.username = other.username;
        this.settings = new Settings(other.settings); // Assume Settings also has a copy constructor
    }
}
```

---

## Real-World Examples
- **JavaScript Prototypal Inheritance:** JavaScript uses prototypes for its object model.
- **Database Caching:** Creating a prototype of a common query result and cloning it to modify specific fields for different users.
- **Graphic Editors:** Copy-pasting shapes involves the Prototype pattern.

---

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question">1. What is the main difference between a shallow copy and a deep copy?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q05_03_1" id="q05_03_1_a" data-correct="false"><label for="q05_03_1_a">A) Shallow copy is faster because it uses less memory.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_03_1" id="q05_03_1_b" data-correct="true"><label for="q05_03_1_b">B) Shallow copy copies references to objects, while deep copy recursively copies the objects themselves.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_03_1" id="q05_03_1_c" data-correct="false"><label for="q05_03_1_c">C) There is no difference in Java.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

<div class="quiz-container">
    <div class="quiz-question">2. Why is using a copy constructor often preferred over implementing Cloneable in Java?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q05_03_2" id="q05_03_2_a" data-correct="false"><label for="q05_03_2_a">A) It is part of the Java standard library.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_03_2" id="q05_03_2_b" data-correct="true"><label for="q05_03_2_b">B) It avoids Cloneable's pitfalls like marker interface issues, handling exceptions, and bypassing constructors.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_03_2" id="q05_03_2_c" data-correct="false"><label for="q05_03_2_c">C) It is always faster than cloning.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

<div class="quiz-container">
    <div class="quiz-question">3. If an object has only int and String fields, will a shallow copy behave differently than a deep copy?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q05_03_3" id="q05_03_3_a" data-correct="false"><label for="q05_03_3_a">A) Yes, because Strings are objects.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_03_3" id="q05_03_3_b" data-correct="true"><label for="q05_03_3_b">B) No, because primitives are copied by value and Strings are immutable.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

<div class="quiz-container">
    <div class="quiz-question">4. True/False: The Prototype pattern is useful when object creation is cheaper than object cloning.</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q05_03_4" id="q05_03_4_a" data-correct="false"><label for="q05_03_4_a">A) True</label></li>
        <li class="quiz-option"><input type="radio" name="q05_03_4" id="q05_03_4_b" data-correct="true"><label for="q05_03_4_b">B) False</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

<div class="quiz-container">
    <div class="quiz-question">5. What is the main risk of using a shallow copy in the Prototype pattern for an object containing a list of other objects?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q05_03_5" id="q05_03_5_a" data-correct="false"><label for="q05_03_5_a">A) The copy operation will be significantly slower.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_03_5" id="q05_03_5_b" data-correct="true"><label for="q05_03_5_b">B) Both the original and the cloned object will share the same list instance, so modifying one affects the other.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_03_5" id="q05_03_5_c" data-correct="false"><label for="q05_03_5_c">C) The cloned object will be automatically garbage collected immediately after creation.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
