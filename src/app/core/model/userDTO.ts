import { role } from './role';

export class UserDTO {
    id?: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    enable?: boolean;
    roles?: Array<role>;

}