import Obstacle from "./obstacle.js";
import Hero from "./hero.js";
import BgLayer from "./bgLayer.js";
const btn = document.querySelector("button");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// heroImg.src = "http://cfile3.uf.tistory.com/image/275A984253187A1311F1EB";
let ani;

function start() {
  const hero = new Hero(ctx);
  const bgLayer = new BgLayer(ctx);
  let jump = false;
  let jumpState = true;
  let run = true;
  let timer = 0;
  let obstacleArr = [];

  function obstacle(){
    if (timer % 120 === 0) {
      const obstacle = new Obstacle(ctx);
      obstacleArr.push(obstacle);
    }
    obstacleArr.forEach((v, i, arr) => {
      if (v.x < 0) {
        arr.splice(i, 1);
      }
      crash(hero, v);
      v.x -= 5;
      v.draw();
    });
  }
  function draw() {
    ani = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgLayer.draw();
    timer++;
    obstacle();
    handleJump();
    hero.draw(timer, run);
  }
  draw();
  function handleJump() {
    if (jump === true && jumpState === true) {
      run = false;
      hero.y -= 10;
      if (hero.y === 150) {
        // 점프 높이
        jumpState = false;
      }
    }
    if (jumpState === false) {
      if (hero.y < hero.floor) {
        jump = false;
        hero.y += 5;
      } else if (hero.y === hero.floor) {
        run = true;
        jumpState = true;
      }
    }
  }


  function crash(hero, obstacle) {
    const x = obstacle.x - (hero.x + hero.width);
    const y = obstacle.y - (hero.y + hero.height);
    if (x < 0 && y < 0) {
      cancelAnimationFrame(ani);
      btn.removeAttribute("disabled");
    }
  }
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      jump = true;
    }
  });
};

btn.addEventListener("click", function () {
  cancelAnimationFrame(ani);
  start();
  btn.setAttribute("disabled", true);
});
