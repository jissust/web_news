import { Component, OnInit } from '@angular/core';
import { NewService } from '../../services/new.service';
import { ItemNewsComponent } from '../../components/item-news/item-news.component';
import { NoticeComponent } from './components/notice/notice.component';

@Component({
  selector: 'app-notices',
  standalone: true,
  imports: [ItemNewsComponent, NoticeComponent],
  templateUrl: './notices.component.html',
  styleUrl: './notices.component.css'
})
export class NoticesComponent implements OnInit{
  public news!: any;
  constructor(private _new: NewService){

  }
  ngOnInit(): void {
      this.news = this._new.getItems();
      console.log(this._new);
  }
}
