const canvas = document.getElementById("canvas");
const shieldImg = new Image();
shieldImg.src = "png/shield.png";
class Shield {
  constructor(ctx, speed) {
    this.ctx = ctx;

    this.width = 50;
    this.height = 50;
    this.x = canvas.width - this.width;
    this.y = Math.floor(Math.random() * (canvas.height - this.height));
    this.speed = speed;
  }
  update() {
    this.x -= this.speed;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
  }
  draw() {
    this.ctx.drawImage(shieldImg, this.x, this.y, this.width, this.height);
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
  itemCrash(hero, itemArr, i) {
    const x = this.x - hero.maxX;
    const x2 = hero.x - this.maxX;
    const y = this.y - hero.maxY;
    const y2 = hero.y - this.maxY;
    if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
      hero.heroShieldImg.src = "png/sp_shield.png";
      hero.shieldState = true;
      itemArr.splice(i, 1);
      console.log("먹음");
      setTimeout(() => {
        hero.heroShieldImg.src = "png/sp_shield0.png";
      }, 2000);
      setTimeout(() => {
        console.log("끝");
        // hero.heroImg.src = "png/sp.png";
        hero.shieldState = false;
      }, 3000);
    }
  }
}
export default Shield;
