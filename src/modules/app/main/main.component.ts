import { Component } from '@angular/core';
import { BanknService } from '../../../services/bankn.service';
import { FileService } from '../../../services/file.service';
import { Bankn } from "../../../models/bankn";

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.css' ]
})
export class MainComponent  {
  name = 'bankn';

  constructor(
    private banknService: BanknService,
    private fileService: FileService
  ) { 

  }

  onOpen(){
    this.fileService.parseJsonFile((bankn:Bankn)=>{
      this.banknService.import(bankn);
    });
  }
}
