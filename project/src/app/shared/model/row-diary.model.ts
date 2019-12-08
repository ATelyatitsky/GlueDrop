import {Type} from 'class-transformer';


export class RowDiaryModel {
    public id: number;
    public personId: number;

    @Type(() => Date)
    public date: Date;

    public sugarValue: string;
    public foodValue: string;
    public shortInsulinValue: string;
    public extendedInsulinValue: string;

    public comment: string;

    constructor() {
    this.id = 0;
    this.personId = 0;
    this.sugarValue = '';
    this.foodValue = '';
    this.shortInsulinValue = '';
    this.extendedInsulinValue = '';
    this.date = new Date();

    this.comment = '';
    }
}
