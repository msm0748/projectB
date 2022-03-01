import {
  ObstaclePink,
  ObstacleYellow,
  ObstacleBlue,
  ObstacleRed,
} from "./obstacle.js";
import Hero from "./hero.js";
import BgLayer from "./bgLayer.js";
import Shield from "./item.js";
import { particleArray, mouse } from "./particle.js";
const btns = document.querySelector(".btn");
const dropdown = document.querySelector(".dropdown");
const gameDifficultyBtn = document.querySelector(".game_difficulty");
const myDropdown = document.querySelector("#myDropdown");
const ruleBtn = document.querySelector(".rule");
const ruleModal = document.querySelector(".rule_modal");
const xBtn = ruleModal.querySelector(".x_btn");
const nextPrevBtn = ruleModal.querySelector(".next_prev_btn");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const point = document.getElementById("point");
let reStart = false;
// point.innerText = 50;
let ani;
let aniReady;

function ready() {
  const bgLayer = new BgLayer(canvas, ctx);
  const readyhImg = new Image();
  readyhImg.src = "img/ready.png";
  function draw() {
    aniReady = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgLayer.update(0);
    bgLayer.draw();
    const readyhImgWidth = 450;
    const readyhImgHeight = 200;
    const x = canvas.width / 2 - readyhImgWidth / 2;
    const y = 30;
    ctx.drawImage(readyhImg, x, y, readyhImgWidth, readyhImgHeight);
  }
  draw();
}
ruleBtn.addEventListener("click", function () {
  ruleModal.classList.add("on");
});
nextPrevBtn.addEventListener("click", function () {
  ruleModal.classList.toggle("rule2");
  nextPrevBtn.classList.toggle("next");
  // nextPrevBtn
});
xBtn.addEventListener("click", function () {
  ruleModal.classList.remove("on");
});

gameDifficultyBtn.addEventListener("click", function () {
  dropdown.classList.toggle("on");
});

// 난이도 선택시 게임시작 활성화

let nomalMode = [0, 150, 230, 260, 370];
let hardMode = [150, 90, 200, 250, 350];
let modeSelect;

myDropdown.addEventListener("click", function () {
  gameDifficultyBtn.classList.remove("text");
  gameDifficultyBtn.innerText = "게임시작";
  gameDifficultyBtn.classList.add("start");
  const startBtn = document.querySelector(".start");
  startBtn.onclick = function () {
    const difficultValu = document.querySelector(
      'input[name="difficulty"]:checked'
    ).value;
    if (difficultValu === "0") {
      modeSelect = nomalMode;
    } else if (difficultValu === "1") {
      modeSelect = hardMode;
    }
    cancelAnimationFrame(ani);
    start();
    reStart = false;
  };
});

window.addEventListener("load", () => {
  ready();
});

function start() {
  cancelAnimationFrame(aniReady);
  btns.style.display = "none";
  point.innerText = `남은 마릿수 50`;
  const hero = new Hero(canvas, ctx);
  const bgLayer = new BgLayer(canvas, ctx);
  let timer = modeSelect[0];
  let obstacleArr = [];
  let itemArr = [];
  let pointNumber = 0;
  let obstacleLenght = 0;
  function handleItem() {
    if (obstacleLenght < 50) {
      // 50마리만 배출
      if (timer % 1000 === 0) {
        const item = new Shield(canvas, ctx, Math.floor(Math.random() * 6) + 3);
        itemArr.push(item);
      }
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
    const obPinkImg = new Image();
    obPinkImg.src = "img/obPink.png";
    const obYellowImg = new Image();
    obYellowImg.src = "img/obYellow.png";
    const obBlueImg = new Image();
    obBlueImg.src = "img/obBlue.png";
    const obRedImg = new Image();
    obRedImg.src = "img/obRed.png";
    if (obstacleLenght < 50) {
      // 50마리만 배출
      if (timer % modeSelect[1] === 0) {
        const obstaclePink = new ObstaclePink(canvas, ctx, obPinkImg, 6);
        obstacleArr.push(obstaclePink);
        obstacleLenght++;
      }
      if (timer % modeSelect[2] === 0) {
        const obstacleYellow = new ObstacleYellow(canvas, ctx, obYellowImg, 7);
        obstacleArr.push(obstacleYellow);
        obstacleLenght++;
      }
      if (timer % modeSelect[3] === 0) {
        const obstacleBlue = new ObstacleBlue(canvas, ctx, obBlueImg, 5);
        obstacleArr.push(obstacleBlue);
        obstacleLenght++;
      }
      if (timer % modeSelect[4] === 0) {
        const obstacleRed = new ObstacleRed(canvas, ctx, obRedImg, 6);
        obstacleArr.push(obstacleRed);
        obstacleLenght++;
      }
    }
    for (let i = 0; i < obstacleArr.length; i++) {
      if (obstacleArr[i].x < -85) {
        // 좌측 화면에서 -20px 나가면 배열에서 삭제
        obstacleArr.splice(i, 1);
        pointNumber++;
        point.innerText = `남은 마릿수 ${50 - pointNumber}`;
      }
      if (obstacleArr[i]) {
        // 인덱스 값을 찾지 못해서 오류뜨는 걸 방지
        obstacleArr[i].update();
        obstacleArr[i].draw();
        obstacleArr[i].obstacleCrash(hero);
      }
    }
  }

  function draw() {
    ani = requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bgLayer.update(pointNumber);
    bgLayer.draw();
    timer++;
    handleItem();
    handleObstacle();
    hero.update();
    hero.draw();
    if (hero.gameOver === true) {
      gameOver();
    }
    if (pointNumber === 50) {
      mouse.x = hero.x;
      mouse.y = hero.y;
      for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw();
        particleArray[i].update();
      }
    }
  }
  draw();
  function gameOver() {
    cancelAnimationFrame(ani);
    const deathImg = new Image();
    deathImg.src = "img/death.png";
    const deathImgWidth = 550;
    const deathImgHeight = 150;
    const imgX = canvas.width / 2 - deathImgWidth / 2;
    const imgY = canvas.height / 2 - deathImgHeight / 2;
    const textX = canvas.width / 2;
    const textY = canvas.height - 30;
    setTimeout(() => {
      ctx.drawImage(deathImg, imgX, imgY, deathImgWidth, deathImgHeight);
      ctx.fillStyle = "black";
      ctx.font = "40px Arial";
      ctx.textAlign = "center";
      ctx.fillText("다시 시작하려면 Space를 눌러주세요. ", textX, textY);
      reStart = true;
    }, 500);
  }
  document.addEventListener("keydown", function (e) {
    if (e.code === "ArrowUp" || e.key === "Up") {
      if (hero.y > 30) {
        hero.up = true;
      }
    }
    if (e.code === "ArrowDown" || e.key === "Down") {
      if (hero.maxY < canvas.height - 45) {
        hero.down = true;
      }
    }
    if (e.code === "ArrowLeft" || e.key === "Left") {
      if (hero.x > 30) {
        hero.left = true;
      }
    }
    if (e.code === "ArrowRight" || e.key === "Right") {
      if (hero.maxX < canvas.width - 45) {
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

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (reStart === true) {
      cancelAnimationFrame(ani);
      start();
      reStart = false;
    }
  }
});
