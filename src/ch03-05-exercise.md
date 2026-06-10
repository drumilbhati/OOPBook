# Programming Exercise: Generic Repository Pattern

### Problem Statement
In modern application development, the Repository pattern is often used to decouple the data access logic from the business logic. Your task is to design a **Generic Repository** that can perform basic CRUD (Create, Read, Update, Delete) operations for any entity type.

1.  Create a generic interface `Repository<T>`.
2.  The interface should define the following methods:
    *   `void add(T item)`
    *   `T getById(int id)` (Assume entities have an integer ID for this exercise)
    *   `List<T> getAll()`
3.  Implement a concrete class `InMemoryRepository<T>` that stores items in a `List`.
4.  Create a simple `User` class to test your repository.

### Requirements
- Use Java Generics to ensure type safety.
- The `InMemoryRepository` should work with any class you create.

<details>
<summary>View Solution</summary>

```java
import java.util.*;

// Generic Interface
interface Repository<T> {
    void add(T item);
    T getById(int id);
    List<T> getAll();
}

// Concrete Implementation
class InMemoryRepository<T> implements Repository<T> {
    private List<T> items = new ArrayList<>();

    @Override
    public void add(T item) {
        items.add(item);
    }

    @Override
    public T getById(int id) {
        // In a real scenario, T would likely implement an Identifiable interface
        if (id >= 0 && id < items.size()) {
            return items.get(id);
        }
        return null;
    }

    @Override
    public List<T> getAll() {
        return new ArrayList<>(items);
    }
}

// Test Class
class User {
    String name;
    User(String name) { this.name = name; }
    @Override
    public String toString() { return "User{name='" + name + "'}"; }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Repository<User> userRepository = new InMemoryRepository<>();
        userRepository.add(new User("Alice"));
        userRepository.add(new User("Bob"));
        
        System.out.println(userRepository.getAll());
    }
}
```
</details>
