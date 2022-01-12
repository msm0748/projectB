import ObstacleYellow from "./obstacleYellow.js";
import ObstacleBlue from "./ObstacleBlue.js";
import ObstaclePink from "./ObstaclePink.js";
import ObstacleBeige from "./ObstacleBeige.js";
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
  let timer = 250;
  let obstacleArr = [];
  let itemArr = [];
  let pointNumber = 0;

  function handleItem() {
    if (timer % 500 === 0) {
      const item = new Shield(ctx, Math.floor(Math.random() * 6) + 3);
      itemArr.push(item);
    }
    for (let i = 0; i < itemArr.length; i++) {
      if (itemArr[i].x < -20) {
        // 좌측 화면에서 -20px 나가면 배열에서 삭제
        itemArr.splice(i, 1);
      }
      if (itemArr[i]) {
        // 인덱스 값을 찾지 못해서 오류뜨는 걸 방지
        itemArr[i].update();
        itemArr[i].draw();
        itemArr[i].itemCrash(hero, itemArr, i);
      }
    }
  }

  function handleObstacle() {
    const obRandom = [
      Math.floor(Math.random() * 50) + 100,
      Math.floor(Math.random() * 100) + 150,
      Math.floor(Math.random() * 100) + 50,
      Math.floor(Math.random() * 100) + 100,
    ];
    if (timer % 200 === 0) {
      const obstacleYellow = new ObstacleYellow(ctx);
      obstacleArr.push(obstacleYellow);
    }
    if (timer % 90 === 0) {
      const obstacleBlue = new ObstacleBlue(ctx);
      obstacleArr.push(obstacleBlue);
    }
    if (timer % 250 === 0) {
      const obstaclePink = new ObstaclePink(ctx);
      obstacleArr.push(obstaclePink);
    }
    if (timer % 350 === 0) {
      const obstacleBeige = new ObstacleBeige(ctx);
      obstacleArr.push(obstacleBeige);
    }

    for (let i = 0; i < obstacleArr.length; i++) {
      if (obstacleArr[i].x < -20) {
        // 좌측 화면에서 -20px 나가면 배열에서 삭제
        obstacleArr.splice(i, 1);
        pointNumber++;
        point.innerText = pointNumber;
      }
      if (obstacleArr[i]) {
        // 인덱스 값을 찾지 못해서 오류뜨는 걸 방지
        obstacleArr[i].obstacleCrash(hero, ani, btn);
        // obstacleCrash(hero, obstacleArr[i]);
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

  document.addEventListener("keydown", function (e) {
    e.preventDefault();
    if (e.code === "ArrowUp") {
      if (hero.y > 30) {
        hero.up = true;
      }
    }
    if (e.code === "ArrowDown") {
      if (hero.maxY < canvas.height - 40) {
        hero.down = true;
      }
    }
    if (e.code === "ArrowLeft") {
      if (hero.x > 30) {
        hero.left = true;
      }
    }
    if (e.code === "ArrowRight") {
      if (hero.maxX < canvas.width - 40) {
        hero.right = true;
      }
    }
  });
  document.addEventListener("keyup", function (e) {
    e.preventDefault();
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
