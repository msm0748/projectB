const shieldImg = new Image();
shieldImg.src = "img/shield.png";
export default class Shield {
  constructor(canvas, ctx, speed) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.pngWidth = shieldImg.width / 5;
    this.pngHeight = shieldImg.height;
    this.width = 60;
    this.height = 50;
    this.x = this.canvas.width - this.width;
    this.y = Math.floor(Math.random() * (this.canvas.height - this.height));
    this.speed = speed;
    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 5; i++) {
      this.spriteFrames.push(i);
    }
    this.frameSpeed = 0;
  }
  update() {
    this.x -= this.speed;
    this.frameSpeed++;
    if (this.frameSpeed % 10 === 0) {
      this.frameIdx++;
    }
    if (this.frameIdx === 5) {
      this.frameIdx = 0;
    }
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
  }
  draw() {
    this.ctx.drawImage(
      shieldImg,
      Math.floor(this.spriteFrames[this.frameIdx] % 5) * this.pngWidth,
      Math.floor(this.spriteFrames[this.frameIdx] / 5) * this.pngHeight,
      this.pngWidth,
      this.pngHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  itemCrash(hero, itemArr, i) {
    const x = this.x + 5 - hero.maxX;
    const x2 = hero.x - (this.maxX - 5);
    const y = this.y + 3 - hero.maxY;
    const y2 = hero.y - this.maxY;
    if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
      hero.heroShieldImg.src = "img/sp_shield.png";
      hero.shieldState = true;
      itemArr.splice(i, 1);
      setTimeout(() => {
        hero.heroShieldImg.src = "img/sp_shield0.png";
      }, 4000);
      setTimeout(() => {
        hero.shieldState = false;
      }, 5000);
    }
  }
}
