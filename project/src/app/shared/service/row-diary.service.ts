import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {RowDiaryModel} from '../model/row-diary.model';
import {plainToClass} from 'class-transformer';

@Injectable()
export class RowDiaryService {
    public rowDiaryModelArray: RowDiaryModel[] = [];

    public constructor(private storage: Storage) {
    }
    setValue(key: string, value: any) {
        this.storage.set(key, value).then((response) => {
        }).catch((error) => {
            console.log('set error for ' + key + ' ', error);
        });
    }
    // get a key/value pair
    public async getDiaryRowValue(key: string): Promise<void> {
        await this.storage.get(key).then((val) => {
            this.rowDiaryModelArray = plainToClass<any, any>(RowDiaryModel, val) || [];
        }).catch((error) => {
            console.log('get error for ' + key + '', error);
        });
    }

    public async getPersonModelId(key: string): Promise<number> {
        return await this.storage.get(key).then((val) => {
            return val;
        }).catch((error) => {
            console.log('get error for ' + key + '', error);
        });
    }

    public async saveDiaryRow(rowDiaryModel: RowDiaryModel): Promise<void> {
        await this.getDiaryRowValue('diary');
        rowDiaryModel.personId = await this.getPersonModelId('personModelId');
        if (this.rowDiaryModelArray.length > 0) {
            rowDiaryModel.id = this.rowDiaryModelArray[this.rowDiaryModelArray.length - 1].id + 1;
        } else {
            rowDiaryModel.id = 1;
        }
        this.rowDiaryModelArray.push(rowDiaryModel);
        this.setValue('diary', this.rowDiaryModelArray);
    }

    public async getDiaryRowValueByPersonId(): Promise<RowDiaryModel[]> {
        await this.getDiaryRowValue('diary');
        const personId: number = await this.getPersonModelId('personModelId');
        return this.rowDiaryModelArray.filter((row: RowDiaryModel) => row.personId === personId);
    }

    public async deleteDiaryRow(id: number): Promise<RowDiaryModel[]> {
        await this.getDiaryRowValue('diary');
        this.rowDiaryModelArray = this.rowDiaryModelArray.filter((row: RowDiaryModel) => row.id !== id);
        await this.setValue('diary', this.rowDiaryModelArray);
        return this.getDiaryRowValueByPersonId();
    }
}
