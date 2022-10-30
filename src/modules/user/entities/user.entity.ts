import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, Index } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserSchedule } from './../../user-schedule/entities/user-schedule.entity';
import { Todo } from './../../todo/entities/todo.entity';

@Entity('users')
@ObjectType()
export class User {
    @Field(() => Int, { description: 'id of the user' })
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_user_id" })
    id: number;

    @Field(() => String, { description: 'name of the user' })
    @Column({ type: "varchar", nullable: false })
    name: string;

    @Field(() => String, { description: 'email of the user' })
    @Column({ type: "varchar", nullable: false, unique: true })
    email: string;

    @Column({ type: "varchar", nullable: true, length: 150 })
    password: string;

    @Field(() => String, { description: 'phone of the user' })
    @Column({ type: "varchar", length: 15 })
    phone: string;

    @Field(() => String, { description: 'address of the user' })
    @Column({ type: "text", nullable: true })
    address: string;

    @OneToMany(() => UserSchedule, (userSchedule) => userSchedule.user, { cascade: true })
    @Field(() => [UserSchedule], { description: 'user schedules of the user' })
    userSchedules: UserSchedule[]

    @OneToMany(() => Todo, (todo) => todo.user, { cascade: true })
    @Field(() => [Todo], { description: 'todo tasks of the user' })
    todos: Todo[]

    @Field(() => Date, { description: 'created date time of the user' })
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date, { description: 'updated date time of the user' })
    @UpdateDateColumn()
    updated_at: Date;
}