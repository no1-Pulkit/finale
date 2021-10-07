var zombies
var shooter
var bg
var bgImg
var shootingImg
var standingImg
var edges
var standing
var zombies
var zombiesImg
var zombiesGroup
var heart1,heart1Img
var heart2,heart2Img
var heart3Img,heart3
var bulletGroup
var bullet
var ammo =70
var gamestate="fight"
var score =0
var life=3
var win,lose,explosion
function preload(){
shootingImg =loadImage("assets/shooter_3.png")
standingImg =loadImage("assets/shooter_2.png")
bgImg =loadImage("assets/bg.jpeg")
zombiesImg =loadImage("assets/zombie.png")
heart1Img =loadImage("assets/heart_1.png")
heart2Img =loadImage("assets/heart_2.png")
heart3Img =loadImage("assets/heart_3.png")   
win =loadSound("assets/win.mp3") 
lose =loadSound("assets/lose.mp3") 
explosion =loadSound("assets/explosion.mp3") 
}
function setup(){
createCanvas(windowWidth,windowHeight)
bg=createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale=1.3
shooter=createSprite(displayWidth-1150,displayHeight-300,50,50)
shooter.addImage(standingImg)
shooter.scale=0.3
shooter.setCollider("rectangle",0,0,300,300)
edges=createEdgeSprites()
zombiesGroup =new Group()
heart1 =createSprite(displayWidth-100,40,20,20)
heart1.visible=false
heart1.addImage("heart1",heart1Img)
heart1.scale =0.4
heart2 =createSprite(displayWidth-100,40,20,20)
heart2.visible=false
heart2.addImage("heart2",heart2Img)
heart2.scale =0.4
heart3 =createSprite(displayWidth-100,40,20,20)
heart3.visible=true
heart3.addImage("heart3",heart3Img)
heart3.scale =0.4
bulletGroup =new Group()

}
function draw(){
    if(life===3){
        heart3.visible=true 
        heart2.visible=false
        heart1.visible=false
    }
    if(life===2){
        heart2.visible=true 
        heart3.visible=false
        heart1.visible=false
    }
    if(life===1){
        heart1.visible=true 
        heart2.visible=false
        heart3.visible=false
    }
    if(life===0){
        gamestate="lost"
    }
    if(score===100){
        gamestate="won"
        win.play()
        
    }
    if(keyDown("UP_ARROW")){
        shooter.y=shooter.y-30
    }
    if(keyDown("DOWN_ARROW")){
        shooter.y=shooter.y+30
    }
    if(keyWentDown('space')){
        bullet =createSprite(displayWidth-1150,shooter.y-30,20,10)
        bullet.velocityX=20
        bulletGroup.add(bullet)
        ammo=ammo-1
        explosion.play()
        shooter.addImage(shootingImg)
    }
    else if(keyWentUp("space")){
        shooter.addImage(standingImg)
    }
    shooter.bounceOff(edges)
    for(var i=0;i<zombiesGroup.length;i++){
        if(zombiesGroup[i].isTouching(shooter)){
            zombiesGroup[i].destroy()
            lose.play()
            life=life-1
        }
    }
    if(zombiesGroup.isTouching(bulletGroup)){
        for(var i=0;i<zombiesGroup.length;i++){
            if(zombiesGroup[i].isTouching(bulletGroup)){
                zombiesGroup[i].destroy()
                explosion.play()
                score=score+2
                bulletGroup.destroyEach()
            }
        }
    }
   
    if(ammo===0){
        lose.play()
        gamestate="bullet"
    }
    createEnemy()
drawSprites()
textSize(20)
fill("white")
text("score:  "+score,displayWidth-210,displayHeight/2-250)
if(gamestate==="lost"){
    textSize(100)
    fill("red")
    text("U Lost",400,400)
    zombiesGroup.destroyEach()
    player.destroy()
}
else if(gamestate==="won"){
    textSize(100)
    fill("red")
    text("U Win",400,400)
    zombiesGroup.destroyEach()
    player.destroy()
}
else if(gamestate==="bullet"){
    textSize(100)
    fill("yellow")
    text("U ran out of bullets",400,400)
    zombiesGroup.destroyEach()
    player.destroy()
    bulletGroup.destroyEach()
}
}
function createEnemy(){
    if(frameCount % 80===0){
        zombies=createSprite(random(500,1100),random(100,500),40,40)
        zombies.addImage(zombiesImg)
        zombies.scale =0.15
        zombies.velocityX =-3
        zombies.lifetime =400
        zombies.setCollider("rectangle",0,0,400,400)
        zombiesGroup.add(zombies)
    }
}