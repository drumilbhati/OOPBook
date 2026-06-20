# 11. Car Rental System

**Difficulty:** Medium

### Scenario
Design a car rental platform with branches, dynamic pricing models, and billing.

### Requirements
*   **Vehicle Types:** Sedan, SUV, EV.
*   **Operations:** Reserve vehicles, generate bills, and process returns.
*   **Dynamic Rates:** Calculate fees using base rates plus surcharge modifiers based on vehicle classes.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
Vehicles subclass a base `Vehicle` class and override dynamic calculation logic, supporting polymorphic calculation calls during checkout computations.

### Java Implementation
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
    public double calculatePrice(long days) { return baseDailyRate * days * 1.2; }
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
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this design, which object-oriented principle is leveraged when calling vehicle.calculatePrice(days) on a dynamic Vehicle reference? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_11_1" id="q_ch09_11_1_a" data-correct="false"><label for="q_ch09_11_1_a">A) Encapsulation</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_11_1" id="q_ch09_11_1_b" data-correct="true"><label for="q_ch09_11_1_b">B) Polymorphism</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_11_1" id="q_ch09_11_1_c" data-correct="false"><label for="q_ch09_11_1_c">C) Multiple Inheritance</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_11_1" id="q_ch09_11_1_d" data-correct="false"><label for="q_ch09_11_1_d">D) Aggregation</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
