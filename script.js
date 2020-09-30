(function () {

    let canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        w = canvas.width = innerWidth,
        h = canvas.height = innerHeight,
        particles = [], // массив, в котором будут храниться частицы
        properties = { // коллекция, с настройками стилей
            bgColor: 'rgba(0, 0, 0, 1)',
            particleColor: 'rgba(255, 40, 40, 1)',
            particleRadius: 3,
            particleCount: 60,
            particleMaxVelocity: 0.5, // скорость частицы
            lineLength: 200, // длина соединения частиц(если частицы на расстоянии меньше чем 200 друг от друга, то связываются линией)
            particleLife: 6 // время жизни частицы (сек)
        }
    // помещаем наш канвас в нужное место
    document.querySelector('.animate-bg').appendChild(canvas);
    // функция для смены канвас вместе со сменой вьюпорта
    window.onresize = function () {
        w = canvas.width = innerWidth,
            h = canvas.height = innerHeight;
    }

    // класс отвечающий за настройки частиц (их положение, скорость, цвет и т.д)
    class Particle {
        constructor() {
            this.x = Math.random() * w; // положение частицы по горизонтали
            this.y = Math.random() * h; // положение частицы по вертикали
            // скорость частицы от -0.5 до +0.5 (от этого будет зависеть направление частицы) по X и по Y
            this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
            this.life = Math.random() * properties.particleLife * 60;
        }
        position() { // метод, обновляющий позицию частицы
            // если частица выходит за пределы экрана, по горизонтали или вертикали то она возвращается назад
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw() { // метод, который будет отрисовывать частицу на канвас
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.particleRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.particleColor;
            ctx.fill();
        }
        reCalculateLife() { // метод, который вычитает секунды жизни частицы
            // если время жизни частицы меньше 1 то заново пересчитываем все параметры
            if (this.life < 1) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.velocityY = Math.random() * (properties.particleMaxVelocity * 2) - properties.particleMaxVelocity;
                this.life = Math.random() * properties.particleLife * 60;
            }
            this.life--;
        }
    }
    // функция отвечающая за фон канваса
    function reDrawBackground() {
        ctx.fillStyle = properties.bgColor;
        ctx.fillRect(0, 0, w, h);
    }

    // функция отрисовки соединительных линий между частицами
    function drawLines() {
        let x1, y1, x2, y2, length, opacity;
        for (let i in particles) {
            for (let j in particles) {
                x1 = particles[i].x; // координата одной частицы по горизонтали
                y1 = particles[i].y; // координата одной частицы по вертикали
                x2 = particles[j].x; // координата второй частицы по горизонтали
                y2 = particles[j].y; // координата второй частицы по вертикали
                // расстояние между ними расчитаем по формуле диагонали (корень квадратный из суммы квадратов)
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                // если расстояние между частицами меньше чем указанное в properties, то рисуем линию
                if (length < properties.lineLength) {
                    opacity = 1 - length / properties.lineLength; /* длину между частицами делим на указанную в properties.lineLength длину и вычитаем из еденицы. 
           т.к length не может превысить указанное расстояние в properties.lineLength,то самое большое число которое может получится - это 1
           т.е чем больше расстояние между частицами тем меньше значение opacity */
                    ctx.lineWidth = '0.5'; // ширина линии
                    ctx.strokeStyle = 'rgba(255, 40, 40, ' + opacity + ')'; // цвет и прозрачность линии
                    ctx.beginPath(); // начинаем путь
                    ctx.moveTo(x1, y1); // из точки 1
                    ctx.lineTo(x2, y2); // в точку 2
                    ctx.closePath(); // закончили путь
                    ctx.stroke(); // отрисовка
                }
            }
        }
    }

    // проходимся по всем частицам в массиве
    function reDrawParticles() {
        for (let i in particles) {
            particles[i].reDraw(); // для каждой частицы вызовем функцию reDraw()
            particles[i].position(); // обновляем позицию каждой частицы
            particles[i].reCalculateLife(); // обновляем время жизни частиц
        }
    }

    function loop() {
        reDrawBackground();
        reDrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }
    // функция обновления канвас
    function init() {
        // при помощи цикла, наполняем частицами массив particles
        for (let i = 0; i < properties.particleCount; i++) {
            particles.push(new Particle);
        }
        loop();
    }

    init();

}())