exports.pumpkingame = function(){

var window = Ti.UI.createWindow({backgroundColor:'black'});

var platino = require('co.lanica.platino');

var game = platino.createGameView();

game.fps = 30;

game.color(0, 0, 0);

game.debug = false;

var shapes = new Array();

var newitems = new Array();

var scene = platino.createScene();


game.pushScene(scene);

var TOUCH_SCALE = 1;

//SCENES


// Create sprites and add to the scene
var background = platino.createSprite(
  {image:'images/gamebg.png', x:0, y:0}
);

var character = platino.createSprite({image:'images/mummy.png', x:215, y:372});

var  playersBasket = platino.createSpriteSheet({image:'graphics/baskets.xml', x:215, y:372});
playersBasket.selectFrame("basket");


var catchYzone = 400;
var mummyY = 372;
var basketsY = 415;
var scaleYdifferance = 0;
var basketXleft = 215;
var basketXright = 268;
var PlayerScore = 0 ;
var itemsOnLevel = 20;
var currentItemCount = 0;
var randomx = 10;
var lowestItemOnScreen = 1;
var numberOfItemsDropped = 0;
var Level = 1;
var superBasket = false;
var gamemusic = Ti.Media.createSound({url:"sounds/digestivebiscuit.mp3", looping:true, volume:0.2});

// UI bar

var labelscoretext = Ti.UI.createLabel({
  color: 'black',
  font: { fontSize:24, fontFamily: "Arial" },
  text: 'SCORE',
  textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
  top: 5,
  right:5,
  width: 150,
  zIndex:7
});

var labelscore = Ti.UI.createLabel({
  color: '#900',
  font: { fontSize:24 },
  text: '0',
  textAlign: Ti.UI.TEXT_ALIGNMENT_RIGHT,
  top: 30,
  right:5,
  width: 150,
  zIndex:7
});

var labellivestext = Ti.UI.createLabel({
  color: 'black',
  font: { fontSize:24, fontFamily: "Arial" },
  text: 'LIVES',
  textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
  top: 5,
  left:5,
  width: 150,
  zIndex:7
});
// End UI bar

//Drop Zone
var droppedItem1 = platino.createSpriteSheet({image:'graphics/items.xml', x:5, y:30});
droppedItem1.selectFrame("sparkle");
var droppedItem2 = platino.createSpriteSheet({image:'graphics/items.xml', x:25, y:30});
droppedItem2.selectFrame("sparkle");
var droppedItem3 = platino.createSpriteSheet({image:'graphics/items.xml', x:45, y:30});
droppedItem3.selectFrame("sparkle");


// End of Drop Zone

//Game Over

var gameOverview = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		width:Ti.UI.SIZE,
  	 	height:Ti.UI.SIZE,
  	 	layout:"vertical",
  	 	top:50,
  	 	zIndex:9
});

var labelgameovermessage = Ti.UI.createLabel({
  	color: 'red',
  	font: { fontSize:30, fontFamily: "Arial" },
  //shadowColor: 'yellow',
 // shadowOffset: {x:5, y:5},
  	text: 'Game Over',
  	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  	top: 5,
 	width: Ti.UI.SIZE,
  	zIndex:11
});

var restartButton = Titanium.UI.createButton({
		borderRadius:10,
  		font: { fontSize:24, fontFamily: "Arial" },
   		width:150,
  	 	height:50,
  	 	bottom:5,
  	 	title: "Restart"
});


gameOverview.add(labelgameovermessage);

gameOverview.add(restartButton);

var gameOverviewNewHighScore = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		layout:'vertical',
   		width:250,
  	 	height:Ti.UI.SIZE,
  	 	top:50,
  	 	zIndex:9
});

var labelgameovermessage = Ti.UI.createLabel({
  color: 'red',
  font: { fontSize:32, fontFamily: "Arial" },
  text: 'New High Score!',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 5,
  width: 250,
  zIndex:11
});

var playersname = Ti.UI.createTextField({
  color: 'black',
  font: { fontSize:24, fontFamily: "Arial" },	
  hintText : 'Enter Your Name',
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 5,
  width: 240,
  zIndex:11
});

var saveButton = Titanium.UI.createButton({
		borderRadius:10,
   		backgroundColor:'green',
   		font: { fontSize:24, fontFamily: "Arial" },
   		width:150,
  	 	height:50,
  	 	top:5,
  	 	bottom:5,
  	 	title: "Save"
});

gameOverviewNewHighScore.add(labelgameovermessage);
gameOverviewNewHighScore.add(playersname);
gameOverviewNewHighScore.add(saveButton);



