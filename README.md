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

```
Message
messageId: uuid
content: string
roomId: uuid FK to ChatRoom.roomId
userId: uuid FK to User.userId
```

- **User** (one to many) => **ChatConnection**
- **Room** (one to many) => **ChatConnection**
- **User** (one to many) => **Message**
- **Room** (one to many) => **Message**

## Delete cascades

| Action | Entity         | Result                           |
| ------ | -------------- | -------------------------------- |
| Delete | Room           | Room should be deleted           |
|        |                | ChatConnection should be deleted |
|        |                | Message should be deleted        |
| Delete | User           | User should be deleted           |
|        |                | ChatConnection should be deleted |
|        |                | Message should be deleted        |
| Delete | ChatConnection | ChatConnection should be deleted |
| Delete | Message        | Message should be deleted        |
