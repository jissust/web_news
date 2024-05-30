import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [NavbarComponent, ReactiveFormsModule, HttpClientModule, RouterModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css',
  providers:[UserService]
})
export class UserEditComponent {
  public page_title!: String;
  public userForm: FormGroup;
  public user!: any;
  public stateInit: boolean = true;
  
  constructor(
    private _router: Router,
    private toastr: ToastrService,
    private _userService: UserService,
    private _route: ActivatedRoute
  ){
    this.page_title = 'Editar usuario'
    this.user = new User('','','','','');
    this.getUser();
    this.userForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      surname: new FormControl(this.user.surname, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      password: new FormControl(this.user.password, Validators.required),
      url_image: new FormControl(this.user.url_image)
    })
  }

  onSubmit(){
    this.stateInit = false;
    var form = this.userForm;
    if(form.valid){
      this
      ._userService
      .update(this.user._id, form.value)
      .pipe()
      .subscribe({
        next: (element: any) => {
          this.toastr.success(
            'Usuario editada exitosamente.',
            'Usuario editada!'
          );
          this._router.navigate(['/admin/users'])
        },
        error: error => {
          this.toastr.error(
            'No se pudo editar el usuario.',
            'Error'
          );
        }
      })
    }else{
      console.log("formulario invalido")
    }
  }

  getUser(){
    this
    ._route
    .params
    .pipe()
    .subscribe({
      next: (element: any) => {
        var id = element.id;
        this._userService.getArticle(id)
        .pipe()
        .subscribe({
          next: (element: any) => {
            if(element.status == 'success'){
              this.user = element.result;
              
              this.userForm = new FormGroup({
                name: new FormControl(this.user.name, Validators.required),
                surname: new FormControl(this.user.surname, Validators.required),
                email: new FormControl(this.user.email, [Validators.required, Validators.email]),
                password: new FormControl(this.user.password, Validators.required),
                url_image: new FormControl(this.user.url_image)
              })
            }
            console.log(this.user)
          },
          error: error => {
            console.log(error)
          }
        })
        
      },
      error: error => {
        console.log(error)
      }
    })
  }
}
