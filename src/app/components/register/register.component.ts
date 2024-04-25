import { Component, NgModule } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  imports: [ReactiveFormsModule, FormsModule, MaterialModule, RouterModule]
})

export class RegisterComponent {

  constructor(private builder: FormBuilder, private router: Router, private service: AuthService, private toastr: ToastrService) {

  }

  registerform = this.builder.group({
    id: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('[A-Za-z\d#$@$!%*?&].{8,}')])),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender: this.builder.control('male'),
    balance: this.builder.control(50),
    termsAgreed: [false, Validators.requiredTrue]
  });

  proceedRegistration() {
    const termsAgreedControl = this.registerform.get('termsAgreed');
    if (termsAgreedControl?.value) { 
      if (this.registerform.valid) {
        this.service.RegisterUser(this.registerform.value).subscribe(result => {
          this.toastr.success('Please contact admin for enable access.','Registered successfully')
          this.router.navigate(['login'])
        });
      } else {
        this.toastr.warning('Please enter valid data.')
      }
    } else {
      this.toastr.warning('Please agree to the Terms of Use.')
    }
  }
  

}
