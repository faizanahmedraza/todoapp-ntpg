import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserSchedule } from '../../user-schedule/entities/user-schedule.entity';
import { User } from '../../user/entities/user.entity';

@Entity('todos')
@ObjectType()
export class Todo {
    @Field(() => Int, { description: 'id of the todo task' })
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_todo_id" })
    id: number;

    @Field(() => String, { description: 'title of the todo task' })
    @Column({ type: "varchar", nullable: false })
    title: string;

    @Field(() => String, { description: 'description of the todo task' })
    @Column({ type: "text" })
    description: string;

    @ManyToOne(() => UserSchedule, (userSchedule) => userSchedule.todos, {
        onDelete: 'CASCADE',
    })
    @Field(() => UserSchedule, { description: 'user schedule related to this model' })
    @JoinColumn({ name: "user_schedule_id", referencedColumnName: 'id' })
    userSchedule: UserSchedule

    @ManyToOne(() => User, (user) => user.todos, {
        onDelete: 'CASCADE',
    })
    @Field(() => User, { description: 'user related to this model' })
    @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
    user: User

    @Field(() => Date, { description: 'created date time of the user' })
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date, { description: 'updated date time of the user' })
    @UpdateDateColumn()
    updated_at: Date;
}