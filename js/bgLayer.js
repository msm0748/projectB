const bg = new Image();
bg.src = "img/bg.png";
class BgLayer {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.speed = 5;
    this.bgWidth = bg.width;
    this.x = 0;
    this.x2 = this.bgWidth - this.speed;
    this.canvasX = this.canvas.width / 2;
    this.canvasY = this.canvas.height / 2;
  }
  update(pointNumber) {
    if (pointNumber < 50) {
      if (this.x <= -this.bgWidth) {
        this.x = this.bgWidth + this.x2 - this.speed;
      }
      if (this.x2 <= -this.bgWidth) {
        this.x2 = this.bgWidth + this.x - this.speed;
      }
      this.x -= this.speed;
      this.x2 -= this.speed;
    }
  }

  draw() {
    this.ctx.drawImage(bg, this.x, 0, this.bgWidth, this.canvas.height);
    this.ctx.drawImage(bg, this.x2, 0, this.bgWidth, this.canvas.height);
  }
}
export default BgLayer;
