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
  bvForGOECalculation: 0.0,
  bvForScoreCalculation: 0.0,
  elemScore: 0.0
}];

var elementDisplay;
var numElementsInTable = 0;
var tes = 0.0;
var pcs = [0.0, 0.0, 0.0, 0.0, 0.0];
var pcsFactor = 1.67;
var pcsTotal = 0.0;
var tss = 0.0;
var deduct = 0.0;

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
  $(".setSpinV").prop("disabled", true);
  $("#pcs-ss-box").on("change keyup paste click", updateSS)
  $("#pcs-ss-slider").on("change input click", updateSS)
  $("#pcs-tr-box").on("change keyup paste click", updateTR)
  $("#pcs-tr-slider").on("change input click", updateTR)
  $("#pcs-pr-box").on("change keyup paste click", updatePR)
  $("#pcs-pr-slider").on("change input click", updatePR)
  $("#pcs-co-box").on("change keyup paste click", updateCO)
  $("#pcs-co-slider").on("change input click", updateCO)
  $("#pcs-in-box").on("change keyup paste click", updateIN)
  $("#pcs-in-slider").on("change input click", updateIN)
  $("#pcs-factor-box").on("change keyup paste click", updateFactor)
}

function updateTSS(){
  updatePCS();
  updateTES();
  tss = tes + pcsTotal + deduct;
  tss = Math.round(tss * 1000 / 10) / 100;
  $("#tes").html(tes.toFixed(2));
  $("#pcs").html(pcsTotal.toFixed(2));
  $("#tss").html(tss.toFixed(2));
}

function updatePCS(){
  pcsTotal = 0;
  for (var i = 0; i < pcs.length; i++){
    pcsTotal += pcs[i];
  }
  pcsTotal *= pcsFactor;
  pcsTotal = Math.round(pcsTotal * 1000 / 10) / 100
}

function updateFactor(){
  pcsFactor = parseFloat(this.value);
  updateTSS();
}

function updateSS(){
  if (this.value > 10){
    $("#pcs-ss-box").val(10.0);
    $("#pcs-ss-slider").val(10.0);
    pcs[0] = 10.0;
  }
  else{
    $("#pcs-ss-box").val(this.value);
    $("#pcs-ss-slider").val(this.value);
    pcs[0] = parseFloat(this.value);
  }
  updateTSS();
}

function updateTR(){
  if (this.value > 10){
    $("#pcs-tr-box").val(10.0);
    $("#pcs-tr-slider").val(10.0);
    pcs[1] = 10.0;
  }
  else{
    $("#pcs-tr-box").val(this.value);
    $("#pcs-tr-slider").val(this.value);
    pcs[1] = parseFloat(this.value);
  }
  updateTSS();
}

function updatePR(){
  if (this.value > 10){
    $("#pcs-pr-box").val(10.0);
    $("#pcs-pr-slider").val(10.0);
    pcs[2] = 10.0;
  }
  else{
    $("#pcs-pr-box").val(this.value);
    $("#pcs-pr-slider").val(this.value);
    pcs[2] = parseFloat(this.value);
  }
  updateTSS();
}

function updateCO(){
  if (this.value > 10){
    $("#pcs-co-box").val(10.0);
    $("#pcs-co-slider").val(10.0);
    pcs[3] = parseFloat(this.value);
  }
  else{
    $("#pcs-co-box").val(this.value);
    $("#pcs-co-slider").val(this.value);
    pcs[3] = parseFloat(this.value);
  }
  updateTSS();
}

function updateIN(){
  if (this.value > 10){
    $("#pcs-in-box").val(10.0);
    $("#pcs-in-slider").val(10.0);
    pcs[4] = 10.0;
  }
  else{
    $("#pcs-in-box").val(this.value);
    $("#pcs-in-slider").val(this.value);
    pcs[4] = parseFloat(this.value);
  }
  updateTSS();
}

function setName(){
  buffer[buffer.length - 1].name = $(this).html();
  //elementDisplay.html(buffer[buffer.length - 1].name);
  setType(this);
  renderBufferedElement();
}

function setType(node){
  $(".setSpinV").prop("disabled", false);
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
  // if(buffer[0].name == null){
  //   $(".addJump").prop("disabled", true);
  // }

  //disable v if
  if (buffer[buffer.length - 1].cof != true && buffer[buffer.length - 1].fly != true){
    $(".setSpinV").prop("disabled", true);
  }
  //disable set edge unless lz or flip
  if(buffer[buffer.length - 1].name == "Lz" || buffer[buffer.length - 1].name == "F"){
    $(".setEdge").prop("disabled", false);
  }
  if(buffer[buffer.length - 1].name == null){
    $(".addElement").prop("disabled", true);
  }

  // for (var i = 0; i < buffer.length; i++){
  //   if(buffer[i].name == null){
  //     $(".addElement").prop("disabled", true);
  //   }
  // }
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
    bvForGOECalculation: 0.0,
    bvForScoreCalculation: 0.0,
    elemScore: 0.0
  });
  elementDisplay.append("+");
  $(".addJump").prop("disabled", true);
  $("#nav-jmp .setLOD button").prop("disabled", false);
}

