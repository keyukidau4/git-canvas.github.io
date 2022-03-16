//file:///Users/anhdao/Desktop/evondev/particles%20canvas/index.html
const canvas = document.querySelector("canvas");

const audio = document.querySelector("audio");

const ctx = canvas.getContext("2d");



canvas.width = window.innerWidth;

canvas.height = window.innerHeight;

const colors = [
  "#ffa400",
  "#2cccff",
  "#ff6bcb",
  "#e74c3c",
  "#07a787",
  "#7d18db",
  "db2796",
];

function randomColor(colors) {
  //.floor de lam tron so
  return colors[Math.floor(Math.random() * colors.length)];
}

const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

function Partcicle(x, y, radius, color, velocity) {
  //x la truc hoanh
  //y la truc tung
  //radius la ban kinh hinh tron
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.velocity = velocity;
  this.ttl = 200;

  this.draw = () => {
    //bat dau ve
    ctx.beginPath();
    //ve ra mot hinh tron
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    //thiet lap mau cho hinh tron
    ctx.fillStyle = this.color;
    ctx.fill();
    //ket thuc ve
    ctx.closePath();
  };

  this.update = () => {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.ttl--;
  };
}
// const partcicle = new Partcicle(100, 100, 50, "red");
let partcicle;
const partcicleCount = 15;

function init() {
  partcicle = [];
  for (let index = 0; index < partcicleCount; index++) {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const radians = (Math.PI * 2) / partcicleCount;
    const velocity = {
      x: Math.cos(radians * index),
      y: Math.sin(radians * index),
    };
    partcicle.push(new Partcicle(x, y, 5, randomColor(colors), velocity));
  }
}

function generateCircles() {
  setTimeout(generateCircles, 600);
  for (let index = 0; index < partcicleCount; index++) {
    const x = mouse.x;
    const y = mouse.y;
    const radians = (Math.PI * 2) / partcicleCount;
    const velocity = {
      x: Math.cos(radians * index),
      y: Math.sin(radians * index),
    };
    partcicle.push(new Partcicle(x, y, 5, randomColor(colors), velocity));
  }
}

function animate() {
  //chay chuyen dong vo han tren web
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  partcicle.forEach((item, index) => {
    if (item.ttl === 0) {
      partcicle.splice(index, 1);
    }
    item.update();
  });
  //   partcicle.update();
}
init();
animate();
generateCircles();

//arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean)

// const partcicle = new Partcicle(100, 100, 100, "red");
//bat dau ve
// partcicle.draw();

// console.log("partcicle", partcicle);
window.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});
