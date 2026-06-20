# Low-Level Design (LLD) Practice Problems

Applying design patterns, SOLID principles, and clean object-oriented code requires practice. This chapter contains **20 classic Low-Level Design (LLD)** problems frequently encountered in software engineering interviews and real-world applications.

To help you progress systematically, the problems are organized into three difficulty tiers:

---

### [1. Easy Practice Problems (7 Problems)](./ch09-01-easy-problems.md)
Focus on core data structures, basic state transitions, concurrency safety, and encapsulation.
1. **Thread-Safe Generic Stack**: Generic stack implementation with thread safety.
2. **In-Memory Key-Value Store with TTL**: Fast lookup table with automatic record expiration.
3. **Custom Hash Map**: Hashing, collision resolution (chaining), and resizing.
4. **LRU Cache**: $O(1)$ operations with a Doubly Linked List and Hash Map.
5. **Vending Machine**: State pattern modeling state transitions.
6. **Tic-Tac-Toe**: Two-player board game state and win condition validation.
7. **Rate Limiter**: Throttling requests using the Token Bucket algorithm.

---

### [2. Medium Practice Problems (7 Problems)](./ch09-02-medium-problems.md)
Focus on design pattern integration, relationships between multiple complex entities, and transaction handling.
8. **Splitwise (Expense Sharer)**: Splitting expenses equally, exactly, or by percentage, and simplifying debt.
9. **Online Shopping Platform (E-commerce)**: Shopping cart, order processing, and payment integration.
10. **Hotel Booking System**: Room categories, reservation checking, and concurrency handling (double booking).
11. **Car Rental System**: Rental management across branches with dynamic rate calculators.
12. **Meeting Scheduler**: Meeting room allocation, calendar conflict checks, and invites.
13. **ATM (Automated Teller Machine)**: User validation, cash withdrawal, and dispensing via Chain of Responsibility.
14. **Snake and Ladder Game**: Board simulation, movements, and dice rolls.

---

### [3. Hard Practice Problems (6 Problems)](./ch09-03-hard-problems.md)
Focus on concurrency management, distributed systems logic (locally simulated), real-time updates, performance constraints, and complex algorithms.
15. **Ride-Sharing Service (Uber/Lyft)**: Dynamic pricing, location-based driver matching, and state lifecycle.
16. **Distributed Message Queue (Kafka Simulation)**: Partitioned topic management, offset tracking, and consumer groups.
17. **Task/Job Scheduler (Cron Engine)**: Scheduling one-off or recurring tasks with priority execution and thread pools.
18. **Collaborative Document Editor (Simplified)**: Modeling concurrent edits, version history, and conflict resolution.
19. **Traffic Control System**: Multi-way intersection traffic lights, sensors, and emergency overrides.
20. **Stock Brokerage System (Robinhood/Zerodha)**: In-memory order book, limit/market matching engine, and portfolios.

---

Use these problems to practice writing clean, maintainable, and extensible code. Focus on drawing class diagrams (UML), defining clear interfaces, identifying appropriate design patterns, and handling edge cases like thread safety and scalability.
