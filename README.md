Реализация плагина particles.js (фон из движущихся частиц) на чистом js

Демо

https://codepen.io/sergo/pen/PoNLREK

***Код JS с комментариями***

**1. определяем переменные**

```html
  
  let canvas = document.createElement('canvas'), 
      ctx = canvas.getContext('2d'),
      w = canvas.width = innerWidth,
      h = canvas.height = innerHeight,
      particles = [], // массив, в котором будут храниться частицы
      properties = { // коллекция, с настройками стилей
        bgColor             : 'rgba(0,0,0,1)', // цвет фона канваса
        particleColor       : 'rgba(255, 40, 40, 1)', // цвет частиц
        particleRadius      : 3, // радиус частицы
        particleCount       : 60 // кол-во частиц
      };

```


