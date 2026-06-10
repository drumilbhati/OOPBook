# Variables: Primitives, References, and the String Pool

In Java, data is categorized into two main types: Primitives and References. Understanding how these are stored is critical for memory-efficient LLD.

### Primitive Types
Primitives are the most basic data types. They are predefined by the language and named by a keyword. They represent pure values and are stored directly on the **Stack**.

- `byte`, `short`, `int`, `long` (Integers)
- `float`, `double` (Floating point)
- `boolean` (Truth values)
- `char` (Characters)

### Reference Types
Reference types (or Objects) point to a location in memory where the data is stored. The reference (the address) is stored on the **Stack**, while the actual object lives on the **Heap**.

```java
int primitiveInt = 10; // Stored on Stack
String referenceString = new String("LLD"); // 'referenceString' on Stack points to object on Heap
```

### The String Pool: A Memory Optimization
Strings are unique in Java. Because they are immutable and used so frequently, Java uses a "String Constant Pool" (inside the Heap) to save memory.

- When you create a string literal (`String s = "Hello"`), Java checks if "Hello" already exists in the pool. If it does, it returns the existing reference.
- If you use `new String("Hello")`, you force the creation of a new object on the Heap, bypassing the pool optimization (unless you call `.intern()`).

```java
String s1 = "Java";
String s2 = "Java";
String s3 = new String("Java");

System.out.println(s1 == s2); // true (same reference in pool)
System.out.println(s1 == s3); // false (different objects)
System.out.println(s1.equals(s3)); // true (same content)
```

> **Senior Tip:** Always use `.equals()` for content comparison and `==` for reference comparison. In LLD, understanding object identity vs. equality is paramount.

### Immutability
Most "wrapper" classes (`Integer`, `Double`, `String`) are immutable. Once created, their state cannot be changed. This makes them thread-safe by default—a huge advantage in distributed systems design.

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Where is the actual object data of a Reference type stored in Java? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q_var_1" id="q_var_1_a" data-correct="false"><label for="q_var_1_a">Stack</label></li>
            <li class="quiz-option"><input type="radio" name="q_var_1" id="q_var_1_b" data-correct="true"><label for="q_var_1_b">Heap</label></li>
            <li class="quiz-option"><input type="radio" name="q_var_1" id="q_var_1_c" data-correct="false"><label for="q_var_1_c">String Pool only</label></li>
            <li class="quiz-option"><input type="radio" name="q_var_1" id="q_var_1_d" data-correct="false"><label for="q_var_1_d">Metaspace</label></li>
        </ul>
    </div>
    <button class="quiz-check-btn">Check Answers</button>
    <div class="quiz-feedback-main"></div>
</div>
