let garbageItems = [];

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  textSize(18);

  // 隨機產生 6 個垃圾（用圓形代替）
  for (let i = 0; i < 6; i++) {
    let x = random(200, 600); // 避開垃圾桶位置
    let y = random(100, 500);
    garbageItems.push({ x, y, r: 20 });
  }
}

function draw() {
  background(240);

  // 畫垃圾桶
  drawTrashBins();

  // 畫垃圾（圓形）
  for (let g of garbageItems) {
    fill(150);
    circle(g.x, g.y, g.r * 2);
  }
}

function drawTrashBins() {
  // 一般垃圾桶（左邊）
  fill(100);
  rect(50, height / 2 - 50, 80, 100, 10);
  fill(0);
  text("一般垃圾", 90, height / 2 + 70);

  // 資源回收桶（右邊）
  fill(0, 150, 255);
  rect(width - 130, height / 2 - 50, 80, 100, 10);
  fill(0);
  text("資源回收", width - 90, height / 2 + 70);
}
