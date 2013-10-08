
var gamestartWindow = Ti.UI.createWindow({backgroundColor:'black'});

var gamemusic = Ti.Media.createSound({url:"sounds/digestivebiscuit.mp3", looping:true, volume:0.5});

var image = Ti.UI.createImageView({
  image:'/images/start.png',
  zIndex:0
  
});

var image2 = Ti.UI.createImageView({
  image:'/images/start2.png',
  zIndex:0
  
});

var back = Ti.UI.createImageView({
  image:'/images/back.png',
  zIndex:1,
  bottom:43,
  left:10
});

var score = Ti.UI.createImageView({
  image:'/images/scores.png',
  zIndex:1,
  bottom:125,
  right:10
});

var play = Ti.UI.createImageView({
  image:'/images/play.png',
  zIndex:1,
  bottom:247,
  right:10
});

var helpButton = Titanium.UI.createButton({
  	 	bottom:5,
  	 	right:5,
  	 	style:Ti.UI.iPhone.SystemButton.INFO_LIGHT
});

	 Ti.UI.iPhone.SystemButton.INFO_LIGHT;
	 
var startButton = Titanium.UI.createButton({
		borderRadius:10,
   		backgroundColor:'yellow',
   		width:100,
  	 	height:50,
  	 	bottom:200,
  	 	title: "Start"
});

var gameScore = Titanium.UI.createView({
   		borderRadius:10,
   		backgroundColor:'white',
   		borderColor:'black',
   		width:250,
  	 	height:250,
  	 	top:50,
  	 	zIndex:4
});

var instructions = Ti.UI.createImageView({
		image : '/images/instructions.png',
		zIndex:5
	});

var closeHighcore = Ti.UI.createImageView({
		image : '/images/exit.png',
		top : 5,
		right : 10,
		width : 25,
		height : 25
	});


	var labelhighscore = Ti.UI.createLabel({
		color : 'red',
  		font: { fontSize:30, fontFamily: "Arial" },
		text : 'High Scores',
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : 10,
		width : 250,
		zIndex : 2
	});

	var labelscore1player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 60,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore2player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 90,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore3player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 120,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore4player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 150,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore5player = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		textAlign : Ti.UI.TEXT_ALIGNMENT_LEFT,
		top : 180,
		left : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore1 = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 60,
		right : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore2 = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 90,
		right : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore3 = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		// text: Ti.App.Properties.getString('highscore3'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 120,
		right : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore4 = Ti.UI.createLabel({
		color : '#900',
  	font: { fontSize:24, fontFamily: "Arial" },
		//text:  Ti.App.Properties.getString('highscore4'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 150,
		right : 10,
		width : 150,
		zIndex : 3
	});

	var labelscore5 = Ti.UI.createLabel({
		color : '#900',
  		font: { fontSize:24, fontFamily: "Arial" },
		textAlign : Ti.UI.TEXT_ALIGNMENT_RIGHT,
		top : 180,
		right : 10,
		width : 150,
		zIndex : 3
	});


	gameScore.add(labelscore1player);
	gameScore.add(labelscore2player);
	gameScore.add(labelscore3player);
	gameScore.add(labelscore4player);
	gameScore.add(labelscore5player);
	gameScore.add(labelscore1);
	gameScore.add(labelscore2);
	gameScore.add(labelscore3);
	gameScore.add(labelscore4);
	gameScore.add(labelscore5);

	gameScore.add(labelhighscore);

	gameScore.add(closeHighcore);
	
	gamestartWindow.add(gameScore);
	gameScore.hide();
	



	
if (!Ti.App.Properties.hasProperty('playerscores')) {
	var playerscores = [];
	playerscores.push({ title: "Player 1", score:"530" });
	playerscores.push({ title: "Player 2", score:"430"});
	playerscores.push({ title: "Player 3", score:"330"});
	playerscores.push({ title: "Player 4", score:"230"});
	playerscores.push({ title: "Player 5", score:"130"});
	Ti.App.Properties.setList("playerscores",playerscores);
		 
	//Ti.API.info("score array:" + JSON.stringify(playerscores));	
	
}


score.addEventListener('click',function(e)
{

	
	var scorearray = Ti.App.Properties.getList("playerscores");	

	//Ti.API.info("score array:" + scorearray);



	labelscore1player.text = scorearray[0].title;
	labelscore2player.text = scorearray[1].title;
	labelscore3player.text = scorearray[2].title;
	labelscore4player.text = scorearray[3].title;
	labelscore5player.text = scorearray[4].title;

	labelscore1.text = scorearray[0].score;
	labelscore2.text = scorearray[1].score;
	labelscore3.text = scorearray[2].score;
	labelscore4.text = scorearray[3].score;
	labelscore5.text = scorearray[4].score;




	gameScore.show();


});

helpButton.addEventListener('click',function(e)
{
	gamestartWindow.add(instructions);

});



closeHighcore.addEventListener('click',function(e)
{
		gameScore.hide();
});


instructions.addEventListener('click',function(e)
{
		gamestartWindow.remove(instructions);
});


play.addEventListener('click',function(e)
{
gamemusic.stop();
var player = Ti.Media.createSound({url:"sounds/laugh.wav"});
player.play();

   var win = require('game').pumpkingame;
 
   var newgame = new win();
 
   newgame.open();
});

gamestartWindow.addEventListener('close', function() {
	gamemusic.setLooping(false);
	gamemusic.stop();
});


gamestartWindow.addEventListener('open', function() {
		gamemusic.play();
});


if (Titanium.Platform.displayCaps.dpi == 160){
	gamestartWindow.add(image);
}else{
	gamestartWindow.add(image2);
}


gamestartWindow.add(score);
gamestartWindow.add(helpButton);
gamestartWindow.add(play);
gamestartWindow.open({fullscreen:true, navBarHidden:true});