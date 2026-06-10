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

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. Why use an enum with fields instead of a simple constant? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch03_01_1" id="q_ch03_01_1_a" data-correct="false"><label for="q_ch03_01_1_a">A) To make the code slower.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch03_01_1" id="q_ch03_01_1_b" data-correct="true"><label for="q_ch03_01_1_b">B) To encapsulate related data and behavior within the constant itself.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch03_01_1" id="q_ch03_01_1_c" data-correct="false"><label for="q_ch03_01_1_c">C) Because enums cannot be used in switch statements.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">2. What happens to generic type information at runtime in Java? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch03_01_2" id="q_ch03_01_2_a" data-correct="false"><label for="q_ch03_01_2_a">A) It is preserved and used for reflection.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch03_01_2" id="q_ch03_01_2_b" data-correct="true"><label for="q_ch03_01_2_b">B) It is "erased" and replaced by bounds or Object.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch03_01_2" id="q_ch03_01_2_c" data-correct="false"><label for="q_ch03_01_2_c">C) It is converted into machine code.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">3. In &lt;T extends Comparable&lt;T&gt;&gt;, what is T allowed to be? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch03_01_3" id="q_ch03_01_3_a" data-correct="false"><label for="q_ch03_01_3_a">A) Any class.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch03_01_3" id="q_ch03_01_3_b" data-correct="true"><label for="q_ch03_01_3_b">B) Only classes that implement the Comparable interface.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch03_01_3" id="q_ch03_01_3_c" data-correct="false"><label for="q_ch03_01_3_c">C) Only subclasses of Object.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answers</button>
</div>

