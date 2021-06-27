class Game{
    constructor(){}

    getState(){
        var gameStateRef=database.ref('gameState');
        gameStateRef.on("value",function(data){
            gameState=data.val();
        })
    }

    update(state){
        database.ref('/').update({
            gameState:state
        })
    }

    async start(){
        console.log("In start");
        if(gameState===0){
            image(bg1img,0,0,width,height);
            player = new Player();           
            player.getCount();
            
            form = new Form();
            form.display();
        }
        player1=createSprite(200,400);
        player1.addImage(bowimg);
        
        player2=createSprite(500,400);
        player2.addImage(bowimg);
        players=[player1,player2];
    }

    play(){
        Player.getPlayerInfo();
        form.hide();
        image(bg2img,0,0,width,height);
        var x=100;
        var y=200;
        var index=0;

        this.spawnBalloons();

        for(var plr in allPlayers){
        
            index = index+1;
            y=500+allPlayers[plr].distance;
            x=500;
            
            // players[index-1].x = x;
            // players[index-1].y = y;

            if(index===player.index){
                fill("black");
                textSize(20);
                text(player.name,x,y);

                stroke("red");
                ellipse(players[index-1].x,players[index-1].y,50,50);
            }
        }

        if(frameCount%50===0){
            var rand=random(20,570);
            balloon=createSprite(10,rand,20,50);
               
        }

        if(keyDown(UP_ARROW)){
            player.distance-=10;
            player.update();
        }

        if(keyDown(DOWN_ARROW)){
            player.distance+=10;
            player.update();
        }

        if(keyDown("space")){
            arrow=createSprite(200,player.distance);
            arrow.addImage(arrowimg);
            arrow.velocityX=-4;
            arrow.lifetime=350;
            arrowg.add(arrow);
        }
        drawSprites();
    }

    spawnBalloons(){
        
        var posx=100;
        var posy=100;
        for(var i=0; i<40; i++){
            if(i%10===0){
                posy=posy+50;
                posx=100;
            }
            balloon=createSprite(posx,posy,50,50);
            posx=posx+50;

            // var rande=Math.round(random(1,4));
            switch(posy){
                case 100: balloon.addImage(balloon1img);
                balloon.scale=0.08;
                    break;
                case 150: balloon.addImage(balloon2img);
                balloon.scale=0.08;
                    break;
                case 200: balloon.addImage(balloon3img);
                    break;
                case 250: balloon.addImage(balloon4img);
                balloon.scale=0.08;
                    break;
                default:break;
            }
            balloong.add(balloon);
        }
    }

    end(){}
}
