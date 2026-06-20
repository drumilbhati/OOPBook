# 3. Custom Hash Map

**Difficulty:** Easy

### Scenario
Implement a custom Hash Map class in Java without using any of Java's built-in map collections.

### Requirements
*   **APIs:** Implement `put(key, value)`, `get(key)`, `remove(key)`, and `size()`.
*   **Collision Handling:** Resolve bucket conflicts using linked list chaining.
*   **Resizing:** When the map's load factor (size / bucket count) exceeds 0.75, double the bucket capacity and rehash all keys.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
An array of singly-linked nodes representing buckets. Each node holds key, value, and next pointer. When resizing, the array capacity doubles and all values are rehashed because the indices change (`hash = key.hashCode() % capacity`).

### Java Implementation
```java
public class CustomHashMap<K, V> {
    private static class Node<K, V> {
        final K key;
        V value;
        Node<K, V> next;

        Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    private Node<K, V>[] table;
    private int capacity;
    private int size;
    private static final float LOAD_FACTOR = 0.75f;

    @SuppressWarnings("unchecked")
    public CustomHashMap(int initialCapacity) {
        this.capacity = initialCapacity;
        this.table = new Node[capacity];
        this.size = 0;
    }

    public CustomHashMap() {
        this(16);
    }

    private int hash(K key) {
        if (key == null) return 0;
        return Math.abs(key.hashCode() % capacity);
    }

    public void put(K key, V value) {
        if ((float) size / capacity >= LOAD_FACTOR) {
            resize();
        }
        int bucketIndex = hash(key);
        Node<K, V> head = table[bucketIndex];
        if (head == null) {
            table[bucketIndex] = new Node<>(key, value);
            size++;
            return;
        }
        Node<K, V> curr = head;
        while (curr != null) {
            if (curr.key == key || (curr.key != null && curr.key.equals(key))) {
                curr.value = value;
                return;
            }
            if (curr.next == null) break;
            curr = curr.next;
        }
        curr.next = new Node<>(key, value);
        size++;
    }

    public V get(K key) {
        int bucketIndex = hash(key);
        Node<K, V> curr = table[bucketIndex];
        while (curr != null) {
            if (curr.key == key || (curr.key != null && curr.key.equals(key))) {
                return curr.value;
            }
            curr = curr.next;
        }
        return null;
    }

    public void remove(K key) {
        int bucketIndex = hash(key);
        Node<K, V> curr = table[bucketIndex];
        Node<K, V> prev = null;
        while (curr != null) {
            if (curr.key == key || (curr.key != null && curr.key.equals(key))) {
                if (prev == null) {
                    table[bucketIndex] = curr.next;
                } else {
                    prev.next = curr.next;
                }
                size--;
                return;
            }
            prev = curr;
            curr = curr.next;
        }
    }

    @SuppressWarnings("unchecked")
    private void resize() {
        Node<K, V>[] oldTable = table;
        capacity *= 2;
        table = new Node[capacity];
        size = 0;
        for (Node<K, V> head : oldTable) {
            Node<K, V> curr = head;
            while (curr != null) {
                put(curr.key, curr.value);
                curr = curr.next;
            }
        }
    }

    public int size() {
        return size;
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. What is the average time complexity of put and get operations in this hash map when collisions are minimal and load factor is handled correctly? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_03_1" id="q_ch09_03_1_a" data-correct="false"><label for="q_ch09_03_1_a">A) O(log N)</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_03_1" id="q_ch09_03_1_b" data-correct="true"><label for="q_ch09_03_1_b">B) O(1)</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_03_1" id="q_ch09_03_1_c" data-correct="false"><label for="q_ch09_03_1_c">C) O(N)</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_03_1" id="q_ch09_03_1_d" data-correct="false"><label for="q_ch09_03_1_d">D) O(N log N)</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
