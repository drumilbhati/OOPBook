# Command & State Patterns

These patterns help manage how objects respond to requests or change their internal logic over time. While **Command** decouples the sender from the receiver, **State** decouples the behavior from the object's class.

---

## The Command Pattern

The **Command** pattern encapsulates a request as an object, thereby letting you parameterize clients with different requests, queue or log requests, and support undoable operations.

### When to Use
- **Undo/Redo:** When you need to keep track of a history of operations.
- **Queueing:** When requests should be handled at different times or in a specific order.
- **Decoupling:** When the object triggering an action doesn't need to know anything about the object performing the action.

### Example: Remote Control
A button on a remote can be programmed to perform different actions (Turn on Light, Open Garage).

```java
// Command Interface
interface Command {
    void execute();
    void undo();
}

// Concrete Command
class LightOnCommand implements Command {
    private Light light;
    public LightOnCommand(Light l) { this.light = l; }
    public void execute() { light.on(); }
    public void undo() { light.off(); }
}

// Invoker
class RemoteControl {
    private Command slot;
    public void setCommand(Command c) { slot = c; }
    public void pressButton() { slot.execute(); }
}
```

---

## The State Pattern

The **State** pattern allows an object to alter its behavior when its internal state changes. The object will appear to change its class.

### When to Use
- **State-Dependent Behavior:** When an object's behavior depends on its state and it must change its behavior at runtime.
- **Avoiding Large Conditionals:** When you have complex `if-else` or `switch` statements that depend on a status field.

### Example: Vending Machine
A vending machine behaves differently if it's "Out of Stock", "Waiting for Money", or "Dispensing".

```java
interface State {
    void insertMoney();
    void ejectMoney();
    void dispense();
}

class VendingMachine {
    private State hasMoneyState;
    private State noMoneyState;
    private State currentState;

    public VendingMachine() {
        noMoneyState = new NoMoneyState(this);
        hasMoneyState = new HasMoneyState(this);
        currentState = noMoneyState;
    }

    public void setState(State s) { this.currentState = s; }
    public void insertMoney() { currentState.insertMoney(); }
}

class HasMoneyState implements State {
    private VendingMachine machine;
    public HasMoneyState(VendingMachine m) { this.machine = m; }
    public void insertMoney() { System.out.println("Money already inserted."); }
    public void ejectMoney() { 
        System.out.println("Returning money."); 
        machine.setState(machine.getNoMoneyState()); 
    }
    public void dispense() { /* Dispense logic */ }
}
```

---

## Real-World Examples
- **Java's `Runnable`**: Acts as a simple Command interface.
- **TCP Connection States**: (LISTEN, ESTABLISHED, CLOSED) are often implemented using the State pattern.
- **GUI Buttons**: The same "Click" command might behave differently depending on the application's current state (e.g., Select tool vs. Draw tool).

---

## Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. How does the Command pattern support "Undo" functionality? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_02_1" id="q07_02_1_a" data-correct="true"><label for="q07_02_1_a">A) By storing the previous state or the inverse operation within the Command object.</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_1" id="q07_02_1_b" data-correct="false"><label for="q07_02_1_b">B) By deleting the Command object after execution.</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_1" id="q07_02_1_c" data-correct="false"><label for="q07_02_1_c">C) It doesn't; Undo is handled by the State pattern.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">2. In the State pattern, who is responsible for the transition between states? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_02_2" id="q07_02_2_a" data-correct="false"><label for="q07_02_2_a">A) Only the Context class.</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_2" id="q07_02_2_b" data-correct="false"><label for="q07_02_2_b">B) Only the Concrete State classes.</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_2" id="q07_02_2_c" data-correct="true"><label for="q07_02_2_c">C) It can be either the Context or the Concrete State classes themselves.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">3. What is the main difference between the Strategy pattern and the State pattern? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_02_3" id="q07_02_3_a" data-correct="true"><label for="q07_02_3_a">A) Strategy is typically about selecting an algorithm once, while State is about changing behavior as internal state evolves.</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_3" id="q07_02_3_b" data-correct="false"><label for="q07_02_3_b">B) Strategy requires inheritance, whereas State requires composition.</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_3" id="q07_02_3_c" data-correct="false"><label for="q07_02_3_c">C) There is no difference; they are aliases for the same pattern.</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">4. True/False: The Command pattern requires the sender to know the specific class of the receiver. <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_02_4" id="q07_02_4_a" data-correct="false"><label for="q07_02_4_a">A) True</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_4" id="q07_02_4_b" data-correct="true"><label for="q07_02_4_b">B) False</label></li>
</ul>
</div>
<div class="quiz-question-wrapper">
<div class="quiz-question">5. Which pattern allows an object to alter its behavior when its internal state changes, making it appear as if it changed its class? <span class="quiz-feedback-inline"></span></div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q07_02_5" id="q07_02_5_a" data-correct="false"><label for="q07_02_5_a">A) Command</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_5" id="q07_02_5_b" data-correct="true"><label for="q07_02_5_b">B) State</label></li>
<li class="quiz-option"><input type="radio" name="q07_02_5" id="q07_02_5_c" data-correct="false"><label for="q07_02_5_c">C) Strategy</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>

