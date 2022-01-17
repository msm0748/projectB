// import ObstacleYellow from "./obstacleYellow.js";
// import ObstacleBlue from "./ObstacleBlue.js";
// import ObstacleRed from "./ObstacleRed.js";
// import ObstacleGreen from "./ObstacleGreen.js";
// import Hero from "./hero.js";
// import BgLayer from "./bgLayer.js";
// import Shield from "./item.js";
const btn = document.querySelector("button");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const point = document.getElementById("point");
point.innerText = 0;
let ani;

ctx.font = "30px Arial";
ctx.textAlign = "center"
ctx.fillText("게임 시작", canvas.width/2, 50);
ctx.fillText("게임 방법", canvas.width/2, 200);
var text = ctx.measureText('foo   ');
console.log(text);

function start() {
  point.innerText = 0;
  const hero = new Hero(ctx);
  const bgLayer = new BgLayer(ctx);
  let timer = 150;
  let obstacleArr = [];
  let itemArr = [];
  let pointNumber = 0;
  let obstacleLenght = 0;
  // let gameOver = false;
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
    if(hero.gameOver === true){
      cancelAnimationFrame(ani);
      const deathImg = new Image();
      deathImg.src = "death.png";
      const deathImgWidth = 450;
      const deathImgHeight = 300;
      const x = canvas.width / 2 - deathImgWidth / 2;
      const y = canvas.height / 2 - deathImgHeight / 2
      setTimeout(()=>{
        ctx.drawImage(
          deathImg,
          x, y, deathImgWidth, deathImgHeight
        );
        btn.removeAttribute("disabled");
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
  btn.setAttribute("disabled", true);
});