function renderBufferedElement(){
  elementDisplay.html("");
  if (buffer[0].name === null && buffer[0].lod == 0){
    elementDisplay.append("Element");
  }

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
  if (buffer[0].bonus !== false){
    elementDisplay.append("  x");
  }

  if (buffer[0].goe > 0){
    $("#goeDisplay").html("+" + buffer[0].goe);
  }
  else {
    $("#goeDisplay").html(buffer[0].goe);
  }
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
    bvForGOECalculation: 0.0,
    bvForScoreCalculation: 0.0,
    elemScore: 0.0
  });

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
  $(".setSpinV").prop("disabled", false);


  //setType();
}

function addElement(){
  calculateBuffer();
  numElementsInTable++;
  appendToTable();
  updateTSS();
  clearEntry();
}

function calculateBuffer(){
  var bufferBV=[0.0];
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

    buffer[i].bvForScoreCalculation = buffer[i].bv;
    if (buffer[0].bonus === true){
      buffer[i].bvForScoreCalculation *= 1.1;
    }
    if (buffer[i].rep === true){
      buffer[i].bvForScoreCalculation *= 0.7;
    }
    if (buffer[i].ur === true && buffer[i].edge === true){
      buffer[i].bvForScoreCalculation *= 0.6;
    }
    else if (buffer[i].spinV === true){
      buffer[i].bvForScoreCalculation *= 0.75;
    }    
    else if(buffer[i].ur === true || buffer[i].edge === true){
      buffer[i].bvForScoreCalculation *= 0.8;
    }

    //GOE Caculation

    if (buffer[i].name !== "ChSq"){
      if (buffer[i].ur === true && buffer[i].edge === true){
        buffer[i].bvForGOECalculation =  buffer[i].bv * 0.6;
      }
      else if (buffer[i].spinV === true){
        buffer[i].bvForGOECalculation =  buffer[i].bv * 0.75;
      } 
      else if(buffer[i].ur === true || buffer[i].edge === true){
        buffer[i].bvForGOECalculation =  buffer[i].bv * 0.8;
      }
      else{
        buffer[i].bvForGOECalculation =  buffer[i].bv;
      }
    }
    else{
      buffer[i].bvForGOECalculation =  buffer[i].bv;
      buffer[0].goeValue =  buffer[0].goe * 0.5;
    }
    buffer[i].bvForGOECalculation = Math.round(buffer[i].bvForGOECalculation * 1000 / 10) / 100;
    //console.log((buffer[i].bvForGOECalculation));
    bufferBV.push(buffer[i].bvForGOECalculation);
    //alert(buffer[i].bvForGOECalculation);

  }
  //console.log(bufferBV);
  //console.log(Math.max(bufferBV));
  if (buffer[0].name !== "ChSq"){
    if (buffer[0].goe != 0){
      buffer[0].goeValue = Math.max(...bufferBV) * (buffer[0].goe * 0.1);
    }
    buffer[0].goeValue =   Math.round(buffer[0].goeValue * 1000 / 10) / 100;
  }
}

//console.log("The bv of " + buffer[0].name + buffer[0].lod + " is " + basevalues["F"+buffer[0].name][buffer[0].lod]);


function appendToTable(){
  var totalBV = 0;
  var totalScore = 0;
  var row = "";

  for (var i = 0; i < buffer.length; i++){
    totalBV += buffer[i].bvForScoreCalculation;
  }
  totalScore = totalBV + buffer[0].goeValue;

  row = "<tr>";
  row += "<td class=\"numElem\">" + numElementsInTable + "</td>";
  row += "<td>" + elementDisplay.html() + "</td>";
  row += "<td>" + (Math.round(totalBV * 1000 / 10) / 100).toFixed(2) + "</td>";
  row += "<td>" + buffer[0].goe + "</td>";
  row += "<td>" + (Math.round(buffer[0].goeValue * 1000 / 10) / 100).toFixed(2) + "</td>";
  row += "<td class=\"elemScore\">" + (Math.round(totalScore * 1000 / 10) / 100).toFixed(2) + "</td>";
  row += "<td><i class=\"delete far fa-trash-alt\"></i></td>";
  row += "</tr>";
  //console.log(row);
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
  updateTSS();
}

function updateTES(){
  var totalScore = 0;
  for (var i = 0; i < $(".elemScore").length; i++){
    totalScore += parseFloat($(".elemScore").eq(i).html());
  }
  tes = Math.round(totalScore * 1000 / 10) / 100
}
