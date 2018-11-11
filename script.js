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
  invalid: false,
  goe: 0,
  bv: null,
  goeValue: null
};

var checkJump = /A$|T$|S$|Lo$|F$|Lz$|Eu$/;
var checkSpin = /Sp/;
var checkSeq = /Sq/;

var elementDisplay;

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
    elementDisplay = $("#elem-disp");

}

function setName(){
  buffer.name = $(this).html();
  elementDisplay.html(buffer.name);
  setType(this);
  renderBufferedElement();
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
//   elementDisplay.append(buffer.type);
// }


function setType(node){
  if ($(node).parents(".nav-jmp").length){
    buffer.type = "jump";
  }
  else if ($(node).parents(".nav-sp").length){
    buffer.type = "spin";
  }
  else {
    buffer.type = "seq";
  }


  elementDisplay.append(buffer.type);
}


function setLOD(){
  buffer.lod = $(this).html();
  elementDisplay.append(buffer.lod);
}

function setUr(){
  buffer.ur = !buffer.ur;
  elementDisplay.append("<");

}

function setDg(){
  buffer.dg = !buffer.dg;
  elementDisplay.append("<<");
}

function setEdge(){
  buffer.edge = !buffer.edge;
  elementDisplay.append("e");
}


function setREP(){
  buffer.rep = !buffer.rep;
  elementDisplay.append("+REP");
}

function setBonus(){
  buffer.bonus = !buffer.bonus;
  elementDisplay.append("x");
}

function setInvalid(){
  buffer.invalid = !buffer.invalid;
  elementDisplay.append("*");
}

function setFly(){
  buffer.fly = !buffer.fly;
  elementDisplay.append("F");
}

function setSpinV(){
  buffer.spinV = !buffer.spinV;
  elementDisplay.append("V");
}

function setCOF(){
  buffer.cof = !buffer.cof;
  elementDisplay.append("Co");
}

function setGOE(){
  buffer.goe = parseInt($(this).html());
  elementDisplay.append(buffer.goe);
}

function renderBufferedElement(){
  elementDisplay.html("");
  if(buffer.type === "jump"){
    if (buffer.lod !== null){
      elementDisplay.append(buffer.lod);
    }
    if (buffer.name !== null){
      elementDisplay.append(buffer.name);
    }
    if (buffer.ur !== false){
      elementDisplay.append("<");
    }
    if (buffer.dg !== false){
      elementDisplay.append("<<");
    }
    if (buffer.edge !== false){
      elementDisplay.append("e");
    }
    if (buffer.edge !== false){
      elementDisplay.append("e");
    }
    if (buffer.rep !== false){
      elementDisplay.append("+REP");
    }
  }
  else if(buffer.type === "spin"){
    if (buffer.name !== null){
      elementDisplay.append(buffer.name);
    }
    if (buffer.lod !== null){
      elementDisplay.append(buffer.lod);
    }
    if (buffer.invalid !== false){
      elementDisplay.append("*");
    }
  }
  else {
    if (buffer.name !== null){
      elementDisplay.append(buffer.name);
    }
    if (buffer.lod !== null){
      elementDisplay.append(buffer.lod);
    }
    if (buffer.invalid !== false){
      elementDisplay.append("*");
    }
  }
}
    //elementDisplay.html("test");




// function addText(){
//   elementDisplay.append(this.innerHTML);
//
// }
