const obGreenImg = new Image();
obGreenImg.src = "png/obGreen.png";
class ObstacleGreen {
  constructor(ctx) {
    this.ctx = ctx;
    this.pngWidth = obGreenImg.width / 2;
    this.pngHeight = obGreenImg.height;
    this.width = 85;
    this.height = 85;
    this.x = canvas.width - this.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height)); //처음 나오는 y값 랜덤, 이미지 삐져나감 방지
    
    this.speed = 8;
    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 2; i++) {
      this.spriteFrames.push(i);
    }
    this.spriteX = 0;
    this.spriteY = 0;
    this.frameSpeed = 0;

  }
  update() {
    this.x -= this.speed;
    this.frameSpeed++;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    if (this.frameSpeed % 10 === 0) {
      this.frameIdx++;
    }
    if (this.frameIdx === 2) {
      this.frameIdx = 0;
    }
  }
  draw() {
    this.ctx.drawImage(
      obGreenImg,
      Math.floor(this.spriteFrames[this.frameIdx] % 2) * this.pngWidth,
      Math.floor(this.spriteFrames[this.frameIdx] / 2) * this.pngHeight,
      this.pngWidth,
      this.pngHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
    // this.ctx.beginPath();
    // this.ctx.strokeStyle = "white";
    // this.ctx.lineWidth = 2;
    // this.ctx.moveTo(this.x + 10, this.y + 21);
    // this.ctx.lineTo(this.x + this.width - 15, this.y + 21);
    // this.ctx.lineTo(this.x + this.width - 15, this.y + this.height - 17);
    // this.ctx.lineTo(this.x + 10, this.y + this.height - 17);
    // this.ctx.lineTo(this.x + 10, this.y + 21);
    // this.ctx.stroke();
  }

  obstacleCrash(hero, ani, btn) {
    const x = (this.x + 10) - hero.maxX;
    // this.ctx.beginPath();
    // this.ctx.strokeStyle = "red";
    // this.ctx.moveTo(hero.maxX, hero.maxY);
    // this.ctx.lineTo(this.maxX - 10, this.maxY - 10);
    // this.ctx.stroke();
    // this.ctx.beginPath();
    // this.ctx.strokeStyle = "blue";
    // this.ctx.moveTo(hero.maxX, hero.y);
    // this.ctx.lineTo(this.x + 5, this.y + 21);
    // this.ctx.stroke();
    const x2 = hero.x - (this.maxX - 15);
    const y = (this.y + 21) - hero.maxY;
    const y2 = hero.y - (this.maxY - 17);
    if (hero.shieldState === false) {
      if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
        cancelAnimationFrame(ani);
        btn.removeAttribute("disabled");
      }
    }
  }
}