saveButton.addEventListener('click',function(e)
{

		///save the score in an array
		var scorearray = Ti.App.Properties.getList("playerscores");
		scorearray.push({
			title : playersname.value,
			score : PlayerScore
		});

		//sort the array
		scorearray.sort(sortBy('score'));
		scorearray.reverse();
		//delete the last item
		scorearray.splice(scorearray.length - 1, 1);

		Ti.App.Properties.setList('playerscores', scorearray);

		game.stop();
		window.close(); 

});

var sortBy = function (prop) {
    return function (a, b) {
        if( a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    };
};


var pause = Ti.UI.createImageView({
  image:'/images/pause.png',
  top:5,
  left:150,
  width:35,
  height:35,
  zIndex:16	  
});

var labelpaused = Ti.UI.createLabel({
  color: 'red',
  font: { fontSize:30, fontFamily: "Arial" },
  text: 'PAUSED',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 5,
  width: 150
});


var gamepause = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		width:Ti.UI.SIZE,
  	 	height:Ti.UI.SIZE,
  	 	top:150,
  	 	zIndex:14,
  	 	layout: "vertical"
  	 	
});


var unpause = Titanium.UI.createButton({
		borderRadius:10,
   		Color:'black',
		font: { fontSize:24, fontFamily: "Arial" },
   		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
   		width:150,
  	 	height:60,
  	 	bottom:5,
  	 	top:5,
  	 	right:5,
  	 	left:5,
  	 	title: "Don't Stop'"
});

var btnquit = Titanium.UI.createButton({
		borderRadius:10,
   		Color:'black',
		font: { fontSize:24, fontFamily: "Arial" },
   		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
   		width:150,
  	 	height:60,
  	 	bottom:5,
  	 	top:5,
  	 	right:5,
  	 	left:5,
  	 	title: "Quit"
});

gamepause.add(labelpaused);
gamepause.add(unpause);
gamepause.add(btnquit);
window.add(pause);


pause.addEventListener('click',function(e)
{
	window.add(gamepause);
	clearInterval(dropItems);
	clearInterval(animateItems);
});


btnquit.addEventListener('click',function(e)
{
	clearInterval(dropItems);
	clearInterval(animateItems);
	game.stop();
	window.close();
});

unpause.addEventListener('click',function(e)
{
	var choose = Ti.Media.createSound({url:"sounds/laugh.wav"});
	choose.play();
   window.remove(gamepause);
   
 	animateItems = setInterval(moveItems,currentDropSpeed);
	dropItems = setInterval(dropNewitems,currentItemDropSpeed);
});

var msgs = ["Halloween Rocks. ",
"Your a real pro at this. ",
"Random Message 1.",
"Random Message 2.",
"Random Message 3.",
"Random Message 4.",
"Random Message 5.",
];


var msgsview = Titanium.UI.createView({
   		borderRadius:5,
   		backgroundColor:'black',
   		borderColor:'white',
   		width:250,
  	 	height:Ti.UI.SIZE,
  	 	layout:'vertical',
  	 	top:40,
  	 	zIndex:17
});

var okButton = Titanium.UI.createButton({
		borderRadius:10,
   		backgroundColor:'white',
   		font: { fontSize:24, fontFamily: "Arial" },
   		width:100,
  	 	height:50,
  	 	top:5,
  	 	bottom:5,
  	 	title: "WOW"
});


var labelgoodjob = Ti.UI.createLabel({
  color: 'red',
		font: { fontSize:30, fontFamily: "Arial" },
  text: 'Awesome!',
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 10,
  width: 250,
  zIndex:11
});

var labelmsgs = Ti.UI.createLabel({
  color: 'black',
	font: { fontSize:24, fontFamily: "Arial" },
  textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  top: 5,
  width: 245,
  left:5,
  right:5,
  height:Ti.UI.SIZE,
  zIndex:12
});


msgsview.add(labelgoodjob);
msgsview.add(labelmsgs);
msgsview.add(okButton);

okButton.addEventListener('click',function(e)
{
	var choose = Ti.Media.createSound({url:"sounds/laugh.wav"});
	choose.play();
	//increase the drop speed
	if (currentDropSpeed != 5){
		currentDropSpeed = currentDropSpeed - 5;
	}
	
	
	//increase the amount of items
	if (currentItemDropSpeed != 500){
		currentItemDropSpeed = currentItemDropSpeed - 500;
	}
	
	//remove the view
   window.remove(msgsview);
   
   //start the item dropping
 		animateItems = setInterval(moveItems,currentDropSpeed);
	    dropItems = setInterval(dropNewitems,currentItemDropSpeed);
});


restartButton.addEventListener('click',function(e)
{
	game.stop();
	window.close();
});

//show a Random msgs
var stopTimer = false;

var currentDropSpeed = 50;
var currentItemDropSpeed = 4000;
var animateItems;
var dropItems;

