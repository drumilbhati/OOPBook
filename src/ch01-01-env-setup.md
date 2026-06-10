# Environment Setup: JVM, JRE, and JDK

Before we dive into Low-Level Design, we must understand the platform we are building on. Java's "Write Once, Run Anywhere" (WORA) philosophy is powered by three core components: the JVM, the JRE, and the JDK.

### The Holy Trinity of Java

Understanding the distinction between these three is a classic interview question and fundamental for any senior engineer.

1.  **JVM (Java Virtual Machine):** This is the heart of Java. It is an abstract machine that provides a runtime environment in which Java bytecode can be executed. It is platform-dependent (different JVMs for Windows, Linux, macOS) but ensures the bytecode it runs is platform-independent.
2.  **JRE (Java Runtime Environment):** This is the package that provides everything you need to *run* a Java program. It includes the JVM, core libraries, and other supporting files. If you only want to execute Java apps, you only need the JRE.
3.  **JDK (Java Development Kit):** This is the full-featured SDK for Java. It contains the JRE plus development tools like the compiler (`javac`), debugger, and documentation tools (`javadoc`). As a developer, you need the JDK.

> **Note:** Since Java 11, the distinction between JRE and JDK has blurred in distribution, with most vendors providing a JDK that you use to create a custom runtime using `jlink`.

### Setting Up a Basic Project

While modern IDEs like IntelliJ IDEA or Eclipse handle much of this for you, a senior engineer should understand the underlying mechanics.

1.  **Install a JDK:** Use a modern version (LTS versions like Java 17 or 21 are recommended).
2.  **Verify Installation:**
    ```bash
    java -version
    javac -version
    ```
3.  **The Anatomy of a Simple Class:**
    Create a file named `Main.java`:
    ```java
    public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, LLD World!");
        }
    }
    ```
4.  **Compile and Run:**
    ```bash
    javac Main.java  // Produces Main.class (Bytecode)
    java Main        // Executes the bytecode via JVM
    ```

### Why this matters for LLD?
In Low-Level Design, we care about how our objects reside in memory and how the JVM manages resources. Understanding that your code is transformed into bytecode and managed by the JVM is the first step in writing performant, scalable systems.

<div class="quiz-container">
    <div class="quiz-question">Which component is responsible for converting Java Bytecode into machine-specific instructions during execution?</div>
    <ul class="quiz-options">
        <li class="quiz-option"><input type="radio" name="q_env_1" id="q_env_1_a" data-correct="false"><label for="q_env_1_a">JDK</label></li>
        <li class="quiz-option"><input type="radio" name="q_env_1" id="q_env_1_b" data-correct="false"><label for="q_env_1_b">JRE</label></li>
        <li class="quiz-option"><input type="radio" name="q_env_1" id="q_env_1_c" data-correct="true"><label for="q_env_1_c">JVM</label></li>
        <li class="quiz-option"><input type="radio" name="q_env_1" id="q_env_1_d" data-correct="false"><label for="q_env_1_d">Javac</label></li>
    </ul>
    <button class="quiz-check-btn">Check Answer</button>
    <div class="quiz-feedback"></div>
</div>
