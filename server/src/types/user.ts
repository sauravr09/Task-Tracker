export type UserRegisterRequestBody = { 
    username: string, 
    email: string, 
    password: string,
    confirmPassword?: string
}

export type UserLoginRequestBody = {
    email: string, 
    password: string
}

export type UserRow = {
    id: number, 
    username: string, 
    email: string, 
    password_hash: string,
    created_at: string;
}

export type UserRegisteredSuccess = {
   userId: number,
   accessToken: string,
   refreshToken: string

}