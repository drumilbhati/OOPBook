# 15. Ride-Sharing Service (Uber/Lyft)

**Difficulty:** Hard

### Scenario
Design a ride-matching and dispatch system connecting riders with nearby drivers, supporting surge pricing and location tracking.

### Requirements
*   **Driver Matching:** Match a rider to the closest active driver.
*   **Dynamic Pricing:** Compute fares based on trip distance, travel duration, and demand density (Surge Pricing Strategy).
*   **Real-time Lifecycle:** Transition status: IDLE, REQUESTED, ARRIVED, IN_PROGRESS, COMPLETED.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We use the **Strategy Pattern** for dynamic pricing calculation and the **Observer Pattern** to push updates to riders and drivers when ride statuses change.

### Java Implementation
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
    public double calculatePrice(double d) { return d * 2.5 * 15.0; }
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
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. Which pattern is best suited for letting a rider's application receive push alerts about coordinates and status updates from the matching system? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_15_1" id="q_ch09_15_1_a" data-correct="false"><label for="q_ch09_15_1_a">A) Decorator</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_15_1" id="q_ch09_15_1_b" data-correct="true"><label for="q_ch09_15_1_b">B) Observer</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_15_1" id="q_ch09_15_1_c" data-correct="false"><label for="q_ch09_15_1_c">C) Factory</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_15_1" id="q_ch09_15_1_d" data-correct="false"><label for="q_ch09_15_1_d">D) Command</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
