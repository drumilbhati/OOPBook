# Medium LLD Practice Problems

This section covers 7 intermediate Low-Level Design (LLD) problems. These problems require integrating multiple classes, defining clean interfaces, applying design patterns (e.g., Strategy, State, Chain of Responsibility), and resolving concurrency challenges.

---

## 8. Splitwise (Expense Sharing Application)

### Problem Statement
Design an expense sharing system like Splitwise where users can add expenses, split them in various ways (equally, exactly, or by percentage), track outstanding balances, and view net balances.

### Requirements
*   **Split Types:** Support EQUAL, EXACT, and PERCENTAGE splits.
*   **Balance Tracking:** Compute net balances between users.
*   **Verification:** Ensure that split amounts add up to the total expense.

### Key Design & Java Implementation
We use the **Strategy Pattern** for the split validation and calculations. We define a base `Split` class, specialized split classes (`EqualSplit`, `ExactSplit`, `PercentSplit`), and an `Expense` model that aggregates them.

```java
import java.util.*;

enum SplitType { EQUAL, EXACT, PERCENT }

abstract class Split {
    private final String userId;
    protected double amount;

    public Split(String userId) { this.userId = userId; }
    public String getUserId() { return userId; }
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }
}

class EqualSplit extends Split { public EqualSplit(String userId) { super(userId); } }
class ExactSplit extends Split {
    public ExactSplit(String userId, double amount) {
        super(userId);
        this.amount = amount;
    }
}
class PercentSplit extends Split {
    private final double percent;
    public PercentSplit(String userId, double percent) {
        super(userId);
        this.percent = percent;
    }
    public double getPercent() { return percent; }
}

class Expense {
    private final String id;
    private final String paidBy;
    private final double amount;
    private final List<Split> splits;

    public Expense(String id, String paidBy, double amount, List<Split> splits) {
        this.id = id;
        this.paidBy = paidBy;
        this.amount = amount;
        this.splits = splits;
    }

    public boolean validate() {
        double sum = 0;
        for (Split s : splits) {
            sum += s.getAmount();
        }
        return Math.abs(sum - amount) < 0.01;
    }
}

public class ExpenseManager {
    private final Map<String, Map<String, Double>> balanceSheet = new HashMap<>();

    public void addExpense(String paidBy, double amount, List<Split> splits, SplitType splitType) {
        // Equal split setup logic
        if (splitType == SplitType.EQUAL) {
            double splitAmount = amount / splits.size();
            for (Split s : splits) {
                s.setAmount(splitAmount);
            }
        } else if (splitType == SplitType.PERCENT) {
            for (Split s : splits) {
                PercentSplit ps = (PercentSplit) s;
                s.setAmount((amount * ps.getPercent()) / 100.0);
            }
        }

        Expense expense = new Expense(UUID.randomUUID().toString(), paidBy, amount, splits);
        if (!expense.validate()) {
            throw new IllegalArgumentException("Splits must sum up to the total amount.");
        }

        for (Split s : splits) {
            String oweTo = s.getUserId();
            if (oweTo.equals(paidBy)) continue;

            balanceSheet.putIfAbsent(paidBy, new HashMap<>());
            balanceSheet.putIfAbsent(oweTo, new HashMap<>());

            // Update owe records
            Map<String, Double> payerBalances = balanceSheet.get(paidBy);
            payerBalances.put(oweTo, payerBalances.getOrDefault(oweTo, 0.0) + s.getAmount());

            Map<String, Double> owerBalances = balanceSheet.get(oweTo);
            owerBalances.put(paidBy, owerBalances.getOrDefault(paidBy, 0.0) - s.getAmount());
        }
    }

    public void printBalances() {
        for (String user : balanceSheet.keySet()) {
            for (Map.Entry<String, Double> entry : balanceSheet.get(user).entrySet()) {
                if (entry.getValue() > 0) {
                    System.out.println(user + " gets back " + entry.getValue() + " from " + entry.getKey());
                }
            }
        }
    }
}
```

