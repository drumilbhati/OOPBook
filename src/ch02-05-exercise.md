# Programming Exercise: Library Management System

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
