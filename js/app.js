const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const img1 = new Image();
img1.src = "ca.png";

const dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = "green";
    // ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, 48, 12, 172, 350);
    ctx.drawImage(img1, 48, 12, 172, 350);
  },
};

class Obstacle {
  constructor() {
    this.x = 600;
    this.y = 200;
    this.width = 50;
    this.height = 10;
  }
  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let timer = 0;
let obstacleArr = [];
let jump = false;
let animation;
let jumpState = true;

function frame() {
  animation = requestAnimationFrame(frame);
  timer++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 140 === 0) {
    const obstacle = new Obstacle();
    obstacleArr.push(obstacle);
  }
  obstacleArr.forEach((value, index, arr) => {
    if (value.x < 0) {
      arr.splice(index, 1);
    }
    value.x -= 1; // 장애물 스피드

    crash(dino, value);

    value.draw();
  });
  console.log(jump, jumpState);
  if (jump === true && jumpState === true) {
    // 점프
    dino.y -= 4;
    if (dino.y === 120) {
      jumpState = false;
    }
  }
  if (jumpState === false) {
    //점프 후 내려오기
    if (dino.y < 200) {
      dino.y += 2;
      jump = false;
    } else if (dino.y === 200) {
      jumpState = true;
    }
  }

  dino.draw();
}
frame();

//충돌 확인

function crash(dino, obstacle) {
  let x = obstacle.x - (dino.x + dino.width);
  let y = obstacle.y - (dino.y + dino.height);
  if (x < 0 && y < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}
function handleJump(e) {
  if (e.code === "Space") {
    jump = true;
  }
}
document.addEventListener("keydown", handleJump);
