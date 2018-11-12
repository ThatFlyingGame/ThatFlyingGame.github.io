class MenuButton {
	constructor(text,x,y,fontSize) {
		this.x = x;
		this.y = y;
		this.fontSize = fontSize;
		this.text = text;
		this.top = y - fontSize;
		this.btm = y + fontSize/2;
		this.lft = x - 100;
		this.rgt = x + 100;
		this.hovered = false;
	}

	draw() {
		if (mouseY > this.top && mouseY < this.btm && mouseX > this.lft && mouseX < this.rgt) {
			this.hovered = true;
			ctx.fillStyle = "#FFFFFFAA";

		} else {
			this.hovered = false;
			ctx.fillStyle = "white";
		}
		
		ctx.font = this.fontSize+"px Dosis"
		ctx.fillText(this.text,this.x,this.y);
	}
}

let menuEnvironment = [
	new Loop("mist2",0.1,600),
	new Loop("darkMountains2",0.15,600),
	new Loop("darkMountains",0.2,600),
	new Loop("mist",0.25,610),
	new Loop("darkForest2",0.4,680),
	new Loop("darkForest",0.5,730)
]

let menuBtns = [
	new MenuButton("play",480,260,50),
	new MenuButton("levels",480,340,50),
	new MenuButton("settings",480,420,50)
];

function drawMenu() {
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

	ctx.fillStyle = "white";
	ctx.textAlign="center";

	ctx.font = "75px Philosopher"
	ctx.fillText("That Flying Game",480,120);

	ctx.fillStyle = "white";
	ctx.font = "20px Comic Sans MS";
	ctx.fillText("Still no blur :(", 850, 470);

	let oneHovered = false;
	for (let i=0;i<menuBtns.length;i++) {
		menuBtns[i].draw();
		if (menuBtns[i].hovered) oneHovered = true;
	}
	canvas.style.cursor = "initial";
	if (oneHovered) canvas.style.cursor = "pointer";
}