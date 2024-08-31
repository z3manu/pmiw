let img;
let columnas = 3;
let filas = 3;
let tamaño = 100;
let margen = 0;

let rombo = [];
let colores = [];
let coloresO = [];

function preload() {
  img = loadImage("https://media.mutualart.com/Images/2010_09/29/0020/965962/129297375954115864_c513de99-cce5-47ca-b049-4c3f61278b97_185550.Jpeg?w=768");
}

function setup() {
  createCanvas(800, 400);

  coloresO = [
    color(0, 128, 0), color(0, 0, 255), color(255, 0, 0), 
    color(128, 0, 128), color(255, 255, 0), color(0, 0, 255), 
    color(255, 0, 0), color(0, 128, 0), color(0, 0, 255)
  ];

  rcolor();

  for (let i = 0; i < columnas; i++) {
    rombo[i] = [];
    for (let j = 0; j < filas; j++) {
      rombo[i][j] = false;
    }
  }
  
  rombo[1][1] = true;
}

function draw() {
  background(255);
  noStroke();
  image(img, 0, 0, width / 2, height);
  
  push();
  translate(width / 2, height / 6);
  for (let i = 0; i < columnas; i++) {
    for (let j = 0; j < filas; j++) {
      obra(i * (tamaño + margen), j * (tamaño + margen), tamaño, acolor(i, j), rombo[i][j]);
    }
  }
  pop();
}

function obra(x, y, tamaño, c, isRombo) {
  fill(c);
  rect(x, y, tamaño, tamaño);

  if (isRombo) {
    fill(0);
    beginShape();
    vertex(x + tamaño * 0.5, y + tamaño * 0.2);
    vertex(x + tamaño * 0.8, y + tamaño * 0.5);
    vertex(x + tamaño * 0.5, y + tamaño * 0.8);
    vertex(x + tamaño * 0.2, y + tamaño * 0.5);
    endShape(CLOSE);
  } else {
    fill(200);
    ellipse(x + tamaño / 2, y + tamaño / 2, tamaño * 0.9, tamaño * 0.9);
  }
}

function rcolor() {
  colores = coloresO.map(c => c);
}

function acolor(col, fila) {
  return colores[fila * columnas + col];
}

function mousePressed() {
  let col = Math.floor((mouseX - width / 2) / (tamaño + margen));
  let fila = Math.floor((mouseY - height / 6) / (tamaño + margen));
  if (col >= 0 && col < columnas && fila >= 0 && fila < filas) {
    rombo[col][fila] = !rombo[col][fila];
    redraw();
  }
}

function keyPressed() {
  if (key === 'c' || key === 'C') {
    for (let i = 0; i < colores.length; i++) {
      colores[i] = color(random(255), random(255), random(255));
    }
    redraw();
  } else if (key === 'r' || key === 'R') {
    rcolor();
    rombo[1][1] = true;
    redraw();
  }
}
