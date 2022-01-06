const canvas = document.getElementById("canvas");

class Obstacle {
  constructor(ctx) {
    this.width = 50;
    this.height = 100;
    this.x = canvas.width - this.width;
    this.y = canvas.height - this.height;
    this.ctx = ctx;
  }
  draw() {
    this.ctx.fillStyle = "red";
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Obstacle;
