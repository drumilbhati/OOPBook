# Adapter & Facade Patterns

Structural patterns deal with how classes and objects are composed to form larger structures. **Adapter** and **Facade** are both about interfaces, but they serve very different purposes: one makes incompatible interfaces work together, while the other simplifies a complex interface.

---

## The Adapter Pattern

The **Adapter** pattern allows incompatible interfaces to work together. It acts as a wrapper between two objects, catching calls for one object and transforming them to a format and interface reachable by the second object.

### When to Use
- **Legacy Integration:** When you want to use an existing class, but its interface does not match the one you need.
- **Third-Party Libraries:** When you want to use a library whose interface is different from your internal standards.

### Example: Media Player
Suppose you have a media player that plays MP3 by default, but you want to support VLC or MP4 via an adapter.

```java
// Target interface
interface MediaPlayer {
    void play(String fileName);
}

// Adaptee (Advanced player)
class AdvancedMediaPlayer {
    public void playVlc(String fileName) { System.out.println("Playing VLC: " + fileName); }
}

// Adapter
class MediaAdapter implements MediaPlayer {
    private AdvancedMediaPlayer advancedPlayer;

    public MediaAdapter() { this.advancedPlayer = new AdvancedMediaPlayer(); }

    @Override
    public void play(String fileName) {
        if (fileName.endsWith(".vlc")) {
            advancedPlayer.playVlc(fileName);
        }
    }
}
```

---

## The Facade Pattern

The **Facade** pattern provides a simplified interface to a complex subsystem. It doesn't add new functionality; it just makes existing functionality easier to use by hiding the complexity of multiple classes.

### When to Use
- **Complexity Management:** When you have a complex system with many moving parts and want to provide a simple "entry point" for the client.
- **Decoupling:** To reduce the number of objects the client code has to interact with.

### Example: Home Theater System
Instead of the user manually turning on the lights, lowering the screen, starting the projector, and setting the volume, they use a `HomeTheaterFacade`.

```java
class HomeTheaterFacade {
    private Amplifier amp;
    private Projector projector;
    private Lights lights;

    public void watchMovie(String movie) {
        lights.dim(10);
        projector.on();
        amp.setVolume(5);
        projector.play(movie);
    }

    public void endMovie() {
        lights.on();
        projector.off();
    }
}
```

---

## Adapter vs. Facade

| Feature | Adapter | Facade |
|---------|---------|--------|
| **Purpose** | Converts one interface to another. | Simplifies a complex interface. |
| **Relationship** | Usually wraps one object. | Usually wraps many objects (a subsystem). |
| **Goal** | Compatibility. | Ease of use. |

---

## Real-World Examples
- **`java.util.Arrays#asList()`**: Adapts an array to the `List` interface.
- **SLF4J (Simple Logging Facade for Java)**: Provides a single interface to various logging frameworks (Log4j, Logback).
- **JDBC**: Acts as a facade/adapter layer for different database drivers.

---

## Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Which pattern is used to bridge the gap between two incompatible interfaces? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_01_1" id="q06_01_1_a" data-correct="true"><label for="q06_01_1_a">A) Adapter</label></li>
            <li class="quiz-option"><input type="radio" name="q06_01_1" id="q06_01_1_b" data-correct="false"><label for="q06_01_1_b">B) Facade</label></li>
            <li class="quiz-option"><input type="radio" name="q06_01_1" id="q06_01_1_c" data-correct="false"><label for="q06_01_1_c">C) Decorator</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">2. Does a Facade add new functionality to the subsystem it hides? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_01_2" id="q06_01_2_a" data-correct="false"><label for="q06_01_2_a">A) Yes</label></li>
            <li class="quiz-option"><input type="radio" name="q06_01_2" id="q06_01_2_b" data-correct="true"><label for="q06_01_2_b">B) No, it only provides a simplified interface to existing functionality.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">3. How does the Facade pattern help in reducing coupling? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_01_3" id="q06_01_3_a" data-correct="false"><label for="q06_01_3_a">A) By inheriting from multiple classes.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_01_3" id="q06_01_3_b" data-correct="true"><label for="q06_01_3_b">B) By providing a single entry point for the client, so it doesn't need to know about the subsystem's internal classes.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_01_3" id="q06_01_3_c" data-correct="false"><label for="q06_01_3_c">C) By converting one interface to another.</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">4. True/False: An Adapter is primarily used for ease of use rather than compatibility. <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_01_4" id="q06_01_4_a" data-correct="false"><label for="q06_01_4_a">A) True</label></li>
            <li class="quiz-option"><input type="radio" name="q06_01_4" id="q06_01_4_b" data-correct="true"><label for="q06_01_4_b">B) False</label></li>
        </ul>
    </div>
    <div class="quiz-question-wrapper">
        <div class="quiz-question">5. What is the main goal of the Facade pattern? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_01_5" id="q06_01_5_a" data-correct="false"><label for="q06_01_5_a">A) To convert one interface into another that the client expects.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_01_5" id="q06_01_5_b" data-correct="true"><label for="q06_01_5_b">B) To provide a simplified interface to a complex subsystem of classes.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_01_5" id="q06_01_5_c" data-correct="false"><label for="q06_01_5_c">C) To add new functionality to a legacy system without modifying it.</label></li>
        </ul>
    </div>
    <button class="quiz-check-btn">Check Answers</button>
    <div class="quiz-feedback-main"></div>
</div>
