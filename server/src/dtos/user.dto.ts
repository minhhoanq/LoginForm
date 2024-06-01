import {
    IsBoolean,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";

export class Register {
    @IsNotEmpty()
    @IsString()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    lastName: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class Login {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class CodeVerify {
    @IsNotEmpty()
    code: string;
}

export class Update {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsString()
    firstName?: string;

    @IsNotEmpty()
    @IsString()
    lastName?: string;

    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsNotEmpty()
    @IsBoolean()
    status?: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isVerify?: boolean;

    @IsNotEmpty()
    @IsString()
    passwordChangedAt?: string;

    @IsNotEmpty()
    @IsString()
    passwordResetToken?: string;

    @IsNotEmpty()
    @IsNumber()
    passwordResetExpires?: string;
}

export class findFirst {
    @IsNotEmpty()
    @IsNumber()
    id?: number;

    @IsNotEmpty()
    @IsString()
    firstName?: string;

    @IsNotEmpty()
    @IsString()
    lastName?: string;

    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsString()
    password?: string;

    @IsNotEmpty()
    @IsBoolean()
    status?: boolean;

    @IsNotEmpty()
    @IsBoolean()
    isVerify?: boolean;

    @IsNotEmpty()
    @IsString()
    passwordChangedAt?: string;

    @IsNotEmpty()
    @IsString()
    passwordResetToken?: string;

    @IsNotEmpty()
    @IsNumber()
    passwordResetExpires?: string;
}
