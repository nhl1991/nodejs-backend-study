import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity() // ＠Entity()로 의존성 주입.
export class User {
    @PrimaryGeneratedColumn() // 값 자동 증가하는 기본 키. 
    id?:number;

    @Column({ unique: true }) // 
    email: string;

    @Column()
    password: string;

    @Column()
    username: string;

    @Column({ default: true })
    createdDt: Date = new Date();

}