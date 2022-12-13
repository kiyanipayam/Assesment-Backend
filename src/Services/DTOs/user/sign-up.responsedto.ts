export class signUpResponseDTO {
    readonly email: string
    readonly fullName: string
    readonly registeredDate: Date
    constructor(email: string, fullname: string, date: Date) {
        this.email = email;
        this.fullName = fullname;
        this.registeredDate = date
    }
}