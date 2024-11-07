export interface IUsers {
    id: number;
    name: string;
    email: string;
    password: string;
    thumb?: string; 
}

export type CreateUserParams = Pick<IUsers, 'name' | 'email' | 'password'>;
export type UpdateUserParams = Partial<IUsers>; 
export type DeleteUserParams = Pick<IUsers, 'id'>;
