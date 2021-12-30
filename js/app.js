const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

let xPos = 10;

const dino = {
    x : 10,
    y : 200,
    width: 50,
    height: 50,
    draw(){
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}




class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

let timer = 0;
let cactusArr = [];
let jump = false;
let jumpTimer = 0;
let animation;


function frame(){
    animation = requestAnimationFrame(frame);
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(timer % 200 === 0){
        const cactus = new Cactus();
        cactusArr.push(cactus);
    }
    cactusArr.forEach((value, index, arr) => {

        if(value.x < 0){
            arr.splice(index, 1);
        }
        value.x--;

        crash(dino, value);

        value.draw();
    })
    // cactus.draw();
    if(jump === true){
        dino.y -= 2;
        jumpTimer++;
    }
    if(jump === false){
        if(dino.y < 200){
            dino.y += 2;
        }
    }
    if(jumpTimer > 100){
        jump = false;
        jumpTimer = 0;
    }
    dino.draw();
}
frame();

//충돌 확인

function crash(dino, cactus){
    let x = cactus.x - (dino.x + dino.width);
    let y = cactus.y - (dino.y + dino.height);
    if(x < 0 && y < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }
}

document.addEventListener("keydown", function(e){
    if(e.code === "Space"){
        jump = true;
    }
})
