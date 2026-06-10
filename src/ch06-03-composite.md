# Composite Pattern

The Composite pattern allows you to compose objects into tree structures to represent part-whole hierarchies. It lets clients treat individual objects and compositions of objects uniformly.

---

## Key Components
1. **Component:** The base interface or abstract class for all objects in the hierarchy.
2. **Leaf:** Represents individual objects that have no children.
3. **Composite:** Represents a group of objects (leaves or other composites).

---

## When to Use
- **Tree Structures:** When you need to represent a hierarchy of objects (e.g., file systems, UI components).
- **Uniformity:** When you want the client to ignore the difference between a single object and a collection of objects.
- **Recursive Operations:** When an operation on a composite object should automatically trigger the same operation on all its children.

---

## Example: File System

In a file system, both **Files** and **Directories** have a size. A directory's size is the sum of the sizes of its contents.

```java
import java.util.ArrayList;
import java.util.List;

// Component
interface FileSystemComponent {
    void showDetails();
    long getSize();
}

// Leaf
class File implements FileSystemComponent {
    private String name;
    private long size;

    public File(String name, long size) {
        this.name = name;
        this.size = size;
    }

    public void showDetails() { System.out.println("File: " + name); }
    public long getSize() { return size; }
}

// Composite
class Directory implements FileSystemComponent {
    private String name;
    private List<FileSystemComponent> components = new ArrayList<>();

    public Directory(String name) { this.name = name; }

    public void addComponent(FileSystemComponent comp) { components.add(comp); }

    public void showDetails() {
        System.out.println("Directory: " + name);
        for (FileSystemComponent comp : components) {
            comp.showDetails();
        }
    }

    public long getSize() {
        long total = 0;
        for (FileSystemComponent comp : components) {
            total += comp.getSize();
        }
        return total;
    }
}
```

---

## Real-World Examples
- **XML/HTML DOM:** Every node in the DOM tree can be an element (composite) or text (leaf).
- **GUI Frameworks:** A `Window` can contain `Buttons` (leaves) and `Panels` (composites).
- **Organization Charts:** An `Employee` (leaf) and a `Department` (composite of employees and other departments).

---

## Pros and Cons

### Pros
- **Simplifies Client Code:** The client doesn't need to check if it's dealing with a leaf or a composite.
- **Easier Extensibility:** You can add new types of components easily.

### Cons
- **Constraint Difficulty:** It's hard to restrict a composite to only contain certain types of components (e.g., a "SecurityDirectory" that only allows "ProtectedFiles").

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

## Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. What are the three main roles in the Composite pattern? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q06_03_1" id="q06_03_1_a" data-correct="true"><label for="q06_03_1_a">A) Component, Leaf, and Composite.</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_1" id="q06_03_1_b" data-correct="false"><label for="q06_03_1_b">B) Base, Derived, and Instance.</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_1" id="q06_03_1_c" data-correct="false"><label for="q06_03_1_c">C) Target, Adapter, and Adaptee.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">2. In the file system example, how is recursion utilized? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q06_03_2" id="q06_03_2_a" data-correct="false"><label for="q06_03_2_a">A) By using a while loop to iterate over files.</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_2" id="q06_03_2_b" data-correct="true"><label for="q06_03_2_b">B) A directory's getSize() method calls the getSize() method of its children, which could be other directories.</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_2" id="q06_03_2_c" data-correct="false"><label for="q06_03_2_c">C) By making the File class inherit from Directory.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">3. True/False: The client code needs to know whether it is calling a method on a File or a Directory object. <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q06_03_3" id="q06_03_3_a" data-correct="false"><label for="q06_03_3_a">A) True</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_3" id="q06_03_3_b" data-correct="true"><label for="q06_03_3_b">B) False</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">4. Why is it difficult to enforce constraints on what can be added to a Composite? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q06_03_4" id="q06_03_4_a" data-correct="false"><label for="q06_03_4_a">A) Because composites are final classes.</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_4" id="q06_03_4_b" data-correct="true"><label for="q06_03_4_b">B) Because both leaves and composites share the same base interface, making them indistinguishable to the collection holding them.</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_4" id="q06_03_4_c" data-correct="false"><label for="q06_03_4_c">C) Java does not support collections of interfaces.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">5. What is a key advantage of the Composite pattern? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q06_03_5" id="q06_03_5_a" data-correct="false"><label for="q06_03_5_a">A) It makes the code faster by avoiding recursion.</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_5" id="q06_03_5_b" data-correct="true"><label for="q06_03_5_b">B) It allows clients to treat individual objects and compositions of objects uniformly.</label></li>
<li class="quiz-option"><input type="radio" name="q06_03_5" id="q06_03_5_c" data-correct="false"><label for="q06_03_5_c">C) It prevents objects from being added to tree structures.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
