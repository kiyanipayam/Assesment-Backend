export class PostDTO {
    id: string;
    title: string;
    body: string;
    userFullName: string;
    createdDate: Date;
    userEmail: string;
    viewCount: string
    constructor(id: string, body: string, title: string, createdDate: Date, fullname: string, email: string, viewCount: number) {
        this.id = id;
        this.body = body;
        this.title = title;
        this.createdDate = createdDate;
        this.userFullName = fullname
        this.userEmail = email;
        this.viewCount = viewCount.toString()
    }
}