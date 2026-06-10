# Case Study: Chess Game

Designing a Chess Game tests your ability to model complex rules, handle state, and implement features like "Undo" which are common in application development.

## 1. Requirements Gathering

### Functional Requirements
*   **Board Representation:** An 8x8 grid.
*   **Pieces:** King, Queen, Rook, Bishop, Knight, Pawn (each with unique movement rules).
*   **Two Players:** White and Black, taking turns.
*   **Move Validation:** Each piece must follow its movement logic. Check/Checkmate detection.
*   **Special Moves:** Castling, En Passant, Pawn Promotion.
*   **Undo/Redo:** Ability to revert moves.

### Non-Functional Requirements
*   **Extensibility:** Easy to add new variants (e.g., different board sizes or new piece types).
*   **Correctness:** The game state must always be valid.

## 2. Core Classes & Relationships

*   **Spot:** Represents one square on the board (row, col, and piece).
*   **Piece:** Abstract class with a `canMove()` method. Subclasses: `King`, `Queen`, etc.
*   **Board:** Manages the 8x8 array of `Spot` objects.
*   **Player:** Represents a player (White or Black).
*   **Move:** Encapsulates a start spot, end spot, and the piece moved.
*   **Game:** Controls the flow (turns, game status like ACTIVE, BLACK_WIN, WHITE_WIN).
*   **Command Pattern:** Used to implement the Undo/Redo functionality.

## 3. Implementation

We will use the **Command Pattern** to wrap move logic, making it easy to support "Undo".

```java
import java.util.*;

// --- Piece Logic ---
enum Color { WHITE, BLACK }

abstract class Piece {
    protected Color color;
    protected boolean killed = false;

    public Piece(Color color) { this.color = color; }
    public abstract boolean canMove(Board board, Spot start, Spot end);
    public Color getColor() { return color; }
}

class Knight extends Piece {
    public Knight(Color color) { super(color); }
    @Override
    public boolean canMove(Board board, Spot start, Spot end) {
        // L-shape logic
        int x = Math.abs(start.getX() - end.getX());
        int y = Math.abs(start.getY() - end.getY());
        return x * y == 2;
    }
}

// --- Board & Spot ---
class Spot {
    private int x, y;
    private Piece piece;

    public Spot(int x, int y, Piece piece) {
        this.x = x; this.y = y; this.piece = piece;
    }
    // Getters and Setters...
    public Piece getPiece() { return piece; }
    public void setPiece(Piece p) { this.piece = p; }
}

class Board {
    Spot[][] boxes = new Spot[8][8];
    public Board() { this.resetBoard(); }
    public void resetBoard() { /* Initialize pieces */ }
    public Spot getSpot(int x, int y) { return boxes[x][y]; }
}

// --- Command Pattern for Undo ---
interface Command {
    boolean execute();
    void undo();
}

class MoveCommand implements Command {
    private Board board;
    private Spot start, end;
    private Piece movedPiece, capturedPiece;

    public MoveCommand(Board board, Spot start, Spot end) {
        this.board = board; this.start = start; this.end = end;
    }

    public boolean execute() {
        movedPiece = start.getPiece();
        if (movedPiece == null || !movedPiece.canMove(board, start, end)) return false;
        
        capturedPiece = end.getPiece();
        end.setPiece(movedPiece);
        start.setPiece(null);
        return true;
    }

    public void undo() {
        start.setPiece(movedPiece);
        end.setPiece(capturedPiece);
    }
}

// --- Game Controller ---
class Game {
    private Board board = new Board();
    private Stack<Command> moveHistory = new Stack<>();

    public void makeMove(Player player, int x1, int y1, int x2, int y2) {
        Spot start = board.getSpot(x1, y1);
        Spot end = board.getSpot(x2, y2);
        Command move = new MoveCommand(board, start, end);
        
        if (move.execute()) {
            moveHistory.push(move);
        }
    }

    public void undo() {
        if (!moveHistory.isEmpty()) {
            moveHistory.pop().undo();
        }
    }
}
```

## Module Quiz

1.  **Which pattern is most effective for implementing the "Undo" feature in a Chess game?**
    *   A) Singleton
    *   B) Command
    *   C) Observer
    *   D) Decorator

2.  **Why should the `Piece` class be abstract rather than an interface?**
    *   A) Interfaces cannot have methods.
    *   B) To provide common properties like `color` and `isKilled` to all subclasses.
    *   C) Abstract classes are faster than interfaces.
    *   D) It doesn't matter; both are the same.

3.  **How would you handle "Checkmate" detection in this design?**
    *   A) Inside the `Piece` class.
    *   B) In the `Game` class, by iterating through all possible moves of the current player and checking if any move removes the "Check".
    *   C) By asking the opponent if they are in checkmate.
    *   D) Checkmate is not part of LLD.

---
*Answers: 1-B, 2-B, 3-B*

---
### Module Quiz

<div class="quiz-container">
    <div class="quiz-question">Which pattern is best for implementing an "Undo" feature in a game like Chess?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q08_03" id="q08_03_a" data-correct="false"><label for="q08_03_a">Factory Method</label></li>
        <li class="quiz-option"><input type="radio" name="q08_03" id="q08_03_b" data-correct="true"><label for="q08_03_b">Command</label></li>
        <li class="quiz-option"><input type="radio" name="q08_03" id="q08_03_c" data-correct="false"><label for="q08_03_c">Adapter</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
