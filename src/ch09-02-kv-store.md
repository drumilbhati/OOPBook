# 2. In-Memory Key-Value Store with TTL

**Difficulty:** Easy

### Scenario
Design an in-memory key-value database (similar to a local Redis cache) supporting `put` (with optional Time-To-Live expiration), `get`, and `delete`.

### Requirements
*   **Key Operations:** `put(key, value, ttlMs)`, `get(key)`, and `delete(key)`.
*   **Expiration Behavior:** If a key's TTL expires, `get` must return `null` and actively remove the key.
*   **Active Eviction:** Build a daemon task that cleans up expired keys periodically.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
Values are wrapped inside a `ValueHolder` holding the raw value and expiration timestamp. We use a thread-safe `ConcurrentHashMap` along with a daemon task running in a `ScheduledExecutorService` to periodically clear expired data.

### Java Implementation
```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class InMemoryKVStore<K, V> {
    private static class ValueHolder<V> {
        final V value;
        final long expiryTime;

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
            t.setDaemon(true);
            return t;
        });
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
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. Why does this design implement both lazy cleanup and active background cleanup? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_02_1" id="q_ch09_02_1_a" data-correct="false"><label for="q_ch09_02_1_a">A) Background cleanup is less reliable than lazy cleanup.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_02_1" id="q_ch09_02_1_b" data-correct="false"><label for="q_ch09_02_1_b">B) To support thread pool synchronization.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_02_1" id="q_ch09_02_1_c" data-correct="true"><label for="q_ch09_02_1_c">C) Lazy cleanup prevents reading stale expired data in the short term, while active background cleanup prevents memory leaks for keys that are never read again.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_02_1" id="q_ch09_02_1_d" data-correct="false"><label for="q_ch09_02_1_d">D) JVM GC requires both implementations to reclaim objects.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
