const canvas = document.getElementById("canvas");
const bg = new Image();
bg.src = "png/bg.png";
class BgLayer {
  constructor(ctx) {
    this.ctx = ctx;
    this.speed = 5;
    this.bgWidth = bg.width;
    this.x = 0;
    this.x2 = this.bgWidth - this.speed;
  }
  update() {
    if (this.x <= -this.bgWidth) {
      this.x = this.bgWidth + this.x2 - this.speed;
    }
    if (this.x2 <= -this.bgWidth) {
      this.x2 = this.bgWidth + this.x - this.speed;
    }
    this.x -= this.speed;
    this.x2 -= this.speed;
  }
  draw() {
    this.ctx.drawImage(bg, this.x, 0, this.bgWidth, canvas.height);
    this.ctx.drawImage(bg, this.x2, 0, this.bgWidth, canvas.height);
  }
}
export default BgLayer;
