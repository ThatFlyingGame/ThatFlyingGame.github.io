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

let environment = [];

function changeBiome(number) {
	//beach
	if (number == 0) {
		environment = [
			new Loop("clouds",0.15,0),
			new Loop("clouds2",0.2,70),
			new Loop("clouds3",0.17,120),
			new Loop("stratus",0.1,180),
			new Loop("mountains4",0.4,200),
			new Loop("mountains3",0.5,200),
			new Loop("hills2",0.8,250),
			new Loop("hills",0.9,250),
			new Loop("beach",1,420,1),
			new Loop("sea",1,680),
			balloon
		]
	}

	//farmland with houses
	if (number == 1) {
		environment.splice(8,0,balloon);	//move balloon to different layer
		environment.pop();				 	//remove old balloon
		environment.pop();			     	//remove the sea layer	
	}

	//house to fence transition
	if (number == "beach") {
		environment.splice(9,0,new Loop("housesFence",1,420,1)); //add the fence
		environment[9].state = 0;			//make the fence fade in
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
}