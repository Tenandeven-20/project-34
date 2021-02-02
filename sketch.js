var dog,happyDog,dogimg,dogimg1;
var database,foodS,foodStock;

function preload()
{
  dogimg = loadImage("images/dogImg.png");
  dogimg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(300,300,20,20);
  dog.addImage(dogimg);
  dog.scale = 0.15;
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
}


function draw() { 
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(dogimg1);
  }


  drawSprites();
  //add styles here
  fill(255);
  stroke("black");
  text("food remaining: "+foodS,170,200);
  textSize(13);
  text("Note: press up arrow key to feed the dog",130,10,300,20);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1;
  }
  database.ref("/").update({
    food: x
  })
}