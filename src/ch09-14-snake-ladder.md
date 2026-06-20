# 14. Snake and Ladder Game

**Difficulty:** Medium

### Scenario
Design a console-based Snake and Ladder board game.

### Requirements
*   **Entities:** Board size $M \times N$ containing static snakes and ladders.
*   **Game Rules:** Players take turns rolling a six-sided die and move forward. If they land on a snake's head, they slide down. If they land on a ladder's foot, they climb up.
*   **Win Check:** A player wins by landing exactly on the final cell (e.g., 100).

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We map positions to shifts (positive for ladders, negative for snakes) using a hash map or array.

### Java Implementation
```java
import java.util.*;

public class SnakeAndLadderGame {
    private final int destination = 100;
    private final Map<Integer, Integer> portals = new HashMap<>();
    private final Queue<String> players = new LinkedList<>();

    public SnakeAndLadderGame(List<String> playerNames) {
        players.addAll(playerNames);
        portals.put(2, 38);
        portals.put(9, 31);
        portals.put(99, 5);
        portals.put(47, 19);
    }

    public void play() {
        Map<String, Integer> positions = new HashMap<>();
        for (String p : players) positions.put(p, 0);

        Random dice = new Random();

        while (true) {
            String currPlayer = players.poll();
            int currentPos = positions.get(currPlayer);
            int roll = dice.nextInt(6) + 1;
            int nextPos = currentPos + roll;

            if (nextPos == destination) {
                System.out.println(currPlayer + " wins after rolling: " + roll);
                break;
            } else if (nextPos < destination) {
                if (portals.containsKey(nextPos)) {
                    nextPos = portals.get(nextPos);
                }
                positions.put(currPlayer, nextPos);
                System.out.println(currPlayer + " rolled: " + roll + " and moved to " + nextPos);
            }
            players.add(currPlayer);
        }
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this design, what occurs if a player is at position 97, rolls a 5, and the destination is 100? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_14_1" id="q_ch09_14_1_a" data-correct="false"><label for="q_ch09_14_1_a">A) They win the game.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_14_1" id="q_ch09_14_1_b" data-correct="false"><label for="q_ch09_14_1_b">B) They move backward by the difference (landing on 98).</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_14_1" id="q_ch09_14_1_c" data-correct="true"><label for="q_ch09_14_1_c">C) Their move is ignored/skipped because their next position (102) exceeds the destination of 100.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_14_1" id="q_ch09_14_1_d" data-correct="false"><label for="q_ch09_14_1_d">D) The game resets.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
