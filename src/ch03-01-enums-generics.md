# Enums and Generics

In this section, we'll explore how Java's type system allows for more than just simple data holders. We'll dive into advanced Enum usage and the mechanics of Generics, which are essential for building reusable and type-safe Low-Level Designs.

## Advanced Enums

In Java, an `enum` is not just a list of constants; it is a full-fledged class. This means enums can have fields, constructors, and methods.

### Enums with Fields and Methods

Suppose we are designing a payment system. Instead of using raw strings for currency, we use an enum that encapsulates the exchange rate and symbol.

```java
public enum Currency {
    USD(1.0, "$"),
    EUR(0.85, "€"),
    INR(83.0, "₹");

    private final double exchangeRate; // rate relative to USD
    private final String symbol;

    // Enum constructors are implicitly private
    Currency(double exchangeRate, String symbol) {
        this.exchangeRate = exchangeRate;
        this.symbol = symbol;
    }

    public double convertToUSD(double amount) {
        return amount / exchangeRate;
    }

    public String format(double amount) {
        return symbol + String.format("%.2f", amount);
    }
}
```

By adding behavior to the enum, we centralize logic and prevent "Primitive Obsession."

## Generics

Generics allow you to write code that works with different types while providing compile-time type safety.

### Bounded Type Parameters

Sometimes you want to restrict the types that can be used as type arguments. For example, a `Calculator` should only work with numbers.

```java
public class Statistics<T extends Number> {
    private T[] data;

    public Statistics(T[] data) {
        this.data = data;
    }

    public double average() {
        double sum = 0.0;
        for (T val : data) {
            sum += val.doubleValue();
        }
        return sum / data.length;
    }
}
```

The `<T extends Number>` syntax ensures that `T` must be `Number` or one of its subclasses (like `Integer` or `Double`).

### Type Erasure

It is crucial to understand that Java Generics are implemented using **Type Erasure**. 

To ensure backward compatibility with older Java versions, the compiler "erases" all type parameters and replaces them with their bounds (or `Object` if unbounded) after compilation.

**Before Compilation:**
```java
List<String> list = new ArrayList<>();
list.add("Hello");
String s = list.get(0);
```

**After Compilation (Bytecode):**
```java
List list = new ArrayList();
list.add("Hello");
String s = (String) list.get(0); // Compiler adds the cast
```

**Implications of Type Erasure:**
1. You cannot use `instanceof` with generic types (e.g., `if (list instanceof List<String>)` is illegal).
2. You cannot create an array of a generic type (e.g., `new T[10]` is illegal).
3. Overloading methods with the same raw type but different parameters fails (e.g., `print(List<String>)` and `print(List<Integer>)` are considered the same signature).

---

## Module Quiz

1. **Why use an enum with fields instead of a simple constant?**
   - A) To make the code slower.
   - B) To encapsulate related data and behavior within the constant itself.
   - C) Because enums cannot be used in switch statements.

2. **What happens to generic type information at runtime in Java?**
   - A) It is preserved and used for reflection.
   - B) it is "erased" and replaced by bounds or `Object`.
   - C) It is converted into machine code.

3. **In `<T extends Comparable<T>>`, what is `T` allowed to be?**
   - A) Any class.
   - B) Only classes that implement the `Comparable` interface.
   - C) Only subclasses of `Object`.

**Answers:** 1: B, 2: B, 3: B

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">What is the primary purpose of Type Erasure in Java Generics?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q03_01" id="q03_01_a" data-correct="false"><label for="q03_01_a">To make generic types faster at runtime by removing type checks.</label></li>
        <li class="quiz-option"><input type="radio" name="q03_01" id="q03_01_b" data-correct="true"><label for="q03_01_b">To ensure backward compatibility with older versions of Java that do not support generics.</label></li>
        <li class="quiz-option"><input type="radio" name="q03_01" id="q03_01_c" data-correct="false"><label for="q03_01_c">To allow developers to use primitive types as generic type arguments.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