---

## 9. Online Shopping Platform (E-commerce)

### Problem Statement
Design an online shopping cart and checkout platform with product listings, inventory management, and orders.

### Requirements
*   **Catalog & Search:** Users can browse/search products.
*   **Cart & Checkout:** Add products to a cart, compute taxes, and apply discount strategies.
*   **Payment & Notification:** Support credit card or mobile payments; update inventory.

### Key Design & Java Implementation
We apply the **Strategy Pattern** for dynamic discount checking and checkout payments, and the **State Pattern** to manage order lifecycle.

```java
import java.util.*;

interface PaymentStrategy { void pay(double amount); }
class CreditCardPayment implements PaymentStrategy {
    public void pay(double amount) { System.out.println("Paid " + amount + " via Card."); }
}

enum OrderStatus { PLACED, SHIPPED, DELIVERED }

class Order {
    private final String orderId;
    private final Map<String, Integer> items;
    private double totalAmount;
    private OrderStatus status = OrderStatus.PLACED;

    public Order(String orderId, Map<String, Integer> items, double amount) {
        this.orderId = orderId;
        this.items = items;
        this.totalAmount = amount;
    }
    public void ship() { this.status = OrderStatus.SHIPPED; }
    public OrderStatus getStatus() { return status; }
}

public class ShoppingEngine {
    private final Map<String, Integer> inventory = new HashMap<>();

    public synchronized boolean checkout(Map<String, Integer> cart, PaymentStrategy payment, double total) {
        // Validate inventory
        for (Map.Entry<String, Integer> item : cart.entrySet()) {
            if (inventory.getOrDefault(item.getKey(), 0) < item.getValue()) {
                System.out.println("Insufficient inventory for: " + item.getKey());
                return false;
            }
        }
        // Deduct inventory
        for (Map.Entry<String, Integer> item : cart.entrySet()) {
            inventory.put(item.getKey(), inventory.get(item.getKey()) - item.getValue());
        }
        payment.pay(total);
        new Order(UUID.randomUUID().toString(), cart, total);
        return true;
    }
}
```

---

## 10. Hotel Booking System

### Problem Statement
Design a booking engine for a hotel franchise that coordinates multiple properties, room inventories, and reservations.

### Requirements
*   **Room Classes:** Single, Double, Suite.
*   **Booking Management:** Reserve rooms for specific date windows.
*   **No Double-Booking:** Design thread-safe allocation blocks so a room cannot be reserved concurrently for overlapping dates.

### Key Design & Java Implementation
We keep a list of `Booking` records on each `Room` object. Booking requests acquire a lock on the specific `Room` object to avoid race conditions.

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
        // Check for conflicts
        LocalDate curr = checkIn;
        while (!curr.isAfter(checkOut)) {
            if (bookedDates.contains(curr)) {
                return false; // Room already booked for this day
            }
            curr = curr.plusDays(1);
        }
        // Add reservations
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
        return null; // No available rooms
    }
}
```

---

## 11. Car Rental System

### Problem Statement
Design a car rental platform with branches, dynamic pricing models, and billing.

### Requirements
*   **Vehicle Types:** Sedan, SUV, EV.
*   **Operations:** Reserve vehicles, generate bills, and process returns.
*   **Dynamic Rates:** Calculate fees using base rates plus surcharge modifiers based on vehicle classes.

### Key Design & Java Implementation
We implement dynamic pricing strategies based on seasonal surcharges or vehicle types.

```java
import java.time.temporal.ChronoUnit;
import java.time.LocalDateTime;

abstract class Vehicle {
    protected String plate;
    protected double baseDailyRate;
    public abstract double calculatePrice(long days);
}

