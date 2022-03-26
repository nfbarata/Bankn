import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormControlName, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { BanknService } from "../../services/bankn.service";

@Component({
  selector: "bankn-create",
  templateUrl: "./bankn-create.component.html",
  styleUrls: ["./bankn-create.component.css"]
})
export class BanknCreateComponent implements OnInit {
  
  countries: any;//used on UI
  form = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(),
    referenceCountry: new FormControl()
  });

  constructor(
    private router: Router,
    private banknService: BanknService,
    private route: ActivatedRoute
  ) {
    this.countries = this.banknService.getCountries();
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      var banknId = params.get("banknId");
      if (banknId == null || banknId.trim().length == 0) {
        this.form.controls["name"].setValue("bankn");
        this.form.controls["referenceCountry"].setValue(this.banknService.getDefaultCountryCode());
      } else {
        var bankn = this.banknService.getBankn();
        if(bankn!=null){
          this.form.setValue({
            id: bankn.id,
            name: bankn.name,
            referenceCountry: bankn.referenceCountry
          });
        }
      }
    });
  }

  onSubmit() {
    if (this.form.controls["id"].value == null) {
      this.banknService.setBankn(
        this.banknService.createBankn(
          this.form.controls["name"].value, 
          this.form.controls["referenceCountry"].value
        )
      );
      this.router.navigate(["/accounts/account"]);
    } else {
      this.banknService.update(
        this.form.controls["name"].value, 
        this.form.controls["referenceCountry"].value
      );
      this.router.navigate([""]);
    }
    this.form.reset();
  }
}