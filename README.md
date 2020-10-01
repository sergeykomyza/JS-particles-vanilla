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
**6. функция отвечающая за фон канваса**

```html
function reDrawBackground(){ 
    ctx.fillStyle = properties.bgColor;
    ctx.fillRect(0, 0, w, h);
  }
```
**7. проходимся по всем частицам в массиве**

```html
  function reDrawParticles(){
    for(let i in particles){
      particles[i].reDraw(); // отрисовываем каждую частицу по параметрам, определенным в reDraw();
    }
  }
```
**8. функция обновления канвас**

```html
  function loop(){
    reDrawBackground(); // обновляем фон канваса
    reDrawParticles(); // обновляем отрисовку частиц
    requestAnimationFrame(loop); // запускаем стандартную функцию анимации, обновляющую полотно (Обычно запросы происходят 60 раз в секунду - https://developer.mozilla.org/)
  }
```
**9. инициализация всего кода**

```html
  function init(){ 
    
    for(let i = 0; i < properties.particleCount; i++){ // проходимся по всем частицам
      particles.push(new Particle); // и добавляем каждую в массив через созданный класс Particle
    }
    loop();
  }
  
  init();
```

**после этого на нашем полотне появятся рандомно расставленные 60 частиц**

**дальше нам нужно заставить эти частицы двигаться**

**10. заводим новое свойство в properties - particleMaxVelocity**

```html
properties = { 
        bgColor             : 'rgba(0,0,0,1)', // цвет фона канваса
        particleColor       : 'rgba(255, 40, 40, 1)', // цвет частиц
        particleRadius      : 3, // радиус частицы
        particleCount       : 60, // кол-во частиц
        particleMaxVelocity : 0.5 // скорость частицы по X и Y
      };
```
**11. в constructor заводим новые переменные - velocityX и velocityY, которые будут рандомно расчитывать скорость от -0.5 до +0.5. От этого будет зависеть направление движения частицы.**

```html
  class Particle{
    constructor(){
      this.x = Math.random()*w;
      this.y = Math.random()*h;
      this.velocityX = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
      this.velocityY = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
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
**12. добавим новый метод position, который будет обновлять позицию частицы. В этом методе будем добавлять скорость к текущим координатам**

```html
  class Particle{
    constructor(){
      this.x = Math.random()*w;
      this.y = Math.random()*h;
      this.velocityX = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
      this.velocityY = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
    }
    position(){ 
      this.x += this.velocityX; 
      this.y += this.velocityY;
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
**13. position так же будем вызывать в функции reDrawParticles()**

```html
  function reDrawParticles(){
    for(let i in particles){
      particles[i].reDraw(); // отрисовываем каждую частицу по параметрам, определенным в reDraw();
      particles[i].position(); // обновляем позицию каждой частицы
    }
  }
```

**после этого наши частицы начнут двигаться по экрану**

**14. только теперь частицы улетают за пределы экрана. чтобы предотвратить это, пропишем условие в методе position. в нем мы будем определять, что, если положение частицы превысит размер экрана, то ее скорость умножится на -1, в результате чего изменится ее направление**
>this.x +  this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;

```html
  class Particle{
    constructor(){
      this.x = Math.random()*w;
      this.y = Math.random()*h;
      this.velocityX = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
      this.velocityY = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
    }
    position(){ 
      this.x +  this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
      this.y +  this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
      this.x += this.velocityX; 
      this.y += this.velocityY;
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








