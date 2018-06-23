var characterList = [
    {name: "Higanbana",
    title: "the Flower of Death",
    info: "She lives at the edge of the abyss,<br>tending to the sea of red flowers,<br>and dreaming about the next  wandering soul that will become their nutrients...",
    entrance: '"Settle down now, my lovelies. You will get your food soon~~"',
    attackList: ["'s flowers spew forth poisonous pollen", "'s flowers unleash razor sharp petals", "'s flowers lash out thorny vines"],
    defenseList: ["'s flower petals form a barrier", "'s flowers drain life from the enemy"],
    health: 200,
    maxHealth: 200,
    attack: 7,
    startingAttack: 7,
    counter: 14,
    picture: "higanbana.png",
    direction: "left"},

    {name: "Susabi",
    title: "the Prophetic Star",
    info: "A figure of mystery,<br>he observes movements of the stars<br>and divines all events within the universe...",
    entrance: '"What foolishness... I have foreseen all I needed."',
    attackList: [" summons a fiery comet", " hurls a barrage of star fragments", "'s eyes shine with cosmic light"],
    defenseList: [" gathers star fragments around him", " radiates celestial energy"],
    health: 100,
    maxHealth: 100,
    attack: 15,
    startingAttack: 15,
    counter: 30,
    picture: "susabi.png",
    direction: "right"},

    {name: "Ichimokuren",
    title: "the Tempest Dragon",
    info: "Once a wind god of protection,<br>he was forgotten by his followers.<br>And still, he continues to protect the land from misfortune...",
    entrance: '"The wind sings of your defeat... My dragon, lend me your strength!"',
    attackList: [" forms countless blades from pressurized air", "'s dragon breathes out a tornado", " releases an intense shockwave"],
    defenseList: [" blows his opponent back with the wave of hand", "'s dragon counterattacks"],
    health: 150,
    maxHealth: 150,
    attack: 10,
    startingAttack: 10,
    counter: 20,
    picture: "ichimokuren.png",
    direction: "n/a"},

    {name: "Ibaraki Douji",
    title: "the Hand of Hell",
    info: "His power is only outmatched by his hatred;<br>The memory of his severed arm cannot be forgotten...",
    entrance: '"Be grateful. Bearing witness to my wrath before death is the best gift you can ever deserve."',
    attackList: [" shoots balls of black flames", " creates fissures that surge dark energy", "'s demons appear from the shadows"],
    defenseList: ["'s demons swarms to protect him"," ignites his body with black flames"],
    health: 120,
    maxHealth: 120,
    attack: 12,
    startingAttack: 12,
    counter: 24,
    picture: "ibaraki.png",
    direction: "n/a"},

    {name: "Menreiki",
    title: "the Keeper of Masks",
    info: "The Masks felt a weakness in her heart,<br>so they sought to make her strong.<br>In the end, they made her their own,<br>and that was all she needed...",
    entrance: '"Close your eyes. This is the beginning of a beautiful nightmare."',
    attackList: ["'s Ogre Mask charges in a fit of rage", "'s Witch Mask utters a quiet curse", "'s Fool Mask lets out a deafening screech"],
    defenseList: ["'s Monkey Mask snaps in retaliation","'s Devil Mask filled her with murderous intent"],
    health: 120,
    maxHealth: 120,
    attack: 12,
    startingAttack: 12,
    counter: 24,
    picture: "menreiki.png",
    direction: "left"}


];

var battleLog=["","",""];
//displays battle text in a scrolling fashion.  i tried playing around with fadeIn but it doesn't produce the scrolling effect i want..
function displayMessage(message){ 
    if (battleLog[0]==""){
        battleLog[0]=message;
    } else if (battleLog[1]==""){
        battleLog[1]=message;
    } else if (battleLog[2]==""){
        battleLog[2]=message;
    } else {
        battleLog[0]=battleLog[1];
        battleLog[1]=battleLog[2];
        battleLog[2]=message;
    }
    $("#message0").text(battleLog[0]);
    $("#message1").text(battleLog[1]);
    $("#message2").text(battleLog[2]);
}

//reset all character health, attack. display intro messages.
function resetGame(){
    for (var i in characterList) {
        characterList[i].health=characterList[i].maxHealth;
        characterList[i].attack=characterList[i].startingAttack;
    }
    displayMessage("Hover over the icons to learn about the characters.");
    displayMessage("Select an icon to pick your character.");
    displayMessage("Select another icon and let the battle begin!")
}

//at game start, manual reset
resetGame();

var attacker, defender;
var randomBackground=Math.floor(Math.random()*7);
var lastBackground=randomBackground;
$("#centerBody").css("background-image","url(assets/images/background"+randomBackground+".jpg)");

var message="";
var gameStatus="prepare";
var attackerTransformed, defenderTransformed;
var attackerIndex;

//on hover, show character tooltip
$(".charIcon").hover(function(){
    if (gameStatus=="prepare"){
        var characterNumber = $(this).attr("id");
        $("#toolTip").html(characterList[characterNumber].info);
        $("#toolTip").css("visibility","visible");
    }
},function(){
    $("#toolTip").html("");
    $("#toolTip").css("visibility","hidden");
})

