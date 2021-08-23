import "reflect-metadata";

import { createConnection } from "typeorm";
import { ChatConnection } from "./entities/ChatConnection";
import { ChatRoom } from "./entities/ChatRoom";
import { User } from "./entities/User";

createConnection()
	.then(async (_) => {
		console.log("🚀 Connected to DB 🚀\n");
		// create and delete bob user
		console.log("// CRUD ops for User = bob");
		await User.create({ username: "bob" }).save();

		await User.findOne({ username: "bob" });
		await User.delete({ username: "bob" });
		console.log("\n");

		// create and delete a room
		console.log("// CRUD ops for Chat Room = room1");
		const chatRoom1 = await ChatRoom.create({ name: "room1", type: "single" }).save();

		await ChatRoom.findOne({ roomId: chatRoom1.roomId });
		await ChatRoom.delete({ roomId: chatRoom1.roomId });
		console.log("\n");

		// create user, room and conn. -> delete conn, then delete user and room
		console.log("// CRUD delete a conn, then later delete the user and room");
		const joe = await User.create({ username: "joe" }).save();
		const room1 = await ChatRoom.create({ name: "joe-chat", type: "single" }).save();
		const joeJoinCon = await ChatConnection.create({ userId: joe.userId, roomId: room1.roomId }).save();

		await ChatConnection.delete({ connectionId: joeJoinCon.connectionId });
		console.log("Remaining users\n", await User.find());
		await User.delete({ userId: joe.userId });
		await ChatRoom.delete({ roomId: room1.roomId });
		console.log("\n");

		// Delete a user which should cascade and delete the connection
		console.log("// CRUD delete a user which should cascade delete the conn");
		const john = await User.create({ username: "john" }).save();
		const room2 = await ChatRoom.create({ name: "john-chat", type: "single" }).save();
		john.username = "john_doe";
		await john.save();
		await ChatConnection.create({ userId: john.userId, roomId: room2.roomId }).save();

		await User.delete({ userId: john.userId });
		console.log("Remaining users\n", await User.find());
		console.log("Remaining connections\n", await ChatConnection.find());
		console.log("Remaining rooms\n", await ChatRoom.find());

		await ChatRoom.delete({ roomId: room2.roomId });
		console.log("\n");
	})
	.then(() => {
		process.exit();
	})
	.catch((e) => {
		console.log(e);
		process.exit();
	});
