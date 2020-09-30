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

**2. помещаем канвас в нужное место**

```html
document.querySelector('body').appendChild(canvas);
```

**3. определяем класс, отвечающий за настройки частиц (их положение, скорость, цвет и т.д)**

```html
  class Particle{
    constructor(){
      
    }
   
  }
```

**4. constructor() - определяем положение частиц по горизонтали и вертикали**

```html
  class Particle{
    constructor(){
      this.x = Math.random()*w;
      this.y = Math.random()*h;
    }
   
  }
```

**5. reDraw() - метод, который будет отрисовывать частицу на канвас**

```html
  class Particle{
    constructor(){
      this.x = Math.random()*w;
      this.y = Math.random()*h;
    }
   reDraw(){
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
  }
```