//on click of character icons, perform different actions based on game state
$(".charIcon").on("click",function(){
    //if the game is in prepare state, clicking icons should select characters
    if (gameStatus=="prepare"){
        var characterNumber = $(this).attr("id");
        if (attacker==null){
            //positions attacker on screen and display info
            attacker = characterList[characterNumber];
            attackerIndex=characterNumber;//remembers which character is the attacker
            $("#attackerDiv").css("background-image","url(assets/images/"+attacker.picture+")");
            $("#attackerDiv").css("visibility","visible");
            if(attacker.direction=="left"){
                $("#attackerDiv").css("transform","scaleX(-1)");//flip direction of picture so attacker faces defender
                attackerTransformed=true;
            }
            $("#attackerHealth").text(attacker.health);
            $("#attackerHealth").css("visibility","visible");
            displayMessage(attacker.name+", "+attacker.title+":");
            displayMessage(attacker.entrance);
            
            //removes character icon from view
            $(this).css("visibility","hidden");
            
        } else {
            if (defender==null){
                //positions defender on screen and display info
                defender = characterList[characterNumber];
                $("#defenderDiv").css("background-image","url(assets/images/"+defender.picture+")");
                $("#defenderDiv").css("visibility","visible");
                if(defender.direction=="right"){
                    $("#defenderDiv").css("transform","scaleX(-1)");//flip direction of picture so defender faces attacker
                    defenderTransformed=true;
                }
                $("#defenderHealth").text(defender.health);
                $("#defenderHealth").css("visibility","visible");
                displayMessage(defender.name+", "+defender.title+":");
                displayMessage(defender.entrance);
                displayMessage("The battle begins!");

                //removes icon from view
                $(this).css("visibility","hidden");

                //ensures the background does not repeat consecutively
                while (lastBackground==randomBackground){
                randomBackground=Math.floor(Math.random()*7);
                }
                $("#centerBody").css("background-image","url(assets/images/background"+randomBackground+".jpg)");
                lastBackground=randomBackground;
            }
        }
        if ((attacker!=null) && (defender!=null)){//activate attack button
            $("#performAction").css("visibility","visible");
            $("#performAction").attr("src","assets/images/attack_icon.png");
            gameStatus="battle";
        }
    } else if (gameStatus=="battle") {//new enemy cannot be selected until current enemy is defeated
        displayMessage("An enemy is already present. Please select the attack button.");
    } else if (gameStatus=="win") {//theoretically should never get here
        displayMessage("Please select the victory button and start a new game.");
    } else {//gameStatus=="lose"
        displayMessage("Please select the revive button and start a new game.");
    } 
})

$("#performAction").on("click",function(){
    if (gameStatus=="battle"){
        //pick out random attack skill
        var randomAttack = attacker.attackList[Math.floor(Math.random()*attacker.attackList.length)];
        displayMessage(attacker.name+randomAttack+", dealing "+attacker.attack+" damage.");
        //attack deals damage
        defender.health = defender.health - attacker.attack;
        //attacker gets stronger
        attacker.attack = attacker.attack + attacker.startingAttack;
        if (defender.health>0){
            $("#defenderHealth").text(defender.health);
            //pick out random defense skill
            var randomDefense = defender.defenseList[Math.floor(Math.random()*defender.defenseList.length)];
            displayMessage(defender.name+randomDefense+", returning "+defender.counter+" damage.");
            //defender deals counter damage
            attacker.health = attacker.health - defender.counter;
            if (attacker.health>0){
                $("#attackerHealth").text(attacker.health);
            } else {
                attacker.health = 0;//health shouldn't be negative
                $("#attackerHealth").text(attacker.health);
                displayMessage("You have been defeated. Revive and try again!");
                gameStatus = "lose";
                $("#performAction").attr("src","assets/images/lose_icon.png");
                attacker=null;
                defender=null;
            }
        } else {
            defender.health = 0;//health shouldn't be negative
            $("#defenderHealth").text(defender.health);
            displayMessage(defender.name+" has been defeated.");
            // defender.status = "used";
            defender=null;
            gameStatus = "prepare";
            $("#performAction").css("visibility","hidden");
            $("#defenderDiv").css("visibility","hidden");
            if (defenderTransformed){
                $("#defenderDiv").css("transform","scaleX(1)");
            }
            $("#defenderHealth").css("visibility","hidden");

            var totalEnemyHP = 0;//check for win
            for (var i in characterList){
                if (i != attackerIndex){//excluding the attacker, add up all enemy HP
                    totalEnemyHP = totalEnemyHP + characterList[i].health;
                }
            }
            if (totalEnemyHP == 0){
                gameStatus="win";
                $("#performAction").attr("src","assets/images/win_icon.png");
                $("#performAction").css("visibility","visible");
                displayMessage(attacker.name+" is victorious. Refresh and try a different character!");
                attacker=null;
                defender=null;
            }
        }
        
    } else {
        $(".charIcon").css("visibility","visible");
        $("#performAction").css("visibility","hidden");
        $("#attackerDiv").css("visibility","hidden");
        if (attackerTransformed){
            $("#attackerDiv").css("transform","scaleX(1)");
        }
        $("#defenderDiv").css("visibility","hidden");
        if (defenderTransformed){
            $("#defenderDiv").css("transform","scaleX(1)");
        }
        $("#attackerHealth").css("visibility","hidden");
        $("#defenderHealth").css("visibility","hidden");
        gameStatus="prepare";
        resetGame();
    }
    
    console.log("attacker");
    console.log(attacker);
    console.log("defender");
    console.log(defender);
})
