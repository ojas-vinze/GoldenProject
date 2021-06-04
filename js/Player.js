class Player{
    constructor(){
        this.name="";
        this.index=0;
        this.score=0
        this.arrows=0;
        this.distance=0;
    }

    getCount(){
        var countRef=database.ref('PlayerCount');
        countRef.on("value",(data)=>{
            playerCount=data.val();
        });
    }

    updateCount(count){
        database.ref('/').update({
            PlayerCount:count
        })
    }

    update(){
        var plrInfo="Players/Player"+this.index;
        database.ref(plrInfo).update({
            name:this.name,
            score:this.score,
            arrows:this.arrows,
            distance:this.distance
        })
    }

    static getPlayerInfo(){
        var playerInfoRef=database.ref('Players');
        playerInfoRef.on("value",(data)=>{
            allPlayers=date.val()
        })
    }
}