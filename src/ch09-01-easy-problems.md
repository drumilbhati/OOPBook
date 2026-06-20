# Easy LLD Practice Problems

This section covers 7 introductory Low-Level Design (LLD) problems. These problems focus on concrete data structures, simple design patterns (like State), concurrency basics, and object-oriented fundamentals.

---

## 1. Thread-Safe Generic Stack

### Problem Statement
Design a generic Stack data structure (`ConcurrentStack<T>`) in Java that supports standard lifo operations (`push`, `pop`, `peek`, `isEmpty`, `size`) and is thread-safe for concurrent read and write operations.

### Requirements
*   **Generics:** Stack must support any reference type.
*   **Thread Safety:** Multiple threads should be able to push and pop concurrently without corruption. Use fine-grained locking or Read-Write locks where applicable to allow concurrent reads (`peek`, `isEmpty`, `size`).
*   **Exception Handling:** Throw appropriate exceptions on popping or peeking an empty stack.

### Key Design & Java Implementation
We use Java's `ReentrantReadWriteLock` to allow multiple threads to perform read-only actions (like `peek()` and `size()`) concurrently while ensuring exclusive access for writes (`push()` and `pop()`).

```java
import java.util.ArrayList;
import java.util.EmptyStackException;
import java.util.List;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class ConcurrentStack<T> {
    private final List<T> list = new ArrayList<>();
    private final ReentrantReadWriteLock rwl = new ReentrantReadWriteLock();

    public void push(T item) {
        rwl.writeLock().lock();
        try {
            list.add(item);
        } finally {
            rwl.writeLock().unlock();
        }
    }

    public T pop() {
        rwl.writeLock().lock();
        try {
            if (list.isEmpty()) {
                throw new EmptyStackException();
            }
            return list.remove(list.size() - 1);
        } finally {
            rwl.writeLock().unlock();
        }
    }

    public T peek() {
        rwl.readLock().lock();
        try {
            if (list.isEmpty()) {
                throw new EmptyStackException();
            }
            return list.get(list.size() - 1);
        } finally {
            rwl.readLock().unlock();
        }
    }

    public boolean isEmpty() {
        rwl.readLock().lock();
        try {
            return list.isEmpty();
        } finally {
            rwl.readLock().unlock();
        }
    }

    public int size() {
        rwl.readLock().lock();
        try {
            return list.size();
        } finally {
            rwl.readLock().unlock();
        }
    }
}
```

---

## 2. In-Memory Key-Value Store with TTL

### Problem Statement
Design an in-memory key-value database (similar to a local Redis instance) supporting `put` (with optional Time-To-Live expiration), `get`, and `delete`.

### Requirements
*   **Operations:** `put(key, value, ttlMs)`, `get(key)`, and `delete(key)`.
*   **TTL Eviction:** If a key's TTL has expired, `get` must return `null` and delete the key.
*   **Active Cleanup:** A background thread should periodically clean up expired keys to free memory.

### Key Design & Java Implementation
We map keys to a `ValueHolder` object containing the value and expiration timestamp. A `ScheduledExecutorService` runs a background task to clean up expired entries periodically.

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class InMemoryKVStore<K, V> {
    private static class ValueHolder<V> {
        final V value;
        final long expiryTime; // Milliseconds timestamp, -1 means no expiry

        ValueHolder(V value, long ttlMs) {
            this.value = value;
            this.expiryTime = ttlMs > 0 ? System.currentTimeMillis() + ttlMs : -1;
        }

        boolean isExpired() {
            return expiryTime != -1 && System.currentTimeMillis() > expiryTime;
        }
    }

    private final ConcurrentHashMap<K, ValueHolder<V>> store = new ConcurrentHashMap<>();
    private final ScheduledExecutorService scheduler;

    public InMemoryKVStore() {
        this.scheduler = Executors.newSingleThreadScheduledExecutor(r -> {
            Thread t = new Thread(r);
            t.setDaemon(true); // Daemon thread so it stops when main exits
            return t;
        });
        // Run cleanup every 5 seconds
        this.scheduler.scheduleAtFixedRate(this::cleanExpiredKeys, 5, 5, TimeUnit.SECONDS);
    }

    public void put(K key, V value, long ttlMs) {
        store.put(key, new ValueHolder<>(value, ttlMs));
    }

    public V get(K key) {
        ValueHolder<V> holder = store.get(key);
        if (holder == null) return null;
        if (holder.isExpired()) {
            store.remove(key); // Lazy cleanup
            return null;
        }
        return holder.value;
    }

    public void delete(K key) {
        store.remove(key);
    }

    private void cleanExpiredKeys() {
        for (K key : store.keySet()) {
            ValueHolder<V> holder = store.get(key);
            if (holder != null && holder.isExpired()) {
                store.remove(key);
            }
        }
    }

    public void shutdown() {
        scheduler.shutdown();
    }
}
```

---

## 3. Custom Hash Map

### Problem Statement
Implement a custom Hash Map class in Java without using any built-in map collections.

### Requirements
*   **Functions:** Implement `put(key, value)`, `get(key)`, `remove(key)`, and `size()`.
*   **Collision Resolution:** Resolve bucket collisions using chaining (linked list).
*   **Resizing:** When the size / bucket count ratio exceeds a threshold (load factor of 0.75), double the array size and rehash all keys.

### Key Design & Java Implementation
An array of singly-linked nodes representing buckets. Each node holds key, value, and next pointer.

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

---

## 4. LRU Cache

### Problem Statement
Design a Least Recently Used (LRU) Cache with a fixed capacity.

### Requirements
*   **API:** `get(key)` and `put(key, value)`.
*   **Time Complexity:** Both operations must run in $O(1)$ time.
*   **Eviction:** When the cache reaches its capacity, it should invalidate/evict the least recently used item before inserting a new one.

### Key Design & Java Implementation
We pair a `HashMap` (for fast $O(1)$ node lookup) with a custom doubly linked list (to track access order by moving items to the head and evicting from the tail).

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

---

## 5. Vending Machine

### Problem Statement
Design a Vending Machine that dispenses products upon coin/cash validation.

### Requirements
*   **Workflow:** Insert coins, select an item, dispense the item, and return change.
*   **State Management:** Transition through states: Idle, Accepting Money, Dispensing, Out of Stock.
*   **Validation:** Do not dispense if inserted amount is insufficient.

### Key Design & Java Implementation
We use the **State Pattern** to represent the vending machine's current state and dictate allowed transactions.

```java
import java.util.HashMap;
import java.util.Map;

