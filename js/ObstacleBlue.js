const canvas = document.getElementById("canvas");
const obstacleImg = new Image();
obstacleImg.src = "png/obBlue.png";
class ObstacleBlue {
  constructor(ctx) {
    this.ctx = ctx;
    this.pngWidth = obstacleImg.width / 2;
    this.pngHeight = obstacleImg.height;
    this.width = 85;
    this.height = 85;
    this.x = canvas.width - this.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height));
    this.speed = 6;
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
    if(this.frameSpeed % 10 === 0){
      this.frameIdx++;
    }
    if (this.frameIdx === 2) {
      this.frameIdx = 0;
    }
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
    // this.ctx.beginPath();
    // this.ctx.moveTo(this.x, this.y);
    // this.ctx.lineTo(this.maxX, this.y);
    // this.ctx.moveTo(this.x, this.maxY);
    // this.ctx.lineTo(this.maxX, this.maxY);
    // this.ctx.moveTo(this.x, this.y);
    // this.ctx.lineTo(this.x, this.maxY);
    // this.ctx.moveTo(this.maxX, this.y);
    // this.ctx.lineTo(this.maxX, this.maxY);
    // this.ctx.stroke();
  }
  obstacleCrash(hero, ani, btn) {
    const x = this.x + 25 - hero.maxX; // 주둥이 제외
    const x2 = hero.x - this.maxX + 18; // 꼬리 제외
    // console.log(this.maxX)
    const y = this.y + 13 - hero.maxY; // 벼슬 제외
    const y2 = hero.y - this.maxY + 16; // 다리 제외
    if (hero.shieldState === false) {
      if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
        console.log("부딛힘")
        cancelAnimationFrame(ani);
        btn.removeAttribute("disabled");
      }
    }
  }
}

export default ObstacleBlue;
