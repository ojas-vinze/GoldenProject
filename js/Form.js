class Form{
    constructor(){
        this.input=createInput("Name");
        this.button=createButton("Play");
        this.greeting=createElement("h2");
        this.reset=createButton("Reset");
        this.title=createElement("h1");
    }

    display(){
        this.title.html("Welcome to the ballon buster game!!!");
        this.title.position(350,50);

        this.input.position(width/2,height/2);

        this.button.position(width/2+40,height/2+50);
        this.button.mousePressed(fnToPlay())

        this.reset.position(550,20);

        this.greeting.position(displayWidth/2,displayHeight/2);

        this.reset.mousePressed(()=>{
            player.updateCount(0);
            game.update(0);
        })
    }

    fnToPlay(){
        clear()
        playerCount++;
        player.updateCount(playerCount);
        player.name=this.input.value();
        player.update();
        player.index=playerCount;
        if(playerCount<2){
        this.greeting.html("Hello"+player.name);
        }
    }

    hide(){
        this.greeting.hide();
        this.input.hide();
        this.button.hide();
        this.title.hide();
    }
}