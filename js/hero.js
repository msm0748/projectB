const canvas = document.getElementById("canvas");
const heroImg = new Image();
const heroShieldImg = new Image();
heroImg.src = "png/sp.png";
heroShieldImg.src = "png/sp_shield.png";

class Hero {
  //주인공 셋팅
  constructor(ctx) {
    this.ctx = ctx;
    this.pngWidth = 443;
    this.pngHeight = heroImg.height;
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
    this.directionSpeed = 10;
    this.heroImg = heroImg;
    this.shield();
  }
  shield(){
    this.shieldPngWidth = 510;
    this.shieldPngHeight = heroShieldImg.height;
    this.heroShieldImg = heroShieldImg;
    this.shieldState = false;
    this.shieldWidth = 115;
    this.shieldHeight = this.height * 1.9;
  }
  update() {
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    this.frameSpeed++;
    if (this.up === true) {
      this.y -= this.directionSpeed;
      if (this.y <= 30) {
        this.up = false;
      }
    }
    if (this.down === true) {
      this.y += this.directionSpeed;
      if (this.maxY >= canvas.height - 40) {
        this.down = false;
      }
    }
    if (this.left === true) {
      this.x -= this.directionSpeed;
      if (this.x <= 30) {
        this.left = false;
      }
    }
    if (this.right === true) {
      this.x += this.directionSpeed;
      if (this.maxX >= canvas.width - 40) {
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
  shieldDraw(){
    this.ctx.drawImage(
      this.heroShieldImg,
      Math.floor(this.spriteFrames[this.frameIdx] % 2) * this.shieldPngWidth,
      Math.floor(this.spriteFrames[this.frameIdx] / 2) * this.shieldPngHeight,
      this.shieldPngWidth,
      this.shieldPngHeight,
      this.x,
      this.y - this.height / 2,
      this.shieldWidth,
      this.shieldHeight
    );
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y - this.height / 2);
    this.ctx.lineTo(this.x + this.shieldWidth, this.y - this.height / 2);
    this.ctx.moveTo(this.x, this.y - this.height / 2 + this.height * 2);
    this.ctx.lineTo(
      this.x + this.shieldWidth,
      this.y - this.height / 2 + this.height * 2
    );
    this.ctx.moveTo(this.x, this.y - this.height / 2);
    this.ctx.lineTo(this.x, this.y - this.height / 2 + this.height * 2);
    this.ctx.moveTo(this.x + this.shieldWidth, this.y - this.height / 2);
    this.ctx.lineTo(
      this.x + this.shieldWidth,
      this.y - this.height / 2 + this.height * 2
    );
    this.ctx.stroke();
  }
  draw() {
    if (this.shieldState === true) {
      this.shieldDraw()
    } else {
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
}
export default Hero;
