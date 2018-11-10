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
			new Loop("beach",1,420),
			new Loop("sea",1,680),
			balloon
		]
	}

	//farmland with houses
	if (number == 1) {
		//changeBiome(0)
		environment.splice(8,0,balloon);
		environment.pop();
		environment.pop();
	}

	//farmland with fence
	if (number == 2) {
		changeBiome(1);
		environment[9] = new Loop("fence",1,400);
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