var buffer = [{
  type: null,
  name: null,
  lod: "0",
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
  bv: 0.0,
  goeValue: 0.0,
  bvGOECalc: 0.0,
  bs: 0.0,
  elemScore: 0.0
}];

var elementDisplay;
var numElementsInTable = 0;

window.onload = function(){
  elementDisplay = $("#elem-disp");
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
  $(".clearEntry").click(clearEntry);
  $(".addElement").click(addElement);
  //$(".delete").click(deleteElement);
  $(".addJump").click(addJump);
  //setType();
  $(".addElement").prop("disabled", true);
  $(".addJump").prop("disabled", true);
  $(".setEdge").prop("disabled", true);

}

function setName(){
  buffer[buffer.length - 1].name = $(this).html();
  //elementDisplay.html(buffer[buffer.length - 1].name);
  setType(this);
  renderBufferedElement();
}

function setType(node){

  $("#nav-jmp .setLOD button").prop("disabled", false);
  $("#nav-seq .setLOD button").prop("disabled", false);
  $("#nav-sp .setLOD button").prop("disabled", false);
  $(".addElement").prop("disabled", false);
  $(".addJump").prop("disabled", false);
  $(".setEdge").prop("disabled", true);
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
    $("#nav-seq .setLOD button").prop("disabled", true);
    $("#nav-seq .setLOD button:eq(0)").prop("disabled", false);
    $("#nav-seq .setLOD button:eq(2)").prop("disabled", false);
  }
  if (buffer[buffer.length - 1].name == "Eu"){
    $("#nav-jmp .setLOD button").prop("disabled", true);
    $("#nav-jmp .setLOD button:eq(0)").prop("disabled", false);
    $("#nav-jmp .setLOD button:eq(1)").prop("disabled", false);
  }

  if (buffer[buffer.length - 1].name === "ChSq" || buffer[buffer.length - 1].name === "Eu"){
    if(buffer[buffer.length - 1].lod != "0" && buffer[buffer.length - 1].lod != "1" ){
      $(".addElement").prop("disabled", true);
    }
    //disable add element button
  }
  if(buffer[0].name == null){
    $(".addJump").prop("disabled", true);
  }

  for (var i = 0; i < buffer.length; i++){
    if(buffer[i].name == null){
      $(".addElement").prop("disabled", true);
    }
    if(buffer[i].name == "Lz" || buffer[i].name == "F"){
      $(".setEdge").prop("disabled", false);
    }
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
  buffer[0].bonus = !buffer[0].bonus;
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
    lod: "0",
    ur: false,
    dg: false,
    edge: false,
    rep: false,
    spinV: false,
    fly: false,
    cof: false,
    invalid: false,
    bv: 0.0,
    goeValue: 0.0,
    bvGOECalc: 0.0,
    bs: 0.0,
    elemScore: 0.0
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

      if (buffer[0].bonus !== false){
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
    lod: "0",
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
    bv: 0.0,
    goeValue: 0.0,
    bvGOECalc: 0.0,
    bs: 0.0,
    elemScore: 0.0
  });

  numElementsInTable=0;

  renderBufferedElement();
  $("#nav-jmp .setLOD button").prop("disabled", false);
  $("#nav-seq .setLOD button").prop("disabled", false);
  $("#nav-sp .setLOD button").prop("disabled", false);
  $("#nav-sp-tab").removeClass("disabled");
  $("#nav-jmp-tab").removeClass("disabled");
  $("#nav-seq-tab").removeClass("disabled");
  $(".addElement").prop("disabled", true);
  $(".addJump").prop("disabled", true);
  $(".setEdge").prop("disabled", true);
  $("#elem-disp").html("Element");
  $("#goeDisplay").html("GOE");

  //setType();
}

function addElement(){
  calculateBuffer();
  numElementsInTable++;
  appendToTable();
  calculateTotalScore();
  clearEntry();
}

