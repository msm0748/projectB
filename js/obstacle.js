const canvas = document.getElementById("canvas");
const obstacleImg = new Image();
obstacleImg.src = "../png/fly2.png";
class Obstacle {
  constructor(ctx, speed) {
    this.ctx = ctx;
    this.pngWidth = 240;
    this.pngHeight = 314;
    this.width = 150;
    this.height = 100;
    this.x = canvas.width - this.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height));
    this.speed = speed;
    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 20; i++) {
      this.spriteFrames.push(i);
    }
    this.spriteX = 0;
    this.spriteY = 0;
  }
  update() {
    if ([0, 1, 2, 3].includes(this.frameIdx)) {
      // 이미지 좌표 설정해주기
      this.spriteX = 0;
      this.spriteY = 0;
    } else {
      // console.log("미포함");
    }
    this.x -= this.speed;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.frameIdx++;
    if (this.frameIdx === 20) {
      this.frameIdx = 0;
    }
  }
  draw() {
    this.ctx.drawImage(
      obstacleImg,
      Math.floor(this.spriteFrames[this.frameIdx] % 5) * this.pngWidth,
      Math.floor(this.spriteFrames[this.frameIdx] / 5) * this.pngHeight,
      this.pngWidth,
      this.pngHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.width, this.y);
    this.ctx.moveTo(this.x, this.y + this.height);
    this.ctx.lineTo(this.x + this.width, this.y + this.height);
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x, this.y + this.height);
    this.ctx.moveTo(this.x + this.width, this.y);
    this.ctx.lineTo(this.x + this.width, this.y + this.height);
    this.ctx.stroke();
  }
  obstacleCrash(hero, ani, btn) {
    const x = this.x - hero.maxX;
    const x2 = hero.x - this.maxX;
    const y = this.y - hero.maxY;
    const y2 = hero.y - this.maxY;
    if (hero.shieldState === false) {
      if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
        cancelAnimationFrame(ani);
        btn.removeAttribute("disabled");
      }
    }
  }
}

export default Obstacle;
