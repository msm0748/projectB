const canvas = document.getElementById("canvas");
const heroImg = new Image();
heroImg.src = "../png/sp.png";

class Hero {
  //주인공 셋팅
  constructor(ctx) {
    this.ctx = ctx;
    this.pngWidth = 443;
    this.pngHeight = 234;
    this.width = 100;
    this.height = 50;
    this.x = 20; // 시작 위치
    this.y = canvas.height / 2 - this.height / 2; // 시작 위치

    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 2; i++) {
      this.spriteFrames.push(i);
    }
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.frameSpeed = 0;
    this.upDownSpeed = 10;
    this.heroImg = heroImg;
    this.shieldState = false;
  }
  update() {
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.frameSpeed++;
    if (this.up === true) {
      this.y -= this.upDownSpeed;
      if (this.y <= 10) {
        this.up = false;
      }
    }
    if (this.down === true) {
      this.y += this.upDownSpeed;
      if (this.maxY >= canvas.height - 20) {
        this.down = false;
      }
    }
    if (this.left === true) {
      this.x -= this.upDownSpeed;
      if (this.x <= 10) {
        this.left = false;
      }
    }
    if (this.right === true) {
      this.x += this.upDownSpeed;
      if (this.maxX >= canvas.width - 20) {
        this.right = false;
      }
    }
    if (this.frameSpeed % 4 === 0) {
      this.frameIdx++;
    }
    if (this.frameIdx === 2) {
      this.frameIdx = 0;
    }
  }
  draw() {
    this.ctx.drawImage(
      this.heroImg,
      Math.floor(this.spriteFrames[this.frameIdx] % 2) * this.pngWidth,
      Math.floor(this.spriteFrames[this.frameIdx] / 2) * this.pngHeight,
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
export default Hero;
