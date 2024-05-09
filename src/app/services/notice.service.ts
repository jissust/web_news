import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  public items = [
    {
      url_image:
        'https://media.tycsports.com/files/2022/10/01/486857/san-lorenzo_862x485.webp',
      title: 'Noticia 1',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '1',
    },
    {
      url_image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRea_Kp6tHgfx0Z0BXYqjKQS5aeQWm6Ss2KgnDimyCPsg&s',
      title: 'Noticia 2',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '2',
    },
    {
      url_image:
      'https://golazoo.com/uploads/2023/07/san-lorenzo-festejo-ante-union-1200x765-1.jpg.webp',
      title: 'Noticia 3',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '3',
    },
    {
      url_image:
      'https://oneftbl-cms.imgix.net/https%3A%2F%2Fcdn.futbolargentino.com%2Fsdi%2F2024%2F01%2F10%2Fmercado-de-pases-de-san-lorenzo-2024-refuerzos-bajas-y-rumores-1217418.jpg?auto=format%2Ccompress&crop=faces&dpr=2&fit=crop&h=630&q=25&w=840&s=6fc835ca1ff305120208a7e1c5fd122c',
      title: 'Noticia 4',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '4',
    },
    {
      url_image:
      'https://media.tycsports.com/files/2024/01/23/667424/sebastian-blanco_862x485.webp',
      title: 'Noticia 5',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '5',
    },
    {
      url_image:
      'https://media.tycsports.com/files/2024/01/12/663533/romana-foto-sanlorenzo_862x485.webp?v=1',
      title: 'Noticia 6',
      category: 'Futbol',
      description:
        'Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto.',
      _id: '6',
    },
    {
      url_image:
      'https://i0.wp.com/elargentinodiario.com.ar/wp-content/uploads/2022/05/19-05-2022_201a8a9f456875988444e103fb6fe213.jpg?resize=2048%2C1458&ssl=1',
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
