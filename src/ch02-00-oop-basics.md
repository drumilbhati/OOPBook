# Object-Oriented Programming (OOP) Basics

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data and code: data in the form of fields (often known as attributes or properties), and code, in the form of procedures (often known as methods).

In Java, everything is centered around classes and objects. This chapter will dive into the core pillars of OOP that are essential for any Low Level Design discussion.

## Core Pillars of OOP

There are four fundamental pillars of OOP:

1. **Encapsulation**: Wrapping data and methods into a single unit (class) and restricting direct access to some of the object's components.
2. **Inheritance**: A mechanism where a new class (subclass) inherits properties and behaviors from an existing class (superclass).
3. **Polymorphism**: The ability of a single function or object to take on multiple forms (e.g., method overloading and overriding).
4. **Abstraction**: Hiding the complex implementation details and showing only the necessary features of an object.

### What's in this Chapter?

- [Classes and Objects](./ch02-01-classes-objects.md)
- [Encapsulation](./ch02-02-encapsulation.md)
- [Inheritance and Polymorphism](./ch02-03-inheritance-polymorphism.md)
- [Abstraction](./ch02-04-abstraction.md)

---

### Module 2.0 Quiz

<div class="quiz-container">
    <div class="quiz-question-wrapper">
        <div class="quiz-question">1. Which pillar of OOP is primarily achieved using private fields and public getter/setter methods? <span class="quiz-feedback-inline"></span></div>
        <ul class="quiz-options">
            <li class="quiz-option"><input type="radio" name="q2_0" id="q2_0a" data-correct="true"><label for="q2_0a">Encapsulation</label></li>
            <li class="quiz-option"><input type="radio" name="q2_0" id="q2_0b" data-correct="false"><label for="q2_0b">Inheritance</label></li>
            <li class="quiz-option"><input type="radio" name="q2_0" id="q2_0c" data-correct="false"><label for="q2_0c">Polymorphism</label></li>
            <li class="quiz-option"><input type="radio" name="q2_0" id="q2_0d" data-correct="false"><label for="q2_0d">Abstraction</label></li>
        </ul>
    </div>
    <button class="quiz-check-btn">Check Answers</button>
    <div class="quiz-feedback-main"></div>
</div>

---

### Chapter 2 Programming Exercise

<div class="exercise-container">
    <div class="exercise-header">
        <span class="exercise-badge">Exercise</span>
        <span class="exercise-title">Library Management System (Basic)</span>
    </div>
    <div class="exercise-statement">
        Design a basic Library Management System where you have `Book` and `Member` classes. A `Member` can borrow a `Book`. Use encapsulation to protect the book's status.
    </div>
<div class="exercise-solution">
<details>
<summary>View Solution</summary>

```java
class Book {
    private String title;
    private String author;
    private boolean isBorrowed;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
        this.isBorrowed = false;
    }

    public String getTitle() { return title; }
    public boolean isBorrowed() { return isBorrowed; }

    public void borrowBook() {
        if (!isBorrowed) {
            isBorrowed = true;
            System.out.println("Book borrowed: " + title);
        } else {
            System.out.println("Book is already borrowed.");
        }
    }

    public void returnBook() {
        isBorrowed = false;
        System.out.println("Book returned: " + title);
    }
}

class Member {
    private String name;

    public Member(String name) {
        this.name = name;
    }

    public void borrow(Book book) {
        System.out.println(name + " is trying to borrow " + book.getTitle());
        book.borrowBook();
    }
}

public class LibrarySystem {
    public static void main(String[] args) {
        Book book1 = new Book("Effective Java", "Joshua Bloch");
        Member member1 = new Member("Alice");

        member1.borrow(book1);
        member1.borrow(book1); // Should show already borrowed
    }
}
```

</details>
</div>
</div>
