export class loginResponseDTO {
    token: string;
    fullName: string;
    email: string;
    registeredDate: Date
    constructor(token: string, fullName: string, email: string, date: Date) {
        this.token = token;
        this.fullName = fullName;
        this.email = email;
        this.registeredDate = date;
    }
}