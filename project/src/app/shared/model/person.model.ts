import {Type} from '@angular/core';

export class PersonModel {
    public id: number;
    // Имя человека
    public loginName: string;

    // Дата рождения.
    public birthDate: Date;

    public gender: string;

    public diabetType: string;

    public carbohydrates: number;

    public constructor() {
        this.id = 0;
        this.loginName = '';
        this.birthDate = new Date(1900, 1, 1);
        this.gender = '1';
        this.diabetType = '1';
        this.carbohydrates = 12;
    }
}
