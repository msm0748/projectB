const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let particleArray = [];
let adjustX = 0; // x 좌표
let adjustY = 0; // y 좌표
const mouse = {
  x: null,
  y: null,
  radius: 150,
};

ctx.fillStyle = "white";
ctx.font = "20px Verdana";
ctx.fillText("Thank you", 11, 32);
const textCoordinates = ctx.getImageData(0, 0, 150, 150); // 글씨 배경 사이즈

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x; //초기 위치 유지
    this.baseY = this.y;
    this.density = Math.random() * 5 + 0.5; // 퍼지는 범위
    this.distance;
  }
  draw() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.strokeStyle = "rgba(224, 226, 63, 1)";
    ctx.beginPath();

    if (this.distance < mouse.radius - 5) {
      this.size = 13;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(this.x - 3, this.y - 3, this.size / 2.5, 0, Math.PI * 2);
      ctx.arc(this.x + 7, this.y - 1, this.size / 3.5, 0, Math.PI * 2);
    } else if (this.distance <= mouse.radius) {
      this.size = 10;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(this.x - 2, this.y - 2, this.size / 3, 0, Math.PI * 2);
    } else {
      this.size = 8;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.stroke();
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(this.x - 1, this.y - 1, this.size / 3, 0, Math.PI * 2);
    }
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy); // 피타고라스의 정리
    this.distance = distance;
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if (distance < mouse.radius) {
      // 반응하는 범위
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 10;
      }
      if (this.y !== this.basey) {
        let dy = this.y - this.baseY;
        this.y -= dy / 10;
      }
    }
  }
}

function init() {
  particleArray = [];
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let positionX = x + adjustX;
        let positionY = y + adjustY;
        particleArray.push(new Particle(positionX * 8, positionY * 8)); // 글씨 사이즈
      }
    }
  }
}
init();

export { particleArray, mouse };
