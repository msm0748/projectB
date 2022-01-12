const canvas = document.getElementById("canvas");
const obstacleImg = new Image();
obstacleImg.src = "png/obPink.png";
class ObstaclePink {
  constructor(ctx) {
    this.ctx = ctx;
    this.highAndLow = 60;
    this.pngWidth = obstacleImg.width / 2;
    this.pngHeight = obstacleImg.height;
    this.width = 85;
    this.height = 85;
    this.x = canvas.width - this.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height));
    // this.y = 80;
    this.speed = 5;
    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 2; i++) {
      this.spriteFrames.push(i);
    }
    this.spriteX = 0;
    this.spriteY = 0;
    this.frameSpeed = 0;
    this.plusY = this.y + this.highAndLow;
    this.minusY = this.y - this.highAndLow;
    this.upDown = Math.floor(Math.random() * 2) === 1 ? false : true;
  }
  update() {
    this.x -= this.speed;
    this.frameSpeed++;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    if (this.upDown === false) {
      if (this.y + this.height < canvas.height) {
        this.y += 6;
        if (this.y + this.height >= canvas.height) {
          this.upDown = true;
        }
      }
    } else {
      this.y -= 6;
        if (this.y <= 0) {
            this.upDown = false;
        }
    }

    // if(this.frameSpeed % 10 === 0){
    //   this.frameIdx++;
    // }
    // if (this.frameIdx === 2) {
    //   this.frameIdx = 0;
    // }
  }
  draw() {
    this.ctx.drawImage(
      obstacleImg,
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

export default ObstaclePink;
