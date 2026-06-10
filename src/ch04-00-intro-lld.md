# Introduction to Low-Level Design

Low-Level Design (LLD), also known as Object-Oriented Design (OOD), is the process of defining the actual code components, their relationships, and the detailed logic of a system. While High-Level Design (HLD) focuses on the "big picture" (servers, databases, load balancers), LLD focuses on the internal structure of each service.

## Programming Exercise: Simple Logger Design

### Problem Statement
Design a simple logging system that can log messages to different destinations (Console and File). 

1.  Identify the core components.
2.  Use the principles of Abstraction and Polymorphism to ensure that the system can be easily extended with new logging destinations (e.g., `DatabaseLogger`) without changing the main application logic.

### Requirements
- Create a `Logger` interface with a `log(String message)` method.
- Implement `ConsoleLogger` and `FileLogger`.
- Demonstrate the usage by creating a list of loggers and logging a message to all of them.

<details>
<summary>View Solution</summary>

```java
import java.util.*;

// Abstraction
interface Logger {
    void log(String message);
}

// Concrete Implementations
class ConsoleLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("[Console] " + message);
    }
}

class FileLogger implements Logger {
    @Override
    public void log(String message) {
        System.out.println("[File] Writing to file: " + message);
    }
}

// Client Code
public class Main {
    public static void main(String[] args) {
        List<Logger> loggers = new ArrayList<>();
        loggers.add(new ConsoleLogger());
        loggers.add(new FileLogger());

        String event = "User logged in";
        for (Logger logger : loggers) {
            logger.log(event);
        }
    }
}
```
</details>

---

### Module Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">What is the primary focus of Low-Level Design (LLD)? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q04_00" id="q04_00_a" data-correct="false"><label for="q04_00_a">High-level system architecture and network topology.</label></li>
            <li class="quiz-option"><input type="radio" name="q04_00" id="q04_00_b" data-correct="true"><label for="q04_00_b">The internal structure of components, including classes, interfaces, and their relationships.</label></li>
            <li class="quiz-option"><input type="radio" name="q04_00" id="q04_00_c" data-correct="false"><label for="q04_00_c">User interface design and color palettes.</label></li>
        </ul>
    </div>
    <div class="quiz-feedback-main"></div>
    <button class="quiz-check-btn">Check Answer</button>
</div>
