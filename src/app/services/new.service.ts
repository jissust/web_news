import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NewService {
  public items = [
    {
      url_image:
        'https://contenidos1.sanlorenzo.com.ar/img/noticias/2024/mx/04-26_1714162427.jpg',
      title: 'Noticia 1',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      id: '1',
    },
    {
      url_image:
        'https://contenidos1.sanlorenzo.com.ar/img/noticias/2024/mx/04-26_1714162427.jpg',
      title: 'Noticia 2',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      id: '1',
    },
    {
      url_image:
        'https://contenidos1.sanlorenzo.com.ar/img/noticias/2024/mx/04-26_1714162427.jpg',
      title: 'Noticia 3',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      id: '1',
    },
    {
      url_image:
        'https://contenidos1.sanlorenzo.com.ar/img/noticias/2024/mx/04-26_1714162427.jpg',
      title: 'Noticia 4',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      id: '1',
    },
    {
        url_image:
          'https://contenidos1.sanlorenzo.com.ar/img/noticias/2024/mx/04-26_1714162427.jpg',
        title: 'Noticia 5',
        category: 'Futbol',
        description:
          'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
        id: '1',
      },
      {
        url_image:
          'https://contenidos1.sanlorenzo.com.ar/img/noticias/2024/mx/04-26_1714162427.jpg',
        title: 'Noticia 6',
        category: 'Futbol',
        description:
          'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
        id: '1',
      },
  ];

  constructor() {}

  getItems() {
    return this.items;
  }
}
