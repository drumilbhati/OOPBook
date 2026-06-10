# Case Study: Elevator System

Designing an Elevator System is a classic problem that focuses on state management and scheduling algorithms (Dispatching).

## 1. Requirements Gathering

### Functional Requirements
*   **Request Handling:** Users can press buttons from outside (Up/Down) or inside the elevator (specific floor).
*   **Movement:** The elevator moves between floors, stops at requested floors, and opens/closes doors.
*   **Dispatching:** Efficiently select which elevator should respond to a request.
*   **Safety:** Emergency stop, overload detection.
*   **Status Display:** Show the current floor and direction.

### Non-Functional Requirements
*   **Efficiency:** Minimize the average waiting time for users.
*   **Throughput:** Handle high traffic during peak hours.
*   **Safety & Reliability.**

## 2. Core Classes & Relationships

*   **Elevator:** The main entity. Tracks its current floor, direction, and state.
*   **InternalButtons / ExternalButtons:** Capture user requests.
*   **Request:** Encapsulates the target floor and direction.
*   **Dispatcher:** Implements the scheduling algorithm (e.g., SCAN, LOOK).
*   **State Pattern:** Used to manage elevator states (IDLE, MOVING_UP, MOVING_DOWN, DOOR_OPEN).

## 3. Implementation

We will focus on the **State Pattern** and a basic **SCAN Algorithm** (Elevator moves in one direction until there are no more requests in that direction).

```java
import java.util.*;

// --- Elevator States ---
enum Direction { UP, DOWN, IDLE }
enum State { MOVING, STOPPED, IDLE }

interface ElevatorState {
    void handleRequest(Elevator elevator, Request request);
}

class IdleState implements ElevatorState {
    public void handleRequest(Elevator elevator, Request request) {
        if (request.getFloor() > elevator.getCurrentFloor()) {
            elevator.setDirection(Direction.UP);
        } else {
            elevator.setDirection(Direction.DOWN);
        }
        elevator.setState(new MovingState());
    }
}

class MovingState implements ElevatorState {
    public void handleRequest(Elevator elevator, Request request) {
        // Add request to the priority queue
        elevator.addRequest(request);
    }
}

// --- Elevator Entity ---
class Elevator {
    private int currentFloor = 0;
    private Direction direction = Direction.IDLE;
    private ElevatorState state = new IdleState();
    
    // Min-heap for UP requests, Max-heap for DOWN requests
    private PriorityQueue<Integer> upRequests = new PriorityQueue<>();
    private PriorityQueue<Integer> downRequests = new PriorityQueue<>(Collections.reverseOrder());

    public void addRequest(Request req) {
        if (req.getDirection() == Direction.UP) {
            upRequests.add(req.getFloor());
        } else {
            downRequests.add(req.getFloor());
        }
    }

    public void move() {
        while (!upRequests.isEmpty() || !downRequests.isEmpty()) {
            if (direction == Direction.UP) {
                processRequests(upRequests);
                direction = Direction.DOWN; // Switch direction
            } else {
                processRequests(downRequests);
                direction = Direction.UP;
            }
        }
        direction = Direction.IDLE;
        state = new IdleState();
    }

    private void processRequests(PriorityQueue<Integer> requests) {
        while (!requests.isEmpty()) {
            int floor = requests.poll();
            this.currentFloor = floor;
            System.out.println("Elevator stopped at floor: " + floor);
            // Simulate door opening/closing
        }
    }

    // Setters/Getters...
    public void setState(ElevatorState s) { this.state = s; }
    public void setDirection(Direction d) { this.direction = d; }
    public int getCurrentFloor() { return currentFloor; }
}

class Request {
    private int floor;
    private Direction direction;
    public Request(int f, Direction d) { this.floor = f; this.direction = d; }
    public int getFloor() { return floor; }
    public Direction getDirection() { return direction; }
}
```

### Dispatching Algorithm (The "Brain")
A simple `Dispatcher` might assign a request to the elevator that is:
1.  Moving in the same direction and hasn't passed the floor yet.
2.  Idle and closest to the requested floor.

## Module Quiz

1.  **Which pattern is best for handling the different behaviors of an elevator based on its current activity (Moving vs. Idle)?**
    *   A) Factory
    *   B) State
    *   C) Observer
    *   D) Singleton

2.  **In the SCAN algorithm, how does the elevator decide its next move?**
    *   A) It always goes to floor 0 first.
    *   B) It moves in one direction until all requests in that direction are satisfied.
    *   C) It moves randomly.
    *   D) It only moves when it is full.

3.  **What data structure is most efficient for storing requests in an elevator moving UP?**
    *   A) A Stack
    *   B) A Min-Priority Queue (to get the nearest floor above)
    *   C) A simple List
    *   D) A Hash Map

---
*Answers: 1-B, 2-B, 3-B*

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Which design pattern is most effective for managing the various operational states of an elevator (e.g., Idle, Moving, Door Open)?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q08_04" id="q08_04_a" data-correct="false"><label for="q08_04_a">Strategy Pattern</label></li>
        <li class="quiz-option"><input type="radio" name="q08_04" id="q08_04_b" data-correct="true"><label for="q08_04_b">State Pattern</label></li>
        <li class="quiz-option"><input type="radio" name="q08_04" id="q08_04_c" data-correct="false"><label for="q08_04_c">Decorator Pattern</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
