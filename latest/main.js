let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let speed = 1;
let goingUp = "initial";
let loops = 0;

let viewing = "splash";
setTimeout(function(){
	viewing = "menu";
},4000)

timer = setInterval(draw,1000/60);

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

	if (viewing == "splash") {
		splash.draw();
	}

	if (viewing == "menu") {
		let sunriseSky = ctx.createLinearGradient(0,0,0,340);
		sunriseSky.addColorStop(0,"#9f7c72");
		sunriseSky.addColorStop(0.5,"#f28e27");
		sunriseSky.addColorStop(1,"#f6530b");
		ctx.fillStyle = sunriseSky;
		ctx.fillRect(0,0,960,340);

		let risingSun = document.getElementById("risingSun");
		ctx.drawImage(risingSun, 150, 200);

		for (var i=0; i<menuEnvironment.length;i++) {
			menuEnvironment[i].draw();
		}
		//stackBlurCanvasRGB("canvas",0,0,960,480,10);
		// canvas.crossOrigin = "Anonymous";
		// StackBlur.canvasRGB("canvas", 0, 0, 960, 480, 10);
	}

	if (viewing == "game") {
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