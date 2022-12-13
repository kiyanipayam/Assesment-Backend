

export class CreateUpdatePostReponseDTO {
    id: string;
    title: string;
    body: string;
    createDate: Date;
    constructor(title: string, body: string, date: Date, id: string) {
        this.title = title;
        this.body = body;
        this.createDate = date;
        this.id = id
    }

}