///create the scene
window.add(labelscore);
window.add(labelscoretext);
window.add(labellivestext);
scene.add(background);
scene.add(character);
scene.add( playersBasket);
scene.add(droppedItem1);
scene.add(droppedItem2);
scene.add(droppedItem3);

character.center = {x:196 * TOUCH_SCALE, y:mummyY};
 playersBasket.center = {x:219 * TOUCH_SCALE, y:basketsY};

background.z = 0;
character.z = 1;
 playersBasket.z = 2;

var WINDOW_SCALE_FACTOR_X = 1;
var WINDOW_SCALE_FACTOR_Y = 1;

// Onload event is called when the game is loaded.
game.addEventListener('onload', function(e) {


     if (game.screen.width != 320){
    	scene.remove(background);
    	var bg2 = platino.createSprite(
  			{image:'images/gamebg2x.png', x:0, y:0,z:0}
			);
    	scene.add(bg2);
    scaleYdifferance = 400;
    	character.y = character.y + scaleYdifferance;
    	playersBasket.y = playersBasket.y + scaleYdifferance;
    	catchYzone = catchYzone + scaleYdifferance;
     	droppedItem1.y = 60;
     	droppedItem2.y = 60;
     	droppedItem3.y = 60;
     	droppedItem1.z = 1;
     	droppedItem2.z = 1;
     	droppedItem3.z = 1;
     }
    TOUCH_SCALE = game.screen.width  / game.size.width;
    game.registerForMultiTouch();

    game.start();
});

window.addEventListener('close', function() {
	gamemusic.setLooping(false);
	gamemusic.stop();
});


window.addEventListener('open', function() {
		gamemusic.play();
});


var onTouchStart = function(e) {
    for (var pointName in e.points) {      
     
        if (typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
            shapes[pointName] = platino.createSprite({width:64, height:64});
            
            if (e.type == 'touchstart') {

            } else if (e.type == 'touchmove') {

            } else {

            }
        }
        character.center = {x: e.points[pointName].x * TOUCH_SCALE, y:mummyY  +scaleYdifferance };
       
        playersBasket.center = {x: (e.points[pointName].x * TOUCH_SCALE) + 23, y:basketsY + scaleYdifferance};
       
              if (superBasket == true){
       
       	 basketXleft = ((e.points[pointName].x * TOUCH_SCALE) - 23 ) ;
       	 basketXright = basketXleft + 80;
       }
       else
       {
       	basketXleft = e.points[pointName].x * TOUCH_SCALE ;
      	basketXright = basketXleft + 53;
       }
    }
};

var onTouchEnd = function(e) {

    for (var pointName in e.points) {
        
        if (typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
            continue;
        }
        
        scene.remove(shapes[pointName]);
        
        shapes[pointName] = null;
        delete shapes[pointName];
    }
    
    if (e.type == 'touchend') {
        for (var pointName in shapes) {
            if (typeof shapes[pointName] === 'undefined' || shapes[pointName] == null) {
                continue;
            }
            scene.remove(shapes[pointName]);
            shapes[pointName] = null;
        }
        shapes.length = 0;
    }
};


