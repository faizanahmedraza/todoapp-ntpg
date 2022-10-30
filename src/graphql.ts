
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateTodoInput {
    description: string;
    title: string;
    userId: number;
    userScheduleId: number;
}

export interface CreateUserInput {
    address: string;
    email: string;
    name: string;
    password?: Nullable<string>;
    phone: string;
}

export interface CreateUserScheduleInput {
    description?: Nullable<string>;
    duration?: Nullable<string>;
    endedAt: string;
    startedAt: string;
    userId: number;
}

export interface LoginUserInput {
    password: string;
    username: string;
}

export interface RemoveTodoInput {
    id: number;
    userId: number;
    userScheduleId: number;
}

export interface RemoveUserScheduleInput {
    id: number;
    userId: number;
}

export interface UpdateTodoInput {
    description?: Nullable<string>;
    id: number;
    title?: Nullable<string>;
    userId?: Nullable<number>;
    userScheduleId?: Nullable<number>;
}

export interface UpdateUserInput {
    address?: Nullable<string>;
    email?: Nullable<string>;
    id: number;
    name?: Nullable<string>;
    password?: Nullable<string>;
    phone?: Nullable<string>;
}

export interface UpdateUserScheduleInput {
    description?: Nullable<string>;
    duration?: Nullable<string>;
    endedAt?: Nullable<string>;
    id: number;
    startedAt?: Nullable<string>;
    userId?: Nullable<number>;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface IMutation {
    createTodo(createTodoInput: CreateTodoInput): string | Promise<string>;
    createUser(createUserInput: CreateUserInput): string | Promise<string>;
    createUserSchedule(createUserScheduleInput: CreateUserScheduleInput): string | Promise<string>;
    login(loginUserInput: LoginUserInput): LoginResponse | Promise<LoginResponse>;
    removeTodo(removeTodo: RemoveTodoInput): string | Promise<string>;
    removeUser(id: number): string | Promise<string>;
    removeUserSchedule(removeSchedule: RemoveUserScheduleInput): string | Promise<string>;
    signup(signupUserInput: CreateUserInput): SignUpResponse | Promise<SignUpResponse>;
    updateTodo(updateTodoInput: UpdateTodoInput): string | Promise<string>;
    updateUser(updateUserInput: UpdateUserInput): string | Promise<string>;
    updateUserSchedule(updateUserScheduleInput: UpdateUserScheduleInput): string | Promise<string>;
}

export interface IQuery {
    todo(id: number): Todo | Promise<Todo>;
    user(id: number): User | Promise<User>;
    userSchedule(id: number): UserSchedule | Promise<UserSchedule>;
}

export interface SignUpResponse {
    access_token?: Nullable<string>;
    user?: Nullable<User>;
}

export interface Todo {
    created_at: Date;
    description: string;
    id: number;
    title: string;
    updated_at: Date;
    user: User;
    userSchedule: UserSchedule;
}

export interface User {
    address: string;
    created_at: Date;
    email: string;
    id: number;
    name: string;
    phone: string;
    todoTasks: Todo[];
    todos: Todo[];
    updated_at: Date;
    userSchedules: UserSchedule[];
}

export interface UserSchedule {
    created_at: Date;
    description?: Nullable<string>;
    duration: string;
    endedAt: Date;
    id: number;
    startedAt: Date;
    todoTasks: Todo[];
    todos: Todo[];
    updated_at: Date;
    user: User;
}

type Nullable<T> = T | null;
