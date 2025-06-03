let handpose;
let video;
let predictions = [];

let circleX = 200;
let circleY = 200;
const circleR = 50; // 半徑 50，直徑 100

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  handpose.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Handpose model ready!");
}

function draw() {
  background(220);

  // 畫圓
  fill(100, 200, 255, 180);
  noStroke();
  ellipse(circleX, circleY, circleR * 2);

  // 畫攝影機畫面（可選）
  // image(video, 0, 0, width, height);

  // 檢查是否有兩隻手
  if (predictions.length >= 2) {
    // 取得左右手
    let hand1 = predictions[0];
    let hand2 = predictions[1];

    // 取得左右手的食指指尖與大拇指指尖
    let h1_index = hand1.landmarks[8];
    let h1_thumb = hand1.landmarks[4];
    let h2_index = hand2.landmarks[8];
    let h2_thumb = hand2.landmarks[4];

    // 計算食指與大拇指的中點
    let h1_mid = [(h1_index[0] + h1_thumb[0]) / 2, (h1_index[1] + h1_thumb[1]) / 2];
    let h2_mid = [(h2_index[0] + h2_thumb[0]) / 2, (h2_index[1] + h2_thumb[1]) / 2];

    // 檢查兩手的中點是否都在圓內
    if (
      dist(h1_mid[0], h1_mid[1], circleX, circleY) < circleR &&
      dist(h2_mid[0], h2_mid[1], circleX, circleY) < circleR
    ) {
      // 以兩手的中點平均值移動圓心
      circleX = (h1_mid[0] + h2_mid[0]) / 2;
      circleY = (h1_mid[1] + h2_mid[1]) / 2;
    }
  }
}
