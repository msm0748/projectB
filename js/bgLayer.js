const bg = new Image();
bg.src = "layer-4.png";
class BgLayer {
    constructor(ctx){
        this.bgWidth = bg.width;
        this.x = 0;
        this.x2 = this.bgWidth;
        this.ctx = ctx;
        this.speed = 5;
    }
    draw(){
        if(this.x < -this.bgWidth) this.x = this.bgWidth + this.x2 - this.speed;
        else this.x -= this.speed;
        if(this.x2 < -this.bgWidth) this.x2 = this.bgWidth + this.x - this.speed;
        else this.x2 -= this.speed;
        this.ctx.drawImage(
            bg, this.x, 0
        );
        this.ctx.drawImage(
            bg, this.x2, 0
        );
    }
}
export default BgLayer;