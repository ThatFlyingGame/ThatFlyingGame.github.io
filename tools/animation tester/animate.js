class FrameAnimation {
	constructor(image,x,y,dx,dy,numFrames,frameRate,loop,mode) {
		this.image = image;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.frameNum = numFrames;
		this.loop = loop;
		this.mode = mode;

		this.currentFrame = 0;
		this.active = true;

		let delay = 1000/frameRate;
		let myself = this;
		function drawThis() {
			myself.draw();
		}
		this.timer = setInterval(drawThis, delay);
	}	
	
	draw() {
		ctx.clearRect(0,0,canvas.width,canvas.height); //REMOVE THIS ONCE IT'S ON THE ACTUAL THING

		ctx.fillStyle = document.getElementById("canvasColour").value; //REMOVE THIS ONCE IT'S ON THE ACTUAL THING
		ctx.fillRect(0,0,canvas.width,canvas.height); //REMOVE THIS ONCE IT'S ON THE ACTUAL THING

		this.frameHeight = this.image.height / this.frameNum;
		this.frameWidth = this.image.width;

		if (this.mode == "scroll") this.scroll();

		this.x += this.dx;
		this.y += this.dy;

		ctx.drawImage(this.image, 0, this.currentFrame * this.frameHeight, this.frameWidth, this.frameHeight, this.x, this.y, this.frameWidth, this.frameHeight);
		
		this.currentFrame++;

		if (this.currentFrame >= this.frameNum) {
			if (this.loop) this.currentFrame = 0;
			else this.active = false;
		}

		if (!this.active) clearInterval(this.timer);
	}

	scroll() {
		if (this.x + this.frameWidth < 0) this.x = canvas.width;
	}
}