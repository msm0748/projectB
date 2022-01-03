class Obstacle {
  constructor(ctx) {
    this.x = 450;
    this.y = 450;
    this.width = 50;
    this.height = 50;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Obstacle;
