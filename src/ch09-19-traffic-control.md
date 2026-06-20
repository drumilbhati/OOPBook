# 19. Traffic Control System

**Difficulty:** Hard

### Scenario
Design an automated Traffic Control System for a 4-way intersection that adapts signal timing based on vehicle density while prioritizing emergency vehicles.

### Requirements
*   **Adapting Timing:** Detect traffic flow/density via sensors and adjust green light timers dynamically.
*   **Emergency Overrides:** Instantly switch all conflicting signals to RED if an ambulance or emergency vehicle triggers a request.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We use the **State Pattern** to represent signal cycles (North-South Green vs East-West Green) and run a background monitor thread to read vehicle density changes.

### Java Implementation
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
        if (emergencyActive) return;

        if (nsCarCount > ewCarCount * 2) {
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
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this design, what happens when an emergency vehicle is detected while emergencyActive is true? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_19_1" id="q_ch09_19_1_a" data-correct="false"><label for="q_ch09_19_1_a">A) The signal automatically switches every 5 seconds.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_19_1" id="q_ch09_19_1_b" data-correct="true"><label for="q_ch09_19_1_b">B) Normal updates are blocked (updateSignals returns immediately), keeping emergency directions green and other directions red.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_19_1" id="q_ch09_19_1_c" data-correct="false"><label for="q_ch09_19_1_c">C) The signals are turned off entirely.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_19_1" id="q_ch09_19_1_d" data-correct="false"><label for="q_ch09_19_1_d">D) It calls JVM garbage collection.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
