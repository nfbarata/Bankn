import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { Router } from '@angular/router';
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
      name:'',
      referenceCountry:null,
    }
    this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.formData.referenceCountry = this.banknService.getDefaultCountryCode();
    this.countries = this.banknService.getCountries();
  }

  onSubmit(data) {
    var country;
    for (let i = 0; i < this.countries.length; i++) {
      if (this.countries[i].alpha2 == data.referenceCountry) 
        country = this.countries[i];
    }
    
    var currency = country.currencies[0];
    
    if(data.id==null){
      this.banknService.loadFromJson(
        {
          name:data.name,
          referenceCountry:data.referenceCountry
        }
      );
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