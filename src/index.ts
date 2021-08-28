import "reflect-metadata";

import { createConnection } from "typeorm";
import { ChatConnection } from "./entities/ChatConnection";
import { ChatRoom } from "./entities/ChatRoom";
import { Message } from "./entities/Message";
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
		await ChatConnection.create({ user: john, room: room2 }).save();

		await User.delete({ userId: john.userId });
		console.log("\nNo ChatConnections should remain\n", await ChatConnection.find(), "\n");
		await ChatRoom.delete({ roomId: room2.roomId });
		console.log("\n");

		// Full CRUD
		console.log("// FULL CRUD with Messaging");
		const alex = await User.create({ username: "alex" }).save();
		const sharedRoom = await ChatRoom.create({ name: "company chat", type: "group" }).save();
		await ChatConnection.create({ room: sharedRoom, user: alex }).save();

		const mary = await User.create({ username: "mary" }).save();
		await ChatConnection.create({ room: sharedRoom, user: mary }).save();

		console.log(`--john sending a message to room || ${sharedRoom.name} || ${sharedRoom.roomId}`);
		await Message.create({ room: sharedRoom, user: alex, content: "hey to mary!" }).save();

		console.log(`--mary accessing messages in the room || ${sharedRoom.name} || ${sharedRoom.roomId}`);
		const allMsgs = await Message.find({ where: { roomId: sharedRoom.roomId } });
		console.log(`\nMary's Id is ${mary.userId}\n`, allMsgs);

		console.log("\n--SELECT Alex and his connections\n");
		const allAlexConns = await User.find({ where: { userId: alex.userId }, relations: ["connections"] });
		console.log("\n-- all of Alex's connections\n", allAlexConns);
		// console.log(JSON.stringify(allAlexConns), "\n\n");
		console.log(await alex.getConnections());

		console.log(`--delete the shared room || || ${sharedRoom.name} || ${sharedRoom.roomId}`);
		await ChatRoom.delete({ roomId: sharedRoom.roomId });

		const remConnections = await ChatConnection.find();
		const remMessages = await Message.find();
		console.log("\n--now connections and messages should be empty");
		console.log(`\nRemaining connections\n`, remConnections);
		console.log(`\nRemaining messages\n`, remMessages);
		console.log("\n");
	})
	.then(() => {
		process.exit();
	})
	.catch((e) => {
		console.log(e);
		process.exit();
	});
