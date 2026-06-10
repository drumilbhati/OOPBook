# Case Study: BookMyShow

Designing a movie ticket booking system like BookMyShow requires handling high concurrency, seat management, and complex relationships between movies, cinemas, and shows.

## 1. Requirements Gathering

### Functional Requirements
*   **Search:** Users should be able to search for movies by city.
*   **Show Listing:** Display cinemas and their show timings for a selected movie.
*   **Seat Selection:** Users can select available seats for a specific show.
*   **Booking & Payment:** Temporary lock on seats during payment (usually 5-10 mins).
*   **Concurrency:** Multiple users trying to book the same seat simultaneously must be handled correctly.

### Non-Functional Requirements
*   **High Availability:** The system should always be available for searching movies.
*   **Consistency:** Booking must be strictly consistent; no double-booking allowed.
*   **Low Latency:** Real-time seat updates and fast search results.

## 2. Core Classes & Relationships

*   **Movie:** Contains metadata (Title, Genre, Duration).
*   **Cinema/Theater:** Has multiple Halls.
*   **Hall:** Contains a layout of Seats.
*   **Show:** A specific Movie running in a specific Hall at a specific Time.
*   **Seat:** Defined by Row and Column. Can be of types (Silver, Gold, Platinum).
*   **Booking:** Links a User, Show, and selected Seats.
*   **Payment:** Handles the transaction state.

## 3. Implementation

The most critical part of BookMyShow is **Concurrency Control** during seat selection.

```java
import java.util.*;
import java.util.concurrent.locks.ReentrantLock;

// --- Seat Management ---
enum SeatStatus { AVAILABLE, BOOKED, LOCKED }

class Seat {
    private String id;
    private SeatStatus status = SeatStatus.AVAILABLE;
    private final ReentrantLock lock = new ReentrantLock();

    public Seat(String id) { this.id = id; }

    public boolean lockSeat() {
        if (status == SeatStatus.AVAILABLE) {
            lock.lock();
            try {
                if (status == SeatStatus.AVAILABLE) {
                    status = SeatStatus.LOCKED;
                    return true;
                }
            } finally {
                lock.unlock();
            }
        }
        return false;
    }

    public void confirmBooking() { this.status = SeatStatus.BOOKED; }
    public void releaseSeat() { this.status = SeatStatus.AVAILABLE; }
}

// --- Show & Hall ---
class Show {
    private String id;
    private Movie movie;
    private Hall hall;
    private Date startTime;
    private Map<String, Seat> seats;

    public Show(String id, Movie movie, Hall hall, Date start) {
        this.id = id;
        this.movie = movie;
        this.hall = hall;
        this.startTime = start;
        this.seats = hall.initializeSeats();
    }

    public List<Seat> getAvailableSeats() {
        // Return seats where status is AVAILABLE
        return new ArrayList<>(seats.values());
    }
}

// --- Booking Service ---
class BookingService {
    public Booking bookTickets(User user, Show show, List<String> seatIds) {
        List<Seat> lockedSeats = new ArrayList<>();
        
        try {
            for (String seatId : seatIds) {
                Seat seat = show.getSeat(seatId);
                if (seat.lockSeat()) {
                    lockedSeats.add(seat);
                } else {
                    // One seat failed, release all previously locked seats
                    releaseSeats(lockedSeats);
                    throw new RuntimeException("Seat " + seatId + " is no longer available.");
                }
            }
            
            // Proceed to Payment...
            return createBooking(user, show, lockedSeats);
        } catch (Exception e) {
            throw e;
        }
    }

    private void releaseSeats(List<Seat> seats) {
        for (Seat s : seats) s.releaseSeat();
    }
}
```

### Addressing Concurrency
In the implementation above, we used `ReentrantLock` at the `Seat` level to ensure that if two threads check and update the seat status simultaneously, only one succeeds. In a distributed system (real-world), you would use a **Distributed Lock** (like Redis) or **Optimistic Locking** in the database using a version column.

## Module Quiz

1.  **What is the best way to handle "temporary" locks (seats held for 10 mins during payment)?**
    *   A) Permanent database update to 'BOOKED'.
    *   B) Using a TTL (Time-To-Live) cache or a background job to release expired locks.
    *   C) Asking the user to pay faster.
    *   D) Locking the entire Theater table.

2.  **To improve search performance for movies in a specific city, which technique is most effective?**
    *   A) Full table scan of all movies.
    *   B) Database Indexing on `CityID` and `MovieID`.
    *   C) Storing everything in a single JSON file.
    *   D) Disabling search during peak hours.

3.  **In a distributed environment, why is `synchronized` keyword in Java insufficient for seat booking?**
    *   A) It is too slow.
    *   B) It only works within a single JVM, not across multiple application instances.
    *   C) It causes deadlocks always.
    *   D) It is deprecated.

---
*Answers: 1-B, 2-B, 3-B*

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">What is the most critical challenge when designing the seat booking logic for a high-traffic system like BookMyShow?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q08_02" id="q08_02_a" data-correct="false"><label for="q08_02_a">Choosing the right color for the seat icons.</label></li>
        <li class="quiz-option"><input type="radio" name="q08_02" id="q08_02_b" data-correct="true"><label for="q08_02_b">Handling concurrency to prevent double-booking of the same seat.</label></li>
        <li class="quiz-option"><input type="radio" name="q08_02" id="q08_02_c" data-correct="false"><label for="q08_02_c">Storing movie posters in the database.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