function calculateBuffer(){
  for (var i = 0; i < buffer.length; i++){
    if (buffer[i].invalid === true){
      buffer[i].bv = 0.00;
    }
    else if (buffer[i].type === "jump"){
      if (buffer[i].dg === true && parseInt(buffer[i].lod) != "0"){
        buffer[i].bv = basevalues[buffer[i].name][parseInt(buffer[i].lod) - 1];
      }
      else{
        buffer[i].bv = basevalues[buffer[i].name][buffer[i].lod];
      }
    }
    else if (buffer[i].type === "seq"){
      buffer[i].bv = basevalues[buffer[i].name][buffer[i].lod];
    }
    else{
      if (buffer[i].cof === true){
        buffer[i].bv = basevalues[buffer[i].name]["C" + buffer[i].lod];
      }
      else if (buffer[i].fly === true){
        buffer[i].bv = basevalues[buffer[i].name]["F" + buffer[i].lod];
      }
      else{
        buffer[i].bv = basevalues[buffer[i].name][buffer[i].lod];
      }
    }
    //base score calculation

    buffer[i].bs = buffer[i].bv;
    if (buffer[0].bonus === true){
      buffer[i].bs *= 1.1;
    }
    if (buffer[i].rep === true){
      buffer[i].bs *= 0.7;
    }
    if (buffer[i].ur === true && buffer[i].edge === true){
      buffer[i].bs *= 0.6;
    }
    else if(buffer[i].ur === true || buffer[i].edge === true || buffer[i].spinV === true){
      buffer[i].bs *= 0.75;

    }

    //GOE Caculation

    if (buffer[i].name !== "ChSq"){
      if (buffer[i].ur === true && buffer[i].edge === true){
        buffer[i].bvGOECalc =  buffer[i].bv * 0.6;
      }
      else if(buffer[i].ur === true || buffer[i].edge === true || buffer[i].spinV === true){
        buffer[i].bvGOECalc =  buffer[i].bv * 0.75;

      }
      else{
        buffer[i].bvGOECalc =  buffer[i].bv;
      }

      if (buffer[0].goe != 0){
        buffer[i].goeValue = buffer[i].bvGOECalc * (buffer[0].goe/10);
      }
    }
    else{
      buffer[i].bvGOECalc =  buffer[i].bv;
      buffer[i].goeValue =  buffer[0].goe * 0.5;
    }



    buffer[i].elemScore = Math.round((buffer[i].bs + buffer[i].goeValue)*100)/100
  }

}

//console.log("The bv of " + buffer[0].name + buffer[0].lod + " is " + basevalues["F"+buffer[0].name][buffer[0].lod]);


function appendToTable(){
  var totalBV = 0;
  var totalGOEValue = 0;
  var totalScore = 0;
  var row = "";

  for (var i = 0; i < buffer.length; i++){
    totalBV += buffer[i].bs;
    totalGOEValue += buffer[i].goeValue;
    totalScore += buffer[i].elemScore;
  }


  row = "<tr>";
  row += "<td class=\"numElem\">" + numElementsInTable + "</td>";
  row += "<td>" + elementDisplay.html() + "</td>";
  row += "<td>" + (Math.round(totalBV * 100)/100).toFixed(2) + "</td>";
  row += "<td>" + buffer[0].goe + "</td>";
  row += "<td>" + (Math.round(totalGOEValue * 100)/100).toFixed(2) + "</td>";
  row += "<td class=\"elemScore\">" + (Math.round(totalScore * 100)/100).toFixed(2) + "</td>";
  row += "<td><i class=\"delete far fa-trash-alt\"></i></td>";
  row += "</tr>";
  console.log(row);
  $(".displayTable").append(row);
  $(".delete").click(remove);
}

function remove(){
  $(this).parent().parent().remove();
  numElementsInTable = 0;
  for (var i = 0; i < $(".numElem").length; i++){
    $(".numElem").eq(i).html(i + 1);
    numElementsInTable++;
  }
  calculateTotalScore();
}

function calculateTotalScore(){
  var totalScore = 0;
  for (var i = 0; i < $(".elemScore").length; i++){
    totalScore += parseFloat($(".elemScore").eq(i).html());
  }
  $("#tes").html((Math.round(totalScore * 100)/100).toFixed(2));
}
