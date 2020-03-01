import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private route: ActivatedRoute,
  ) { 
    this.formData = {
      id:"",
      name:null,
      referenceCountry:null,
    }
    this.form = this.formBuilder.group(this.formData);
  }

  ngOnInit() {
    this.countries = this.banknService.getCountries();
    this.route.paramMap.subscribe(params => {
      var banknId:String = params.get('banknId');
      if(banknId==null || banknId.trim().length==0){
        this.formData.name="";
        this.formData.name="bankn";
        this.formData.referenceCountry = this.banknService.getDefaultCountryCode();
        this.form.setValue(this.formData);
      }else{
        var bankn = this.banknService.getBankn();
        this.formData.id = bankn.id;
        this.formData.name=bankn.name;
        this.formData.referenceCountry = bankn.referenceCountry;
        this.form.setValue(this.formData);
      } 
    });
  }

  onSubmit(data) {
    if(data.id==null){
      this.banknService.setBankn(this.banknService.createBankn(
          data.name,
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