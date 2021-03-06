import {Injectable, OnInit} from '@angular/core';
import { Storage } from '@ionic/storage';
import {LoginModel} from '../model/login.model';
import {plainToClass} from 'class-transformer';
import {PersonModel} from '../model/person.model';
import {NetworkService} from './network.service';


@Injectable()
export class SignUpService {
    public loginData: LoginModel[] = [];

    public loginDataArray: any = [
    ];

    public personDataArray: any = [];

    public constructor(private storage: Storage) {
    }

    // set a key/value
    setValue(key: string, value: any) {
        this.storage.set(key, value).then((response) => {
        }).catch((error) => {
            console.log('set error for ' + key + ' ', error);
        });
    }

    // get a key/value pair
    public async getValue(key: string) {
        await this.storage.get(key).then((val) => {
            if (key === 'person') {
                this.personDataArray = plainToClass<any, any>(PersonModel, val);
            } else {
                this.loginData = plainToClass<any, any>(LoginModel, val) || [];
            }
        }).catch((error) => {
            console.log('get error for ' + key + '', error);
        });
    }

    public async login(email: string, password: string): Promise<number> {
        await this.getValue('login');
        const indexLoginData: number = this.loginData.findIndex((loginModel: LoginModel) => loginModel.login === email && loginModel.password === password);

        if (indexLoginData !== -1) {
            this.storage.set('personModelId', this.loginData[indexLoginData].personModelId);
            return this.loginData[indexLoginData].personModelId;
        } else {
            return -1;
        }
    }

    public checkByEmail(email: string, id: number): boolean {
        if (id === 0) {
            return this.loginData.some((loginModel: LoginModel) => loginModel.login === email);
        } else {
            return this.loginData.some((loginModel: LoginModel) => loginModel.login === email && loginModel.id !== id);
        }
    }

    public getLastPersonModelId(): number {
        if (this.loginData.length !== 0) {
            return this.loginData[this.loginData.length - 1].personModelId;
        } else {
            return 0;
        }

    }

    public saveLoginData(loginData: LoginModel): void {
        loginData.id = this.loginDataArray.length + 1;
        this.loginDataArray.push(loginData);
        this.setValue('login', this.loginDataArray);
    }

    public savePersonData(personData: PersonModel): void {
        this.personDataArray.push(personData);
        this.setValue('person', this.personDataArray);
    }

    public editLoginData(loginData: LoginModel): void {
        debugger
        const index = this.loginDataArray.findIndex((data: LoginModel) => data.id === loginData.id);
        this.loginDataArray[index] = loginData;

        this.setValue('login', this.loginDataArray);
    }

    public editPersonData(personData: PersonModel): void {
        const index = this.personDataArray.findIndex((data: PersonModel) => data.id === personData.id);
        this.personDataArray[index] = personData;

        this.setValue('person', this.personDataArray);
    }

    public getPersonModelId(): Promise<number> {
        return this.storage.get('personModelId').then((val: number) => {
           return val || 0;
        });
    }

    public async getPersonModel(id: number): Promise<PersonModel> {
        await this.getValue('person');
        return this.personDataArray.find((person: PersonModel) => person.id === id);
    }

    public async getLoginModel(id: number): Promise<LoginModel> {
        await this.getValue('login');
        return this.loginData.find((person: LoginModel) => person.personModelId === id);
    }

    public removePersonId(): void {
        this.storage.remove('personModelId');
    }
}
