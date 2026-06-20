# 10. Hotel Booking System

**Difficulty:** Medium

### Scenario
Design a booking engine for a hotel franchise that coordinates multiple properties, room inventories, and reservations.

### Requirements
*   **Room Classes:** Single, Double, Suite.
*   **Booking Management:** Reserve rooms for specific date windows.
*   **No Double-Booking:** Design thread-safe allocation blocks so a room cannot be reserved concurrently for overlapping dates.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We keep a list of booking date records on each `Room` object. Booking requests acquire a lock on the specific `Room` object to avoid race conditions.

### Java Implementation
```java
import java.time.LocalDate;
import java.util.*;

enum RoomType { SINGLE, DOUBLE, SUITE }

class Room {
    private final String id;
    private final RoomType type;
    private final Set<LocalDate> bookedDates = new HashSet<>();

    public Room(String id, RoomType type) {
        this.id = id;
        this.type = type;
    }

    public synchronized boolean reserve(LocalDate checkIn, LocalDate checkOut) {
        LocalDate curr = checkIn;
        while (!curr.isAfter(checkOut)) {
            if (bookedDates.contains(curr)) {
                return false;
            }
            curr = curr.plusDays(1);
        }
        curr = checkIn;
        while (!curr.isAfter(checkOut)) {
            bookedDates.add(curr);
            curr = curr.plusDays(1);
        }
        return true;
    }
    public String getId() { return id; }
}

public class HotelBookingSystem {
    private final List<Room> rooms = new ArrayList<>();

    public void addRoom(Room r) { rooms.add(r); }

    public synchronized Room bookRoom(RoomType type, LocalDate checkIn, LocalDate checkOut) {
        for (Room room : rooms) {
            if (room.reserve(checkIn, checkOut)) {
                return room;
            }
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
<div class="quiz-question">1. Why is the reserve method in the Room class synchronized instead of only locking the entire hotel booking system? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_10_1" id="q_ch09_10_1_a" data-correct="false"><label for="q_ch09_10_1_a">A) Locking the system is not syntactically valid in Java.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_10_1" id="q_ch09_10_1_b" data-correct="true"><label for="q_ch09_10_1_b">B) By using fine-grained synchronization on individual Room instances, we allow concurrent booking searches and reservations for different rooms to execute in parallel, avoiding a system bottleneck.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_10_1" id="q_ch09_10_1_c" data-correct="false"><label for="q_ch09_10_1_c">C) Room-level locking uses fewer threads in execution.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_10_1" id="q_ch09_10_1_d" data-correct="false"><label for="q_ch09_10_1_d">D) It ensures that the reservation history is persistent.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