function moveItems(){


		for (var i = lowestItemOnScreen; i <= currentItemCount; i++) {
			var newx = newitems[i].x;
			var newy = newitems[i].y + 5;

			newitems[i].move(newx, newy);

			if (newitems[i].y >= catchYzone) {
					if (newitems[i].x >= basketXleft && newitems[i].x <= basketXright) {
						lowestItemOnScreen = lowestItemOnScreen + 1;
						if (newitems[i].tag == 'item') {
							PlayerScore = PlayerScore + 10;
	
						} else if (newitems[i].tag == 'skull') {
							PlayerScore = PlayerScore + 20;
							
						} else if (newitems[i].tag == 'ghost') {
							
								var missed2 = Ti.Media.createSound({url:"sounds/missed.wav"});
								missed2.play();
							PlayerScore = PlayerScore - 100;
							clearInterval(animateItems);
	
							if (currentDropSpeed != 5) {
								currentDropSpeed = currentDropSpeed - 5;
							}
	
							if (currentItemDropSpeed != 500) {
								currentItemDropSpeed = currentItemDropSpeed - 500;
							}
							animateItems = setInterval(moveItems, currentDropSpeed);
	
						} else if (newitems[i].tag == 'candyCorn') {
								var choose = Ti.Media.createSound({url:"sounds/ding.wav"});
								choose.play();
							PlayerScore = PlayerScore + 100;
							clearInterval(animateItems);
							if (currentDropSpeed != 5) {
								currentDropSpeed = currentDropSpeed + 5;
							}
							if (currentItemDropSpeed != 500) {
								currentItemDropSpeed = currentItemDropSpeed + 500;
							}
							animateItems = setInterval(moveItems, currentDropSpeed);
						} else if (newitems[i].tag == 'sparkle') {							
							if (numberOfItemsDropped == 2) {
								scene.add(droppedItem2);
								numberOfItemsDropped = numberOfItemsDropped - 1;
							} else if (numberOfItemsDropped == 1) {
								scene.add(droppedItem3);
								numberOfItemsDropped = numberOfItemsDropped - 1;
							} else if (numberOfItemsDropped == 0) {
								PlayerScore = PlayerScore + 1000;
							}
						} else if (newitems[i].tag == 'ghost') {

							if (superBasket == true){
									var laugh = Ti.Media.createSound({url:"sounds/ding.wav"});
									laugh.play();
								PlayerScore = PlayerScore + 1000;
							}else{
							var awesome = Ti.Media.createSound({url:"sounds/tada.wav"});
							awesome.play();
								playersBasket.selectFrame("superbasket");
								PlayerScore = PlayerScore + 10;
								superBasket = true;
								
							}
							
						}

						scene.remove(newitems[i]);
						newitems[i].dispose();
						labelscore.text = PlayerScore;
						if (PlayerScore % 100 == 0) {
	
							clearInterval(dropItems);
							clearInterval(animateItems);
							
							if (superBasket == true){

								playersBasket.selectFrame("basket");
								superBasket = false;
							}
							
							//Post Msgs 	
							window.add(msgsview);
							var msgsnumber = randomFromInterval(0, 29);
							labelmsgs.text = msgs[msgsnumber];
							Level = Level + 1;
								
						} 
					
					} else if (newitems[i].y == catchYzone + 20) {
					if (newitems[i].tag == "item" || newitems[i].tag == "skull") {						
							var missed = Ti.Media.createSound({url:"sounds/missed.wav"});
							missed.play();
							
						newitems[i].selectFrame("explosion");
						numberOfItemsDropped = numberOfItemsDropped + 1;
							
						if (numberOfItemsDropped == 3) {
							
							clearInterval(dropItems);
							clearInterval(animateItems);
							scene.remove(droppedItem1);
			var scorearray = Ti.App.Properties.getList("playerscores");	
							
							if (PlayerScore >= scorearray[4].score) {
								window.add(gameOverviewNewHighScore);
							} else {

								window.add(gameOverview);
							}

						} else if (numberOfItemsDropped == 2) {
							scene.remove(droppedItem2);
						} else if (numberOfItemsDropped == 1) {
							scene.remove(droppedItem3);
						}

							var splat = Ti.Media.createSound({url:"sounds/splat.mp3"});
							splat.play();
					}

				} else if (newitems[i].y >= catchYzone + 80) {
					scene.remove(newitems[i]);
					newitems[i].dispose();
				}
			}

		}
	}


function dropNewitems(){
	//create a new item
	var newitem = currentItemCount + 1;
	
	var newx = randomFromInterval(5,315);
	
	newitems[newitem] =  platino.createSpriteSheet({image:'graphics/items.xml', x:newx, y:15});
		
		var items = Array('item','item','item','item','item','skull','item','ghost','skull','candyCorn','ghost','sparkle','item','item','skull','item','skull','item','item','skull','item','ghost','skull');
		
		
		var item = items[Math.floor(Math.random()*items.length)];
		
		if (item == 'item'){
				newitems[newitem].selectFrame("item");
				newitems[newitem].tag = "item";	
		}else if(item == 'skull'){
				newitems[newitem].selectFrame("skull");
				newitems[newitem].tag = "skull";
		}else if(item == 'ghost'){
				newitems[newitem].selectFrame("ghost");
				newitems[newitem].tag = "ghost";	
		}else if(item == 'candyCorn'){
				newitems[newitem].selectFrame("candyCorn");
				newitems[newitem].tag = "candyCorn";	
		}else if(item == 'sparkle'){
				newitems[newitem].selectFrame("sparkle");
				newitems[newitem].tag = "sparkle";
		}else if(item == 'ghost'){
				newitems[newitem].selectFrame("ghost");
				newitems[newitem].tag = "ghost";	
		};

	
	
	
	scene.add(newitems[newitem]);
	newitems[newitem].z = 4;

	currentItemCount = newitem;

}


function startRound(){
		dropNewitems();		
		
		animateItems = setInterval(moveItems,currentDropSpeed);
	    dropItems = setInterval(dropNewitems,currentItemDropSpeed);

}

startRound();


function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

game.addEventListener('touchstart', onTouchStart);
game.addEventListener('touchmove',  onTouchStart);
game.addEventListener('touchstart_pointer', onTouchStart);
game.addEventListener('touchend', onTouchEnd);
game.addEventListener('touchend_pointer', onTouchEnd);

window.add(game);
window.zIndex = 1;

window.fullscreen= true;
window.navBarHidden = true;
return window;

};