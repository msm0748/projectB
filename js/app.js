import Obstacle from "./obstacle.js";
import Hero from "./hero.js";
import BgLayer from "./bgLayer.js";
const btn = document.querySelector("button");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const point = document.getElementById("point");
point.innerText = 0;
let ani;

function start() {
  point.innerText = 0;
  const hero = new Hero(ctx);
  const bgLayer = new BgLayer(ctx);
  let timer = 0;
  let obstacleArr = [];
  let pointNumber = 0;
  function handleObstacle() {
    if (timer % 50 === 0) {
      const obstacle = new Obstacle(ctx, Math.floor(Math.random() * 10) + 6);
      obstacleArr.push(obstacle);
    }

    for (let i = 0; i < obstacleArr.length; i++) {
      if (obstacleArr[i].x < -20) {
        obstacleArr.splice(i, 1);
        pointNumber++;
        point.innerText = pointNumber;
      }
      if (obstacleArr[i]) {
        crash(hero, obstacleArr[i]);
        obstacleArr[i].update();
        obstacleArr[i].draw();
      }
    }
  }
  function draw() {
    ani = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgLayer.update();
    bgLayer.draw();
    timer++;
    handleObstacle();
    hero.update();
    hero.draw();
  }
  draw();

  function crash(hero, obstacle) {
    const x = obstacle.x - hero.maxX;
    const x2 = hero.x - obstacle.maxX;
    const y = obstacle.y - hero.maxY;
    const y2 = hero.y - obstacle.maxY;
    // console.log(hero.x, obstacle.maxX);
    // console.log(`장애물 : ${obstacle.x} 히어로 : ${hero.maxX} y2 : ${y2}`);
    if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
      // cancelAnimationFrame(ani);
      btn.removeAttribute("disabled");
    }
  }
  document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowUp") {
      if (hero.y > 10) {
        hero.up = true;
      }
    }
    if (e.code === "ArrowDown") {
      if (hero.maxY < canvas.height - 20) {
        hero.down = true;
      }
    }
    if (e.code === "ArrowLeft") {
      if (hero.x > 10) {
        hero.left = true;
      }
    }
    if (e.code === "ArrowRight") {
      if (hero.maxX < canvas.width - 20) {
        hero.right = true;
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.code === "ArrowUp") {
      hero.up = false;
    }
    if (e.code === "ArrowDown") {
      hero.down = false;
    }
    if (e.code === "ArrowLeft") {
      hero.left = false;
    }
    if (e.code === "ArrowRight") {
      hero.right = false;
    }
  });
}

btn.addEventListener("click", function () {
  cancelAnimationFrame(ani);
  start();
  btn.setAttribute("disabled", true);
});
