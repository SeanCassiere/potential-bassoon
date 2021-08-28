import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ChatConnection } from "./ChatConnection";
import { Message } from "./Message";
@Entity("users", {})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid", { name: "user_id" })
	userId: string;

	@Column("text", { unique: true })
	username: string;

	@OneToMany(() => ChatConnection, (chat_connection) => chat_connection.user)
	connections: ChatConnection[];

	@OneToMany(() => Message, (chat_message) => chat_message.user)
	messages: Message[];

	public async getConnections() {
		return await ChatConnection.find({ where: { userId: this.userId } });
	}
}
