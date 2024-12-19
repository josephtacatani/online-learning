export interface LoginRequestInterface{
    userName: string,
    password: string
}

export interface LoginResponseInterface{
    message: string,
    result: boolean,
    data: {
        userId?: number,
        userName: string,
        emailId?: string,
        fullName: string,
        role: string,
        createdData?: string,
        password?: string,
        projectName?: string,
        refreshToken?: string,
        refreshTokenExpiryTime?: string
    }
}

export interface LoginErrorResponseInterface{
    message: string,
    result: boolean,
}

export interface RegistrationErrorResponseInterface{
    message: string,
    result: boolean,
}

export interface userDataInterface{
    userId?: number,
    userName: string,
    emailId?: string,
    fullName: string,
    role: string,
    createdData?: string,
    password?: string,
    projectName?: string,
    refreshToken?: string,
    refreshTokenExpiryTime?: string
}
