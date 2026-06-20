# Hard LLD Practice Problems

This section covers 6 advanced Low-Level Design (LLD) problems. These problems test your ability to model complex concurrent workflows, simulate distributed environments, handle dynamic optimizations, and resolve race conditions in high-throughput applications.

---

## 15. Ride-Sharing Service (Uber/Lyft)

### Problem Statement
Design a ride-matching and dispatch system connecting riders with nearby drivers, supporting surge pricing and location tracking.

### Requirements
*   **Driver Matching:** Match a rider to the closest active driver.
*   **Dynamic Pricing:** Compute fares based on trip distance, travel duration, and demand density (Surge Pricing Strategy).
*   **Real-time Lifecycle:** Transition status: IDLE, REQUESTED, ARRIVED, IN_PROGRESS, COMPLETED.

### Key Design & Java Implementation
We use the **Strategy Pattern** for dynamic pricing calculation and the **Observer Pattern** to push updates to riders and drivers when ride statuses change.

```java
import java.util.*;

enum RideStatus { REQUESTED, MATCHED, IN_PROGRESS, COMPLETED }

class Location {
    final double latitude;
    final double longitude;
    Location(double lat, double lon) { this.latitude = lat; this.longitude = lon; }
    double distanceTo(Location other) {
        return Math.sqrt(Math.pow(latitude - other.latitude, 2) + Math.pow(longitude - other.longitude, 2));
    }
}

interface PriceStrategy { double calculatePrice(double distance); }
class SurgePricing implements PriceStrategy {
    public double calculatePrice(double d) { return d * 2.5 * 15.0; } // 2.5x multiplier
}

class Driver {
    final String id;
    Location loc;
    boolean isAvailable = true;

    Driver(String id, Location loc) { this.id = id; this.loc = loc; }
}

public class RideSharingSystem {
    private final List<Driver> drivers = new ArrayList<>();
    private PriceStrategy pricing = new SurgePricing();

    public void addDriver(Driver d) { drivers.add(d); }

    public synchronized Driver requestRide(Location riderLoc) {
        Driver closest = null;
        double minDistance = Double.MAX_VALUE;

        for (Driver d : drivers) {
            if (d.isAvailable) {
                double dist = d.loc.distanceTo(riderLoc);
                if (dist < minDistance) {
                    minDistance = dist;
                    closest = d;
                }
            }
        }
        if (closest != null) {
            closest.isAvailable = false;
        }
        return closest;
    }
}
```

---

## 16. Distributed Message Queue (Kafka Simulation)

### Problem Statement
Design an in-memory message queue matching Apache Kafka's partition, offset, and consumer group design patterns.

### Requirements
*   **Topics & Partitions:** Topics divided into $P$ partitions.
*   **Publish-Subscribe:** Producers publish to specific partition indices or round-robin.
*   **Consumer Groups:** Coordinate message delivery within groups. Each partition of a topic must be assigned to at most one consumer in a group.

### Key Design & Java Implementation
We represent partitions as concurrent list buffers. We use locks to make partition assignment and reading thread-safe.

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

---

## 17. Task/Job Scheduler

### Problem Statement
Build an in-memory task/job execution engine (like a lightweight Quartz Scheduler) that runs delayed or recurring tasks using a custom priority queue and worker thread pool.

### Requirements
*   **Schedule Actions:** Submit tasks with execution delays or cron/periodic frequencies.
*   **Worker Pool:** Run ready tasks concurrently using a dynamic execution thread pool.
*   **Accuracy:** Maintain precise execution times without busy-waiting.

### Key Design & Java Implementation
We model tasks with a `nextRunTime` parameter. Tasks are stored in a thread-safe `PriorityQueue` ordered by `nextRunTime`. A coordinator thread waits (using conditional variables) until the top task is ready to run, and then dispatches it to a thread pool.

```java
import java.util.PriorityQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

class ScheduledTask implements Comparable<ScheduledTask> {
    final Runnable command;
    long nextExecutionTime; // in milliseconds
    final long period;       // in milliseconds, 0 means one-off

    ScheduledTask(Runnable command, long delay, long period) {
        this.command = command;
        this.nextExecutionTime = System.currentTimeMillis() + delay;
        this.period = period;
    }

    public int compareTo(ScheduledTask other) {
        return Long.compare(this.nextExecutionTime, other.nextExecutionTime);
    }
}

public class CustomScheduler {
    private final PriorityQueue<ScheduledTask> queue = new PriorityQueue<>();
    private final ReentrantLock lock = new ReentrantLock();
    private final Condition condition = lock.newCondition();
    private final ExecutorService threadPool = Executors.newFixedThreadPool(10);
    private boolean isRunning = true;

    public CustomScheduler() {
        Thread worker = new Thread(this::runLoop);
        worker.setDaemon(true);
        worker.start();
    }

    public void schedule(Runnable command, long delay, long period) {
        lock.lock();
        try {
            ScheduledTask task = new ScheduledTask(command, delay, period);
            queue.offer(task);
            condition.signalAll(); // Alert worker to re-evaluate top task
        } finally {
            lock.unlock();
        }
    }

    private void runLoop() {
        while (isRunning) {
            lock.lock();
            try {
                while (queue.isEmpty() && isRunning) {
                    condition.await();
                }
                if (!isRunning) break;

                ScheduledTask task = queue.peek();
                long now = System.currentTimeMillis();
                if (now >= task.nextExecutionTime) {
                    queue.poll();
                    threadPool.submit(task.command);
                    if (task.period > 0) {
                        task.nextExecutionTime = now + task.period;
                        queue.offer(task);
                    }
                    condition.signalAll();
                } else {
                    condition.awaitNanos(java.util.concurrent.TimeUnit.MILLISECONDS.toNanos(task.nextExecutionTime - now));
                }
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            } finally {
                lock.unlock();
            }
        }
    }
}
```

