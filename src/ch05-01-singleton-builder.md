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

1. Why is the `volatile` keyword necessary in the double-checked locking Singleton implementation?
2. How does an `enum` protect against reflection-based attacks for Singletons?
3. What is the primary advantage of the Builder pattern over using a constructor with many parameters?
4. True/False: The Builder pattern is primarily used for objects that are simple to instantiate.

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Why is the volatile keyword critical in a double-checked locking Singleton implementation?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q05_01" id="q05_01_a" data-correct="false"><label for="q05_01_a">To ensure that the instance is only created when the JVM starts.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_01" id="q05_01_b" data-correct="true"><label for="q05_01_b">To prevent instruction reordering that could allow another thread to see a partially initialized instance.</label></li>
        <li class="quiz-option"><input type="radio" name="q05_01" id="q05_01_c" data-correct="false"><label for="q05_01_c">To make the getInstance() method run faster by bypassing the cache.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

---
