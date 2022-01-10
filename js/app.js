import Obstacle from "./obstacle.js";
import Hero from "./hero.js";
import BgLayer from "./bgLayer.js";
import Shield from "./item.js";
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
  let shield = false;
  let timer = 0;
  let obstacleArr = [];
  let itemArr = [];
  let pointNumber = 0;

  function handleItem() {
    // console.log(Math.floor(Math.random() * 6) + 150);
    if (timer % 500 === 0) {
      const item = new Shield(ctx, Math.floor(Math.random() * 6) + 3);
      itemArr.push(item);
    }
    for (let i = 0; i < itemArr.length; i++) {
      if (itemArr[i].x < -20) { // 좌측 화면에서 -20px 나가면 배열에서 삭제
        itemArr.splice(i, 1);
      }
      if (itemArr[i]) { // 인덱스 값을 찾지 못해서 오류뜨는 걸 방지
        itemArr[i].update();
        itemArr[i].draw();
        itemCrash(hero, itemArr[i], i);
      }
    }
  }

  function handleObstacle() {
    if (timer % 50 === 0) {
      const obstacle = new Obstacle(ctx, Math.floor(Math.random() * 6) + 3);
      obstacleArr.push(obstacle);
    }

    for (let i = 0; i < obstacleArr.length; i++) {
      if (obstacleArr[i].x < -20) { // 좌측 화면에서 -20px 나가면 배열에서 삭제
        obstacleArr.splice(i, 1);
        pointNumber++;
        point.innerText = pointNumber;
      }
      if (obstacleArr[i]) { // 인덱스 값을 찾지 못해서 오류뜨는 걸 방지
        obstacleCrash(hero, obstacleArr[i]);
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
    handleItem();
    handleObstacle();
    hero.update();
    hero.draw();
  }
  draw();

  function itemCrash(hero, item, i) {
    const x = item.x - hero.maxX;
    const x2 = hero.x - item.maxX;
    const y = item.y - hero.maxY;
    const y2 = hero.y - item.maxY;
    if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
      shield = true;
      itemArr.splice(i, 1);
      hero.heroImg.src = "../png/sp_red.png";
      console.log("먹음");
      setTimeout(() => {
        hero.heroImg.src = "../png/sp0.png";
      }, 2000);
      setTimeout(() => {
        console.log("끝");
        hero.heroImg.src = "../png/sp.png";
        shield = false;
      }, 3000);
    }
  }

  function obstacleCrash(hero, obstacle) {
    const x = obstacle.x - hero.maxX;
    const x2 = hero.x - obstacle.maxX;
    const y = obstacle.y - hero.maxY;
    const y2 = hero.y - obstacle.maxY;
    if (shield === false) {
      if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
        // hero.heroImg.src = "../png/die.png";
        // hero.frameIdx = 0;
        cancelAnimationFrame(ani);
        btn.removeAttribute("disabled");
      }
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
