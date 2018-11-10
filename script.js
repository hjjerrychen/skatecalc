window.onload = function(){
    var jumpBtn = $("#nav-jmp button").click(addText);
    var spinBtn = $("#nav-sp button").click(addText);
    var seqBtn = $("#nav-seq button").click(addText);
    //$("#elem-disp").html("test");


}

function addText(){
  $("#elem-disp").append(this.innerHTML);

}
