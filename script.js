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
    $("#nav-sp-tab").addClass("disabled");
    $("#nav-seq-tab").addClass("disabled");
  }
  else if ($(node).parents(".nav-sp").length){
    buffer.type = "spin";
    $("#nav-jmp-tab").addClass("disabled");
    $("#nav-seq-tab").addClass("disabled");
  }
  else {
    buffer.type = "seq";
    $("#nav-jmp-tab").addClass("disabled");
    $("#nav-sp-tab").addClass("disabled");
    if (buffer.name == "ChSq"){
    $("#nav-seq .setLOD button").addClass("disabled");
    $("#nav-seq .setLOD button:eq(0)").removeClass("disabled");
    $("#nav-seq .setLOD button:eq(2)").removeClass("disabled");
    }
  }

  //elementDisplay.append(buffer.type);
}


function setLOD(){
  buffer.lod = $(this).html();
  setType(this);
  renderBufferedElement();
//  elementDisplay.append(buffer.lod);
}

function setUr(){
  buffer.ur = !buffer.ur;
  buffer.dg = false;
  //elementDisplay.append("<");
  setType(this);
  renderBufferedElement();
}

function setDg(){
  buffer.dg = !buffer.dg;
  //elementDisplay.append("<<");
  buffer.ur = false;
  setType(this);
  renderBufferedElement();
}

function setEdge(){
  buffer.edge = !buffer.edge;
  //elementDisplay.append("e");
  setType(this);
  renderBufferedElement();
}


function setREP(){
  buffer.rep = !buffer.rep;
  //elementDisplay.append("+REP");
  setType(this);
  renderBufferedElement();
}

function setBonus(){
  buffer.bonus = !buffer.bonus;
  //elementDisplay.append("x");
  setType(this);
  renderBufferedElement();
}

function setInvalid(){
  buffer.invalid = !buffer.invalid;
  //elementDisplay.append("*");
  setType(this);
  renderBufferedElement();
}

function setFly(){
  buffer.fly = !buffer.fly;
  //elementDisplay.append("F");
  setType(this);
  renderBufferedElement();
}

function setSpinV(){
  buffer.spinV = !buffer.spinV;
  //lementDisplay.append("V");
  setType(this);
  renderBufferedElement();
}

function setCOF(){
  buffer.cof = !buffer.cof;
  //elementDisplay.append("Co");
  setType(this);
  renderBufferedElement();
}

function setGOE(){
  buffer.goe = parseInt($(this).html());
  //elementDisplay.append(buffer.goe);
  //setType(this);
  renderBufferedElement();
}

function renderBufferedElement(){
  elementDisplay.html("");
  if(buffer.type === "jump"){
    if (buffer.lod != null && buffer.lod != 0){
      elementDisplay.append(buffer.lod);
    }
    if (buffer.name !== null){
      elementDisplay.append(buffer.name);
    }
    if (buffer.edge !== false){
      elementDisplay.append("e");
    }
    if (buffer.ur !== false){
      elementDisplay.append("<");
    }
    if (buffer.dg !== false){
      elementDisplay.append("<<");
    }
    if (buffer.invalid !== false){
      elementDisplay.append("*");
    }

    if (buffer.rep !== false){
      elementDisplay.append("+REP");
    }

    if (buffer.bonus !== false){
      elementDisplay.append(" x");
    }

  }
  else if(buffer.type === "spin"){
    if (buffer.fly !== false){
      elementDisplay.append("F");
    }
    if (buffer.cof !== false){
      elementDisplay.append("C");
    }
    if (buffer.name !== null){
      elementDisplay.append(buffer.name);
    }
    if (buffer.lod != null && buffer.lod != 0){
      elementDisplay.append(buffer.lod);
    }
    if (buffer.spinV !== false){
      elementDisplay.append("V");
    }
    if (buffer.invalid !== false){
      elementDisplay.append("*");
    }
  }
  else {
    if (buffer.name !== null){
      elementDisplay.append(buffer.name);
    }
    if (buffer.lod != null && buffer.lod != 0){
      elementDisplay.append(buffer.lod);
    }
    if (buffer.invalid !== false){
      elementDisplay.append("*");
    }
  }
  $("#goeDisplay").html(buffer.goe);
}
    //elementDisplay.html("test");




// function addText(){
//   elementDisplay.append(this.innerHTML);
//
// }
