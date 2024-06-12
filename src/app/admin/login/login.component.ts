import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [UserService],
})
export class LoginComponent {
  public userForm: FormGroup;
  public stateInit: boolean = true;

  constructor(
    private router: Router,
    private _userService: UserService,
    private toastr: ToastrService
  ) {
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }
  onSubmit() {
    this.stateInit = false;
    var form = this.userForm;

    if (form.valid) {
      this._userService
        .login(form.value)
        .pipe()
        .subscribe({
          next: (element: any) => {
            if (element.status == 'success') {
              localStorage.setItem('back_token', element.token)
              this.router.navigate(['/admin/news']);
            } else {
              this.toastr.error('Datos incorrectos.', 'Error');
            }
          },
          error: (error) => {
            console.log(error);
            this.toastr.error('Datos incorrectos.', 'Error');
          },
        });
    } else {
      console.log('datos invalidos');
    }
  }
}
