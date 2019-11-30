export class LoginModel {
    public id: number;

    public login: string;

    public password: string;

    public personModelId: number;

    public constructor() {
        this.id = 0;
        this.login = '';
        this.password = '';
        this.personModelId = 0;
    }
}
