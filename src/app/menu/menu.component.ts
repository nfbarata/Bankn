import { Component, OnInit } from '@angular/core';
import { accounts } from '../accounts';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  accounts = accounts;
  constructor() { }

  ngOnInit() {
  }

}