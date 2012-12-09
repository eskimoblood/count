var colors=["#333333","#111111","#000000","#222222"];
var h=3700,w;
var a=1;
var min=0;
var papers=[];
var counter=0,totalmarks=0;
var context,canvas;
var offset=0,longcat=0;
var tip=1;
var y;

function newPen(){
  min=Math.random()*0.4+0.5;
  tip=Math.random()*2+.4;
  a=Math.random()+1;
  context.lineCap = 'round';
  context.strokeStyle = colors[Math.round(Math.random()*colors.length)];
  quality=Math.random()*0.0002+0.00005;
}

function clickclack(k){
}

function think(k){

  var p=[];
  var cnt=0;
  var rand=20;
  var num=k,x=rand;
  y=rand;

  for(var i=0;i<num;i++){
    x+=4;
    if(Math.random()<0.05)y+=Math.random()*2.0;
    if(Math.random()<0.05)y+=Math.random()-1;
    if(i>4 && i%5==0){
      x+=Math.random()*8+8;
      if(x > w-rand*(Math.random()*4.0+2)){
        x=rand+r(40);
        y+=30+r(16.0);
        if(y>h-rand*2){
          y=rand;
          papers.push(p);
          p=[];
        }
      }
    }
    if((i+1)%5==0)close=true;
    else close=false;
    p.push([Math.round(x),Math.round(y),close]);
  }
  papers.push(p);
  p=[];
}

function render(){
  var next=papers[0];
  var lo=next[next.length-1][1];
  grow(lo);
  newPen();
  for(var k=0;k<papers.length;k++){
    var p=papers[k];
    for(var i=0;i<p.length;i++)mark(p[i][0],p[i][1],p[i][2]);
    if(k<papers.length-1){
      var next=papers[k+1];
      var lo=next[next.length-1][1];
      grow(lo);
    }
  }
}

function r(input){ return Math.random()*input; }

function mark(x,y,close){
  totalmarks++;
  var step=4.0,
      l=r(10)+16,
      angle=(r(16)-8)/180.0*Math.PI;
  angle+=offset;
  var startX=x+r(2.0),
      startY=y+r(8.0);
  a-=quality;
  if(a<min){newPen();}
  context.globalAlpha= a;
  context.lineWidth=tip+r(.2);
  context.beginPath();
  if(close){
    var step=5.0;
    startY+=r(6.0);
    angle-=(r(20.0)+50)/180.0*Math.PI;
  }
  var tmpX=startX,
      tmpY=startY,
      res=Math.random()*3+4;
  for(var i=0;i<res;i++){
    context.lineTo(tmpX,tmpY);
    tmpX+=Math.sin(angle)*step;
    tmpY+=Math.cos(angle)*step;
    angle+=r(0.2)-0.1;
  }
  context.stroke();
}

function grow(lo){
  canvas = $('<canvas/>');
  canvas[0].id="canvas"+$("canvas").length;
  if(lo<3000)h=lo+200;
  canvas[0].height = h;
  canvas[0].width = w;
  $('#container').append(canvas);
  context = canvas.get(0).getContext("2d");
  context.lineJoin = "round";
}

w=$(window).get(0).innerWidth-10;
var num=url('?count');
think(num);
render();
