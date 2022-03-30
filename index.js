function preventBehavior(e) {
  e.preventDefault();
}

document.addEventListener("touchmove", preventBehavior, {
  passive: false,
});
function Face() {
  this.faceImg = chris;
  this.iWidth = 253;
  this.iHeight = 306;
  this.ratio = 2.5;
  this.padding = 30 / this.ratio;
  this.width = this.iWidth / this.ratio;
  this.height = this.iHeight / this.ratio;
  this.gravity = 0.2;
  this.velocity_x = 0;
  this.velocity_y = 0;
  this.ypos = height / 2 - this.height;
  this.xpos = W - this.width - 20;
  this.collision = false;
  console.log(this.height, this.width);
  this.show = function () {
    image(this.faceImg, this.xpos, this.ypos, this.width, this.height);
    noFill();
    noStroke();
    rect(this.xpos, this.ypos, 100, 100);
  };

  this.update = function () {
    this.minY = this.height / 2;
    this.maxY = height - this.height / 2;
    // calculate gravity

    this.velocity_y = this.velocity_y + this.gravity;
    this.ypos = this.ypos + this.velocity_y;

    // calculate side movement

    this.xpos = this.xpos + this.velocity_x;
    this.velocity_x = this.velocity_x * 0.99;
  };
}
function Hand() {
  this.iHeight = 120;
  this.iWidth = 120;
  this.ratio = 1.2;
  this.height = this.iHeight / this.ratio;
  this.width = this.iWidth / this.ratio;
  this.v_speed = 0;
  this.gravity = 0.5;
  this.ypos = height / 2 - 100;
  this.xpos = 10;
  this.drag = false;
  this.v_speed_x = 0;
  if (Math.random() < 0.001) {
    this.img = Math.random() > 0.5 ? rarehand1 : rarehand2;
  } else {
    this.img = handstart;
  }

  this.onBall = function (x, y) {
    return (
      x >= this.xpos &&
      x <= this.xpos + this.width &&
      y >= this.ypos &&
      y <= this.ypos + this.height
    );
  };

  this.startDrag = function () {
    this.img = handimg;
    this.drag = true;
    this.mousex = mouseX;
    this.mousey = mouseY;
  };

  this.endDrag = function () {
    this.img = handstart;
    this.drag = false;
  };

  this.update = function () {
    this.minY = this.height / 2;
    this.maxY = height - this.height / 2;

    if (this.drag) {
      this.xpos = mouseX - this.width / 2;
      this.ypos = mouseY - this.height / 2;
      this.v_speed_x = this.v_speed_x / 2 + (mouseX - this.mousex);
      this.v_speed = this.v_speed / 2 + (mouseY - this.mousey);
      this.mousex = mouseX;
      this.mousey = mouseY;
    } else {
      if (Math.abs(this.v_speed_x) > 1) {
        this.xpos += this.v_speed_x * 0.5;
        this.v_speed_x = this.v_speed_x * 0.5;
      }
      if (Math.abs(this.v_speed) > 1) {
        this.ypos += this.v_speed * 0.5;
        this.v_speed = this.v_speed * 0.5;
      }
    }
  };

  this.show = function () {
    image(this.img, this.xpos, this.ypos, this.width, this.height);
    noFill();
    noStroke();
    rect(this.xpos, this.ypos, 100, 100);
  };
}

var face;
var hand;
var metric = true;
var startScreen = 0;

let container = document.getElementById("container");
let W = container.getBoundingClientRect().width;
let H = container.getBoundingClientRect().height;

/**
 *
 * @param {HTMLInputType} this
 * @param {Event} e
 */
document
  .getElementById("imposter")
  .addEventListener("change", function handleUpload(e) {
    console.log(e);
    console.log(this.files);
    var reader = new FileReader();
    reader.onload = function (e) {
      //   const img = document.createElement("img");
      //   preload(e.target.result);
      //   img.src = e.target.result;
      //   document.body.appendChild(img);
      chris = loadImage(e.target.result);
      resizeCanvas(W, H);

      hand = new Hand();
      face = new Face();
    };
    reader.readAsDataURL(this.files[0]);
  });