enum MachineState { IDLE, ACCEPTING_COINS, DISPENSING }

class Item {
    String name;
    double price;
    Item(String name, double price) {
        this.name = name;
        this.price = price;
    }
}

public class VendingMachine {
    private final Map<String, Item> inventory = new HashMap<>();
    private final Map<String, Integer> stock = new HashMap<>();
    private MachineState currentState = MachineState.IDLE;
    private double balance = 0.0;
    private String selectedItem = null;

    public void addItem(String code, Item item, int quantity) {
        inventory.put(code, item);
        stock.put(code, quantity);
    }

    public synchronized void insertCoin(double amount) {
        if (currentState == MachineState.DISPENSING) {
            System.out.println("Wait, dispensing in progress.");
            return;
        }
        balance += amount;
        currentState = MachineState.ACCEPTING_COINS;
        System.out.println("Balance updated: " + balance);
    }

    public synchronized void selectItem(String code) {
        if (!inventory.containsKey(code) || stock.get(code) <= 0) {
            System.out.println("Item out of stock or invalid.");
            return;
        }
        Item item = inventory.get(code);
        if (balance < item.price) {
            System.out.println("Insufficient balance. Requires: " + item.price);
            return;
        }
        selectedItem = code;
        currentState = MachineState.DISPENSING;
        dispense();
    }

    private void dispense() {
        Item item = inventory.get(selectedItem);
        stock.put(selectedItem, stock.get(selectedItem) - 1);
        balance -= item.price;
        System.out.println("Dispensed: " + item.name);
        refundChange();
    }

    public synchronized void refundChange() {
        if (balance > 0) {
            System.out.println("Returned change: " + balance);
            balance = 0;
        }
        selectedItem = null;
        currentState = MachineState.IDLE;
    }
}
```

---

## 6. Tic-Tac-Toe Game

### Problem Statement
Design a classic $N \times N$ Tic-Tac-Toe game playable by two players on a shared terminal.

### Requirements
*   **Initialization:** Dynamic grid size $N$ (typically 3).
*   **Execution:** Alternate turns between Player X and Player O.
*   **Win Check:** Win condition is a line of $N$ identical symbols horizontally, vertically, or diagonally.

### Key Design & Java Implementation
Uses a `Board` object, `Player` objects, and a `GameEngine` to coordinate flow and check victory conditions.

```java
public class TicTacToe {
    private final char[][] board;
    private final int size;
    private char currentTurn = 'X';
    private int movesCount = 0;

