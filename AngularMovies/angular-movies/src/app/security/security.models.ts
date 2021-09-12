export interface UserCredentials{
    email: string;
    password: string;
}

export interface AuthenticationResponse{
    token: string;
    expiration: Date;
}

export interface UserDTO{
    id: string;
    email: string;
}
