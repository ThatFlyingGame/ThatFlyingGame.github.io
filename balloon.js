let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let speed = zoom = 1;
let timer = setInterval(draw,1000/60);

//let framecount = 0;

class Looper {
	constructor(id,scrollSpeed,y) {
		this.image = document.getElementById(id);
		this.scrollSpeed = scrollSpeed;
		this.x = 0;
		this.y = y;
	}

	draw() {
		let scrollSpeed = this.scrollSpeed * speed;

		this.x -= scrollSpeed;
		if (this.x < -960) {
			this.x = 0;
		}
		ctx.drawImage(this.image, this.x, this.y);
		ctx.drawImage(this.image, this.x + 960, this.y);
	}
}

class Balloon {
	constructor() {
		this.id = document.getElementById("balloon");
		this.rope = [document.getElementById("rope_0"),document.getElementById("rope_1"),document.getElementById("rope_2")];
		this.x  = 480 - (this.id.width/2);
		this.y  = 240 - (this.id.height/2);
		this.vel = 0;
	}
	
	draw() {
		if (goingUp) {
			this.vel = 1.5;
		} else {
			this.vel = -0.1;
		}

		this.y -= this.vel;
		if (this.y > 480-this.id.height) this.y = 480 - this.id.height;

		ctx.drawImage(this.id, this.x, this.y);

		let ropeNum;
		if (speed < 2/3) ropeNum = 0;
		if (speed > 2/3) ropeNum = 1;
		if (speed > 4/3) ropeNum = 2;

		ctx.drawImage(this.rope[ropeNum], this.x + 18, this.y + 64);
	}
}

class Bird {
	constructor(x,y) {
		this.frames = [];
		for (let i=0;i<6;i+=2) {
			this.frames.push(document.getElementById("bird_"+i));
		}
		for (let i=5;i>0;i--) {
			this.frames.push(document.getElementById("bird_"+i));
		}
		this.startX = x + 1200;
		this.startY = y;
		this.x  = x;
		this.y  = y;
		this.vel = 3;
		this.currentFrame = 0;
		this.frameRate = 10;

		setInterval(this.newFrame.bind(this),1000/this.frameRate);
	}
	
	draw() {
		this.x -= this.vel - speed;

		ctx.drawImage(this.frames[this.currentFrame], this.x, this.y);
	}

	newFrame() {
		this.currentFrame++;
		if (this.currentFrame >= this.frames.length) this.currentFrame = 0;
	}
}

class Leaf {
	constructor(x,y) {
		this.image = document.getElementById("leafRight");
		this.x  = x;
		this.y  = y;
		this.frameRate = 10;
		this.currentFrame = 0;

		setInterval(this.newFrame.bind(this),1000/this.frameRate);
	}
	
	draw() {
		ctx.drawImage(this.image, 0, this.currentFrame * 32, 128, 32, this.x, this.y, 128, 32);
		ctx.drawImage(this.image, 0, this.currentFrame * 32, 128, 32, this.x+5, this.y+10, 128, 32);
		ctx.drawImage(this.image, 0, this.currentFrame * 32, 128, 32, this.x+10, this.y-5, 128, 32);
	}

	newFrame() {
		this.currentFrame++;
		if (this.currentFrame >= 20) this.currentFrame = 0;
	}
}

class Sun {
	constructor() {
		this.image = document.getElementById("sun");
		this.x = 200;
		this.y = -30;
		this.r = 70;
		
	}

	draw() {
		this.y += 0.03;

		//start sunset at 150
		//hide the sun at 250
		//start night time

		this.centreX = this.x + this.r;
		this.centreY = this.y + this.r;

		let sunGradient = ctx.createRadialGradient(this.centreX,this.centreY,0,this.centreX,this.centreY,this.r);
		sunGradient.addColorStop(0,"#FFCC00");
		sunGradient.addColorStop(0.9,"#FFCC0000");
		ctx.fillStyle = sunGradient;
		ctx.fillRect(this.x,this.y,this.r*2,this.r*2);

		/*ctx.fillStyle = "#efed1f";
		ctx.beginPath();
		ctx.arc(sunX+sunR,sunY+sunR,35,0,2*Math.PI);
		ctx.fill();*/

		ctx.drawImage(this.image,this.x+(this.r/2),this.y+(this.r/2));
	}
}