class Sedan extends Vehicle {
    public Sedan(String plate) { this.plate = plate; this.baseDailyRate = 40.0; }
    public double calculatePrice(long days) { return baseDailyRate * days; }
}

class SUV extends Vehicle {
    public SUV(String plate) { this.plate = plate; this.baseDailyRate = 75.0; }
    public double calculatePrice(long days) { return baseDailyRate * days * 1.2; } // 20% surcharge
}

class RentalReservation {
    private final Vehicle vehicle;
    private final LocalDateTime startTime;
    private LocalDateTime endTime;

    public RentalReservation(Vehicle vehicle, LocalDateTime start) {
        this.vehicle = vehicle;
        this.startTime = start;
    }

    public double completeRental(LocalDateTime end) {
        this.endTime = end;
        long days = ChronoUnit.DAYS.between(startTime, endTime);
        if (days == 0) days = 1;
        return vehicle.calculatePrice(days);
    }
}
```

---

## 12. Meeting Scheduler

### Problem Statement
Design a meeting calendar scheduler that allocates shared meeting rooms.

### Requirements
*   **Schedules:** Book rooms for dynamic periods (e.g., 2:00 PM to 3:00 PM).
*   **Conflict Checking:** Prevent a room from hosting multiple meetings at once.
*   **Invites:** Link users to scheduled meetings.

### Key Design & Java Implementation
We represent meetings as intervals and check overlaps using: `start1 < end2 && start2 < end1`.

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
                return false; // Room conflict
            }
        }
        meetings.add(new Meeting(start, end, users));
        return true;
    }
    public String getId() { return id; }
}
```

---

## 13. ATM (Automated Teller Machine)

### Problem Statement
Design an Automated Teller Machine that handles card verification, PIN entry, balances, withdrawals, and cash dispensing.

### Requirements
*   **States:** Manage transitions: IDLE, VALID_CARD, VALID_PIN, DISPENSING.
*   **Notes Dispenser:** Dispense requested cash using the minimum number of bills ($2000, $500, $100) using a Chain of Responsibility.

### Key Design & Java Implementation
We use the **Chain of Responsibility Pattern** to handle cash dispensing. Each dispenser node processes a specific denomination and forwards the remaining balance to the next node.

```java
abstract class CashDispenser {
    protected CashDispenser next;
    public void setNext(CashDispenser next) { this.next = next; }
    public abstract void dispense(int amount);
}

class DenominationDispenser extends CashDispenser {
    private final int value;

    public DenominationDispenser(int value) { this.value = value; }

    public void dispense(int amount) {
        if (amount >= value) {
            int numBills = amount / value;
            int remainder = amount % value;
            System.out.println("Dispensing " + numBills + " bills of value: " + value);
            if (remainder > 0 && next != null) {
                next.dispense(remainder);
            }
        } else if (next != null) {
            next.dispense(amount);
        } else {
            System.out.println("Invalid amount remainder cannot be dispensed: " + amount);
        }
    }
}

public class ATMEngine {
    private final CashDispenser chain;

    public ATMEngine() {
        // Construct cash dispensing chain
        CashDispenser c1 = new DenominationDispenser(2000);
        CashDispenser c2 = new DenominationDispenser(500);
        CashDispenser c3 = new DenominationDispenser(100);
        c1.setNext(c2);
        c2.setNext(c3);
        this.chain = c1;
    }

    public void withdraw(int amount) {
        if (amount % 100 != 0) {
            System.out.println("Amount must be in multiples of 100.");
            return;
        }
        chain.dispense(amount);
    }
}
```

---

## 14. Snake and Ladder Game

### Problem Statement
Design a console-based Snake and Ladder board game.

### Requirements
*   **Entities:** Board size $M \times N$ containing static snakes and ladders.
*   **Game Rules:** Players take turns rolling a six-sided die and move forward. If they land on a snake's head, they slide down. If they land on a ladder's foot, they climb up.
*   **Win Check:** A player wins by landing exactly on the final cell (e.g., 100).

