Реализация плагина particles.js (фон из движущихся частиц) на чистом js

Демо

https://codepen.io/sergo/pen/PoNLREK

(function(){

***Определяем переменные***

```html
    let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
    particles = [],
    properties = {
      bgColor             : 'rgba(0,0,0,1)',
      particleColor       : 'rgba(255, 40, 40, 1)',
      particleRadius      : 3,
      particleCount       : 60
};
```

}())
