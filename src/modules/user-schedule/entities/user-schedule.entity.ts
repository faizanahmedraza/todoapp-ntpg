import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';
import { User } from '../../user/entities/user.entity';

@Entity('user_schedules')
@ObjectType()
export class UserSchedule {
    @Field(() => Int, { description: 'id of the user' })
    @PrimaryGeneratedColumn({ primaryKeyConstraintName: "pk_user_schedule_id" })
    id: number;

    @Field(() => String, { description: 'duration of user schedule' })
    @Column({ nullable: true })
    duration: string;

    @Field(() => Date, { description: 'start date of the user schedule' })
    @Column({ name: 'started_at' })
    startedAt: Date;

    @Field(() => Date, { description: 'end date of the user schedule' })
    @Column({  name: 'ended_at' })
    endedAt: Date;

    @Field(() => String, { description: 'description of the user schedule', nullable: true })
    @Column({ type: "text", nullable: true })
    description?: string;

    @ManyToOne(() => User, (user) => user.userSchedules,{
        onDelete: 'CASCADE',
    })
    @Field(() => User, { description: 'userId of the user' })
    @JoinColumn({ name: "user_id", referencedColumnName: 'id' })
    user: User

    @OneToMany(() => Todo, (todo) => todo.userSchedule, { cascade: true })
    @Field(() => [Todo], { description: 'todos related to user schedule' })
    todos: Todo[]

    @Field(() => Date, { description: 'created date time of the user_schedule' })
    @CreateDateColumn()
    created_at: Date;

    @Field(() => Date, { description: 'updated date time of the user_schedule' })
    @UpdateDateColumn()
    updated_at: Date;
}
