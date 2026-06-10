# Case Study: Parking Lot

Designing a parking lot is a classic Low-Level Design (LLD) interview question. It tests your ability to model real-world entities, handle varying requirements, and apply design patterns to make the system flexible.

## 1. Requirements Gathering

As a senior engineer, you must clarify the scope before jumping into the code.

### Functional Requirements
*   **Multiple Vehicle Types:** Support for Motorcycles, Cars, and Trucks.
*   **Multiple Floors:** The parking lot should have multiple levels.
*   **Parking Strategy:** Ability to find the nearest available spot for a vehicle.
*   **Ticketing & Payment:** Issue a ticket upon entry and process payment upon exit.
*   **Flexible Payment:** Support for different payment methods (e.g., Credit Card, Cash) and calculation logic (e.g., hourly, flat rate).
*   **Real-time Availability:** Track available spots per floor and per vehicle type.

### Non-Functional Requirements
*   **Concurrency:** Ensure that two vehicles don't "double-park" in the same spot at the same time.
*   **Scalability:** The design should be easily extendable to more floors or different vehicle types.
*   **Robustness:** Handle edge cases like a full parking lot or invalid tickets.

## 2. Core Classes & Relationships

*   **ParkingLot:** A singleton class that manages the entire system.
*   **ParkingFloor:** Contains various `ParkingSlot` objects.
*   **ParkingSlot:** The atomic unit. It can be specialized for different vehicle types (Compact, Large, etc.).
*   **Vehicle:** An abstract class with concrete implementations like `Car`, `Truck`, and `Motorcycle`.
*   **Ticket:** Represents the entry/exit record.
*   **PaymentContext & PaymentStrategy:** Used to implement different pricing models.

## 3. Implementation

We will use the **Strategy Pattern** for the payment system and a **Singleton** for the main `ParkingLot` controller.

```java
import java.util.*;
import java.time.LocalDateTime;

// --- Vehicle Hierarchy ---
enum VehicleType { CAR, TRUCK, MOTORCYCLE }

abstract class Vehicle {
    protected String licensePlate;
    protected VehicleType type;
    public Vehicle(String licensePlate, VehicleType type) {
        this.licensePlate = licensePlate;
        this.type = type;
    }
    public VehicleType getType() { return type; }
}

class Car extends Vehicle { public Car(String lp) { super(lp, VehicleType.CAR); } }

// --- Parking Spot ---
class ParkingSlot {
    private String id;
    private VehicleType supportedType;
    private boolean isFree = true;
    private Vehicle parkedVehicle;

    public ParkingSlot(String id, VehicleType type) {
        this.id = id;
        this.supportedType = type;
    }

    public synchronized boolean park(Vehicle v) {
        if (isFree && v.getType() == supportedType) {
            this.parkedVehicle = v;
            this.isFree = false;
            return true;
        }
        return false;
    }

    public synchronized void unpark() {
        this.parkedVehicle = null;
        this.isFree = true;
    }

    public boolean isAvailable() { return isFree; }
    public VehicleType getSupportedType() { return supportedType; }
}

// --- Payment Strategy ---
interface PaymentStrategy {
    double calculatePrice(long durationInHours);
}

class HourlyPaymentStrategy implements PaymentStrategy {
    public double calculatePrice(long hours) { return hours * 20.0; }
}

// --- Parking Lot (Singleton) ---
class ParkingLot {
    private static ParkingLot instance;
    private List<ParkingFloor> floors;
    private PaymentStrategy paymentStrategy;

    private ParkingLot() {
        this.floors = new ArrayList<>();
        this.paymentStrategy = new HourlyPaymentStrategy();
    }

    public static synchronized ParkingLot getInstance() {
        if (instance == null) instance = new ParkingLot();
        return instance;
    }

    public Ticket entry(Vehicle vehicle) {
        for (ParkingFloor floor : floors) {
            ParkingSlot slot = floor.findAvailableSlot(vehicle.getType());
            if (slot != null && slot.park(vehicle)) {
                return new Ticket(vehicle, slot);
            }
        }
        throw new RuntimeException("Parking Lot Full");
    }

    public double exit(Ticket ticket) {
        ticket.getSlot().unpark();
        long duration = java.time.Duration.between(ticket.getEntryTime(), LocalDateTime.now()).toHours();
        return paymentStrategy.calculatePrice(Math.max(1, duration));
    }
}

class Ticket {
    private Vehicle vehicle;
    private ParkingSlot slot;
    private LocalDateTime entryTime;

    public Ticket(Vehicle vehicle, ParkingSlot slot) {
        this.vehicle = vehicle;
        this.slot = slot;
        this.entryTime = LocalDateTime.now();
    }
    public ParkingSlot getSlot() { return slot; }
    public LocalDateTime getEntryTime() { return entryTime; }
}
```

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question">1. Which design pattern is best suited for handling different pricing models (Flat Rate vs. Hourly)?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q_ch08_01_1" id="q_ch08_01_1_a" data-correct="false"><label for="q_ch08_01_1_a">A) Observer</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_1" id="q_ch08_01_1_b" data-correct="true"><label for="q_ch08_01_1_b">B) Strategy</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_1" id="q_ch08_01_1_c" data-correct="false"><label for="q_ch08_01_1_c">C) Factory</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_1" id="q_ch08_01_1_d" data-correct="false"><label for="q_ch08_01_1_d">D) Singleton</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

<div class="quiz-container">
    <div class="quiz-question">2. Why is the `park()` method in `ParkingSlot` synchronized?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q_ch08_01_2" id="q_ch08_01_2_a" data-correct="false"><label for="q_ch08_01_2_a">A) To make it faster.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_2" id="q_ch08_01_2_b" data-correct="false"><label for="q_ch08_01_2_b">B) To allow multiple vehicles in one spot.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_2" id="q_ch08_01_2_c" data-correct="true"><label for="q_ch08_01_2_c">C) To prevent race conditions during concurrent parking attempts.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_2" id="q_ch08_01_2_d" data-correct="false"><label for="q_ch08_01_2_d">D) It doesn't need to be synchronized.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

<div class="quiz-container">
    <div class="quiz-question">3. In a multi-floor parking lot, what is the most efficient way to track availability?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q_ch08_01_3" id="q_ch08_01_3_a" data-correct="false"><label for="q_ch08_01_3_a">A) Scanning every slot every time a car enters.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_3" id="q_ch08_01_3_b" data-correct="true"><label for="q_ch08_01_3_b">B) Keeping a `Map<VehicleType, Queue<ParkingSlot>>` for free spots.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_3" id="q_ch08_01_3_c" data-correct="false"><label for="q_ch08_01_3_c">C) Not tracking it; just let the driver find a spot.</label></li>
        <li class="quiz-option"><input type="radio" name="q_ch08_01_3" id="q_ch08_01_3_d" data-correct="false"><label for="q_ch08_01_3_d">D) Using a Global lock on the `ParkingLot` class.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
