// import ObstacleYellow from "./obstacleYellow.js";
// import ObstacleBlue from "./ObstacleBlue.js";
// import ObstacleRed from "./ObstacleRed.js";
// import ObstacleGreen from "./ObstacleGreen.js";
// import Hero from "./hero.js";
// import BgLayer from "./bgLayer.js";
// import Shield from "./item.js";
const btns = document.querySelector(".btn");
const btn = document.querySelector(".start");
const rule = document.querySelector(".rule");
const modal = document.querySelector(".modal");
const x_btn = document.querySelector("i");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const point = document.getElementById("point");
let reStart = false;
point.innerText = 0;
let ani;
let aniReady;

function ready() {
  const bgLayer = new BgLayer(ctx);
  function draw() {
    aniReady = requestAnimationFrame(draw);
    bgLayer.update(0);
    bgLayer.draw();
    const readyhImg = new Image();
    readyhImg.src = "png/ready.png";
    const readyhImgWidth = 450;
    const readyhImgHeight = 200;
    const x = canvas.width / 2 - readyhImgWidth / 2;
    const y = 30;
    ctx.drawImage(readyhImg, x, y, readyhImgWidth, readyhImgHeight);
  }
  draw();
}
ready();
rule.addEventListener("click", function () {
  modal.classList.add("on");
});
x_btn.addEventListener("click", function () {
  modal.classList.remove("on");
});

function start() {
  cancelAnimationFrame(aniReady);
  btns.style.display = "none";
  point.innerText = 0;
  const hero = new Hero(ctx);
  const bgLayer = new BgLayer(ctx);
  let timer = 150;
  let obstacleArr = [];
  let itemArr = [];
  let pointNumber = 0;
  let obstacleLenght = 0;
  function handleItem() {
    if (obstacleLenght < 50) {
      // 50마리만 배출
      if (timer % 1000 === 0) {
        const item = new Shield(ctx, Math.floor(Math.random() * 6) + 3);
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
    obPinkImg.src = "png/obPink.png";
    const obYellowImg = new Image();
    obYellowImg.src = "png/obYellow.png";
    const obBlueImg = new Image();
    obBlueImg.src = "png/obBlue.png";
    const obRedImg = new Image();
    obRedImg.src = "png/obRed.png";
    if (obstacleLenght < 50) {
      // 50마리만 배출
      if (timer % 90 === 0) {
        const obstaclePink = new ObstaclePink(obPinkImg, 6);
        obstacleArr.push(obstaclePink);
        obstacleLenght++;
      }
      if (timer % 200 === 0) {
        const obYellowImg = new Image();
        obYellowImg.src = "png/obYellow.png";
        const obstacleYellow = new ObstacleYellow(obYellowImg, 8);
        obstacleArr.push(obstacleYellow);
        obstacleLenght++;
      }
      if (timer % 250 === 0) {
        const obstacleBlue = new ObstacleBlue(obBlueImg, 5);
        obstacleArr.push(obstacleBlue);
        obstacleLenght++;
      }
      if (timer % 350 === 0) {
        const obstacleRed = new ObstacleRed(obRedImg, 6);
        obstacleArr.push(obstacleRed);
        obstacleLenght++;
      }
    }
    for (let i = 0; i < obstacleArr.length; i++) {
      if (obstacleArr[i].x < -85) {
        // 좌측 화면에서 -20px 나가면 배열에서 삭제
        obstacleArr.splice(i, 1);
        pointNumber++;
        point.innerText = pointNumber;
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
      cancelAnimationFrame(ani);
      const deathImg = new Image();
      deathImg.src = "png/death.png";
      const deathImgWidth = 550;
      const deathImgHeight = 150;
      const imgX = canvas.width / 2 - deathImgWidth / 2;
      const imgY = canvas.height / 2 - deathImgHeight / 2;
      const textX = canvas.width / 2;
      const textY = canvas.height - 30;
      setTimeout(() => {
        ctx.drawImage(deathImg, imgX, imgY, deathImgWidth, deathImgHeight);
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("다시 시작하려면 Space를 눌려주세요. ", textX, textY);
        reStart = true;
      }, 500);
    }
  }
  draw();

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
    if (e.code === "ArrowUp" || e.key === "Up") {
      hero.up = false;
    }
    if (e.code === "ArrowDown" || e.key === "Down") {
      hero.down = false;
    }
    if (e.code === "ArrowLeft" || e.key === "Left") {
      hero.left = false;
    }
    if (e.code === "ArrowRight" || e.key === "Right") {
      hero.right = false;
    }
  });
}

btn.addEventListener("click", function () {
  cancelAnimationFrame(ani);
  start();
  reStart = false;
});
document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    if (reStart === true) {
      cancelAnimationFrame(ani);
      start();
      reStart = false;
    }
  }
});
