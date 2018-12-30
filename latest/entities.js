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