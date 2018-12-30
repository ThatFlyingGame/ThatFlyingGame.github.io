let currentLevel;
let levels;

function createLevels() {
	balloon.onBeach = false;
	cam.height = 0;

	levels = {
		farmland: [
			new Sky("#38acff","#a3d9ff","sun",150,0),
			new Loop("clouds",0.15,0),
			new Loop("clouds2",0.2,70),
			new Loop("clouds3",0.17,120),
			new Loop("stratus",0.1,180),
			new Loop("farmMountains2",0.4,230),
			new Loop("farmMountains",0.5,240),
			new Loop("farmHills2",0.8,250),
			new Loop("farmHills",0.9,220),
			balloon,
			new Loop("fence",0.9,390)
		],
		forest: [
			new Sky("#38acff","#a3d9ff","sun",150,0),
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
		],
		desert: [
			new Sky("#38acff","#a3d9ff","sun",150,0),
			new Loop("desertMountains",0.5,200),
			new Loop("dunes2",0.7,230),
			new Loop("dunes",0.8,200),
			balloon,
			new Loop("sand",1,350)
		]
	};
}
