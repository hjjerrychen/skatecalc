var buffer = {
  type: null,
  name: null,
  lod: null,
  ur: false,
  dg: false,
  edge: false,
  rep: false,
  spinV: false,
  fly: false,
  cof: false,
  bonus: false,
  inv: false,
  goe: 0,
  bv: null,
  goeValue: null
};

var checkJump = /A$|T$|S$|Lo$|F$|Lz$|Eu$/;
var checkSpin = /Sp/;
var checkSeq = /Sq/;

window.onload = function(){
  //$("#nav-jmp button").click(addText);
  $(".setName button").click(setName);
  $(".setLOD button").click(setLOD);
  $(".setUr").click(setUr);
  $(".setDg").click(setDg);
  $(".setEdge").click(setEdge);
  $(".setREP").click(setREP);
  $(".setBonus").click(setBonus);
  $(".setInvalid").click(setInvalid);
  $(".setFly").click(setFly);
  $(".setSpinV").click(setSpinV);
  $(".setCOF").click(setCOF);
  $(".setGOE button").click(setGOE);

}

function setName(){
  buffer.name = $(this).html();
  $("#elem-disp").html(buffer.name);
  setType(this);
}

// function setType(){
//   if (checkJump.test(buffer.name)){
//     buffer.type = "jump";
//   }
//   else if (checkSpin.test(buffer.name)){
//     buffer.type = "spin";
//   }
//   else {
//     buffer.type = "seq";
//   }
//   $("#elem-disp").append(buffer.type);
// }


function setType(node){
  if(buffer.type != null){
    if ($(node).parents().hasClass(".nav-jmp")){
      buffer.type = "jump";
    }
    else if ($(node).parents().hasClass(".nav-sp")){
      buffer.type = "spin";
    }
    else {
      buffer.type = "seq";
    }
    $("#elem-disp").append(buffer.type);
  }
}


function setLOD(){
  buffer.lod = $(this).html();
  $("#elem-disp").append(buffer.lod);
}

function setUr(){
  buffer.ur = !buffer.ur;
  $("#elem-disp").append("<");

}

function setDg(){
  buffer.dg = !buffer.dg;
  $("#elem-disp").append("<<");
}

function setEdge(){
  buffer.edge = !buffer.edge;
  $("#elem-disp").append("e");
}


function setREP(){
  buffer.rep = !buffer.rep;
  $("#elem-disp").append("+REP");
}

function setBonus(){
  buffer.bonus = !buffer.bonus;
  $("#elem-disp").append("x");
}

function setInvalid(){
  buffer.invalid = !buffer.invalid;
  $("#elem-disp").append("*");
}

function setFly(){
  buffer.fly = !buffer.fly;
  $("#elem-disp").append("F");
}

function setSpinV(){
  buffer.spinV = !buffer.spinV;
  $("#elem-disp").append("V");
}

function setCOF(){
  buffer.cof = !buffer.cof;
  $("#elem-disp").append("Co");
}

function setGOE(){
  buffer.goe = parseInt($(this).html());
  $("#elem-disp").append(buffer.goe);
}

function renderElementSelector(){
  if(buffer.type === "jump"){

  }
  else if(buffer.type === "spin"){

  }
  else {

  }
}
//$("#elem-disp").html("test");




// function addText(){
//   $("#elem-disp").append(this.innerHTML);
//
// }