---

## 18. Collaborative Document Editor (Simplified)

### Problem Statement
Design the backend data structures and synchronization logic to coordinate multiple users concurrently editing a single document.

### Requirements
*   **Conflict Resolution:** Implement conflict resolution strategies (Operational Transformation or basic Version History check) to ensure consistency.
*   **Collaboration:** Model client cursor tracking and document changes (inserting/deleting characters at indexes).

### Key Design & Java Implementation
We model character insertions and deletions as operations. The coordinator applies Operational Transformation (OT) concepts: transforming new incoming operations relative to historical changes that occurred at the same base version.

```java
import java.util.*;

enum OpType { INSERT, DELETE }

class TextOperation {
    final String userId;
    final OpType type;
    final int index;
    final char character;
    final int baseVersion;

    TextOperation(String user, OpType type, int index, char ch, int version) {
        this.userId = user;
        this.type = type;
        this.index = index;
        this.character = ch;
        this.baseVersion = version;
    }
}

public class DocumentEngine {
    private final StringBuilder document = new StringBuilder();
    private final List<TextOperation> history = new ArrayList<>();
    private int currentVersion = 0;

    public synchronized void applyOperation(TextOperation op) {
        int adjustedIndex = op.index;

        // Transform index based on operations performed after the base version
        for (int i = op.baseVersion; i < history.size(); i++) {
            TextOperation histOp = history.get(i);
            if (histOp.index <= adjustedIndex) {
                if (histOp.type == OpType.INSERT) {
                    adjustedIndex++;
                } else if (histOp.type == OpType.DELETE) {
                    adjustedIndex--;
                }
            }
        }

        // Apply transformed operation
        if (op.type == OpType.INSERT) {
            document.insert(adjustedIndex, op.character);
        } else if (op.type == OpType.DELETE && adjustedIndex < document.length()) {
            document.deleteCharAt(adjustedIndex);
        }

        history.add(new TextOperation(op.userId, op.type, adjustedIndex, op.character, currentVersion));
        currentVersion++;
    }

    public synchronized String getDocumentText() { return document.toString(); }
}
```

---

## 19. Traffic Control System

### Problem Statement
Design an automated Traffic Control System for a 4-way intersection that adapts signal timing based on vehicle density while prioritizing emergency vehicles.

### Requirements
*   **Adapting Timing:** Detect traffic flow/density via sensors and adjust green light timers dynamically.
*   **Emergency Overrides:** Instantly switch all conflicting signals to RED if an ambulance or emergency vehicle triggers a request.

### Key Design & Java Implementation
We use the **State Pattern** to represent signal cycles (North-South Green vs East-West Green) and run a background monitor thread to read vehicle density changes.

```java
enum SignalColor { RED, YELLOW, GREEN }

class TrafficSignal {
    private final String direction;
    private SignalColor color = SignalColor.RED;

    TrafficSignal(String dir) { this.direction = dir; }

    public void setColor(SignalColor c) {
        this.color = c;
        System.out.println("Signal " + direction + " is now " + color);
    }
    public SignalColor getColor() { return color; }
}

public class IntersectionController {
    private final TrafficSignal northSouth = new TrafficSignal("North-South");
    private final TrafficSignal eastWest = new TrafficSignal("East-West");
    private boolean emergencyActive = false;

    public synchronized void updateSignals(int nsCarCount, int ewCarCount) {
        if (emergencyActive) return; // Keep emergency overrides intact

        if (nsCarCount > ewCarCount * 2) {
            // High NS volume: lengthen NS green cycle
            northSouth.setColor(SignalColor.GREEN);
            eastWest.setColor(SignalColor.RED);
        } else {
            northSouth.setColor(SignalColor.RED);
            eastWest.setColor(SignalColor.GREEN);
        }
    }

    public synchronized void triggerEmergencyOverride(String direction) {
        emergencyActive = true;
        System.out.println("EMERGENCY OVERRIDE FOR DIRECTION: " + direction);
        if (direction.equals("North-South")) {
            northSouth.setColor(SignalColor.GREEN);
            eastWest.setColor(SignalColor.RED);
        } else {
            eastWest.setColor(SignalColor.GREEN);
            northSouth.setColor(SignalColor.RED);
        }
    }

    public synchronized void clearEmergencyOverride() {
        emergencyActive = false;
        System.out.println("Emergency cleared.");
        northSouth.setColor(SignalColor.RED);
        eastWest.setColor(SignalColor.RED);
    }
}
```

