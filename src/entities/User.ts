import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { ChatConnection } from "./ChatConnection";
@Entity("users", {})
export class User extends BaseEntity {
	@PrimaryGeneratedColumn("uuid", { name: "user_id" })
	userId: string;

	@Column("text", { unique: true })
	username: string;

	@OneToMany(() => ChatConnection, (chat_connection) => chat_connection.user)
	connections: ChatConnection[];
}
