# Factory & Abstract Factory Patterns

While both patterns deal with object creation, they operate at different levels of abstraction. Understanding when to use a single "factory method" versus a "factory of factories" (Abstract Factory) is key to building extensible systems.

---

## Factory Method Pattern

The **Factory Method** defines an interface for creating an object but lets subclasses decide which class to instantiate. It defers instantiation to subclasses.

### When to Use
- When a class cannot anticipate the class of objects it must create.
- When a class wants its subclasses to specify the objects it creates.
- When you want to localize the knowledge of which helper subclass is the correct one.

### Example: Document Management
Imagine an application that can create different types of documents (PDF, Word).

```java
// Product
interface Document {
    void open();
}

// Concrete Products
class PdfDocument implements Document {
    public void open() { System.out.println("Opening PDF..."); }
}

class WordDocument implements Document {
    public void open() { System.out.println("Opening Word..."); }
}

// Creator (The Factory Method)
abstract class DocumentCreator {
    public abstract Document createDocument();
    
    public void openDocument() {
        Document doc = createDocument();
        doc.open();
    }
}

// Concrete Creators
class PdfCreator extends DocumentCreator {
    public Document createDocument() { return new PdfDocument(); }
}
```

---

## Abstract Factory Pattern

The **Abstract Factory** provides an interface for creating families of related or dependent objects without specifying their concrete classes.

### When to Use
- When a system should be independent of how its products are created.
- When a system should be configured with one of multiple families of products.
- When a family of related product objects is designed to be used together, and you need to enforce this constraint.

### Example: Cross-Platform UI Toolkit
Different operating systems have different styles for buttons and checkboxes. An Abstract Factory ensures you don't mix Windows buttons with Mac checkboxes.

```java
// Abstract Products
interface Button { void paint(); }
interface Checkbox { void paint(); }

// Abstract Factory
interface GUIFactory {
    Button createButton();
    Checkbox createCheckbox();
}

// Concrete Factory 1: Windows
class WinFactory implements GUIFactory {
    public Button createButton() { return new WinButton(); }
    public Checkbox createCheckbox() { return new WinCheckbox(); }
}

// Concrete Factory 2: Mac
class MacFactory implements GUIFactory {
    public Button createButton() { return new MacButton(); }
    public Checkbox createCheckbox() { return new MacCheckbox(); }
}
```

---

## Factory Method vs. Abstract Factory

| Feature | Factory Method | Abstract Factory |
|---------|----------------|------------------|
| **Focus** | Creates a single product. | Creates families of related products. |
| **Mechanism** | Uses inheritance (subclasses override a method). | Uses object composition (factory object is passed around). |
| **Complexity** | Lower. | Higher (requires more interfaces). |
| **Extensibility** | Easy to add new product types by adding a new creator. | Easy to add new families, but hard to add new products to the family. |

---

## Real-World Examples
- **`java.util.Calendar#getInstance()`**: Uses a factory-like mechanism to return a calendar based on locale.
- **`java.sql.DriverManager#getConnection()`**: Acts as a factory for database connections.
- **Spring Framework BeanFactory**: A sophisticated implementation of the Abstract Factory pattern.

---

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Which pattern is better suited for creating a "family" of related objects? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_02_1" id="q05_02_1_a" data-correct="false"><label for="q05_02_1_a">A) Factory Method</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_1" id="q05_02_1_b" data-correct="true"><label for="q05_02_1_b">B) Abstract Factory</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_1" id="q05_02_1_c" data-correct="false"><label for="q05_02_1_c">C) Singleton</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">2. How does the Factory Method pattern utilize polymorphism? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_02_2" id="q05_02_2_a" data-correct="false"><label for="q05_02_2_a">A) By using static methods.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_2" id="q05_02_2_b" data-correct="true"><label for="q05_02_2_b">B) It defers instantiation to subclasses, which override the factory method to return specific product types.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_2" id="q05_02_2_c" data-correct="false"><label for="q05_02_2_c">C) By making the product class final.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">3. In the Abstract Factory pattern, if you need to add a new product type (e.g., "RadioButton") to the family, what changes are required? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_02_3" id="q05_02_3_a" data-correct="false"><label for="q05_02_3_a">A) No changes are needed.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_3" id="q05_02_3_b" data-correct="true"><label for="q05_02_3_b">B) Both the Abstract Factory interface and all concrete factory implementations must be updated.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_3" id="q05_02_3_c" data-correct="false"><label for="q05_02_3_c">C) Only the client code needs to change.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">4. True/False: The Factory Method pattern relies more on inheritance than composition. <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_02_4" id="q05_02_4_a" data-correct="true"><label for="q05_02_4_a">A) True</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_4" id="q05_02_4_b" data-correct="false"><label for="q05_02_4_b">B) False</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">5. What is a primary difference between the Factory Method and the Abstract Factory pattern? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_02_5" id="q05_02_5_a" data-correct="false"><label for="q05_02_5_a">A) Factory Method creates families of products, while Abstract Factory creates a single product.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_5" id="q05_02_5_b" data-correct="true"><label for="q05_02_5_b">B) Factory Method uses inheritance to defer instantiation to subclasses, while Abstract Factory uses object composition to create families of related products.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_02_5" id="q05_02_5_c" data-correct="false"><label for="q05_02_5_c">C) Factory Method is used for structural design, while Abstract Factory is for behavioral design.</label></li>
        </ul>
    </div>
    <div class="quiz-feedback-main"></div>
    <button class="quiz-check-btn">Check Answers</button>
</div>
