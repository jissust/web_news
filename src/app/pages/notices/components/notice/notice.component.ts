import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../../../services/notice.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NavbarComponent } from '../../../../components/navbar/navbar.component';
import { FooterComponent } from '../../../../components/footer/footer.component';

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [NavbarComponent, FooterComponent],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.css'
})
export class NoticeComponent implements OnInit {
  public notice!: any;

  constructor(
    private _notice: NoticeService,
    private _route: ActivatedRoute,
    private _location: Location){

  }

  ngOnInit(): void {
      this._route.params
      .pipe()
      .subscribe({
        next: params => {
          let id = params["id"];
          this.notice = this._notice.getItem(id); 
        },
        error: error => {
          console.log(error)
        }
      })
  }

  goBack(){
    this._location.back();
  }
}
