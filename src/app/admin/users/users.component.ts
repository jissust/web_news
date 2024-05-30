import { Component } from '@angular/core';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent, RouterModule, HttpClientModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
  providers: [UserService],
})
export class UsersComponent {
  public page_title!: String;
  public users!: User[];

  constructor(private _userService: UserService, private _router: Router) {
    this.page_title = 'Usuarios';
    this.getUsers();
  }

  getUsers() {
    this._userService
      .getUsers()
      .pipe()
      .subscribe({
        next: (element: any) => {
          if (element.status == 'success') {
            this.users = element.result;
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  delete(id: any) {
    Swal.fire({
      title: '¿Estas seguro que desea eliminar el usuario?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService
          .delete(id)
          .pipe()
          .subscribe({
            next: (element: any) => {
              if (element.status == 'success') {
                this.getUsers();
                this._router.navigate(['/admin/users']);
              }
            },
            error: (error) => {
              console.log(error);
            },
          });
      }
    });
  }
}
