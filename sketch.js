let video;
let handpose;
let predictions = [];

let garbageItems = [];
let grabbedItem = null;

function setup() {
  createCanvas(800, 600);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, () => {
    console.log("Handpose model ready!");
  });
  handpose.on("predict", results => {
    predictions = results;
  });

  // 建立 6 個垃圾物件
  for (let i = 0; i < 6; i++) {
    let x = random(200, 600);
    let y = random(100, 500);
    garbageItems.push({ x, y, r: 20 });
  }

  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(240);
  image(video, 0, 0, width, height); // 畫出攝影機畫面

  drawTrashBins();

  // 畫垃圾
  for (let g of garbageItems) {
    fill(g === grabbedItem ? 'orange' : 150);
    circle(g.x, g.y, g.r * 2);
  }

  // 處理手勢拖曳
  if (predictions.length > 0) {
    let hand = predictions[0];
    let indexTip = hand.annotations.indexFinger[3]; // 食指指尖
    let thumbTip = hand.annotations.thumb[3];       // 拇指指尖

    let ix = indexTip[0];
    let iy = indexTip[1];
    let tx = thumbTip[0];
    let ty = thumbTip[1];

    // 畫圓標出食指與拇指
    fill(255, 0, 0);
    circle(ix, iy, 10);
    fill(0, 0, 255);
    circle(tx, ty, 10);

    // 計算距離
    let d = dist(ix, iy, tx, ty);

    if (d < 50) { // 如果食指與拇指靠近
      if (!grabbedItem) {
        // 嘗試抓住最近的一個垃圾
        for (let g of garbageItems) {
          if (dist(ix, iy, g.x, g.y) < g.r + 20) {
            grabbedItem = g;
            break;
          }
        }
      }

      // 移動被抓的垃圾
      if (grabbedItem) {
        grabbedItem.x = (ix + tx) / 2;
        grabbedItem.y = (iy + ty) / 2;
      }
    } else {
      grabbedItem = null; // 放開
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