function mousePressed() {
  startScreen = 0;
  if (hand.onBall(mouseX, mouseY)) hand.startDrag();
}

function touchStarted() {
  if (startScreen === 1) {
    window.navigator.getUserMedia = (...args) =>
      window.navigator.mediaDevices.getUserMedia(...args);
    userStartAudio();
    startScreen = 0;
  }
  userStartAudio();
  if (hand.onBall(mouseX, mouseY)) hand.startDrag();
}

function mouseReleased() {
  if (
    !(
      hand.xpos < face.xpos + face.height &&
      hand.xpos + hand.height > face.xpos &&
      hand.ypos < face.ypos + face.height &&
      hand.height + hand.ypos > face.ypos
    )
  ) {
  }
  if (hand.xpos < 0 || hand.xpos > W || hand.ypos < 0 || hand.ypos > H) {
    hand = new Hand();
  }
  hand.endDrag();
}
function preload(imposter = "assets/shaon.png") {
  robotoFont = loadFont("https://slapchris.com/assets/Roboto-Light.ttf");
  slapsfx0 = loadSound("https://slapchris.com/assets/slap_str0.mp3");
  slapsfx1 = loadSound("https://slapchris.com/assets/slap_str1.mp3");
  slapsfx2 = loadSound("https://slapchris.com/assets/slap_str2.mp3");
  slapsfx3 = loadSound("https://slapchris.com/assets/slap_str3.mp3");
  slapsfx4 = loadSound("https://slapchris.com/assets/slap_str4.mp3");
  slapsfx5 = loadSound("https://slapchris.com/assets/slap_str5.mp3");
  ready = createAudio("https://slapchris.com/assets/ready.wav");
  jiggy = loadSound("https://slapchris.com/assets/jiggy.mp3");
  chris = loadImage(imposter);
  // chris2 = loadImage("https://slapchris.com/assets/chris2.png");
  slapped = loadImage("https://slapchris.com/assets/slapped.png");
  slapRight = loadImage("https://slapchris.com/assets/slap_right.png");
  slapLeft = loadImage("https://slapchris.com/assets/slap_left.png");
  handstart = loadImage("https://slapchris.com/assets/hand2.png");
  rarehand1 = loadImage("https://slapchris.com/assets/rarehand1.png");
  rarehand2 = loadImage("https://slapchris.com/assets/rarehand2.png");
  handimg = loadImage("https://slapchris.com/assets/hand3.png");
}

function setup() {
  var cnv = createCanvas(W, H);
  cnv.parent("container");
  cnv.style("z-index", "0");
  cnv.style("position", "absolute");
  cnv.style("left", "50%");
  cnv.style("top", "50%");
  cnv.style("transform", "translate(-50%, -50%)");
  ready.volume(0.4);
  ready.play();
  hand = new Hand();
  face = new Face();

  if (W <= 500) {
    startScreen = 1;
  }
}
function initScreen() {
  background(250, 250, 250);
  fill(255);
  textAlign(CENTER);
  image(hand.img, W / 2 - 100, H / 2 - 100, 200, 200);
  fill(0);
  textSize(W / 13);
  textFont(robotoFont);
  text("How fast can you slap", W / 2, H / 2 - 200);
  textAlign(CENTER, CENTER);

  textSize(W / 9);
  text("Chris Rock?", W / 2, H / 2 - 150);

  textSize(W / 15);
  text("Tap to start.", W / 2, H / 2 + 150);
}
function resetGame() {
  tweet.style.fontSize = "1.05rem";
  ready.play();
  // button.remove();
  hand = new Hand();
  face = new Face();
  score.style.transition = ".2s";
  score.style.fontSize = "50px";
  score.style.color = "rgba(0, 0, 0, 0.5)";
  score.innerHTML = `0${metric ? "km/h" : "mph"}`;
}

