# Structural Design Patterns

Structural design patterns explain how to assemble objects and classes into larger structures while keeping these structures flexible and efficient. They focus on how classes and objects are composed to form larger structures.

## Common Structural Patterns
- **Adapter:** Allows objects with incompatible interfaces to collaborate.
- **Facade:** Provides a simplified interface to a library, a framework, or any other complex set of classes.
- **Decorator:** Lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.
- **Proxy:** Lets you provide a substitute or placeholder for another object.

---

## Programming Exercise: The Media Player Adapter

**Problem Statement:**
You have an existing `MediaPlayer` interface that can play `mp3` files. You want to extend it to play `vlc` and `mp4` files using a more advanced `AdvancedMediaPlayer`. However, the `AdvancedMediaPlayer` has a different interface. Use the **Adapter Pattern** to make them compatible.

**Requirements:**
1. Define a `MediaPlayer` interface with `void play(String audioType, String fileName)`.
2. Define an `AdvancedMediaPlayer` interface with `playVlc(String fileName)` and `playMp4(String fileName)`.
3. Create concrete classes for `AdvancedMediaPlayer`: `VlcPlayer` and `Mp4Player`.
4. Create a `MediaAdapter` that implements `MediaPlayer` and uses `AdvancedMediaPlayer` to play the requested format.
5. Update your `AudioPlayer` (the main `MediaPlayer` implementation) to use the adapter for `vlc` and `mp4`.

<details>
<summary><b>View Solution</b></summary>

```java
// 1. Target Interface
interface MediaPlayer {
    void play(String audioType, String fileName);
}

// 2. Adaptee Interface
interface AdvancedMediaPlayer {
    void playVlc(String fileName);
    void playMp4(String fileName);
}

// 3. Concrete Adaptees
class VlcPlayer implements AdvancedMediaPlayer {
    public void playVlc(String fileName) { System.out.println("Playing vlc file: " + fileName); }
    public void playMp4(String fileName) { /* do nothing */ }
}

class Mp4Player implements AdvancedMediaPlayer {
    public void playVlc(String fileName) { /* do nothing */ }
    public void playMp4(String fileName) { System.out.println("Playing mp4 file: " + fileName); }
}

// 4. The Adapter
class MediaAdapter implements MediaPlayer {
    AdvancedMediaPlayer advancedMusicPlayer;

    public MediaAdapter(String audioType) {
        if(audioType.equalsIgnoreCase("vlc")) advancedMusicPlayer = new VlcPlayer();
        else if (audioType.equalsIgnoreCase("mp4")) advancedMusicPlayer = new Mp4Player();
    }

    public void play(String audioType, String fileName) {
        if(audioType.equalsIgnoreCase("vlc")) advancedMusicPlayer.playVlc(fileName);
        else if(audioType.equalsIgnoreCase("mp4")) advancedMusicPlayer.playMp4(fileName);
    }
}

// 5. Concrete Target
class AudioPlayer implements MediaPlayer {
    MediaAdapter mediaAdapter;

    public void play(String audioType, String fileName) {
        if(audioType.equalsIgnoreCase("mp3")) {
            System.out.println("Playing mp3 file: " + fileName);
        } else if(audioType.equalsIgnoreCase("vlc") || audioType.equalsIgnoreCase("mp4")) {
            mediaAdapter = new MediaAdapter(audioType);
            mediaAdapter.play(audioType, fileName);
        } else {
            System.out.println("Invalid media. " + audioType + " format not supported");
        }
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. What is the primary focus of Structural Design Patterns? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q06_00" id="q06_00_a" data-correct="false"><label for="q06_00_a">The best way to create objects in a system.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_00" id="q06_00_b" data-correct="true"><label for="q06_00_b">How classes and objects are composed to form larger, more complex structures.</label></li>
            <li class="quiz-option"><input type="radio" name="q06_00" id="q06_00_c" data-correct="false"><label for="q06_00_c">The communication between objects and how they assign responsibilities.</label></li>
        </ul>
    </div>
    <div class="quiz-feedback-main"></div>
    <button class="quiz-check-btn">Check Answers</button>
</div>
