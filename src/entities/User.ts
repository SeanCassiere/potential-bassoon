import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ChatConnection } from "./ChatConnection";
import { ChatRoom } from "./ChatRoom";
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

	public async getRooms() {
		const userConnections = await this.getConnections();
		const roomIds = userConnections.map((conn) => conn.roomId);
		const userRooms = await ChatRoom.createQueryBuilder()
			.select()
			.where("room_id IN (:...ids)", { ids: roomIds })
			.getMany();
		return userRooms;
	}
}
