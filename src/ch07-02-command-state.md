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

1. How does the Command pattern support "Undo" functionality?
2. In the State pattern, who is responsible for the transition between states? (Hint: It can be the Context or the States themselves).
3. What is the main difference between the Strategy pattern and the State pattern?
4. True/False: The Command pattern requires the sender to know the specific class of the receiver.

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Which pattern allows an object to alter its behavior when its internal state changes, making it appear as if it changed its class?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q07_02" id="q07_02_a" data-correct="false"><label for="q07_02_a">Command</label></li>
        <li class="quiz-option"><input type="radio" name="q07_02" id="q07_02_b" data-correct="true"><label for="q07_02_b">State</label></li>
        <li class="quiz-option"><input type="radio" name="q07_02" id="q07_02_c" data-correct="false"><label for="q07_02_c">Strategy</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>

---
