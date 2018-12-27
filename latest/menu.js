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
		this.wasHovered = false;
	}

	draw() {
		if (mouseY > this.top && mouseY < this.btm && mouseX > this.lft && mouseX < this.rgt) {
			this.hovered = true;
			ctx.fillStyle = "#FFFFFFAA";

		} else {
			this.hovered = false;
			ctx.fillStyle = "white";
		}

		if(this.hovered && !this.wasHovered) {
			document.getElementById("menuTick").load();
			document.getElementById("menuTick").play();
		}

		this.wasHovered = this.hovered;
		
		ctx.font = this.fontSize+"px Dosis"
		ctx.fillText(this.text,this.x,this.y);
	}
}

let menuBtns = [
	new MenuButton("play",480,260,50),
	new MenuButton("levels",480,340,50),
	new MenuButton("settings",480,420,50)
];

function drawMenu() {
	ctx.fillStyle = "white";
	ctx.textAlign="center";

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