function draw() {
  clear();

  hand.update();
  hand.show();
  face.show();
  if (startScreen === 1) {
    initScreen();
  }
  if (
    ((hand.xpos < face.xpos + face.height + face.padding &&
      hand.xpos + hand.height - face.padding > face.xpos &&
      hand.ypos < face.ypos + face.height &&
      hand.height + hand.ypos > face.ypos) ||
      hand.xpos > W) &&
    face.collision === false
  ) {
    face.faceImg = hand.v_speed_x > 0 ? slapLeft : slapRight;
    face.velocity_x = hand.v_speed_x * 0.1;
    face.velocity_y = hand.v_speed * 0.1;
    face.collision = true;
    const velocity = Math.sqrt(
      Math.pow(face.velocity_y, 2) + Math.pow(face.velocity_x, 2)
    );
    const speedFloat = (W < 900 ? velocity * 1.1 : velocity * 0.4) * 1.08;
    const speed = metric
      ? Math.floor(speedFloat)
      : Math.floor(speedFloat / 1.609);
    score.innerHTML = `${speed}${metric ? "km/h" : "mph"}`;
    tweet.innerHTML = `<a href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fslapchris.com&text=I%20slapped%20Chris%20Rock%20${speed}${
      metric ? "km/h" : "mph"
    }%21&hashtags=SlapChrisRock">Tweet your score.</a><br/><a href="http://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fslapchris.com&quote=I%20slapped%20Chris%20Rock%20${speed}${
      metric ? "km/h" : "mph"
    }%21" target="_blank" class="share-popup">Share on Facebook.</a>`;
    jiggy.stop();
    if (speedFloat >= 30) {
      tweet.style.fontSize = "1.2rem";
      slapsfx5.play();
      jiggy.play();
      score.style.transition = ".2s";
      score.style.fontSize = "80px";
      score.style.color = "#22e51d";
    } else if (speedFloat > 25) {
      slapsfx4.play();
      score.style.transition = ".2s";
      score.style.fontSize = "70px";
      score.style.color = "#30AFFF";
    } else if (speedFloat > 20) {
      slapsfx3.play();
      score.style.transition = ".2s";
      score.style.fontSize = "60px";
      score.style.color = "#30AFFF";
    } else if (speedFloat > 15) {
      slapsfx2.play();
      score.style.transition = ".2s";
      score.style.fontSize = "50px";
      score.style.color = "#30AFFF";
    } else if (speedFloat > 10) {
      slapsfx2.play();
      score.style.transition = ".2s";
      score.style.fontSize = "40px";
      score.style.color = "#30AFFF";
    } else if (speedFloat > 5) {
      slapsfx1.play();
      score.style.transition = ".2s";
      score.style.fontSize = "30px";
      score.style.color = "#30AFFF";
    } else {
      slapsfx0.play();
      score.style.transition = ".2s";
      score.style.fontSize = "20px";
      score.style.color = "#30AFFF";
    }
    // button = createButton('Reset Game');
    // button.position(W / 2, H / 2);
    // button.mousePressed(resetGame);
    setTimeout(function () {
      resetGame();
    }, 2000);
  }
  if (face.collision === true) {
    face.update();
  }
}
function swapUnit() {
  if (metric === true) {
    metric = false;
    document.getElementById("units").innerText = "Slap in Glorious Metric.";
  } else {
    metric = true;
    document.getElementById("units").innerText = "Slap in Freedom Units 🇺🇸";
  }
  score.innerHTML = `0${metric ? "km/h" : "mph"}`;
}

function windowResized() {
  W = container.getBoundingClientRect().width;
  H = container.getBoundingClientRect().height;
  resizeCanvas(W, H);

  hand = new Hand();
  face = new Face();
}
