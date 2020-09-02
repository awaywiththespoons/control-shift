//based on code fot drawgramming https://www.beccarose.co.uk/code/drawgramming/ (this is a simplified version)

var imgBrand = [];
var img = [];
var imgW;
var imgH;
let picBrand = 7; // number of images to test
let picOther = 10; // number of other images



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

    textFont(OfficeFont);
        imageSnap();
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
    
    //text
 var controlRand = ~~random(60,170);
    var shiftRand = ~~random(25,170);




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
    translate((width / 2)-100, (height / 2)-50);
   rotate(controlRand);
    textSize(width/10);
   
//    fill(7,221,153, 20);
//    for (var i = 0; i < 200; i=i+20) {
//        text("Control", 0, i )}
     fill(5,60,176,200);
    text("Control", 0,0);
        console.log("control "+controlRand);
    pop(); // Restore original state

    
    // shift text
    push(); // Start a new drawing state
   translate(width / 2, (height / 2));
    rotate(shiftRand);
    textSize(width/10);
//    fill(7,221,153, 20);
//      for (var i = 0; i < 200; i=i+20) {
//        text("Shift", 0, i )}
     fill(5,60,176,200);
    text("Shift", 0,0)
    console.log("shift "+shiftRand);
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
