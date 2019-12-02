export class NotificationModel {
    public category: string;
    public goal: string;
    public date: Date;

    public daily: boolean;
    public pushNotification: boolean;

    constructor() {
    this.category = '1';
    this.goal = '';
    this.date = new Date();

    this.daily = false;
    this.pushNotification = true;
    }
}
