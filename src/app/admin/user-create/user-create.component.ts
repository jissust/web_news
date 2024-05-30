import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [NavbarComponent, RouterModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.css',
  providers: [UserService]
})
export class UserCreateComponent {
  public page_title!: String;
  public userForm: FormGroup;
  public stateInit: boolean = true;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private toastr: ToastrService
  ){
    this.page_title = 'Crear usuario';
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      url_image: new FormControl()
    })
  }

  onSubmit(){
    this.stateInit = false;
    var form = this.userForm;
    console.log(form.valid)
    
    if(form.valid){
      this.
      _userService
      .create(form.value)
      .pipe()
      .subscribe({
        next: (element:any) => {
          this.toastr.success(
            'El usuario fue creado exitosamente.',
            'Usuario creado!'
          );
          this._router.navigate(['/admin/users']);
        },
        error: (error) => {
          this.toastr.error(
            'No se pudo crear el usuario.',
            'Error'
          );
        }
      })
    }else{
      console.log("formulario invalido");
    }
  }
}
