# 12. Meeting Scheduler

**Difficulty:** Medium

### Scenario
Design a meeting calendar scheduler that allocates shared meeting rooms.

### Requirements
*   **Schedules:** Book rooms for dynamic periods (e.g., 2:00 PM to 3:00 PM).
*   **Conflict Checking:** Prevent a room from hosting multiple meetings at once.
*   **Invites:** Link users to scheduled meetings.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We represent meetings as intervals and check overlaps using: `start1 < end2 && start2 < end1`.

### Java Implementation
```java
import java.util.*;

class Meeting {
    final int startHour;
    final int endHour;
    final List<String> userEmails;

    Meeting(int start, int end, List<String> users) {
        this.startHour = start;
        this.endHour = end;
        this.userEmails = users;
    }
    boolean overlaps(int start, int end) {
        return this.startHour < end && start < this.endHour;
    }
}

class MeetingRoom {
    private final String id;
    private final List<Meeting> meetings = new ArrayList<>();

    MeetingRoom(String id) { this.id = id; }

    public synchronized boolean book(int start, int end, List<String> users) {
        for (Meeting m : meetings) {
            if (m.overlaps(start, end)) {
                return false;
            }
        }
        meetings.add(new Meeting(start, end, users));
        return true;
    }
    public String getId() { return id; }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. If we have meetings scheduled for [1, 3] and [3, 4], does the overlap method identify a conflict? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_12_1" id="q_ch09_12_1_a" data-correct="false"><label for="q_ch09_12_1_a">A) Yes, because 3 overlaps in both schedules.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_12_1" id="q_ch09_12_1_b" data-correct="true"><label for="q_ch09_12_1_b">B) No, since standard overlap checking evaluates strict inequalities (1 &lt; 4 and 3 &lt; 3 is false), allowing adjacent meetings to share endpoint bounds.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_12_1" id="q_ch09_12_1_c" data-correct="false"><label for="q_ch09_12_1_c">C) Yes, they must have at least 1 hour of separation buffer.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_12_1" id="q_ch09_12_1_d" data-correct="false"><label for="q_ch09_12_1_d">D) It depends on whether they are running on the same thread.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
