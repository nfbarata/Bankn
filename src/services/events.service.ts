import { Injectable } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn:'root'
})
export class EventsService {
  @Output() banknChange:  EventEmitter<any> = new EventEmitter();
  @Output() accountsChange: EventEmitter<any> = new EventEmitter();
  @Output() accountSelectionChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

}