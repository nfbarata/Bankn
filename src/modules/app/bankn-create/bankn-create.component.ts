import { Component, OnInit } from '@angular/core';
import { BanknService} from '../../../services/bankn.service';

@Component({
  selector: 'app-bankn-create',
  templateUrl: './bankn-create.component.html',
  styleUrls: ['./bankn-create.component.css']
})
export class BanknCreateComponent implements OnInit {

  countries;

  constructor(
    private banknService:BanknService,
  ) { }

  ngOnInit() {
  }

}