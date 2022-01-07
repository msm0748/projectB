import Obstacle from "./obstacle.js";
import Hero from "./hero.js";
import BgLayer from "./bgLayer.js";
const btn = document.querySelector("button");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const point = document.getElementById("point");
point.innerText = 0;
// heroImg.src = "http://cfile3.uf.tistory.com/image/275A984253187A1311F1EB";
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

    // obstacleArr.forEach((v, i, arr) => {
    //   if (v.x < 0) {
    //     setTimeout(() => {
    //       arr.splice(i, 1);
    //     }, 0);
    //   }
    //   crash(hero, v);
    //   v.x -= 5;
    //   v.draw();
    // });

    // console.log(obstacleArr);
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
    const x = obstacle.x - hero.x;
    const x2 = x + obstacle.width; // x값 통과하고 지나칠 때
    const y = obstacle.y - hero.y;
    const distance = Math.sqrt(x * x + y * y); // 이해 안됨
    if (distance < hero.width) {
      cancelAnimationFrame(ani);
      btn.removeAttribute("disabled");
    }
  }
  document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowUp") {
      if (hero.y > 0) {
        hero.up = true;
      }
    }
    if (e.code === "ArrowDown") {
      if (hero.y + hero.height < canvas.height) {
        // bottom 값으로 설정시 -5px로 가버림
        hero.down = true;
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
  });
}

btn.addEventListener("click", function () {
  cancelAnimationFrame(ani);
  start();
  btn.setAttribute("disabled", true);
});
