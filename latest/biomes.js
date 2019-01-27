class Loop {
	constructor(id,scrollSpeed,y,lifespan) {
		this.id = id;
		this.image = document.getElementById(id);
		this.scrollSpeed = scrollSpeed;
		this.x = 0;
		this.y = y;
		this.state = 1;
		this.loopNum = 1;
		this.lifespan = lifespan;
	}

	draw() {
		let scrollSpeed = this.scrollSpeed * speed;

		this.x -= scrollSpeed;
		if (this.x < -960) {
			if (this.id == "housesFence") console.log("here")
			this.loopNum++;
			
			if (this.state == 0) this.state = 1;
			if (this.state == 2) {
				this.selfDestruct();
				this.state = 4;
			}

			if (this.loopNum >= this.lifespan) {
				this.state = 2;
				changeBiome(this.id);
			}

			this.x = 0;
		}

		let height = this.image.height * (960 / this.image.width)
		if (this.state == 1 || this.state == 2) ctx.drawImage(this.image, this.x, cam.height+this.y, 960, height);

		if (this.image == document.getElementById("beach")) {
			let thingggg = document.getElementById("trees");
		} 
		else {
			let thingggg = this.image;
		}
		
		if (this.state == 1 || this.state == 0 || this.state == 3) ctx.drawImage(this.image, this.x + 960, cam.height+this.y, 960 , height);

		//if (this.state == 3) ctx.drawImage(this.image, this.x + 960, cam.height+this.y, 960 , height);
	}

	selfDestruct() {
		for (let i=0;i<environment.length;i++) {
			if (environment[i].id == this.id) {
				environment.splice(i,1);
			}
		}
	}
}

class Sky {
	constructor(colourTop,colourBtm,sunId,sunY,sunDy) {
		this.colourTop = colourTop;
		this.colourBtm = colourBtm;

		this.sun = document.getElementById(sunId);
		this.sunY = sunY;
		this.sunDy = sunDy;

		this.sunX = 200;
		this.sunR = 70;
	}

	draw() {
		let sky = ctx.createLinearGradient(0,0,0,160);
		sky.addColorStop(0,this.colourTop);
		sky.addColorStop(1,this.colourBtm);
		ctx.fillStyle = sky;
		ctx.fillRect(0,0,960,480);

		this.sunY += this.sunDy;

		let centreX = this.sunX + this.sunR;
		let centreY = cam.height + this.sunY + this.sunR;

		let sunGradient = ctx.createRadialGradient(centreX,centreY,0,centreX,centreY,this.sunR);
		sunGradient.addColorStop(0,"#FFCC00");
		sunGradient.addColorStop(0.9,"#FFCC0000");
		ctx.fillStyle = sunGradient;
		ctx.fillRect(this.sunX,cam.height+this.sunY,this.sunR*2,this.sunR*2);

		ctx.drawImage(this.sun,this.sunX+(this.sunR/2),cam.height+this.sunY+(this.sunR/2));
	}
}

let environment = [];

function changeBiome(number) {
	//beach
	if (number == 0) {
		environment = [
			new Sky("#38acff","#a3d9ff","sun",150,0),
			new Loop("clouds",0.15,0),
			new Loop("clouds2",0.2,70),
			new Loop("clouds3",0.17,120),
			new Loop("stratus",0.1,180),
			new Loop("farmMountains2",0.4,230),
			new Loop("farmMountains",0.5,240),
			new Loop("farmHills2",0.8,250),
			new Loop("farmHills",0.9,250),
			new Loop("beach",1,420,1),
			new Loop("sea",1,680),
			balloon
		]
	}

	//farmland with houses
	if (number == 1) {
		environment.splice(9,0,balloon);	//move balloon to different layer
		environment.pop();				 	//remove old balloon
		environment.pop();			     	//remove the sea layer	
	}

	//house to fence transition
	if (number == "beach") {
		environment.splice(10,0,new Loop("housesFence",1,420,1)); //add the fence
		environment[10].state = 0;			//make the fence fade in
		//environment[9].x = 960-2;
	}

	if (number == "housesFence") {

	}

	//forest
	if (number == 3) {
		environment = [
			new Loop("clouds",0.15,0),
			new Loop("clouds2",0.2,70),
			new Loop("clouds3",0.17,120),
			new Loop("stratus",0.1,180),
			new Loop("mountains2",0.4,190),
			new Loop("mountains",0.5,190),
			new Loop("forest2",0.7,275),
			new Loop("forest",0.8,330),
			balloon,
			new Loop("trees2",1,334),
			new Loop("trees",1.1,334)
		]
	}

	//desert
	if (number == 4) {
		environment = [
			new Loop("desertMountains",0.5,200),
			new Loop("dunes2",0.7,250),
			new Loop("dunes",0.8,240),
			balloon,
			new Loop("sand",1,350)
		]
	}
}