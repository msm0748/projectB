const heroImg = new Image();
const heroShieldImg = new Image();
heroImg.src = "img/sp.png";
heroShieldImg.src = "img/sp_shield.png";

export default class Hero {
  //주인공 셋팅
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.pngWidth = 443;
    this.pngHeight = heroImg.height;
    this.width = 100;
    this.height = 50;
    this.x = 20; // 시작 위치
    this.y = this.canvas.height / 2 - this.height / 2; // 시작 위치
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
    this.gameOver = false; //임시
    this.shield();
  }
  shield() {
    this.shieldPngWidth = 510;
    this.shieldPngHeight = heroShieldImg.height;
    this.heroShieldImg = heroShieldImg;
    this.shieldState = false;
    this.shieldWidth = 115;
    this.shieldHeight = this.height * 1.9; // 쉴드먹었을 때 높이 비례해서 곱함
  }
  update() {
    this.maxX = this.x + this.width;
    this.maxY = this.y + (this.height - 10); // 빈 공간 충돌 방지
    this.frameSpeed++;
    if (this.up === true) {
      this.y -= this.directionSpeed;
      if (this.y <= 30) {
        // 쉴드일때 화면 위로 이미지 짤림 방지
        this.up = false;
      }
    }
    if (this.down === true) {
      this.y += this.directionSpeed;
      if (this.maxY >= this.canvas.height - 45) {
        // 쉴드일때 화면 아래로 이미지 짤림 방지값 45
        this.down = false;
      }
    }
    if (this.left === true) {
      this.x -= this.directionSpeed;
      if (this.x <= 30) {
        // 쉴드일때 화면 위로 이미지 짤림 방지
        this.left = false;
      }
    }
    if (this.right === true) {
      this.x += this.directionSpeed;
      if (this.maxX >= this.canvas.width - 45) {
        // 쉴드일때 화면 아래로 이미지 짤림 방지값 45
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
  shieldDraw() {
    this.ctx.drawImage(
      this.heroShieldImg,
      Math.floor(this.spriteFrames[this.frameIdx] % 2) * this.shieldPngWidth,
      Math.floor(this.spriteFrames[this.frameIdx] / 2) * this.shieldPngHeight,
      this.shieldPngWidth,
      this.shieldPngHeight,
      this.x,
      this.y - this.height / 2, // 쉴드 먹었을때 이미지 틀어지는 느낌 없앰;
      this.shieldWidth,
      this.shieldHeight
    );
  }
  draw() {
    if (this.shieldState === true) {
      this.shieldDraw();
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
    }
  }
}
