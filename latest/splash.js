class SplashScreen {
	constructor() {
		this.image = document.getElementById("balloon");
		this.balloonX = -50;
		this.balloonY = 200 - (this.image.height/2);
	}

	draw() {
		ctx.fillStyle = "black";
		ctx.fillRect(0,0,960,480);

		ctx.fillStyle = "white";
		ctx.font = "50px Calibri";
    	ctx.fillText("Hovel Co.", 410, 240);

		this.balloonX += 6;
		ctx.fillStyle = "black";
		ctx.fillRect(this.balloonX,this.balloonY, 960, 140);
		ctx.drawImage(this.image, this.balloonX - 20, this.balloonY, 128, 128);
	}
}

let splash = new SplashScreen();