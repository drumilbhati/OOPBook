# 18. Collaborative Document Editor

**Difficulty:** Hard

### Scenario
Design the backend data structures and synchronization logic to coordinate multiple users concurrently editing a single document.

### Requirements
*   **Conflict Resolution:** Implement conflict resolution strategies (Operational Transformation or basic Version History check) to ensure consistency.
*   **Collaboration:** Model client cursor tracking and document changes (inserting/deleting characters at indexes).

---

<details>
<summary>View Solution & Pattern Analysis</summary>

### Key Design
We model character insertions and deletions as operations. The coordinator applies Operational Transformation (OT) concepts: transforming new incoming operations relative to historical changes that occurred at the same base version.

### Java Implementation
```java
import java.util.*;

enum OpType { INSERT, DELETE }

class TextOperation {
    final String userId;
    final OpType type;
    final int index;
    final char character;
    final int baseVersion;

    TextOperation(String user, OpType type, int index, char ch, int version) {
        this.userId = user;
        this.type = type;
        this.index = index;
        this.character = ch;
        this.baseVersion = version;
    }
}

public class DocumentEngine {
    private final StringBuilder document = new StringBuilder();
    private final List<TextOperation> history = new ArrayList<>();
    private int currentVersion = 0;

    public synchronized void applyOperation(TextOperation op) {
        int adjustedIndex = op.index;

        for (int i = op.baseVersion; i < history.size(); i++) {
            TextOperation histOp = history.get(i);
            if (histOp.index <= adjustedIndex) {
                if (histOp.type == OpType.INSERT) {
                    adjustedIndex++;
                } else if (histOp.type == OpType.DELETE) {
                    adjustedIndex--;
                }
            }
        }

        if (op.type == OpType.INSERT) {
            document.insert(adjustedIndex, op.character);
        } else if (op.type == OpType.DELETE && adjustedIndex < document.length()) {
            document.deleteCharAt(adjustedIndex);
        }

        history.add(new TextOperation(op.userId, op.type, adjustedIndex, op.character, currentVersion));
        currentVersion++;
    }

    public synchronized String getDocumentText() { return document.toString(); }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
<div class="quiz-question-wrapper">
<div class="quiz-question">1. In this Operational Transformation (OT) engine design, what is the role of baseVersion on incoming edits? <span class="quiz-feedback-inline"></span>
</div>
<ul class="quiz-options">
<li class="quiz-option"><input type="radio" name="q_ch09_18_1" id="q_ch09_18_1_a" data-correct="false"><label for="q_ch09_18_1_a">A) It determines the security clearance of the author.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_18_1" id="q_ch09_18_1_b" data-correct="false"><label for="q_ch09_18_1_b">B) It sets the max length of the edit.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_18_1" id="q_ch09_18_1_c" data-correct="true"><label for="q_ch09_18_1_c">C) It identifies the document state version the client was viewing when the edit was made, allowing the server to identify and transform the index against concurrent edits made since then.</label></li>
<li class="quiz-option"><input type="radio" name="q_ch09_18_1" id="q_ch09_18_1_d" data-correct="false"><label for="q_ch09_18_1_d">D) It automatically backups the document to disc.</label></li>
</ul>
</div>
<div class="quiz-feedback-main"></div>
<button class="quiz-check-btn">Check Answer</button>
</div>
