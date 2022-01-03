// const canvas = document.getElementById("CANVAS_1");
// const ctx = canvas.getContext("2d");
const heroImg = new Image();
heroImg.src = "ca.png";

class Hero {
  //주인공 셋팅
  constructor(ctx) {
    this.x = 20;
    this.y = 250;
    this.width = 150;
    this.height = 250;
    this.ctx = ctx;
  }
  draw(sX, sY) {
    this.ctx.drawImage(
      heroImg,
      sX,
      sY,
      266,
      366,
      this.x,
      this.y,
      this.width,
      this.height
    );
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y + this.height);
    this.ctx.lineTo(this.x + this.width, this.y + this.height);
    this.ctx.stroke();
  }
}
export default Hero;
