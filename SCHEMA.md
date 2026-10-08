# NEXUS Database Schema

This database uses Prisma ORM mapped to an SQLite database.

## ER Diagram (Mermaid)

```mermaid
erDiagram
    User ||--o{ Project : "owns"
    User ||--o{ Task : "assigned to"
    Project ||--o{ Task : "contains"

    User {
        String id PK
        String email UK
        String password
        String name
        DateTime createdAt
        DateTime updatedAt
    }

    Project {
        String id PK
        String title
        String description
        String status "NOT_STARTED, IN_PROGRESS, COMPLETED"
        DateTime startDate
        DateTime endDate
        String ownerId FK
        DateTime createdAt
        DateTime updatedAt
    }

    Task {
        String id PK
        String title
        String description
        String priority "LOW, MEDIUM, HIGH"
        String status "PENDING, IN_PROGRESS, COMPLETED"
        String projectId FK
        String assigneeId FK
        DateTime dueDate
        DateTime createdAt
        DateTime updatedAt
    }
```

## Tables

### 1. User
Stores authentication and profile information.
- `id` (String, UUID) - Primary Key
- `email` (String, Unique)
- `password` (String, Hashed)
- `name` (String)

### 2. Project
High-level container for tasks.
- `id` (String, UUID) - Primary Key
- `title` (String)
- `description` (String, Optional)
- `status` (Enum: NOT_STARTED, IN_PROGRESS, COMPLETED)
- `startDate` (DateTime, Optional)
- `endDate` (DateTime, Optional)
- `ownerId` (String, UUID) - Foreign Key to User

### 3. Task
Actionable items within a project.
- `id` (String, UUID) - Primary Key
- `title` (String)
- `description` (String, Optional)
- `priority` (Enum: LOW, MEDIUM, HIGH)
- `status` (Enum: PENDING, IN_PROGRESS, COMPLETED)
- `projectId` (String, UUID) - Foreign Key to Project
- `assigneeId` (String, UUID) - Foreign Key to User
- `dueDate` (DateTime, Optional)
