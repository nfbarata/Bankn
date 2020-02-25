import { Component } from '@angular/core';
import { AccountService } from '../../../services/account.service';
import { FileService } from '../../../services/file.service';
import  { Account } from "../../../models/account";

@Component({
  selector: 'bankn',
  templateUrl: './bankn.component.html',
  styleUrls: [ './bankn.component.css' ]
})
export class BanknComponent  {
  name = 'Angular';

  constructor(
    private accountService: AccountService,
    private fileService: FileService
  ) { }

  onOpen(){
    console.log(this.fileService.parseFile((accounts:Account[])=>{
      AccountService.import(accounts);
    }));
  }
}
