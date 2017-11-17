import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

@Injectable()

export class ErrorDataService {

    private newErrorSubject = new BehaviorSubject<any>(null);
    public _newErrorSubject = this.newErrorSubject.asObservable();

    constructor() { }

    emitErrorData(data): void {

        this.newErrorSubject.next(data);
    }

}