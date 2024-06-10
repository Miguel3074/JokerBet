import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule, RouterModule]
})
export class LoginComponent {
  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: AuthService,
    private router: Router) {
  }
  result: any;

  loginform = this.builder.group({
    id: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserbyCode(this.loginform.value.id).subscribe(user => {
        this.result = user;
        if (this.result.password === this.loginform.value.password) {
          this.service.setUserId(this.result.id);
          this.service.setLoggedIn(true);
          this.service.setBalance(this.result.balance);
          this.service.setUsername(this.result.name);
          this.service.setCurrentUser(this.result);
          this.router.navigate(['']);
        } else {
          this.toastr.error('Invalid credentials');
        }
      });
    } else {
      this.toastr.warning('Please enter valid data.')
    }
  }
}