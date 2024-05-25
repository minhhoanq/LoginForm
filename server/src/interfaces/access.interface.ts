export interface IAccessRepository {
    findUserByEmail(email: string): Promise<any>;
    findFirst(data: any): Promise<any>;
    createUser(data: any): Promise<any>;
}
