# 4. LRU Cache

**Difficulty:** Easy

### Scenario
Design a Least Recently Used (LRU) Cache with a fixed capacity.

### Requirements
*   **APIs:** `get(key)` and `put(key, value)`.
*   **Time Complexity:** Both operations must run in $O(1)$ time.
*   **Eviction:** When the cache reaches its capacity limit, it must evict the least recently used item before inserting the new one.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
To get $O(1)$ lookups and updates, we combine a `HashMap` for constant-time node references and a custom Doubly Linked List to maintain access ordering (moving accessed nodes to the head and evicting from the tail).

### Java Implementation
```java
import java.util.HashMap;
import java.util.Map;

public class LRUCache<K, V> {
    private static class Node<K, V> {
        K key;
        V value;
        Node<K, V> prev;
        Node<K, V> next;
        Node(K key, V value) {
            this.key = key;
            this.value = value;
        }
    }

    private final int capacity;
    private final Map<K, Node<K, V>> cache = new HashMap<>();
    private final Node<K, V> head;
    private final Node<K, V> tail;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.head = new Node<>(null, null);
        this.tail = new Node<>(null, null);
        head.next = tail;
        tail.prev = head;
    }

    public V get(K key) {
        Node<K, V> node = cache.get(key);
        if (node == null) return null;
        moveToHead(node);
        return node.value;
    }

    public void put(K key, V value) {
        Node<K, V> node = cache.get(key);
        if (node != null) {
            node.value = value;
            moveToHead(node);
        } else {
            if (cache.size() >= capacity) {
                Node<K, V> lru = tail.prev;
                removeNode(lru);
                cache.remove(lru.key);
            }
            Node<K, V> newNode = new Node<>(key, value);
            cache.put(key, newNode);
            addNode(newNode);
        }
    }

    private void addNode(Node<K, V> node) {
        node.next = head.next;
        node.prev = head;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(Node<K, V> node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(Node<K, V> node) {
        removeNode(node);
        addNode(node);
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this design, what is the role of the dummy head and tail nodes in the doubly linked list? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_04_1" id="q_ch09_04_1_a" data-correct="false"><label for="q_ch09_04_1_a">A) They act as boundary markers to store metadata.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_04_1" id="q_ch09_04_1_b" data-correct="true"><label for="q_ch09_04_1_b">B) They simplify insertion and deletion code by eliminating the need to check for null pointers at the boundaries of the list.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_04_1" id="q_ch09_04_1_c" data-correct="false"><label for="q_ch09_04_1_c">C) They store the hash codes of keys.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_04_1" id="q_ch09_04_1_d" data-correct="false"><label for="q_ch09_04_1_d">D) They prevent duplicate keys from being inserted.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
