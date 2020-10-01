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

**теперь частицы не будут улетать за пределы экрана**

**15. Добавляем соединительные линии между частицами. Создаем функцию drawLines в которой создаем 6 переменных**
```html
function drawLines(){
    let x1, y1, x2, y2, length, opacity;
}
```
**16. В этой функции мы будем проверять расстояние от одной частицы до другой. Используя циклы, мы будем брать каждую частицу по отдельности и вычислять расстояние от нее до других частиц**
```html
function drawLines(){
    let x1, y1, x2, y2, length, opacity;
    for( let i in particles ){
         for( let j in particles ){

         }
    }
}
```

**17. Далее в переменные, объявленные вначале функции, записываем координаты наших частиц по X и Y**
```html
function drawLines(){
    let x1, y1, x2, y2, length, opacity;
    for( let i in particles ){
         for( let j in particles ){
            x1 = particles[i].x; // координата одной частицы по горизонтали
            y1 = particles[i].y; // координата одной частицы по вертикали
            x2 = particles[j].x; // координата второй частицы по горизонтали
            y2 = particles[j].y; // координата второй частицы по вертикали
         }
    }
}
```

**18. В переменную length будем записывать расстояние, которое рассчитывается по формуле диагонали (корень квадратный из суммы квадратов)**
```html
function drawLines(){
    let x1, y1, x2, y2, length, opacity;
    for( let i in particles ){
         for( let j in particles ){
            x1 = particles[i].x; // координата одной частицы по горизонтали
            y1 = particles[i].y; // координата одной частицы по вертикали
            x2 = particles[j].x; // координата второй частицы по горизонтали
            y2 = particles[j].y; // координата второй частицы по вертикали
            length = Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
         }
    }
}
```

**19. заводим новое свойство в properties - lineLength**
```html
properties = { 
        bgColor             : 'rgba(0,0,0,1)', // цвет фона канваса
        particleColor       : 'rgba(255, 40, 40, 1)', // цвет частиц
        particleRadius      : 3, // радиус частицы
        particleCount       : 60, // кол-во частиц
        particleMaxVelocity : 0.5, // скорость частицы по X и Y
        lineLength          : 200 // длина соединения частиц(если частицы на расстоянии меньше чем 200 друг от друга, то связываются линией)
      };
```

**20. В переменную opacity мы записываем значение, которое будет напрямую зависеть от расстояния между частицами. длину между частицами делим на указанную в      properties.lineLength длину и вычитаем из еденицы. т.к length не может превысить указанное расстояние в properties.lineLength,то самое большое число которое может получится -это 1, т.е чем больше расстояние между частицами тем меньше значение opacity**
```html
function drawLines(){
    let x1, y1, x2, y2, length, opacity;
    for( let i in particles ){
         for( let j in particles ){
            x1 = particles[i].x; // координата одной частицы по горизонтали
            y1 = particles[i].y; // координата одной частицы по вертикали
            x2 = particles[j].x; // координата второй частицы по горизонтали
            y2 = particles[j].y; // координата второй частицы по вертикали
            length = Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
            opacity = 1 - length/properties.lineLength;
         }
    }
}
```

**21. Дальше, по условию, что, если длина между частицами меньше, чем указанная нами в properties, то рисуем линию**
```html
function drawLines(){
    let x1, y1, x2, y2, length, opacity;
    for( let i in particles ){
         for( let j in particles ){
            x1 = particles[i].x; // координата одной частицы по горизонтали
            y1 = particles[i].y; // координата одной частицы по вертикали
            x2 = particles[j].x; // координата второй частицы по горизонтали
            y2 = particles[j].y; // координата второй частицы по вертикали
            length = Math.sqrt( Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) );
            opacity = 1 - length/properties.lineLength;
            if( length < properties.lineLength ){
               ctx.lineWidth = '0.5'; // ширина линии
               ctx.strokeStyle = 'rgba(255, 40, 40, '+ opacity +')'; // цвет и прозрачность линии
               ctx.beginPath(); // начинаем путь
               ctx.moveTo(x1, y1); // из точки 1
               ctx.lineTo(x2, y2); // в точку 2
               ctx.closePath(); // закончили путь
               ctx.stroke(); // отрисовка
             }
         }
    }
}
```

**22. в функцию loop() добавим вызов drawLines()**
```html
  function loop(){
    reDrawBackground(); // обновляем фон канваса
    reDrawParticles(); // обновляем отрисовку частиц
    drawLines(); // обновляем отрисовку линий
    requestAnimationFrame(loop); // запускаем стандартную функцию анимации, обновляющую полотно (Обычно запросы происходят 60 раз в секунду - https://developer.mozilla.org/)
  }
```

**23. Осталось только добавить время жизни для частиц, для того чтобы каждая частица находилась на экране не больше указанного значения. Для этого в properties создадим новое свойство**
```html
properties = { // коллекция, с настройками стилей
  bgColor             : 'rgba(0, 0, 0, 1)',
  particleColor       : 'rgba(255, 40, 40, 1)',
  particleRadius      : 3,
  particleCount       : 60,
  particleMaxVelocity : 0.5, // скорость частицы
  lineLength          : 200, // длина соединения частиц(если частицы на расстоянии меньше чем 200 друг от друга, то связываются линией)
  particleLife        : 6 // время жизни частицы (сек)
}
```

**24. Далее, создадим новый метод reCalculateLife() - который будет вычитать секунды жизни частицы. Eсли время жизни частицы будет меньше 1, то заново пересчитываем все параметры. вне тела условия будем вычитать секунды**
```html
  class Particle{
    constructor(){
      this.x = Math.random()*w; // положение частицы по горизонтали
      this.y = Math.random()*h; // положение частицы по вертикали
      // скорость частицы от -0.5 до +0.5 (от этого будет зависеть направление частицы) по X и по Y
      this.velocityX = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
      this.velocityY = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
      this.life = Math.random()*properties.particleLife * 60;
    }
    position(){ // метод, обновляющий позицию частицы
      // если частица выходит за пределы экрана, по горизонтали или вертикали то она возвращается назад
      this.x > w && this.velocityX > 0 || this.x < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
      this.y > h && this.velocityY > 0 || this.y < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
      this.x += this.velocityX; 
      this.y += this.velocityY;
    }
    reDraw(){ // метод, который будет отрисовывать частицу на канвас
      ctx.beginPath();
      ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI*2);
      ctx.closePath();
      ctx.fillStyle = properties.particleColor;
      ctx.fill();
    }
    reCalculateLife(){ // метод, который вычитает секунды жизни частицы
      if( this.life < 1 ){
        this.x = Math.random()*w;
        this.y = Math.random()*h;
        this.velocityX = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
        this.velocityY = Math.random()*(properties.particleMaxVelocity*2) - properties.particleMaxVelocity;
        this.life = Math.random()*properties.particleLife * 60;
      }
      this.life--;
    }
  }
```

**25. Вызовем метод reCalculateLife() в функции reDrawParticles()**
```html
  function reDrawParticles(){
    for(let i in particles){
      particles[i].reDraw(); // отрисовываем каждую частицу по параметрам, определенным в reDraw();
      particles[i].position(); // обновляем позицию каждой частицы
      particles[i].reCalculateLife(); // обновляем время жизни частиц
    }
  }
```

**26. напоследок напишем функцию, для смены канвас вместе со сменой вьюпорта**
```html 
  window.onresize = function(){ 
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight;
  }
```

***демо с полным кодом можно посмотреть по ссылке - https://codepen.io/sergo/pen/PoNLREK?editors=0010***


