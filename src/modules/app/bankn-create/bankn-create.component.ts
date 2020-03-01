import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
import { Bankn} from '../../../models/bankn';
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
    private router: Router,
    private banknService:BanknService,
  ) { 
    this.formData = {
      name:'bankn',
      referenceCountry:null,
    }
    this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.countries = this.banknService.getCountries();
    this.formData.referenceCountry = this.banknService.getDefaultCountryCode();
    this.form.setValue(this.formData);;
  }

  onSubmit(data) {
    if(data.id==null){
      this.banknService.setBankn(new Bankn(
          data.name,
          [],
          data.referenceCountry
      ));
      this.router.navigate(['/accounts/account']);
    }else{
      this.banknService.update(
        data.name,
        data.referenceCountry);
      this.router.navigate(['']);
    }
    this.form.reset();
  }
}