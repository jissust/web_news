import { Component } from '@angular/core';

@Component({
  selector: 'app-outstanding-news',
  standalone: true,
  imports: [],
  templateUrl: './outstanding-news.component.html',
  styleUrl: './outstanding-news.component.css'
})
export class OutstandingNewsComponent {
  public item = {
    url_image:'https://contenidos1.sanlorenzo.com.ar/img/noticias/2024/mx/04-26_1714162427.jpg',
    title:'Noticia 1',
    category:'Futbol',
    description:'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
    id:'1',

  }
}
