import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ChatConnection } from "./ChatConnection";
import { Message } from "./Message";

export type RoomType = "single" | "group";

@Entity("chat_room")
export class ChatRoom extends BaseEntity {
	@PrimaryGeneratedColumn("uuid", { name: "room_id" })
	roomId: string;

	@Column("text", { name: "room_name" })
	name: string;

	@Column("varchar", { name: "room_type" })
	type: RoomType;

	@OneToMany(() => ChatConnection, (chat_connection) => chat_connection.room)
	connections: ChatConnection[];

	@OneToMany(() => Message, (chat_message) => chat_message.room)
	messages: Message[];
}
