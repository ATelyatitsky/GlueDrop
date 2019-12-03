export class NotificationModel {
    public id: number;
    public personId: number;
    public category: string;
    public goal: string;
    public date: Date;

    public daily: boolean;

    public isDone: boolean;

    constructor() {
        this.id = 0;
        this.personId = 0;
        this.category = '1';
        this.goal = '';
        this.date = new Date();
        this.daily = false;
        this.isDone = false;
    }
}
