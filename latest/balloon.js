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