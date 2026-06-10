# Collections Framework: Handling Data Groups

In Low-Level Design, choosing the right data structure can drastically change the time and space complexity of your system. The Java Collections Framework (JCF) provides a standardized set of interfaces and classes.

### The Hierarchy
The core interfaces are `List`, `Set`, and `Map` (though `Map` does not extend the `Collection` interface, it is part of the framework).

#### 1. List (Ordered, allows duplicates)
- **ArrayList:** Backed by a dynamic array. Fast random access (`O(1)`), but slow insertions/deletions in the middle (`O(n)`).
- **LinkedList:** Doubly-linked list. Better for frequent insertions/deletions but slower access.

#### 2. Set (No duplicates)
- **HashSet:** Uses a HashMap internally. Offers `O(1)` time for basic operations like add, remove, and contains. Does not maintain order.
- **TreeSet:** Stores elements in a red-black tree. Maintained in natural order or by a custom comparator. `O(log n)` operations.

#### 3. Map (Key-Value pairs)
- **HashMap:** The workhorse of Java. Stores keys based on their `hashCode()`. `O(1)` average time complexity.
- **TreeMap:** Keys are sorted. Useful for range-based queries.

### The "Hashing" Contract
When using `HashSet` or `HashMap`, you **must** override both `equals()` and `hashCode()`.
- If `a.equals(b)` is true, then `a.hashCode()` **must** equal `b.hashCode()`.
- If the hash codes are different, the objects are definitely not equal.

```java
public class User {
    private String id;
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof User user)) return false;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
```

### Choosing the Right Collection
- Need fast lookups? **HashMap/HashSet**.
- Need to maintain insertion order? **LinkedHashMap/ArrayList**.
- Need to maintain sorted order? **TreeMap/TreeSet**.
- Building a thread-safe system? Look into `ConcurrentHashMap` or `CopyOnWriteArrayList`.

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. Which collection should be used if you need to maintain unique elements in their natural sorted order? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_coll_1" id="q_coll_1_a" data-correct="false"><label for="q_coll_1_a">ArrayList</label></li>
<li class="quiz-option"><input type="radio" name="q_coll_1" id="q_coll_1_b" data-correct="false"><label for="q_coll_1_b">HashSet</label></li>
<li class="quiz-option"><input type="radio" name="q_coll_1" id="q_coll_1_c" data-correct="true"><label for="q_coll_1_c">TreeSet</label></li>
<li class="quiz-option"><input type="radio" name="q_coll_1" id="q_coll_1_d" data-correct="false"><label for="q_coll_1_d">LinkedHashSet</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answers</button>
</div>

