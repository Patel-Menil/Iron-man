// creating variables
var score =0
var bg, bgImg;
var stoneImg,stoneGrp,stone;
var diamond,diamondImg,diamondGrp,diamondSound;
var spikeImg,spikeGrp;
var misImg,misGrp;
var gameMode='play';
var restart,restartImg;


function preload() {
  // load image and Animation
  bgImg = loadImage("images/bg.jpg");
  ironmanImg=loadImage('images/iron.png')
  diamondImg=loadImage('images/diamond.png')
  stoneImg=loadImage('images/stone.png')
  diamondImg=loadImage('images/diamond.png')
  diamondSound=loadSound('sounds/diamondSound.mp3')
  spikeImg=loadImage('images/spikes.png')
  misImg=loadImage('images/mis.jpg')
  restartImg=loadImage('images/restart.png')
 
}



function setup() {
  // creating canvas and background
  createCanvas(1000, 600);
  bg = createSprite(580,300);
  bg.addImage(bgImg)
  bg.scale=2


  // create Sprite and add image of IronMan
  ironman=createSprite(200,500,25,25)
  ironman.addImage(ironmanImg)
  ironman.scale=0.2

// create restart
restart=createSprite(475,300,50,50)
restart.addImage(restartImg)
restart.scale=0.25
restart.visible=false


  // create Sprite and add visibility of ground
  ground = createSprite(0,0,1,10000);
  ground.visible=false;
  ground1=createSprite(1000,0,1,10000);
  ground1.visible=false
  ground2=createSprite(600,1,10000,1);
  ground2.visible=false

  // ground=createSprite(1000,600,100000000,10)
  // ground.visible=false


  // creating group for same kind of stuffs
  stoneGrp=new Group()
  diamondGrp=new Group()
  spikeGrp=new Group()
  misGrp=new Group()

}



function draw() {
  // drawing Sprites
  drawSprites();


  // color of Text and Text
  fill('white')
  stroke('red')        
  strokeWeight(10);
  textSize(20)
  text('Total Score :'+score,475,25)
  ironman.collide(ground)
  ironman.collide(ground1)
  ironman.collide(ground2)





  if(gameMode==='play'){
        //  give commands for moving
      if(keyDown('up')){
        ironman.velocityY=-10;
      }
      if(keyDown('left')){
        ironman.x=ironman.x-5;
      }
      if(keyDown('right')){ 
        ironman.x=ironman.x+5;
      }
      if(keyDown('down')){
        ironman.velocityY=10
      }
      ironman.velocityY=ironman.velocityY+0.5;
      // ironman.collide(ground)


      // giving velocity to background
      bg.velocityY= 4 ;
      if(bg.y>600){
        bg.y=300
      }


      // add function createStone()in draw function
      createStone()
      for(var num=0; num<stoneGrp.length;num++){
        var temp=stoneGrp.get(num)
        if(temp.isTouching(ironman)){
          ironman.collide(stoneGrp)
        }
      }


      // add function createDiamond() in draw function
      createDiamond()
      for(var u=0 ; u<(diamondGrp).length;u++){
        var a=(diamondGrp).get(u);
        if(a.isTouching(ironman)){
            diamondSound.play()
            score=score+5
            a.destroy()
            a=null
        }
      }


      // add function createSpike() in draw function
      createSpike()
      for(var q=0;q<(spikeGrp).length;q++){
        var w=(spikeGrp).get(q);
        if(w.isTouching(ironman)){
          score=score-5
          w.destroy()
          w=null
        }
      }

      createMissile()
      for(var e=0;e<(misGrp).length;e++){
        var r=(misGrp).get(e);
        if(r.isTouching(ironman)){
          gameMode='end'

        }
      }
      
        if(ironman.y>650){
          gameMode='end'
        }
        if(score===-10){
          gameMode='end'
        }
        ironman.debug=true
        ironman.setCollider('rectangle',100,0,300,500)

  }
  else if(gameMode==='end'){
    bg.velocityY=0
    ironman.velocityX=0
    ironman.velocityY=0
    spikeGrp.setVelocityYEach(0)
    spikeGrp.setLifetimeEach(-1)
    diamondGrp.setLifetimeEach(-1)
    diamondGrp.setVelocityYEach(0)
    stoneGrp.setVelocityYEach(0)
    stoneGrp.setLifetimeEach(-1)
    misGrp.setLifetimeEach(0-1)
    misGrp.setVelocityYEach(0)
    score
    ironman.setCollider('rectangle',0,0,300,10)
    score=0
    restart.visible=true
    strokeWeight(5)
    text('GAME OVER   :',410,200)
    if(mousePressedOver(restart)){
      restartGame()
    }
        

    
  
  }

}




// make function to create Stone
function createStone(){
  if(frameCount%80===0){
    var stone=createSprite(0,0,50,50)
    stone.x=random(100,1200)
    stone.addImage(stoneImg)
    stone.scale=0.5
    stone.velocityY=5
    stoneGrp.add(stone)
    stone.lifetime=120
  }
}


// make function to create Diamond
function createDiamond(){
  if(frameCount%70===0){
    var diamond=createSprite(0,0,50,50)
    diamond.x=random(100,1200)
    diamond.addImage(diamondImg)
    diamond.scale=0.5
    diamond.velocityY=6
    diamond.lifetime=120
    diamondGrp.add(diamond)
  }
 
}


// make function to create Spike
function createSpike(){
  if(frameCount%60===0){
    var spike=createSprite(0,0,50,50)
    spike.x=random(100,1200)
    spike.addImage(spikeImg)
    spike.scale=0.6
    spike.velocityY=8
    spike.lifetime=120
    spikeGrp.add(spike)
  }
}

function createMissile(){
  if(frameCount%70===0){
    var mis=createSprite(0,0,50,50)
    mis.x=random(100,1200)
    mis.addImage(misImg)
    mis.scale=0.1
    mis.velocityY=random(20,25)
    mis.lifetime=120
    misGrp.add(mis)
  }
}


function restartGame(){
  gameMode='play'
  misGrp.destroyEach()
  spikeGrp.destroyEach()
  diamondGrp.destroyEach()
  stoneGrp.destroyEach()
  ironman.y=400
  restart.visible=false
}