### Key Design & Java Implementation
We map positions to shifts (positive for ladders, negative for snakes) using a hash map or array.

```java
import java.util.*;

public class SnakeAndLadderGame {
    private final int destination = 100;
    private final Map<Integer, Integer> portals = new HashMap<>(); // Snake/Ladder mappings
    private final Queue<String> players = new LinkedList<>();

    public SnakeAndLadderGame(List<String> playerNames) {
        players.addAll(playerNames);
        // Add ladders
        portals.put(2, 38);
        portals.put(9, 31);
        // Add snakes
        portals.put(99, 5);
        portals.put(47, 19);
    }

    public void play() {
        Map<String, Integer> positions = new HashMap<>();
        for (String p : players) positions.put(p, 0);

        Random dice = new Random();

        while (true) {
            String currPlayer = players.poll();
            int currentPos = positions.get(currPlayer);
            int roll = dice.nextInt(6) + 1;
            int nextPos = currentPos + roll;

            if (nextPos == destination) {
                System.out.println(currPlayer + " wins after rolling: " + roll);
                break;
            } else if (nextPos < destination) {
                // Check for snakes or ladders
                if (portals.containsKey(nextPos)) {
                    nextPos = portals.get(nextPos);
                }
                positions.put(currPlayer, nextPos);
                System.out.println(currPlayer + " rolled: " + roll + " and moved to " + nextPos);
            }
            players.add(currPlayer);
        }
    }
}
```

---

## Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In the ATM design, why is the Chain of Responsibility Pattern useful for cash dispensing? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_medium_1" id="q_medium_1_a" data-correct="false"><label for="q_medium_1_a">A) It handles bank accounts concurrently.</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_1" id="q_medium_1_b" data-correct="true"><label for="q_medium_1_b">B) It allows different denomination dispensers to process parts of the amount and forward the remainder sequentially, decoupling the ATM from the dispenser chain composition.</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_1" id="q_medium_1_c" data-correct="false"><label for="q_medium_1_c">C) It encrypts the user's PIN before transmission.</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_1" id="q_medium_1_d" data-correct="false"><label for="q_medium_1_d">D) It ensures all card swipes are logging-audited.</label></li>
</ul>
</div>

<div class="quiz-question-wrapper">
<div class="quiz-question">2. When splitting expenses in Splitwise, how can splits of different types (Percent vs. Exact Amount) be verified? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_medium_2" id="q_medium_2_a" data-correct="false"><label for="q_medium_2_a">A) They must be converted into physical currencies before validation.</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_2" id="q_medium_2_b" data-correct="false"><label for="q_medium_2_b">B) Split verification is only possible on the database server tier.</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_2" id="q_medium_2_c" data-correct="true"><label for="q_medium_2_c">C) By converting all split targets to absolute amounts and confirming their sum matches the total expense amount within a small floating-point threshold (e.g. 0.01).</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_2" id="q_medium_2_d" data-correct="false"><label for="q_medium_2_d">D) By checking if the percentage values are prime numbers.</label></li>
</ul>
</div>

<div class="quiz-question-wrapper">
<div class="quiz-question">3. In the Meeting Scheduler design, how is a double-booking conflict checked mathematically? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_medium_3" id="q_medium_3_a" data-correct="false"><label for="q_medium_3_a">A) start1 + end1 == start2 + end2</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_3" id="q_medium_3_b" data-correct="true"><label for="q_medium_3_b">B) start1 &lt; end2 &amp;&amp; start2 &lt; end1</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_3" id="q_medium_3_c" data-correct="false"><label for="q_medium_3_c">C) start1 &gt;= end2 || start2 &gt;= end1</label></li>
<li class="quiz-option"><input type="radio" name="q_medium_3" id="q_medium_3_d" data-correct="false"><label for="q_medium_3_d">D) start1 * end1 == start2 * end2</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
