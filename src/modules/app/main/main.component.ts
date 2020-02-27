import { Component } from '@angular/core';
import { BanknService } from '../../../services/bankn.service';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.css' ]
})
export class MainComponent  {
  name = 'bankn';

  constructor(
    private banknService: BanknService,
  ) { 

  }

  onOpen(){
    this.banknService.loadFromFile();
  }
}
