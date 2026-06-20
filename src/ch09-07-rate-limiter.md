# 7. Rate Limiter

**Difficulty:** Easy

### Scenario
Design an in-memory Rate Limiter to throttle API access to protect backend services.

### Requirements
*   **Throttling:** Enforce limits of $R$ requests allowed within a rolling window.
*   **Concurrency:** Support safe verification in multithreaded environments.
*   **Algorithm:** Implement the Token Bucket rate-limiting algorithm.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
The Token Bucket algorithm tracks dynamic bucket sizes refilled continuously based on time differences between requests (`System.currentTimeMillis()`). Request permissions decrement token balances.

### Java Implementation
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
        return false;
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
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this design, why is using a lastRefillTimestamp check more efficient than a background thread refilling the bucket? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_07_1" id="q_ch09_07_1_a" data-correct="false"><label for="q_ch09_07_1_a">A) Background thread refills cannot handle fractional tokens.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_07_1" id="q_ch09_07_1_b" data-correct="false"><label for="q_ch09_07_1_b">B) Thread delays could skip refilling buckets during peak hours.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_07_1" id="q_ch09_07_1_c" data-correct="true"><label for="q_ch09_07_1_c">C) Lazy updates on request evaluation avoid the resource overhead of spawning and running a persistent background thread.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_07_1" id="q_ch09_07_1_d" data-correct="false"><label for="q_ch09_07_1_d">D) It ensures all queries run under O(N) memory sizes.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
