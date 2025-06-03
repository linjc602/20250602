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

  // 偵測到手部時，畫出手指連線
  if (typeof hands !== "undefined" && hands.length > 0) {
    for (let hand of hands) {
      // 0~4
      stroke(255, 0, 0);
      for (let i = 0; i < 4; i++) {
        let a = hand.keypoints[i];
        let b = hand.keypoints[i + 1];
        line(a.x, a.y, b.x, b.y);
      }
      // 5~8
      stroke(0, 255, 0);
      for (let i = 5; i < 8; i++) {
        let a = hand.keypoints[i];
        let b = hand.keypoints[i + 1];
        line(a.x, a.y, b.x, b.y);
      }
      // 9~12
      stroke(0, 0, 255);
      for (let i = 9; i < 12; i++) {
        let a = hand.keypoints[i];
        let b = hand.keypoints[i + 1];
        line(a.x, a.y, b.x, b.y);
      }
      // 13~16
      stroke(255, 128, 0);
      for (let i = 13; i < 16; i++) {
        let a = hand.keypoints[i];
        let b = hand.keypoints[i + 1];
        line(a.x, a.y, b.x, b.y);
      }
      // 17~20
      stroke(128, 0, 255);
      for (let i = 17; i < 20; i++) {
        let a = hand.keypoints[i];
        let b = hand.keypoints[i + 1];
        line(a.x, a.y, b.x, b.y);
      }
    }
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
