
var index = 0;
var cur_offset = 0;

var NUM_CHARS = 12;

var stepTimeout = null;



var images = []
var numLoaded = 0;

function setup(){

  images = document.getElementsByClassName("option");

  images[0].onload = function(){
    drawSelections();
  }


}

var ctx;
function drawSelections(){
  var canvas = document.getElementById("selectioncanvas");
  if (canvas.getContext){
    //initial setup
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,1000,300);

    var gap = 20*2;
    var color_width = 76*2;
    var x_interval = gap + color_width;
    var offset = 32*2;

    //var images = [new Image,new Image,new Image,new Image,new Image];
    for(var i = 0; i <= 4; i++){
      var curIdx = index + i -2;
      if (curIdx<0){
        curIdx = NUM_CHARS + curIdx;
      }else if(curIdx >= NUM_CHARS){
        curIdx = curIdx - NUM_CHARS;
      }

      var cur_x = cur_offset*offset + x_interval*i

      /*ctx.fillStyle=colorT[curIdx];
      ctx.fillRect(cur_x,20,color_width,150);*/

      //images[i] = new Image;

      /*images[i].onload = function(){
        ctx.drawImage(images[i],cur_x,20,color_width,150);
      };

      images[i].src = images_src[curIdx];*/

      ctx.drawImage(images[curIdx],cur_x,20,color_width,240);

      if( i == 2 && cur_offset == 0){
        ctx.lineWidth = "7";
        ctx.strokeStyle="#000000";
        ctx.strokeRect(cur_x,20,color_width,240);

      }


    }
    var x_pos = ( (1000 -gap*2) / 2);
    ctx.beginPath();
    ctx.moveTo(x_pos,280);
    ctx.lineTo(x_pos+10,290);
    ctx.lineTo(x_pos-10,290);
    ctx.lineTo(x_pos,280);
    ctx.fill();



  }
}

function step(){
  var isBumped = false;

  cur_offset++;
  if(cur_offset > 2){
    cur_offset = 0;
    index--;
    isBumped = true;
    if (index < 0){
      index = NUM_CHARS -1;
    }
  }
  drawSelections();

  return isBumped;
}

var numFullRun = 0;
var numIndices = 0;

function runSteps(idx){
  //numIndices++;
  /*if( numIndices >= 50){
    clearTimeout(stepTimeout);
    return;
  }*/

  if( step() ){
    numIndices++;
    if (numIndices >= NUM_CHARS){
      numIndices = 0;
      numFullRun++;
    }
  }

  var interval = 40;
  if( numFullRun >= 3){
    interval = 60;
    if( index == idx){
      clearTimeout(stepTimeout);
      return;
    }
  }

  stepTimeout = setTimeout(function(){ runSteps(idx); }, interval);
}

function selectRandom(){
  //step();
  //alert("index: " + index);
  var i = Math.floor(Math.random() * NUM_CHARS);

  numFullRun = 0;
  numIndices = 0;
  runSteps(i);

  //var selection = characters[i];
  //alert("This will choose a random character: " + selection); */
}

draw();
