import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public userForm: FormGroup;
  public stateInit: boolean = true;
  
  constructor(
    private router: Router
  ){
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    })
  }
  onSubmit() {
    this.stateInit = false;
    var form = this.userForm;
    
    if(form.valid) {
      console.log(form.value)
      this.router.navigate(['/admin/news']);
    }else{
      console.log("datos invalidos");
    }
  }
}
