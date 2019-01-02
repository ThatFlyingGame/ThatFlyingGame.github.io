class MenuButton {
	constructor(text,x,y,fontSize,active) {
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
		this.text = text;
		this.top = y - fontSize;
		this.btm = y + fontSize/2;
		this.lft = x - 100;
		this.rgt = x + 100;
		this.hovered = false;
		this.wasHovered = false;

		if (active == false) {
			this.active = false;
		} else {
			this.active = true;
		}
	}

	draw() {
		if (mouseY > this.top && mouseY < this.btm && mouseX > this.lft && mouseX < this.rgt && this.active) {
			this.hovered = true;
			ctx.fillStyle = "#FFFFFFAA";
		} else {
			this.hovered = false;
			ctx.fillStyle = "white";
		}

		if (!this.active) ctx.fillStyle = "#FFFFFFAA";

		if(this.hovered && !this.wasHovered && this.active) {
			document.getElementById("menuTick").load();
			document.getElementById("menuTick").play();
		}

		this.wasHovered = this.hovered;
		
		ctx.font = this.fontSize+"px Dosis"
		ctx.fillText(this.text,this.x,this.y);
	}
}

function closeMenu() {
	canvas.style.cursor = "default";
	document.getElementById("musicMenu").pause();
	document.getElementById("musicMenu2").pause();
	document.getElementById("musicMenu2").loop = false;
	document.getElementById("menuBackground").style.display = "none";
	document.getElementById("menuBackground").pause();
}

let menuBtns = [
	new MenuButton("play",480,240,50),
	new MenuButton("to do list",480,320,50),
	new MenuButton("levels",480,400,50)
];

function drawMenu() {
	ctx.fillStyle = "white";
	ctx.textAlign = "center";

	ctx.font = "75px Philosopher"
	ctx.fillText("That Flying Game",480,120);

	let oneHovered = false;
	for (let i=0;i<menuBtns.length;i++) {
		menuBtns[i].draw();
		if (menuBtns[i].hovered) oneHovered = true;
	}
	canvas.style.cursor = "initial";
	if (oneHovered) canvas.style.cursor = "pointer";
}

let levelBtns = [
	new MenuButton("farmland",280,240,50),
	new MenuButton("forest",480,240,50),
	new MenuButton("desert",680,240,50),
	new MenuButton("jungle",280,320,50,false),
	new MenuButton("void",480,320,50,false),
	new MenuButton("locked",680,320,50,false),
	new MenuButton("locked",280,400,50,false),
	new MenuButton("locked",480,400,50,false),
	new MenuButton("locked",680,400,50,false)
];

function drawLevelsMenu() {
	ctx.fillStyle = "white";
	ctx.textAlign = "center";

	ctx.font = "75px Philosopher"
	ctx.fillText("Choose Level",480,120);

	let oneHovered = false;
	for (let i=0;i<levelBtns.length;i++) {
		levelBtns[i].draw();
		if (levelBtns[i].hovered) oneHovered = true;
	}
	canvas.style.cursor = "initial";
	if (oneHovered) canvas.style.cursor = "pointer";
}

class startButton {
	constructor() {
		this.x = 450;
		this.y = 240;
		this.fontSize = 50;
		this.top = this.y - this.fontSize;
		this.btm = this.y + this.fontSize/2 - 3;
		this.lft = this.x - 50;
		this.rgt = this.x + 148;
		this.hovered = false;
		this.btnColour = "#0072ff";
	}

	draw() {
		ctx.fillStyle = "#333";
		ctx.fillRect(0,0,960,480);

		ctx.font = "0px Philosopher"
		ctx.fillText("filler to load google font",0,0);

		// ctx.fillStyle = "#0072ff";
		// ctx.fillRect(,,,this.btm - this.top);

		drawRoundedRect(this.lft,this.top,this.rgt - this.lft,this.btm - this.top,100,this.btnColour);

		if (mouseY > this.top && mouseY < this.btm && mouseX > this.lft && mouseX < this.rgt) {
			this.hovered = true;
			this.btnColour = "#0072ffdd";
			canvas.style.cursor = "pointer";

		} else {
			this.hovered = false;
			this.btnColour = "#0072ff";
			canvas.style.cursor = "default";
		}

		ctx.fillStyle = "white";
		ctx.font = "50px Dosis"
		ctx.fillText("start",this.x,this.y);
	}
}
let startBtn = new startButton();

function drawStartButton() {
	startBtn.draw();
}

function drawRoundedRect(x,y,w,h,r,c) {
	let rad = r;
	if (r >= w/2) rad = w/2; 
	if (r >= h/2) rad = h/2;

	ctx.fillStyle = c;

	let wid = w - rad*2;
	let hgt = h - rad;

	ctx.beginPath();
	ctx.arc(x+rad,y+rad,rad,Math.PI,1.5*Math.PI);
	ctx.lineTo(x+wid,y);
	ctx.arc(x+wid+rad,y+rad,rad,1.5*Math.PI,0);
	ctx.lineTo(x+wid+rad*2,y+hgt);
	ctx.arc(x+wid+rad,y+hgt,rad,0,0.5*Math.PI);
	ctx.lineTo(x+rad,y+hgt+rad);
	ctx.arc(x+rad,y+hgt,rad,0.5*Math.PI,Math.PI);
	ctx.fill();
}