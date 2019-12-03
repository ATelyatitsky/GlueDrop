import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {RowDiaryModel} from '../model/row-diary.model';
import {NotificationModel} from '../../calendar.glueDrop/modalPage/notification.model';
import {plainToClass} from 'class-transformer';

@Injectable()
export class NotificationService {
    public notificationModelArray: NotificationModel[] = [];

    public constructor(private storage: Storage) {
    }

    setValue(key: string, value: any) {
        this.storage.set(key, value).then((response) => {
        }).catch((error) => {
            console.log('set error for ' + key + ' ', error);
        });
    }

    // get a key/value pair
    public async getNotificationValue(key: string): Promise<void> {
        await this.storage.get(key).then((val) => {
            this.notificationModelArray = plainToClass<any, any>(NotificationModel, val) || [];
        }).catch((error) => {
            console.log('get error for ' + key + '', error);
        });
    }

    public async getNotificationByPersonId(): Promise<NotificationModel[]> {
        await this.getNotificationValue('notification');
        const personId: number = await this.getPersonModelId('personModelId');
        return this.notificationModelArray.filter((row: NotificationModel) => row.personId === personId);
    }

    public async getPersonModelId(key: string): Promise<number> {
        return await this.storage.get(key).then((val) => {
            return val;
        }).catch((error) => {
            console.log('get error for ' + key + '', error);
        });
    }

    public async saveNotification(notification: NotificationModel): Promise<void> {
        await this.getNotificationValue('notification');
        notification.personId = await this.getPersonModelId('personModelId');
        if (this.notificationModelArray.length > 0) {
            notification.id = this.notificationModelArray[this.notificationModelArray.length - 1].id + 1;
        } else {
            notification.id = 1;
        }
        this.notificationModelArray.push(notification);
        this.setValue('notification', this.notificationModelArray);
    }

    public async doneNotification(notification: NotificationModel): Promise<void> {
        await this.getNotificationValue('notification');
        this.notificationModelArray.find((note: NotificationModel) => note.id === notification.id).isDone = true;
        this.setValue('notification', this.notificationModelArray);
    }

    public async deleteNotification(notification: NotificationModel): Promise<void> {
        await this.getNotificationValue('notification');
        this.notificationModelArray = this.notificationModelArray.filter((note: NotificationModel) => note.id !== notification.id);
        this.setValue('notification', this.notificationModelArray);
    }
}
