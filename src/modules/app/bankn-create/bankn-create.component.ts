import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { BanknService} from '../../../services/bankn.service';

@Component({
  selector: 'bankn-create',
  templateUrl: './bankn-create.component.html',
  styleUrls: ['./bankn-create.component.css']
})
export class BanknCreateComponent implements OnInit {

  countries;
  form;
  formData;

  constructor(
    private banknService:BanknService,
  ) { 
    this.formData = {
        id:null,
        name:null,
        referenceValue:null,
        referenceCountry:null,
        referenceDay:null,
        referenceMonth:null,
        referenceYear:null,
        description:null
      }
      this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
  }

}