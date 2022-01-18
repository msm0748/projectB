const bg = new Image();
bg.src = "png/bg.png";
class BgLayer {
  constructor(ctx) {
    this.speed = 5;
    this.bgWidth = bg.width;
    this.x = 0;
    this.x2 = this.bgWidth - this.speed;
    this.canvasX = canvas.width / 2;
    this.canvasY = canvas.height / 2;
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
    ctx.drawImage(bg, this.x, 0, this.bgWidth, canvas.height);
    ctx.drawImage(bg, this.x2, 0, this.bgWidth, canvas.height);
  //   this.ctx.font = '48px serif'
  //   this.ctx.textAlign = "center";
  //   this.ctx.textBaseline = "middle";
  //   this.ctx.fillText("-End-", this.canvasX, this.canvasY);
  }
}
