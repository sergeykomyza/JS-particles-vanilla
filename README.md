Реализация плагина particles.js (фон из движущихся частиц) на чистом js

https://codepen.io/sergo/pen/PoNLREK

(function(){

  <!-- выносим в переменные необходимые данные -->

  <!-- полотно канвас -->
  let canvas = document.createElement('canvas'), 
  ctx = canvas.getContext('2d'),
      
  <!-- ширина канваса -->
  w = canvas.width = innerWidth,
          
  <!-- высота канваса -->
  h = canvas.height = innerHeight,
          
  <!-- массив в котором будут храниться частицы -->
  particles = [],
          
  <!-- коллекция, с настройками стилей -->
  properties = { 
      bgColor             : 'rgba(0, 0, 0, 1)', <!-- цвет фона канваса -->
      particleColor       : 'rgba(255, 40, 40, 1)', <!-- цвет частиц -->
      particleRadius      : 3, <!-- радиус окружности частицы -->
      particleCount       : 60, <!-- кол-во частиц -->
  }
      
  <!-- помещаем наш канвас в нужное место -->
  document.querySelector('.animate-bg').appendChild(canvas);

}())
