const canvas = document.getElementById("canvas");
const heroImg = new Image();
heroImg.src = "../png/sp.png";

class Hero {
  //주인공 셋팅
  constructor(ctx) {
    this.pngWidth = 443;
    this.pngHeight = 234;
    this.width = 150;
    this.height = 100;
    this.x = 20; // 시작 위치
    this.y = canvas.height / 2 - this.height / 2; // 시작 위치
    this.ctx = ctx;
    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 2; i++) {
      this.spriteFrames.push(i);
    }
    this.up = false;
    this.down = false;
    this.imgSpeed = 0;
    this.upDownSpeed = 10;
  }
  update() {
    // this.bottom = canvas.height - (this.y + this.height);
    this.imgSpeed++;
    if (this.up === true) {
      this.y -= this.upDownSpeed;
      if (this.y === 0) {
        this.up = false;
      }
    }
    if (this.down === true) {
      this.y += this.upDownSpeed;
      if (this.y + this.height === canvas.height) {
        // bottom 값으로 설정시 -5px로 가버림
        this.down = false;
      }
    }
    // console.log("top :", this.y);
    // console.log("bottom :", this.bottom);
    // if(this.imgSpeed % 4 === 0){
    // }
    this.frameIdx++;
    if (this.frameIdx === 2) {
      this.frameIdx = 0;
    }
  }
  draw() {
    this.ctx.drawImage(
      heroImg,
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
