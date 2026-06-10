# Programming Exercise: Scalable Logging System

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
