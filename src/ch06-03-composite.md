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

## Module Quiz

1. What are the three main roles in the Composite pattern?
2. In the file system example, how is recursion utilized?
3. True/False: The client code needs to know whether it is calling a method on a `File` or a `Directory` object.
4. Why is it difficult to enforce constraints on what can be added to a Composite?

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">What is a key advantage of the Composite pattern?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q06_03" id="q06_03_a" data-correct="false"><label for="q06_03_a">It makes the code faster by avoiding recursion.</label></li>
        <li class="quiz-option"><input type="radio" name="q06_03" id="q06_03_b" data-correct="true"><label for="q06_03_b">It allows clients to treat individual objects and compositions of objects uniformly.</label></li>
        <li class="quiz-option"><input type="radio" name="q06_03" id="q06_03_c" data-correct="false"><label for="q06_03_c">It prevents objects from being added to tree structures.</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

---
