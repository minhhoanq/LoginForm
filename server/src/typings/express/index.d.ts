declare module Express {
    export interface Request {
        user?: any;
        session?: any;
        refreshToken?: string;
    }
}
