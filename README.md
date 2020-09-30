Реализация плагина particles.js (фон из движущихся частиц) на чистом js

Демо

https://codepen.io/sergo/pen/PoNLREK

***Код JS с комментариями***

**1. определяем переменные**

```html
  // рисуем полотно канвас
  let canvas = document.createElement('canvas'), 
      ctx = canvas.getContext('2d'),

      // ширина полотна равна ширине экрана
      w = canvas.width = innerWidth,

      // высота полотна равна высоте экрана
      h = canvas.height = innerHeight,

      // массив, в котором будут храниться частицы
      particles = [], 

      // коллекция, с настройками стилей
      properties = { 
        bgColor             : 'rgba(0,0,0,1)', // цвет фона канваса
        particleColor       : 'rgba(255, 40, 40, 1)', // цвет частиц
        particleRadius      : 3, // радиус частицы
        particleCount       : 60 // кол-во частиц
      };

```


