import { Component, OnInit } from '@angular/core';
import { BanknService} from '../../../services/bankn.service'
import { EventsService} from '../../../services/events.service'

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hasBankn:Boolean = false;

  constructor(
    private banknService:BanknService,
    private eventsService:EventsService
  ) { }

  ngOnInit() {
    this.eventsService.banknChange.subscribe(()=>{
      this.hasBankn=true;
    });
  }

}