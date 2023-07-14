import { Component ,OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl} from '@angular/forms';
import { UserserviceService } from '../service/userservice.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {
  reactiveForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;
  FormDetails: any;
  result: any;
  successMsg: any;

  constructor(private formBuilder: FormBuilder, private user_services: UserserviceService) {
  }

  ngOnInit(): void {
    //validation of form
    this.reactiveForm = this.formBuilder.group(
      {
        name: ['', Validators.required, Validators.maxLength(100)],
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ],
        ],
        phone: ['', Validators.required, Validators.maxLength(10)],
        acceptTerms: [false, Validators.requiredTrue],
      }
    );
  }
 
  get f(): { [key: string]: AbstractControl } {
    //collection (obj) of form-controls
    return this.reactiveForm.controls;
  }
  numberOnly(event:any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onSubmit(): void {
    this.submitted = true;
    if (this.reactiveForm.invalid) {
      return;
    } else {
      this.FormDetails = {
        user_firstname : this.reactiveForm.value.name,
        user_email : this.reactiveForm.value.email,
        user_phone : this.reactiveForm.value.phone,
        user_password : this.reactiveForm.value.password,
        user_lastname :"ap",  
        user_city :"gun",
        user_zipcode : "500022"
    }
    //calling post call function from services.ts by passing object
      this.user_services.create(this.FormDetails)
      .subscribe((response) => {
        this.result = response;
        this.successMsg = this.result.msg;
      });
    }

    
  }
}
