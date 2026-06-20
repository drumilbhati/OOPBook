# 17. Task/Job Scheduler

**Difficulty:** Hard

### Scenario
Build an in-memory task/job execution engine (like a lightweight Quartz Scheduler) that runs delayed or recurring tasks using a custom priority queue and worker thread pool.

### Requirements
*   **Schedule Actions:** Submit tasks with execution delays or cron/periodic frequencies.
*   **Worker Pool:** Run ready tasks concurrently using a dynamic execution thread pool.
*   **Accuracy:** Maintain precise execution times without busy-waiting.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We model tasks with a `nextRunTime` parameter. Tasks are stored in a thread-safe `PriorityQueue` ordered by `nextRunTime`. A coordinator thread waits (using conditional variables) until the top task is ready to run, and then dispatches it to a thread pool.

### Java Implementation
```java
import java.util.PriorityQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

class ScheduledTask implements Comparable<ScheduledTask> {
    final Runnable command;
    long nextExecutionTime;
    final long period;

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
            condition.signalAll();
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
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this scheduler, why do we use condition.awaitNanos instead of thread sleeping? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_17_1" id="q_ch09_17_1_a" data-correct="false"><label for="q_ch09_17_1_a">A) Sleep does not support nanosecond precision.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_17_1" id="q_ch09_17_1_b" data-correct="false"><label for="q_ch09_17_1_b">B) Thread.sleep holds the ReentrantLock, preventing other threads from scheduling new tasks.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_17_1" id="q_ch09_17_1_c" data-correct="true"><label for="q_ch09_17_1_c">C) Locking condition await releases the active lock and wakes up early if a task with an earlier deadline is scheduled and calls signalAll().</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_17_1" id="q_ch09_17_1_d" data-correct="false"><label for="q_ch09_17_1_d">D) It decreases CPU instruction counts automatically.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
