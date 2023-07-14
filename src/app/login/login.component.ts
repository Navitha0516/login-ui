import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder, AbstractControl} from '@angular/forms';
import { UserserviceService } from '../service/userservice.service';
import { AuthserviceService } from '../service/authservice.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  reactive_Form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  submitted = false;
  FormDetails: any;
  result: any = [];
  errorMsg: string = '';
  returnUrl: any;
  successMsg: string = '';
  constructor(private formBuilders: FormBuilder,private route: ActivatedRoute, private router: Router, private user_services: UserserviceService, private auth_services: AuthserviceService) {
  }

  ngOnInit(): void {
    this.result.msg = ''
    //form validation
    this.reactive_Form = this.formBuilders.group(
      {
        email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8)
          ],
        ]
      }
    );
  }
   
  get f(): { [key: string]: AbstractControl } {
    return this.reactive_Form.controls;
  }
  createUser() {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.reactive_Form.invalid) {
      return;
    } else {
      this.FormDetails = {
        user_email : this.reactive_Form.value.email,
        user_password : this.reactive_Form.value.password
    }
     //calling post call function from services.ts by passing object
     this.auth_services.login(this.FormDetails)
     .subscribe((response) => {
      this.result.msg = '';
      this.result.status = null;
       this.result = response;
       if(this.result.status == false){
        this.errorMsg = this.result.msg;
       } else if(this.result.status ==  true){
        this.successMsg = this.result.msg;
        this.router.navigate(['/dashboard']);
        this.result.msg = '';
       }
       
     });
    }
  }
}