---

## 20. Stock Brokerage System (Robinhood/Zerodha)

### Problem Statement
Design the order execution backend for a stock brokerage platform, including an in-memory order book matching engine.

### Requirements
*   **Order Creation:** Accept Limit and Market orders.
*   **Order Matching Engine:** Match matching Buy and Sell orders based on price priority (Buy price $\ge$ Sell price).
*   **Portfolio Management:** Check balances, update cash positions, and update portfolio shares.

### Key Design & Java Implementation
We maintain two priority queues: `buyOrders` (max-heap sorted by price) and `sellOrders` (min-heap sorted by price).

```java
import java.util.PriorityQueue;

enum OrderAction { BUY, SELL }
enum OrderType { LIMIT, MARKET }

class Order {
    final String id;
    final String symbol;
    final OrderAction action;
    final double price;
    int quantity;

    Order(String id, String symbol, OrderAction action, double price, int qty) {
        this.id = id;
        this.symbol = symbol;
        this.action = action;
        this.price = price;
        this.quantity = qty;
    }
}

public class OrderBook {
    // Buy queue: Highest price first
    private final PriorityQueue<Order> buyOrders = new PriorityQueue<>((a, b) -> Double.compare(b.price, a.price));
    // Sell queue: Lowest price first
    private final PriorityQueue<Order> sellOrders = new PriorityQueue<>((a, b) -> Double.compare(a.price, b.price));

    public synchronized void addOrder(Order order) {
        if (order.action == OrderAction.BUY) {
            buyOrders.offer(order);
        } else {
            sellOrders.offer(order);
        }
        match();
    }

    private void match() {
        while (!buyOrders.isEmpty() && !sellOrders.isEmpty()) {
            Order buy = buyOrders.peek();
            Order sell = sellOrders.peek();

            if (buy.price >= sell.price) {
                int matchedQty = Math.min(buy.quantity, sell.quantity);
                double executionPrice = sell.price; // Seller price takes precedence in FIFO matching

                System.out.println("Execution Match: " + matchedQty + " shares at $" + executionPrice);

                buy.quantity -= matchedQty;
                sell.quantity -= matchedQty;

                if (buy.quantity == 0) buyOrders.poll();
                if (sell.quantity == 0) sellOrders.poll();
            } else {
                break; // No matching buy/sell prices
            }
        }
    }
}
```

---

## Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In the Collaborative Document Editor design, what is the primary purpose of Operational Transformation (OT)? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_hard_1" id="q_hard_1_a" data-correct="false"><label for="q_hard_1_a">A) To encrypt document edits before sending them to the cloud.</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_1" id="q_hard_1_b" data-correct="true"><label for="q_hard_1_b">B) To shift the coordinates/indexes of client edits dynamically to account for concurrent edits applied in parallel since the client's original base version.</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_1" id="q_hard_1_c" data-correct="false"><label for="q_hard_1_c">C) To translate documents into foreign languages automatically.</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_1" id="q_hard_1_d" data-correct="false"><label for="q_hard_1_d">D) To partition the document storage across multiple databases.</label></li>
</ul>
</div>

<div class="quiz-question-wrapper">
<div class="quiz-question">2. In the Task/Job Scheduler design, why is the Condition variable's awaitNanos/await method preferred over a simple while(true) sleep loop? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_hard_2" id="q_hard_2_a" data-correct="false"><label for="q_hard_2_a">A) Sleep consumes more network packets.</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_2" id="q_hard_2_b" data-correct="false"><label for="q_hard_2_b">B) Condition await guarantees JVM garbage collection executes instantly.</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_2" id="q_hard_2_c" data-correct="true"><label for="q_hard_2_c">C) It allows the scheduler thread to wake up early if a higher-priority task with a sooner execution time is inserted, preventing busy-waiting and avoiding task execution delays.</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_2" id="q_hard_2_d" data-correct="false"><label for="q_hard_2_d">D) JVM sleep blocks the entire system operating system scheduling pipeline.</label></li>
</ul>
</div>

<div class="quiz-question-wrapper">
<div class="quiz-question">3. For the Order Book matching engine, what heap configuration handles Bid/Ask prioritizing? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_hard_3" id="q_hard_3_a" data-correct="false"><label for="q_hard_3_a">A) Both buy and sell orders are maintained in standard FIFO lists.</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_3" id="q_hard_3_b" data-correct="true"><label for="q_hard_3_b">B) Buy orders are stored in a Max-Heap (highest bids priority) and sell orders in a Min-Heap (lowest asks priority).</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_3" id="q_hard_3_c" data-correct="false"><label for="q_hard_3_c">C) Buy orders are stored in a Min-Heap and sell orders in a Max-Heap.</label></li>
<li class="quiz-option"><input type="radio" name="q_hard_3" id="q_hard_3_d" data-correct="false"><label for="q_hard_3_d">D) A single red-black tree containing all buy and sell orders ordered chronologically.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
