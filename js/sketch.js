//based on code fot drawgramming https://www.beccarose.co.uk/code/drawgramming/ (this is a simplified version)

var imgBrand = [];
var img = [];
var imgW;
var imgH;
let picBrand = 2; // number of images to test
let picOther = 15; // number of other images



function preload() {
    // load images
    for (var i = 0; i < picBrand; i++) {
        imgBrand[i] = loadImage("./magic/imgs_brand/" + i + ".png");
        print(i);
    }
    for (var i = 0; i < picOther; i++) {
        img[i] = loadImage("./magic/imgs/" + i + ".png");
        print(i);
    }

    OfficeFont = loadFont("fonts/OfficeCodePro-Light.otf");
}


function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", "-1");
    background(255, 255);
 //   noLoop();
    imageMode(CENTER);
    noStroke();
    imageSnap();
    textFont(OfficeFont);


}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    imageSnap();
}

/////////////////////////////
//function to make imaages //
/////////////////////////////

function imageSnap() {

    background(248, 242, 201);
    //image randoms
    var randAng1 = ~~random(360);
    var randAng2 = ~~random(360);
    var randBrand = ~~random(picBrand);
    var randImg = ~~random(picOther);




    //display images

    push(); // Start a new drawing state
    translate((width / 2) - 300, (height / 2));
    rotate(randAng1);
    tint(7,221,153, ~~random(50, 100)); // Apply transparency without changing color
    image(img[randImg], 0, 0, imgW, imgH);
    
    pop(); // Restore original state

    push(); // Start a new drawing state
    translate(width / 2, (height / 2) - 10);
    rotate(randAng2);
    tint(7,221,153, ~~random(50, 100)); // Apply transparency without changing color
    image(imgBrand[randBrand], 0, 0, imgW, imgH);
    pop(); // Restore original state

    
    
        
   // Control text
    push(); // Start a new drawing state
   // translate((width / 2) - 300, (height / 2));
 //   rotate(90);
    textSize(150);
   
    fill(7,221,153, 20);
    for (var i = 0; i < 100; i=i+20) {
        text("Control", width/2, height/2+i )}
     fill(5,60,176,200);
    text("Control", width/2, height/2);
    pop(); // Restore original state

    
    // shift text
    push(); // Start a new drawing state
//    translate(width / 2, (height / 2) - 10);
  //  rotate(180);
    textSize(150);
    fill(7,221,153, 20);
      for (var i = 0; i < 100; i=i+20) {
        text("Shift", width/2, height/2+i )}
     fill(5,60,176,200);
    text("Shift", width/2, height/2 )
    pop(); // Restore original state



    
    
 
    //  push(); // Start a new drawing state
    //translate((width / 2) +00, (height / 2) + 30);
    //rotate(rand3);
    //    tint(7, 221, 153, ~~random(100, 200)); // Apply transparency without changing color
    //  image(img[rand1],0 , 0, imgW, imgH);
    //
    //       pop(); // Restore original state
    //  
}