    public TicTacToe(int size) {
        this.size = size;
        this.board = new char[size][size];
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                board[i][j] = '-';
            }
        }
    }

    public synchronized boolean makeMove(int row, int col) {
        if (row < 0 || row >= size || col < 0 || col >= size || board[row][col] != '-') {
            return false; // Invalid move
        }
        board[row][col] = currentTurn;
        movesCount++;
        if (checkWin(row, col)) {
            System.out.println("Player " + currentTurn + " wins!");
            reset();
        } else if (movesCount == size * size) {
            System.out.println("Game Draw!");
            reset();
        } else {
            currentTurn = (currentTurn == 'X') ? 'O' : 'X';
        }
        return true;
    }

    private boolean checkWin(int r, int c) {
        // Row check
        boolean win = true;
        for (int i = 0; i < size; i++) {
            if (board[r][i] != currentTurn) { win = false; break; }
        }
        if (win) return true;

        // Col check
        win = true;
        for (int i = 0; i < size; i++) {
            if (board[i][c] != currentTurn) { win = false; break; }
        }
        if (win) return true;

        // Diagonal checks
        if (r == c) {
            win = true;
            for (int i = 0; i < size; i++) {
                if (board[i][i] != currentTurn) { win = false; break; }
            }
            if (win) return true;
        }
        if (r + c == size - 1) {
            win = true;
            for (int i = 0; i < size; i++) {
                if (board[i][size - 1 - i] != currentTurn) { win = false; break; }
            }
            if (win) return true;
        }
        return false;
    }

    private void reset() {
        movesCount = 0;
        currentTurn = 'X';
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                board[i][j] = '-';
            }
        }
    }
}
```

---

## 7. Rate Limiter

### Problem Statement
Design an in-memory Rate Limiter to throttle API access to protect resources.

### Requirements
*   **Throttling:** Max limit of $R$ requests allowed within dynamic windows.
*   **Efficiency:** Thread-safe, quick validation checks.
*   **Algorithms:** Implement the Token Bucket rate-limiting algorithm.

### Key Design & Java Implementation
We simulate a bucket that fills up with tokens at a steady rate. Every request consumes a token; if no tokens remain, the request is dropped.

```java
public class TokenBucketRateLimiter {
    private final long maxCapacity;
    private final double refillRatePerSecond;
    private double currentTokens;
    private long lastRefillTimestamp;

    public TokenBucketRateLimiter(long maxCapacity, double refillRatePerSecond) {
        this.maxCapacity = maxCapacity;
        this.refillRatePerSecond = refillRatePerSecond;
        this.currentTokens = maxCapacity;
        this.lastRefillTimestamp = System.currentTimeMillis();
    }

    public synchronized boolean allowRequest() {
        refill();
        if (currentTokens >= 1.0) {
            currentTokens -= 1.0;
            return true;
        }
        return false; // Throttled
    }

    private void refill() {
        long now = System.currentTimeMillis();
        double elapsedSeconds = (now - lastRefillTimestamp) / 1000.0;
        double tokensToAdd = elapsedSeconds * refillRatePerSecond;
        currentTokens = Math.min(maxCapacity, currentTokens + tokensToAdd);
        lastRefillTimestamp = now;
    }
}
```

---

## Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In an LRU Cache implementation, why do we use a Doubly Linked List alongside a HashMap? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_easy_1" id="q_easy_1_a" data-correct="false"><label for="q_easy_1_a">A) To make lookups run in logarithmic time.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_1" id="q_easy_1_b" data-correct="true"><label for="q_easy_1_b">B) To support ordering updates and node deletions in O(1) time while matching them with O(1) hash map lookups.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_1" id="q_easy_1_c" data-correct="false"><label for="q_easy_1_c">C) Because arrays are too slow for simple index lookups.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_1" id="q_easy_1_d" data-correct="false"><label for="q_easy_1_d">D) To serialize keys for disk writes.</label></li>
</ul>
</div>

<div class="quiz-question-wrapper">
<div class="quiz-question">2. When resizing a custom Hash Map, why is it critical to re-hash all key elements instead of just copying them to the new table? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_easy_2" id="q_easy_2_a" data-correct="false"><label for="q_easy_2_a">A) Re-hashing generates new objects to prevent memory leaks.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_2" id="q_easy_2_b" data-correct="false"><label for="q_easy_2_b">B) The load factor checks for duplicate keys during resizing.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_2" id="q_easy_2_c" data-correct="true"><label for="q_easy_2_c">C) The array capacity (denominator in hash division) has changed, which shifts the key bucket mappings.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_2" id="q_easy_2_d" data-correct="false"><label for="q_easy_2_d">D) Standard Java garbage collection requires resizing maps this way.</label></li>
</ul>
</div>

<div class="quiz-question-wrapper">
<div class="quiz-question">3. What is the main advantage of using a ReentrantReadWriteLock instead of simple synchronized blocks for thread safety? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_easy_3" id="q_easy_3_a" data-correct="false"><label for="q_easy_3_a">A) It uses fewer CPU registers.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_3" id="q_easy_3_b" data-correct="true"><label for="q_easy_3_b">B) It allows multiple threads to read concurrently while keeping writes exclusive, improving performance in read-heavy applications.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_3" id="q_easy_3_c" data-correct="false"><label for="q_easy_3_c">C) It prevents any deadlock from occurring automatically.</label></li>
<li class="quiz-option"><input type="radio" name="q_easy_3" id="q_easy_3_d" data-correct="false"><label for="q_easy_3_d">D) It compiles to faster machine code than standard synchronized methods.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
