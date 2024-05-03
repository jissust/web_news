import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  public items = [
    {
      url_image:
        'https://picsum.photos/3000/1000?random=1',
      title: 'Noticia 1',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '1',
    },
    {
      url_image:
      'https://picsum.photos/3000/1000?random=2',
      title: 'Noticia 2',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '2',
    },
    {
      url_image:
      'https://picsum.photos/3000/1000?random=3',
      title: 'Noticia 3',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '3',
    },
    {
      url_image:
      'https://picsum.photos/3000/1000?random=4',
      title: 'Noticia 4',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '4',
    },
    {
      url_image:
      'https://picsum.photos/3000/1000?random=5',
      title: 'Noticia 5',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '5',
    },
    {
      url_image:
      'https://picsum.photos/3000/1000?random=6',
      title: 'Noticia 6',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '6',
    },
    {
      url_image:
      'https://picsum.photos/3000/1000?random=7',
      title: 'prueba de noticia',
      category: 'novedades',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '7',
    },
  ];

  constructor() {}

  getItems() {
    return this.items;
  }
  getItem(id: string) {
    return this.items.find((item) => item._id === id);
  }
}
