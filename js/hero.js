const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");
const heroImg = new Image();
const jumpImg = new Image();
heroImg.src = "../png/tt.png";
jumpImg.src = "../png/Jump.png"

class Hero {
  //주인공 셋팅
  constructor(ctx) {
    this.width = 150;
    this.height = 250;
    this.x = 20;
    this.floor = canvas.height - this.height;
    this.y = this.floor;
    this.ctx = ctx;
    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 8; i++) {
      this.spriteFrames.push(i);
    }
  }
  draw(timer, run) {
    if(timer % 4 === 0){
      this.frameIdx++;
    }
    if (this.frameIdx === 8) {
      this.frameIdx = 0;
    }
    if(run === true){
      this.ctx.drawImage(
        heroImg,
        Math.floor(this.spriteFrames[this.frameIdx] % 4) * 310,
        Math.floor(this.spriteFrames[this.frameIdx] / 4) * 490,
        310,
        490,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }else{
      this.ctx.drawImage(
        jumpImg,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    // console.log(Math.floor(this.spriteFrames[frameIdx] / 2) * 490);
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y + this.height);
    this.ctx.lineTo(this.x + this.width, this.y + this.height);
    this.ctx.stroke();
  }
}
export default Hero;
