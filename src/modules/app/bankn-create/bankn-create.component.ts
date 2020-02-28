import { Component, OnInit } from '@angular/core';
import { BanknService} from '../../../services/bankn.service';

const countries = require('country-data-list').countries;

@Component({
  selector: 'app-bankn-create',
  templateUrl: './bankn-create.component.html',
  styleUrls: ['./bankn-create.component.css']
})
export class BanknCreateComponent implements OnInit {

  constructor(
    private banknService:BanknService,
  ) { }

  ngOnInit() {
  }

}