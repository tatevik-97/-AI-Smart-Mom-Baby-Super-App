export class CreateUserDto {
    email: string;
    password: string;
    role?: 'mom' | 'dad'; // optional, default can be 'mom'
}
