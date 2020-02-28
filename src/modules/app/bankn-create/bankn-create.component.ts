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
    private formBuilder: FormBuilder,
    private banknService:BanknService,
  ) { 
    this.formData = {
        referenceCountry:null,
      }
      this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.formData.referenceCountry = this.banknService.getDefaultCountryCode();
    this.countries = this.banknService.getCountries();
  }

}