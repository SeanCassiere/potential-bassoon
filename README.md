# Tests with TypeORM relationships

Testing the TypeORM relationships.

## Entities

```
User
userId: uuid
username: string
```

```
ChatRoom
roomId: uuid
name: string
type: "single" | "group"
```

```
ChatConnection
connectionId: uuid
roomId: uuid FK to ChatRoom.roomId
userId: uuid FK to User.userId
```

**User** (one to many) => **ChatConnection**

**Room** (one to many) => **ChatConnection**
