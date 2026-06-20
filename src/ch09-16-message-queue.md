# 16. Distributed Message Queue (Kafka Simulation)

**Difficulty:** Hard

### Scenario
Design an in-memory message queue matching Apache Kafka's partition, offset, and consumer group design patterns.

### Requirements
*   **Topics & Partitions:** Topics divided into $P$ partitions.
*   **Publish-Subscribe:** Producers publish to specific partition indices or round-robin.
*   **Consumer Groups:** Coordinate message delivery within groups. Each partition of a topic must be assigned to at most one consumer in a group.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We represent partitions as concurrent list buffers. We use locks to make partition assignment and reading thread-safe.

### Java Implementation
```java
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

class Message {
    final String key;
    final String payload;
    Message(String key, String payload) { this.key = key; this.payload = payload; }
}

class Partition {
    private final List<Message> queue = new ArrayList<>();
    private final AtomicInteger nextOffset = new AtomicInteger(0);

    public synchronized void write(Message msg) {
        queue.add(msg);
        nextOffset.incrementAndGet();
    }

    public synchronized Message read(int offset) {
        if (offset < 0 || offset >= queue.size()) return null;
        return queue.get(offset);
    }
    public int getLatestOffset() { return nextOffset.get(); }
}

public class LocalKafka {
    private final Map<String, List<Partition>> topics = new ConcurrentHashMap<>();

    public void createTopic(String topicName, int partitionCount) {
        List<Partition> partitions = new ArrayList<>();
        for (int i = 0; i < partitionCount; i++) {
            partitions.add(new Partition());
        }
        topics.put(topicName, partitions);
    }

    public void publish(String topicName, Message msg, int partitionIndex) {
        List<Partition> partitions = topics.get(topicName);
        if (partitions != null && partitionIndex < partitions.size()) {
            partitions.get(partitionIndex).write(msg);
        }
    }

    public Message consume(String topicName, int partitionIndex, int offset) {
        List<Partition> partitions = topics.get(topicName);
        if (partitions != null && partitionIndex < partitions.size()) {
            return partitions.get(partitionIndex).read(offset);
        }
        return null;
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In a Kafka consumer group with 3 partitions and 4 consumers, what occurs to the extra consumer? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_16_1" id="q_ch09_16_1_a" data-correct="false"><label for="q_ch09_16_1_a">A) It throws a partition assignment error.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_16_1" id="q_ch09_16_1_b" data-correct="false"><label for="q_ch09_16_1_b">B) It reads messages round-robin from all partitions.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_16_1" id="q_ch09_16_1_c" data-correct="true"><label for="q_ch09_16_1_c">C) It remains idle, acting as a standby fallback consumer, because a partition can only be assigned to a single consumer in a group at one time.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_16_1" id="q_ch09_16_1_d" data-correct="false"><label for="q_ch09_16_1_d">D) It duplicates partition offsets.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
