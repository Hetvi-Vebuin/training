import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() // Best to rename table to avoid conflicts
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 20 })
    username!: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email!: string;

    @Column({ type: "varchar", length: 255 }) // Store hashed password
    password!: string;

    @Column({ type: "enum", enum: ["admin", "user"], default: "user" })
    role!: "admin" | "user";
}
