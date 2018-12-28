let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let speed = 1;
let goingUp = "initial";
let loops = 0;

let viewing = "start";

let animations = [];

timer = setInterval(draw,1000/60);

window.onload = function() {
	document.getElementById("menuBackground").load();
	document.getElementById("balloonBooster").load();
}

function keyDown(event) {
	if (event.keyCode == 32) {
		if (goingUp = "initial") speed = 1;
		goingUp = true;
		document.getElementById("balloonBooster").volume = 0.4;
		document.getElementById("balloonBooster").play();
	}
}

function keyUp(event) {
	if (event.keyCode == 32) {
		goingUp = false;
		document.getElementById("balloonBooster").pause();
	}
}

let mouseX;
let mouseY;
function getMousePos(event) {
	mouseX = event.offsetX;
	mouseY = event.offsetY;
}

function mouseClick() {
	if (viewing == "start" && startBtn.hovered) {
		
		viewing = "splash";
		document.getElementById("splashVideo").play();
		canvas.style.cursor = "default";

		setTimeout(function(){
			viewing = "menu";
			document.getElementById("splashVideo").style.display = "none";
			document.getElementById("menuBackground").play();
			document.getElementById("musicMenu").play();
		},6000)
		
		setTimeout(function(){
			document.getElementById("musicMenu2").loop = true;
			document.getElementById("musicMenu2").play();
		},87000)
	}

	if (viewing == "menu" && menuBtns[0].hovered) {
		viewing = "game";
		canvas.style.cursor = "default";
		document.getElementById("musicMenu").pause();
		document.getElementById("musicMenu2").pause();
		document.getElementById("musicMenu2").loop = false;
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

	if (viewing == "start") {
		drawStartButton();
	}

	if (viewing == "menu") {
		drawMenu();
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

	for (let i=0;i<animations.length;i++) {
		animations[i].draw();
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