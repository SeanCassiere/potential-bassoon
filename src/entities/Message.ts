import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne, JoinColumn, PrimaryColumn, Column } from "typeorm";
import { ChatRoom } from "./ChatRoom";
import { User } from "./User";

@Entity("chat_message")
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn("uuid", { name: "message_id" })
	messageId: string;

	@Column("text", { name: "content" })
	content: string;

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
