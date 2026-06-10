# Iterator & Mediator Patterns

Managing how collections are traversed and how objects talk to each other is crucial for maintaining a clean architecture. **Iterator** abstracts collection access, while **Mediator** abstracts object interaction.

---

## The Iterator Pattern

The **Iterator** pattern provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation (list, stack, tree, etc.).

### When to Use
- **Standardized Traversal:** When you want to provide a uniform way to traverse different types of collections.
- **Encapsulation:** When you want to hide the internal complexity of a collection from the client.

### Example: Custom Collection
Suppose you have a `Repository` of objects and want to iterate over them without exposing the internal `List`.

```java
import java.util.Iterator;

class NameRepository implements Iterable<String> {
    private String[] names = {"Alice", "Bob", "Charlie"};

    @Override
    public Iterator<String> iterator() {
        return new NameIterator();
    }

    private class NameIterator implements Iterator<String> {
        int index;
        public boolean hasNext() { return index < names.length; }
        public String next() { return names[index++]; }
    }
}
```

---

## The Mediator Pattern

The **Mediator** pattern reduces chaotic dependencies between objects. It restricts direct communications between the objects and forces them to collaborate only via a mediator object.

### When to Use
- **High Coupling:** When a set of objects communicate in well-defined but complex ways, resulting in interdependencies that are hard to understand.
- **Reusable Components:** When you want to reuse an object that is coupled to many others.

### Example: Air Traffic Control
Pilots don't talk to each other directly; they talk to the control tower (the mediator).

```java
interface AirTrafficControl {
    void sendMessage(String msg, Colleague colleague);
}

abstract class Colleague {
    protected AirTrafficControl mediator;
    public Colleague(AirTrafficControl m) { this.mediator = m; }
}

class Flight extends Colleague {
    public Flight(AirTrafficControl m) { super(m); }
    public void send(String msg) { mediator.sendMessage(msg, this); }
    public void receive(String msg) { System.out.println("Flight received: " + msg); }
}

class ControlTower implements AirTrafficControl {
    private List<Flight> flights = new ArrayList<>();
    public void addFlight(Flight f) { flights.add(f); }
    public void sendMessage(String msg, Colleague originator) {
        for (Flight f : flights) {
            if (f != originator) f.receive(msg); // Broadcast to others
        }
    }
}
```

---

## Real-World Examples
- **`java.util.Iterator`**: The most common implementation in the Java world.
- **Java Message Service (JMS)**: Acts as a mediator between message producers and consumers.
- **GUI Dialogs**: A dialog window often acts as a mediator for the buttons, checkboxes, and text fields it contains.

---

## Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. Why does the Iterator pattern help in making code more generic? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_03_1" id="q07_03_1_a" data-correct="true"><label for="q07_03_1_a">A) It provides a uniform interface for traversing different collection types without exposing their internal structures.</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_1" id="q07_03_1_b" data-correct="false"><label for="q07_03_1_b">B) It forces all collections to use arrays.</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_1" id="q07_03_1_c" data-correct="false"><label for="q07_03_1_c">C) It eliminates the need for loops.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">2. In the Mediator pattern, how is the "Law of Demeter" applied? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_03_2" id="q07_03_2_a" data-correct="true"><label for="q07_03_2_a">A) Objects only talk to the Mediator instead of knowing about and talking to each other directly.</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_2" id="q07_03_2_b" data-correct="false"><label for="q07_03_2_b">B) Every object must talk to every other object.</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_2" id="q07_03_2_c" data-correct="false"><label for="q07_03_2_c">C) The Mediator is forbidden from talking to other objects.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">3. What happens if the Mediator object itself becomes too complex? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_03_3" id="q07_03_3_a" data-correct="false"><label for="q07_03_3_a">A) The system becomes faster.</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_3" id="q07_03_3_b" data-correct="true"><label for="q07_03_3_b">B) It can become a "God Object" that is hard to maintain and understand.</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_3" id="q07_03_3_c" data-correct="false"><label for="q07_03_3_c">C) It automatically splits into smaller mediators.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">4. True/False: The Iterator pattern allows for multiple simultaneous traversals of the same collection. <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_03_4" id="q07_03_4_a" data-correct="true"><label for="q07_03_4_a">A) True</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_4" id="q07_03_4_b" data-correct="false"><label for="q07_03_4_b">B) False</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">5. What is the main purpose of the Mediator pattern? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_03_5" id="q07_03_5_a" data-correct="false"><label for="q07_03_5_a">A) To provide a way to access elements of a collection sequentially.</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_5" id="q07_03_5_b" data-correct="true"><label for="q07_03_5_b">B) To reduce direct dependencies between objects by forcing them to communicate through a central mediator.</label></li>
<li class="quiz-option"><input type="radio" name="q07_03_5" id="q07_03_5_c" data-correct="false"><label for="q07_03_5_c">C) To allow an object to notify many observers of state changes.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>