let spawnFlockTimer = setInterval(spawnFlock, 2000);
function spawnFlock() {
	let flockSpawned = false;
	for (let i=0; i<flocks.length;i++) {
		if (flocks[i][0].x < -100 && Math.random() < 0.3 && !flockSpawned) {
				flockSpawned = true;
				//let newHeight = random(120,180);
				for (let j=0;j < flocks[i].length;j++) {
				flocks[i][j].x = flocks[i][j].startX;
				//flocks[i][j].y = newHeight;
			}
		}
	}
}

let mountains = new Looper("mountains",0.5,190);
let mountains2 = new Looper("mountains2",0.4,190);
let forest = new Looper("forest",0.8,330);
let forest2 = new Looper("forest2",0.7,275);
let trees = new Looper("trees",1.1,334);
let trees2 = new Looper("trees2",1,334);
let balloon = new Balloon(); 
let flocks = [
	[new Bird(-100,140), new Bird(-70,120), new Bird(-70,160)],
	[new Bird(-100,100)]
];
let clouds = new Looper("clouds",0.15,0);
let clouds2 = new Looper("clouds2",0.2,70);
let clouds3 = new Looper("clouds3",0.17,120);
let stratus = new Looper("stratus",0.1,180);
let leaf1 = new Leaf(480,240);
let sun1 =  new Sun();

let hills = new Looper("hills",0.9,330);
let hills2 = new Looper("hills2",0.8,330);


function draw() {
	ctx.clearRect(0,0,960,480);

	
	ctx.imageSmoothingEnabled = false;

	//framecount++;
	//if (framecount > 60) framecount = 0;

	let sky = ctx.createLinearGradient(0,0,0,160);
	sky.addColorStop(0,"#38acff");
	sky.addColorStop(1,"#a3d9ff");
	ctx.fillStyle = sky;
	ctx.fillRect(0,0,960,480);

	sun1.draw();
	stratus.draw();
	clouds3.draw();
	clouds2.draw();
	clouds.draw();
	mountains2.draw();
	mountains.draw();

	// hills2.draw();
	// hills.draw();

	forest2.draw();
	forest.draw();
	for (let i=0; i<flocks.length;i++) {
		for (let j=0;j<flocks[i].length;j++) {
			flocks[i][j].draw();
		}
	}
	balloon.draw();
	trees2.draw();
	trees.draw();
	leaf1.draw();
}

function getSpeed() {
	speed = document.getElementById("slidy").value;
}

function getZoom() {
	let newScale = document.getElementById("slidy2").value;
	
	if (newScale < zoom) {
		ctx.scale(1-Math.abs(zoom-newScale),1-Math.abs(zoom-newScale));
		zoom = newScale;
	}

	if (newScale > zoom) {
		ctx.scale(1+Math.abs(zoom-newScale),1+Math.abs(zoom-newScale));
		zoom = newScale;
	}

}

let goingUp = false;

function keyDown(event) {
	if (event.keyCode == 32) {
		goingUp = true;
	}
}

function keyUp(event) {
	if (event.keyCode == 32) {
		goingUp = false;
	}
}

function random(l,u) {
	let c = true;
	while (c) {
		let r = "";
		for (let i = 0; i <= u.toString().length; i++) {
			r += (Math.random()*10).toFixed(0).toString();
		}
		if (l < 0 && Math.random() < 0.5) {
			r *= -1;
		}
		if (r >= l && r <= u) {
			c = false;
			return r*1;
		}
	}
}