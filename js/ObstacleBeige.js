const canvas = document.getElementById("canvas");
const obstacleImg = new Image();
obstacleImg.src = "png/obBeige.png";
class ObstacleBeige {
  constructor(ctx) {
    this.ctx = ctx;
    this.highAndLow = 40;
    this.pngWidth = obstacleImg.width / 2;
    this.pngHeight = obstacleImg.height;
    this.width = 85;
    this.height = 85;
    this.x = canvas.width - this.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height - (this.highAndLow * 2))) + this.highAndLow;
    this.speed = 8;
    console.log(this.speed)
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
    this.upDown = false;
  }
  update() {
    this.x -= this.speed;
    if (this.upDown === false) {
      if (this.y > this.minusY) {
        this.y -= 2;
        if (this.y === this.minusY) {
          this.upDown = true;
        }
      }
    } else {
      if (this.y < this.plusY) {
        if (this.y < this.plusY) {
          this.y += 2;
          if (this.y === this.plusY) {
            this.upDown = false;
          }
        }
      }
    }
    this.frameSpeed++;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
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

export default ObstacleBeige;
