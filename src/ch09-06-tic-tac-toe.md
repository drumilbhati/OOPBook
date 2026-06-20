# 6. Tic-Tac-Toe Game

**Difficulty:** Easy

### Scenario
Design a classic $N \times N$ Tic-Tac-Toe board game playable by two players on a shared terminal.

### Requirements
*   **Initialization:** Dynamic grid size $N$ (typically 3).
*   **Gameplay:** Alternating turns between Player X and Player O.
*   **Winner Verification:** Complete rows, columns, or diagonals of identical symbols declare a win. Check draws when the board fills with no winner.

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
Using a 2D char array represent the board state. Every move decrements total spots and scans the rows, columns, and diagonals of the placed coordinate to check for a victory condition.

### Java Implementation
```java
public class TicTacToe {
    private final char[][] board;
    private final int size;
    private char currentTurn = 'X';
    private int movesCount = 0;

    public TicTacToe(int size) {
        this.size = size;
        this.board = new char[size][size];
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                board[i][j] = '-';
            }
        }
    }

    public synchronized boolean makeMove(int row, int col) {
        if (row < 0 || row >= size || col < 0 || col >= size || board[row][col] != '-') {
            return false;
        }
        board[row][col] = currentTurn;
        movesCount++;
        if (checkWin(row, col)) {
            System.out.println("Player " + currentTurn + " wins!");
            reset();
        } else if (movesCount == size * size) {
            System.out.println("Game Draw!");
            reset();
        } else {
            currentTurn = (currentTurn == 'X') ? 'O' : 'X';
        }
        return true;
    }

    private boolean checkWin(int r, int c) {
        // Row check
        boolean win = true;
        for (int i = 0; i < size; i++) {
            if (board[r][i] != currentTurn) { win = false; break; }
        }
        if (win) return true;

        // Col check
        win = true;
        for (int i = 0; i < size; i++) {
            if (board[i][c] != currentTurn) { win = false; break; }
        }
        if (win) return true;

        // Diagonal checks
        if (r == c) {
            win = true;
            for (int i = 0; i < size; i++) {
                if (board[i][i] != currentTurn) { win = false; break; }
            }
            if (win) return true;
        }
        if (r + c == size - 1) {
            win = true;
            for (int i = 0; i < size; i++) {
                if (board[i][size - 1 - i] != currentTurn) { win = false; break; }
            }
            if (win) return true;
        }
        return false;
    }

    private void reset() {
        movesCount = 0;
        currentTurn = 'X';
        for (int i = 0; i < size; i++) {
            for (int j = 0; j < size; j++) {
                board[i][j] = '-';
            }
        }
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. How can you optimize the win-checking algorithm to run in O(1) time instead of scanning rows/columns of length N? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_06_1" id="q_ch09_06_1_a" data-correct="false"><label for="q_ch09_06_1_a">A) By keeping copies of the entire board in memory history.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_06_1" id="q_ch09_06_1_b" data-correct="true"><label for="q_ch09_06_1_b">B) By maintaining integer counters for each row and column, adding 1 for Player X and subtracting 1 for Player O, checking if any counter reaches N or -N.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_06_1" id="q_ch09_06_1_c" data-correct="false"><label for="q_ch09_06_1_c">C) By checking only cells at even indices.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_06_1" id="q_ch09_06_1_d" data-correct="false"><label for="q_ch09_06_1_d">D) Win-checks cannot run faster than O(N) since board cells must be evaluated.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
