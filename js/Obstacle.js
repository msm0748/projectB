class Obstacle {
  constructor(canvas, ctx, img, speed) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.img = img;
    this.pngWidth = this.img.width / 2;
    this.pngHeight = this.img.height;
    this.width = 85;
    this.height = 85;
    this.x = this.canvas.width - this.width;
    this.y = Math.floor(Math.random() * (this.canvas.height - this.height)); //처음 나오는 y값 랜덤, 이미지 삐져나감 방지
    this.speed = speed;
    this.spriteFrames = [];
    this.frameIdx = 0;
    for (let i = 0; i < 2; i++) {
      this.spriteFrames.push(i);
    }
    this.spriteX = 0;
    this.spriteY = 0;
    this.frameSpeed = 0;
  }
  update() {
    this.x -= this.speed;
    this.frameSpeed++;
    this.maxX = this.x + this.width;
    this.maxY = this.y + this.height;
    if (this.frameSpeed % 10 === 0) {
      this.frameIdx++;
    }
    if (this.frameIdx === 2) {
      this.frameIdx = 0;
    }
  }
  draw() {
    this.ctx.drawImage(
      this.img,
      Math.floor(this.spriteFrames[this.frameIdx] % 2) * this.pngWidth,
      Math.floor(this.spriteFrames[this.frameIdx] / 2) * this.pngHeight,
      this.pngWidth,
      this.pngHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  obstacleCrash(hero) {
    const x = this.x + 10 - hero.maxX; // 빈공간 충돌 방지를 위해 상세조정
    const x2 = hero.x - (this.maxX - 15);
    const y = this.y + 21 - hero.maxY;
    const y2 = hero.y - (this.maxY - 17);
    if (hero.shieldState === false) {
      if (x < 0 && y < 0 && y2 < 0 && x2 < 0) {
        hero.gameOver = true;
      }
    }
  }
}
class ObstaclePink extends Obstacle {
  constructor(canvas, ctx, img, speed) {
    super(canvas, ctx, img, speed);
  }
}

class ObstacleYellow extends Obstacle {
  constructor(canvas, ctx, img, speed) {
    super(canvas, ctx, img, speed);
  }
}

class ObstacleBlue extends Obstacle {
  constructor(canvas, ctx, img, speed) {
    super(canvas, ctx, img, speed);
    this.highAndLow = 40;
    this.y =
      Math.floor(
        Math.random() * (this.canvas.height - this.height - this.highAndLow * 2)
      ) + this.highAndLow; //처음 나오는 y값 랜덤, 이미지 삐져나감 방지
    this.plusY = this.y + this.highAndLow;
    this.minusY = this.y - this.highAndLow;
    this.upDown = false;
  }
  update() {
    super.update();
    if (this.upDown === false) {
      if (this.y > this.minusY) {
        this.y -= 2;
        if (this.y === this.minusY) {
          this.upDown = true;
        }
      }
    } else {
      if (this.y < this.plusY) {
        if (this.y < this.plusY) {
          this.y += 2;
          if (this.y === this.plusY) {
            this.upDown = false;
          }
        }
      }
    }
  }
}

class ObstacleRed extends Obstacle {
  constructor(canvas, ctx, img, speed) {
    super(canvas, ctx, img, speed);
    this.upDown = Math.floor(Math.random() * 2) === 1 ? false : true;
  }
  update() {
    super.update();
    if (this.upDown === false) {
      if (this.y + this.height < this.canvas.height) {
        this.y += 4;
        if (this.y + this.height >= this.canvas.height) {
          this.upDown = true;
        }
      }
    } else {
      this.y -= 4;
      if (this.y <= 0) {
        this.upDown = false;
      }
    }
  }
}

export { ObstaclePink, ObstacleYellow, ObstacleBlue, ObstacleRed };
