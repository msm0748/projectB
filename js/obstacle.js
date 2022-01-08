const canvas = document.getElementById("canvas");
const obstacleImg = new Image();
obstacleImg.src = "../png/fly.png";
class Obstacle {
  constructor(ctx, speed) {
    this.ctx = ctx;
    this.pngWidth = 454;
    this.pngHeight = 500;
    this.width = 150;
    this.height = 100;
    this.x = canvas.width - this.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height));
    this.speed = speed;
    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 6; i++) {
      this.spriteFrames.push(i);
    }
  }
  update() {
    this.x -= this.speed;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.frameIdx++;
    if (this.frameIdx === 6) {
      this.frameIdx = 0;
    }
  }
  draw() {
    this.ctx.drawImage(
      obstacleImg,
      Math.floor(this.spriteFrames[this.frameIdx] % 6) * this.pngWidth,
      Math.floor(this.spriteFrames[this.frameIdx] / 6) * this.pngHeight,
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
}

export default Obstacle;
