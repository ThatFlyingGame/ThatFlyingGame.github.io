class Animation {
	constructor() {
	}
	
	draw() {
		
	}
}

class FrameAnimation {
	constructor(id,numFrames,frameRate,x,y,loop) {
		this.image = document.getElementById(id);
		this.numFrames = numFrames;
		this.frameLength = (60/numFrames).toFixed(0);
		this.delay = 1000/frameRate;
		this.x = x;
		this.y = y;
		this.loop = loop;
		this.currentImage = -1;
		this.currentFrame = 0;

		this.timer = setInterval(this.draw,this.delay);
	}
	
	draw() {
		if (this.currentFrame == 60) this.currentFrame = 0;
		if (this.currentFrame/this.frameLength) this.currentImage++;

		//console.log(this.currentImage);
		
		// if (this.currentFrame == this.numFrames) {
		// 	if (this.loop) this.currentFrame = 0;
		// 	if (!this.loop) clearInterval(this.timer);
		// }
		//console.log(this.image);

		let frameHeight = this.image.height / this.numFrames;
		let frameWidth = this.image.width;
		ctx.drawImage(this.image, 0, this.currentImage * frameHeight, frameWidth, frameHeight, this.x, this.y, frameWidth, frameHeight);
		
		this.currentFrame++;
	}
}