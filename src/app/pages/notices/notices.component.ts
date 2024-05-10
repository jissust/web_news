import { Component, OnInit } from '@angular/core';
import { NoticeService } from '../../services/notice.service';
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
  constructor(private _notice: NoticeService){

  }
  ngOnInit(): void {
      this.news = this._notice.getItems();
  }
}
