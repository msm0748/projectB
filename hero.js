// const canvas = document.getElementById("CANVAS_1");
// const ctx = canvas.getContext("2d");
const heroImg = new Image();
heroImg.src = "ca.png";

const hero = {
  //주인공 셋팅
  x: 20,
  y: 250,
  width: 150,
  height: 250,
  draw(ctx, sX, sY) {
    ctx.drawImage(
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
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.stroke();
  },
};
export default hero;
