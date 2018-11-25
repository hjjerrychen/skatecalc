var buffer = [{
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
}];

var elementDisplay;

window.onload = function(){
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
  $(".clearEntry").click(clearEntry);
  $(".addElement").click(addElement);
  $(".delete").click(deleteElement);
  $(".addJump").click(addJump);


}

function setName(){
  buffer[buffer.length - 1].name = $(this).html();
  elementDisplay.html(buffer[buffer.length - 1].name);
  setType(this);
  renderBufferedElement();
}

function setType(node){
  if ($(node).parents(".nav-jmp").length){
    buffer[buffer.length - 1].type = "jump";
    $("#nav-sp-tab").addClass("disabled");
    $("#nav-seq-tab").addClass("disabled");
  }
  else if ($(node).parents(".nav-sp").length){
    buffer[buffer.length - 1].type = "spin";
    $("#nav-jmp-tab").addClass("disabled");
    $("#nav-seq-tab").addClass("disabled");
  }
  else {
    buffer[buffer.length - 1].type = "seq";
    $("#nav-jmp-tab").addClass("disabled");
    $("#nav-sp-tab").addClass("disabled");
  }
  if (buffer[buffer.length - 1].name == "ChSq"){
    $("#nav-seq .setLOD button").addClass("disabled");
    $("#nav-seq .setLOD button:eq(0)").removeClass("disabled");
    $("#nav-seq .setLOD button:eq(2)").removeClass("disabled");
  }
}


function setLOD(){
  buffer[buffer.length - 1].lod = $(this).html();
  setType(this);
  renderBufferedElement();
}

function setUr(){
  buffer[buffer.length - 1].ur = !buffer[buffer.length - 1].ur;
  buffer[buffer.length - 1].dg = false;
  setType(this);
  renderBufferedElement();
}

function setDg(){
  buffer[buffer.length - 1].dg = !buffer[buffer.length - 1].dg;
  //elementDisplay.append("<<");
  buffer[buffer.length - 1].ur = false;
  setType(this);
  renderBufferedElement();
}

function setEdge(){
  buffer[buffer.length - 1].edge = !buffer[buffer.length - 1].edge;
  setType(this);
  renderBufferedElement();
}


function setREP(){
  buffer[buffer.length - 1].rep = !buffer[buffer.length - 1].rep;
  setType(this);
  renderBufferedElement();
}

function setBonus(){
  buffer[buffer.length - 1].bonus = !buffer[buffer.length - 1].bonus;
  setType(this);
  renderBufferedElement();
}

function setInvalid(){
  buffer[buffer.length - 1].invalid = !buffer[buffer.length - 1].invalid;
  setType(this);
  renderBufferedElement();
}

function setFly(){
  buffer[buffer.length - 1].fly = !buffer[buffer.length - 1].fly;
  setType(this);
  renderBufferedElement();
}

function setSpinV(){
  buffer[buffer.length - 1].spinV = !buffer[buffer.length - 1].spinV;
  setType(this);
  renderBufferedElement();
}

function setCOF(){
  buffer[buffer.length - 1].cof = !buffer[buffer.length - 1].cof;
  setType(this);
  renderBufferedElement();
}

function setGOE(){
  buffer[0].goe = parseInt($(this).html());
  renderBufferedElement();
}

function addJump(){
  buffer.push({
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
    bv: null,
    goeValue: null
  });
  elementDisplay.append("+");
}

function renderBufferedElement(){
  elementDisplay.html("");

  for (var i = 0; i < buffer.length; i++){
    if(buffer[i].type === "jump"){
      if (buffer[i].lod != null && buffer[i].lod != 0){
        elementDisplay.append(buffer[i].lod);
      }
      if (buffer[i].name !== null){
        elementDisplay.append(buffer[i].name);
      }
      if (buffer[i].edge !== false){
        elementDisplay.append("e");
      }
      if (buffer[i].ur !== false){
        elementDisplay.append("<");
      }
      if (buffer[i].dg !== false){
        elementDisplay.append("<<");
      }
      if (buffer[i].invalid !== false){
        elementDisplay.append("*");
      }

      if (buffer[i].rep !== false){
        elementDisplay.append("+REP");
      }

      if (buffer[i].bonus !== false){
        elementDisplay.append(" x");
      }

    }
    else if(buffer[i].type === "spin"){
      if (buffer[i].fly !== false){
        elementDisplay.append("F");
      }
      if (buffer[i].cof !== false){
        elementDisplay.append("C");
      }
      if (buffer[i].name !== null){
        elementDisplay.append(buffer[i].name);
      }
      if (buffer[i].lod != null && buffer[i].lod != 0){
        elementDisplay.append(buffer[i].lod);
      }
      if (buffer[i].spinV !== false){
        elementDisplay.append("V");
      }
      if (buffer[i].invalid !== false){
        elementDisplay.append("*");
      }
    }
    else {
      if (buffer[i].name !== null){
        elementDisplay.append(buffer[i].name);
      }
      if (buffer[i].lod != null && buffer[i].lod != 0){
        elementDisplay.append(buffer[i].lod);
      }
      if (buffer[i].invalid !== false){
        elementDisplay.append("*");
      }
    }
    if (i != buffer.length - 1){
    elementDisplay.append("+");
  }
  }

  $("#goeDisplay").html(buffer[0].goe);
}

function clearEntry() {
  buffer.length = 0;
  buffer.push({
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
  });

  renderBufferedElement();

  $("#nav-jmp-tab").removeClass("disabled");
  $("#nav-sp-tab").removeClass("disabled");
  $("#nav-seq .setLOD button").removeClass("disabled");
  $("#nav-seq-tab").removeClass("disabled");
  $("#elem-disp").html("Element");
  $("#goeDisplay").html("GOE");
}

function addElement(){
  clearEntry();
  calculateBuffer();
}

function deleteElement(){
  alert("Element deleted");
}

function calculateBuffer(){

}
