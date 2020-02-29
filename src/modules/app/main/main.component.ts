import { Component, OnInit } from '@angular/core';
import { BanknService } from '../../../services/bankn.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.css' ]
})
export class MainComponent implements OnInit {
  name = 'bankn';

  constructor(
    private banknService: BanknService,
  ) { 

  }

  ngOnInit(){
    if(environment.bankn!=null){
      //this.banknService.setBankn(this.banknService.fromJson(environment.bankn));
    }
  }

  onOpen(){
    this.banknService.loadFromFile();
  }
}
