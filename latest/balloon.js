let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let speed = 0;
let goingUp = "initial";
let loops = 0;

let timer = setInterval(draw,1000/60);

function keyDown(event) {
	if (event.keyCode == 32) {
		if (goingUp = "initial") speed = 1;
		goingUp = true;
	}
}

function keyUp(event) {
	if (event.keyCode == 32) {
		goingUp = false;
	}
}

class Loop {
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

		let height = this.image.height * (960 / this.image.width)
		ctx.drawImage(this.image, this.x, cam.height+this.y, 960, height);
		ctx.drawImage(this.image, this.x + 960, cam.height+this.y, 960 , height);
	}
}

class Balloon {
	constructor() {
		this.id = document.getElementById("balloon");
		this.rope = [document.getElementById("rope_0"),document.getElementById("rope_1"),document.getElementById("rope_2")];
		this.x  = 480 - (this.id.width/2);
		this.y  = 200 - (this.id.height/2);
		this.vel = 0;
		this.riseV = 1.5;
		this.fallV = 0.4;
		this.onBeach = true;
	}
	
	draw() {
		if (goingUp == true) this.vel = this.riseV
		else this.vel = -this.fallV;

		if (this.onBeach) cam.height += this.vel;
		else this.y -= this.vel;
		
		if (this.y > 480 - this.id.height) this.y = 480 - this.id.height;
		if (this.y < 0) this.y = 0;
		
		ctx.drawImage(this.id, this.x, this.y);

		let ropeNum;
		if (speed < 2/3) ropeNum = 0;
		if (speed > 2/3) ropeNum = 1;
		if (speed > 4/3) ropeNum = 2;

		ctx.drawImage(this.rope[ropeNum], this.x + 18, this.y + 64);
	}
}

class Camera {
	constructor() {
		this.x;
		this.y;
		this.zoom = 1;
		this.height = -400;
	}
	
	update() {
		if (this.height > 0) {
			balloon.onBeach = false;
			speed = 1;
			this.height = 0;
			changeBiome(1);
		}
		if (this.height < -400) this.height = -400;
		if (this.height < 0) speed = (this.height + 400) / 400;

		let newZoom = document.getElementById("slidy2").value;
	
		this.x = (1 - (newZoom/this.zoom)) * 480;


		this.y = (1 - (newZoom/this.zoom)) * 240;
		//this.y += 0;
		//console.log((balloon.y / 480));
		//console.log(this.y)

		ctx.transform(newZoom/this.zoom,0,0,newZoom/this.zoom,this.x,this.y);
		this.zoom = newZoom;
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
		this.y = 150;
		this.r = 70;
	}

	draw() {
		this.centreX = this.x + this.r;
		this.centreY = cam.height+this.y + this.r;

		let sunGradient = ctx.createRadialGradient(this.centreX,this.centreY,0,this.centreX,this.centreY,this.r);
		sunGradient.addColorStop(0,"#FFCC00");
		sunGradient.addColorStop(0.9,"#FFCC0000");
		ctx.fillStyle = sunGradient;
		ctx.fillRect(this.x,cam.height+this.y,this.r*2,this.r*2);

		ctx.drawImage(this.image,this.x+(this.r/2),cam.height+this.y+(this.r/2));
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

let balloon;
window.onload = function() {
	balloon = new Balloon();
	changeBiome(0);
};

let flocks = [
	[new Bird(-100,140), new Bird(-70,120), new Bird(-70,160)],
	[new Bird(-100,100)]
];
let leaf1 = new Leaf(480,240);
let sun =  new Sun();
let cam = new Camera();

function draw() {
	ctx.clearRect(0,0,960,480);

	ctx.imageSmoothingEnabled = false;

	let sky = ctx.createLinearGradient(0,0,0,160);
	sky.addColorStop(0,"#38acff");
	sky.addColorStop(1,"#a3d9ff");
	ctx.fillStyle = sky;
	ctx.fillRect(0,0,960,480);

	sun.draw();

	for (var i=0; i<environment.length;i++) {
		environment[i].draw();
	}

	// 	if (!balloon.onBeach) beach.draw();
	// }
	
	// for (let i=0; i<flocks.length;i++) {
	// 	for (let j=0;j<flocks[i].length;j++) {
	// 		flocks[i][j].draw();
	// 	}
	// }
	
	//leaf1.draw();

	cam.update();
}

function getSpeed() {
	speed = document.getElementById("slidy").value;
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