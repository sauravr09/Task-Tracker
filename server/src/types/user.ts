export type UserRegisterRequestBody = { 
    username: string, 
    email: string, 
    password: string,
    confirmPassword?: string
}

export type UserLoginRequestBody = {
    identifier: string, 
    password: string
}

export type UserRow = {
    id: number, 
    username: string, 
    email: string, 
    password_hash: string,
    created_at: string;
}

export type PublicUserInfo = {
    id: number,
    username: string
}

export type AuthSuccess = {
   user: PublicUserInfo,
   accessToken: string,
   refreshToken: string
}
