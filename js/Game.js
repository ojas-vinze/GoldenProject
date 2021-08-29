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
        player1=createSprite(width-50,500);
        player1.addImage(bowimg);
        
        player2=createSprite(width-100,500);
        player2.addImage(bowimg);
        players=[player1,player2];
    }

    play(){
        Player.getPlayerInfo();
        form.hide();
        image(bg2img,0,0,width,height);
        var x=100;
        var texty=30;
        var y=0;
        var index=0;
        fill("black")
        textSize(20)
        
        if(createBalloon === true){
            this.spawnBalloons();
        }

        for(var plr in allPlayers){
             index = index+1;
             if(allPlayers[plr].distance === 0)
             y=500
             else
             y=allPlayers[plr].distance;
            // x=500;
            //console.log(y)
            // // players[index-1].x = x;
             players[index-1].y = y;
         
            if(index===player.index){
                //console.log(allPlayers[plr].name)
                fill("red");
                textSize(20);
                //text(player.name,x,y);

                stroke("red");
                ellipse(players[index-1].x,players[index-1].y,50,50);
            }
            else{
            fill("black");
            }
            text(allPlayers[plr].name + " : " + allPlayers[plr].score ,30,texty);
            texty  = texty+30;

            if(allPlayers[plr].score===15){
                gameState = 2;
            }
        }
        
        if(keyDown(UP_ARROW)){
            if(players[player.index-1].y > 10){
                players[player.index-1].y -= 10
                player.distance = players[player.index-1].y;
                player.update();
            }
        }        

        if(keyDown(DOWN_ARROW)){
            if(players[player.index-1].y < 500){
                players[player.index-1].y += 10
                player.distance = players[player.index-1].y;
                player.update();
            }
        }
        drawSprites();
        if(keyWentUp("space")){
            arrow=createSprite(players[player.index-1].x,players[player.index-1].y);
            arrow.addImage(arrowimg);
            arrow.scale=0.4
            arrow.velocityX=-4;
            arrow.setCollider("rectangle",0,0,arrow.width,20)
            arrow.lifetime=350;
            arrowg.add(arrow);
        }
        
        if (player.index !== null) {
            for (var i = 0; i < balloong.length; i++) {
                if (balloong.get(i).isTouching(arrowg)) {
                    balloong.get(i).destroy();
                    arrowg.destroyEach();
                    player.score =player.score+1;
                    player.update();
                }       
            }
        }

    }

    spawnBalloons(){
        
        var posx=270;
        var posy=200;
        for(var i=0; i<40; i++){
            if(i%10===0 && i!==0){
                posy=posy+70;
                posx=270;
            }
            balloon=createSprite(posx,posy,50,50);
            posx=posx+50;

            // var rande=Math.round(random(1,4));
            switch(posy){
                case 200: balloon.addImage(balloon1img);
                balloon.scale=0.09;
                    break;
                case 270: balloon.addImage(balloon2img);
                balloon.scale=0.08;
                    break;
                case 340: balloon.addImage(balloon3img);
                    break;
                case 410: balloon.addImage(balloon4img);
                balloon.scale=0.08;
                    break;
                default:break;
            }
            balloong.add(balloon);
        }
        createBalloon=false;
    }

    leaderboard(){
        form.hide();
        image(bg3img,0,0,width,height);
        strokeWeight(3);
        stroke("red");
        fill("white");
        textSize(45);
        text("And the winner is ",width/2-100,100);
        Player.getPlayerInfo();
        textSize(75);
        for(var plr in allPlayers){
            if(allPlayers[plr].score >= 15 ){
                text(allPlayers[plr].name,width/2-100,250);
            }
        }
    }

    end(){}
}
