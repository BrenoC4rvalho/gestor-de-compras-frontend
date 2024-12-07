import { RoleName } from "./RoleName";

export interface CreateUser {
    name: string;
    password: string;
    role: RoleName | null;
}