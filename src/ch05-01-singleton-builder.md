# Singleton & Builder Patterns

Creational patterns abstract the instantiation process. They help make a system independent of how its objects are created, composed, and represented. In this section, we cover two of the most frequently used patterns: **Singleton** and **Builder**.

---

## The Singleton Pattern

The Singleton pattern ensures that a class has only one instance and provides a global point of access to it. While it sounds simple, achieving thread-safety and preventing reflection-based attacks requires careful implementation.

### When to Use
- **Shared Resources:** Managing a shared resource like a database connection pool, a thread pool, or a cache.
- **Global State:** Storing configuration settings that must be consistent across the entire application.
- **Logging:** A centralized logger that handles all application events.

### Thread-Safe Implementations

#### 1. Double-Checked Locking
This approach minimizes synchronization overhead by checking if the instance is null twice.

```java
public class DatabaseConnector {
    private static volatile DatabaseConnector instance;

    private DatabaseConnector() {
        // Prevent instantiation via reflection
        if (instance != null) {
            throw new RuntimeException("Use getInstance() method to get the single instance of this class.");
        }
    }

    public static DatabaseConnector getInstance() {
        if (instance == null) { // First check (no locking)
            synchronized (DatabaseConnector.class) {
                if (instance == null) { // Second check (with locking)
                    instance = new DatabaseConnector();
                }
            }
        }
        return instance;
    }
}
```
> **Note:** The `volatile` keyword is critical here. It ensures that multiple threads handle the `instance` variable correctly when it is being initialized.

#### 2. Enum Singleton (Recommended)
Enums provide implicit thread-safety and guarantee only one instance even in the face of sophisticated serialization or reflection attacks.

```java
public enum ConfigurationManager {
    INSTANCE;

    private String configValue = "Default";

    public String getConfigValue() { return configValue; }
    public void setConfigValue(String val) { this.configValue = val; }
}
```

---

## The Builder Pattern

The Builder pattern separates the construction of a complex object from its representation, allowing the same construction process to create different representations.

### The "Telescoping Constructor" Problem
When a class has many optional parameters, you end up with multiple constructors (telescoping), which is hard to read and maintain.

```java
// Hard to read: which boolean is for 'isGpsEnabled'?
Computer comp = new Computer("HDD", "RAM", true, false, true);
```

### Fluent API Solution
The Builder pattern provides a clear, fluent API for object construction.

```java
public class Computer {
    // Required parameters
    private final String HDD;
    private final String RAM;

    // Optional parameters
    private final boolean isGraphicsCardEnabled;
    private final boolean isBluetoothEnabled;

    private Computer(Builder builder) {
        this.HDD = builder.HDD;
        this.RAM = builder.RAM;
        this.isGraphicsCardEnabled = builder.isGraphicsCardEnabled;
        this.isBluetoothEnabled = builder.isBluetoothEnabled;
    }

    public static class Builder {
        private final String HDD;
        private final String RAM;
        private boolean isGraphicsCardEnabled;
        private boolean isBluetoothEnabled;

        public Builder(String hdd, String ram) {
            this.HDD = hdd;
            this.RAM = ram;
        }

        public Builder setGraphicsCardEnabled(boolean enabled) {
            this.isGraphicsCardEnabled = enabled;
            return this;
        }

        public Builder setBluetoothEnabled(boolean enabled) {
            this.isBluetoothEnabled = enabled;
            return this;
        }

        public Computer build() {
            return new Computer(this);
        }
    }
}

// Usage:
Computer myPC = new Computer.Builder("500GB", "16GB")
                    .setGraphicsCardEnabled(true)
                    .build();
```

### When to Use
- When an object needs to be created with many optional components.
- When you want to ensure the object is immutable once created.
- When the construction process must allow different representations for the object being constructed.

---

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Why is the volatile keyword necessary in the double-checked locking Singleton implementation? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_01_1" id="q05_01_1_a" data-correct="false"><label for="q05_01_1_a">A) To make the getInstance() method faster.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_01_1" id="q05_01_1_b" data-correct="true"><label for="q05_01_1_b">B) To prevent instruction reordering that could lead to a partially initialized instance.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_01_1" id="q05_01_1_c" data-correct="false"><label for="q05_01_1_c">C) To ensure the constructor is private.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">2. How does an enum protect against reflection-based attacks for Singletons? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_01_2" id="q05_01_2_a" data-correct="false"><label for="q05_01_2_a">A) By making all methods static.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_01_2" id="q05_01_2_b" data-correct="true"><label for="q05_01_2_b">B) The JVM handles enum instantiation and explicitly prevents reflection-based creation of additional instances.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_01_2" id="q05_01_2_c" data-correct="false"><label for="q05_01_2_c">C) Enums cannot have methods, so they are safe.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">3. What is the primary advantage of the Builder pattern over using a constructor with many parameters? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_01_3" id="q05_01_3_a" data-correct="false"><label for="q05_01_3_a">A) It makes the code run faster.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_01_3" id="q05_01_3_b" data-correct="true"><label for="q05_01_3_b">B) It provides a readable, fluent API for creating objects with many optional parameters.</label></li>
            <li class="quiz-option"><input type="radio" name="q05_01_3" id="q05_01_3_c" data-correct="false"><label for="q05_01_3_c">C) It eliminates the need for private fields.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">4. True/False: The Builder pattern is primarily used for objects that are simple to instantiate. <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q05_01_4" id="q05_01_4_a" data-correct="false"><label for="q05_01_4_a">A) True</label></li>
            <li class="quiz-option"><input type="radio" name="q05_01_4" id="q05_01_4_b" data-correct="true"><label for="q05_01_4_b">B) False</label></li>
        </ul>
    </div>
    <div class="quiz-feedback-main"></div>
    <button class="quiz-check-btn">Check Answers</button>
</div>
