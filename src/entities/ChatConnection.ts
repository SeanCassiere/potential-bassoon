import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";
import { ChatRoom } from "./ChatRoom";
import { User } from "./User";

@Entity("chat_connection")
export class ChatConnection extends BaseEntity {
	@PrimaryGeneratedColumn("uuid", { name: "connection_id" })
	connectionId: string;

	@PrimaryColumn("uuid", { name: "room_id" })
	roomId: string;
	@ManyToOne(() => ChatRoom, (chatRoom) => chatRoom.roomId, {
		cascade: true,
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	@JoinColumn({ name: "room_id" })
	room: ChatRoom;

	@PrimaryColumn("uuid", { name: "user_id" })
	userId: string;
	@ManyToOne(() => User, (user) => user.userId, {
		cascade: true,
		onDelete: "CASCADE",
		orphanedRowAction: "delete",
	})
	@JoinColumn({ name: "user_id" })
	user: User;
}
