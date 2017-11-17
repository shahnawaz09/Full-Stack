import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()

export class RegistrationDataService {

    private showRegistrationSuccessMessage = new BehaviorSubject<any>(null);
    public _showRegistrationSuccessMessage = this.showRegistrationSuccessMessage.asObservable();

    constructor() { }

    emitSuccessfulRegistration(data): void {

        this.showRegistrationSuccessMessage.next(data);
    }

}