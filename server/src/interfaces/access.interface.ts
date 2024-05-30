import { Update, findFirst } from "../dtos/user.dto";

export interface IAccessRepository {
    findUserByEmail(email: string): Promise<any>;
    findFirst(data: any): Promise<any>;
    createUser(data: any): Promise<any>;
    deleteUserByEmail(email: string): Promise<any>;
    findUserByCodeVerify(code: string): Promise<any>;
    findUser(data: findFirst): Promise<any>;
    updateUserEmail(email: string, id: number): Promise<any>;
    updateUser(data: Update): Promise<any>;
}
