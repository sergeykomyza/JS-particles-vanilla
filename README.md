Реализация плагина particles.js (фон из движущихся частиц) на чистом js

Демо

https://codepen.io/sergo/pen/PoNLREK

(function(){

***Определяем переменные***

```html
    /* полотно канвас */
    let canvas = document.createElement('canvas'), 
    ctx = canvas.getContext('2d'),
    /* ширина канвас */
    w = canvas.width = innerWidth, 
    /* высота канвас */
    h = canvas.height = innerHeight, 
    /* массив, в котором будут храниться частицы */
    particles = [], 
    // коллекция, с настройками стилей
    properties = {
      bgColor             : 'rgba(0,0,0,1)',
      particleColor       : 'rgba(255, 40, 40, 1)',
      particleRadius      : 3,
      particleCount       : 60
};
```

}())
