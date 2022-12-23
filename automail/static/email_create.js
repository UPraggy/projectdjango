




//


//CREATE ELEMENT



var toggle_el_right = ' '
var id_elements = 0
var edit_element = ""
var index_col_element = 0

function insert_element(e, type="default"){
  try {
    var id_el = e.srcElement.id.toString()
  } catch {
    var id_el = e.path[0].id.toString()
  }

  element = $("#"+id_el+" div").text();
  element = $(element);

  id_elements += 1;
  let el_identity = id_el+"_"+id_elements
  if (type == "default"){
    element.attr("id", el_identity)
          .attr('draggable','true')
          .attr("onclick","callEditEl(event,"+el_identity+")")
          .addClass("editable_el");
  }
  else{
    element.attr("id", el_identity)
           .attr('draggable','true')
           .addClass("editable_el");
  }
          
          //.css("margin","10px");

  const div_txt = document.createElement('div');
  div_txt.id = 'div_'+el_identity;
  if (type != "default"){
    element.removeClass("editable_el");
  }

  div_txt.classList.add('area');
  $(div_txt).append(element);
  $('#mail_card').append(div_txt)
  el_identity = document.getElementById(el_identity)
  callEditEl("",el_identity)
  if (type != "default"){
    index_col_element += 1
    $('#'+"tableRow_box_800").attr("id","tableRow_box_"+id_elements)
    $('#'+"tableRow_box_"+id_elements+" td:first-child").attr("id","tableCel_box_"+id_elements+"a")
                                                    .attr("onclick","callEditCel(event,tableCel_box_"+id_elements+"a)")
                                                    .addClass('editable_cel')
                                                    .addClass("index_col_"+index_col_element);
    index_col_element += 1
    $('#'+"tableRow_box_"+id_elements+" td:nth-child(2)").attr("id","tableCel_box_"+id_elements+"b")
                                                          .addClass("index_col_"+index_col_element);

    callEditCel('', edit_element)
  }
  
}



//


//DRAG AND DROP



//class = "area" -> field that change elements

//draggable="true" -> element draggable


var dragStart = function(e){
  //e.target.style.backgroundColor = "blue"; -> debug
}
var dragEnd = function(e){
  var areas = document.querySelectorAll(".area"); 
  //console.log(areas) -> debug
  
  
  if (e.target.id != ''){
    target = e.target
  }
  else{
    target = e.target.parentNode
    for(let temp of [1,2,3,4]){
      target = target.parentNode
    }
  }
    for(var area of areas){
      if((e.clientX > area.getBoundingClientRect().x &&
          e.clientX < area.getBoundingClientRect().x +area.clientWidth ) &&
            (e.clientY > area.getBoundingClientRect().y &&
            e.clientY  < area.getBoundingClientRect().y +area.clientHeight)){

          if(area.childElementCount == 0){
            area.appendChild(document.getElementById(target.id));
          }
          if(area.childElementCount == 1){
            aux = area.firstElementChild;
            target.parentElement.appendChild(document.getElementById(aux.id));
            area.appendChild(document.getElementById(target.id));
            break;
          }


      }
    }
  
  //e.target.style.backgroundColor = "red"; -> debug

}

document.addEventListener("dragstart" , dragStart);
document.addEventListener("dragend" ,   dragEnd);


//




//EDIT ELEMENTS

function rgb_to_hex(e, element, catch_val='default'){
  try{
    let rgb = `#${e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0')).join('')}`
    $(element).val(rgb)
  }
  catch{
    $(element).val(catch_val)
  }
}

function define_align(e, align){
    $(e).removeClass('align-left');
    $(e).removeClass('align-center');
    $(e).removeClass('align-right');
    $(e).addClass('align-'+align);
}
function callEditEl(e, element){
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    $(".editable_el").css('border','0')
    $(".editable_cel").css('opacity','100%')
    let temp = element.id.split("_")[0].toString() 
    if (temp != 'table'){
      element.style.border = "2px solid skyblue";
    }
    
  edit_element = element
  display_options_edit(element)
}


function display_options_edit(element){
  $(".edit_menu .options_temp").css("display", "none")
  try{
    temp = element.id.split("_")[0].toString() 
    if (temp == 'table'){
      temp = 'tableCel'
      edit_element = document.querySelector("#"+edit_element.id+" td:first-child")
      display_cel_options_edit(edit_element)
   
  
  }
     $("#edit_"+temp).css("display", "flex")
    if (temp === "text"){
     
      //Setting default values
        temp = document.querySelector("#"+element.id+"  h1")
        $("#input_edit_text").val(temp.textContent)

          rgb_to_hex(temp.style.color,"#color_edit_text","#000000")
          rgb_to_hex(element.style.backgroundColor,"#color_back_edit_text","#ffffff")

        $("#size_field_edit_text").val(parseInt(temp.style.fontSize.split("px")[0]))
        
        define_align('#align_edit_text', temp.style.textAlign)
        
        font = temp.style.fontFamily
        font = font.replaceAll("\"","")
        $("#font_edit_text").val(font).change();


    }
    else if (temp == "spacer"){
      temp = document.querySelector("#"+element.id)
      $("#size_field_edit_spacer").val(parseInt(temp.style.height.split("px")[0]))

          rgb_to_hex(element.style.backgroundColor,"#color_edit_spacer","#ffffff")

    }
    else if (temp == "divider"){
      temp = document.querySelector("#"+element.id+" .divider_inner")
      $("#size_field_edit_divider").val(parseInt(temp.style.borderTop.split("px")[0]))

          rgb_to_hex(temp.style.borderTopColor,"#color_edit_divider","#000000")
          rgb_to_hex(element.style.backgroundColor,"#color_back_edit_divider","#ffffff")
    }
    else if (temp == "link"){
        temp = document.querySelector("#"+element.id+" a")
        $("#size_field_edit_link").val(parseInt(temp.style.fontSize.split("px")[0]))

        rgb_to_hex(temp.style.color,"#color_edit_link")
        rgb_to_hex(element.style.backgroundColor,"#color_back_edit_link","#ffffff")

        font = temp.style.fontFamily
        font = font.replaceAll("\"","")
        $("#font_edit_link").val(font).change();

        temp = document.querySelector("#"+element.id+" .alignment")
        define_align('#align_edit_link', temp.style.textAlign)
    }
    else if (temp == "image"){
      temp = document.querySelector("#"+element.id+" img")
      $("#size_field_edit_image").val(parseInt(temp.style.width.split("px")[0]))


        temp = document.querySelector("#"+element.id+" .alignment")
        define_align('#align_edit_image', temp.align)
    }

  }
  catch{
    console.log('')
  }
}




//



//DELETE ELEMENTS

$(".delete_edit_element").click(function(){

  $("#"+edit_element.id).parent().remove()
  display_options_edit()

});





//FUNCTIONS EDITABLE ELEMENTS

function edit_color_element(color_palette, element, parameter, border=""){
  let input_src = document.querySelector(color_palette).value
  $(element).css(parameter, border+input_src);
}

function modify_attr_element(input, element, parameter){
  let input_src = document.querySelector(input).value
  $(element).attr(parameter, input_src);
}

function sizeElement(input, operation, element, parameter, secondParameter = ""){
  let input_src = document.querySelector(input).value.split("px")[0];
  if(secondParameter == "divider"){
    secondParameter = $(element).css("border-top").split("px")[1]
    console.log(secondParameter)
  }
  if (operation == "sum" || operation == "sub"){
    if (operation == "sum"){
    input_src = parseInt(input_src) + 1
    }
    else{
      input_src = parseInt(input_src) - 1
    }
    $(input).val(input_src)
    $(element).css(parameter,input_src+"px"+secondParameter);
  }
  else{
    let input_src = document.querySelector(input).value
    $(element).css(parameter,input_src+"px "+secondParameter);
  }
  console.log(input_src+"px "+secondParameter)
}

function alignElement(e, element){
  class_list = e.currentTarget.classList[2]
  let element_tag = ''
  let align = ''
  if (element == 'text'){
    element_tag = ' h1'
  }else{
    element_tag = ' .alignment'
  }

  if (class_list == 'align-right'){
    e.currentTarget.classList.add('align-left');
    e.currentTarget.classList.remove('align-right');  
    align = 'left'
  }
  else if (class_list == 'align-left'){
    e.currentTarget.classList.add('align-center');
    e.currentTarget.classList.remove('align-left');
    align = 'center'
  }
  else{
    e.currentTarget.classList.add('align-right');
    e.currentTarget.classList.remove('align-center');
    align = 'right'
  }
  if (element != 'image'){
      $("#"+edit_element.id+element_tag).css('text-align',align); 
    }
  else{
      $("#"+edit_element.id+element_tag).attr('align',align);
    }
}


      // TITLE COLOR

$("#color_edit_text").change(function(e){edit_color_element("#color_edit_text", "#"+edit_element.id+" h1", "color")});

          //TEXT ALIGN


$('#align_edit_text').click(function(e){alignElement(e, 'text')})

        //FONT SIZE

$("#size_less_edit_text").click(function(e){sizeElement("#size_field_edit_text", "sub", "#"+edit_element.id+" h1", "font-size", "default")});

$("#size_plus_edit_text").click(function(event){sizeElement("#size_field_edit_text", "sum", "#"+edit_element.id+" h1", "font-size")});

$("#size_field_edit_text").bind("change",function(event){sizeElement("#size_field_edit_text", "change", "#"+edit_element.id+" h1", "font-size")});

        //FONT FAMILY

$("#font_edit_text").change(function(e){
  font = $("#font_edit_text").find(":selected").text()
  $("#"+edit_element.id+" h1").css("font-family",font);
});

        //BACKGOUND COLOR

$("#color_back_edit_text").change(function(e){edit_color_element("#color_back_edit_text", "#"+edit_element.id, "background-color")});

//FUNCTION FOR SPACER

        //SPACER SIZE

$("#size_less_edit_spacer").click(function(event){sizeElement("#size_field_edit_spacer", "sub", "#"+edit_element.id, "height")});

$("#size_plus_edit_spacer").click(function(event){sizeElement("#size_field_edit_spacer", "sum", "#"+edit_element.id, "height")});

$("#size_field_edit_spacer").bind("change",function(event){sizeElement("#size_field_edit_spacer", "change", "#"+edit_element.id, "height")});

      // SPACER COLOR

$("#color_edit_spacer").change(function(e){edit_color_element("#color_edit_spacer", "#"+edit_element.id, "background-color")});

//FUNCTION FOR DIVIDER

        //DIVIDER SIZE

$("#size_less_edit_divider").click(function(event){sizeElement("#size_field_edit_divider", "sub", "#"+edit_element.id+" .divider_inner", "border-top", "divider")});

$("#size_plus_edit_divider").click(function(event){sizeElement("#size_field_edit_divider", "sum", "#"+edit_element.id+" .divider_inner", "border-top", "divider")});

$("#size_field_edit_divider").bind("change",function(event){sizeElement("#size_field_edit_divider", "change", "#"+edit_element.id+" .divider_inner", "border-top", "divider")});

      // DIVIDER BACKGROUND COLOR

$("#color_back_edit_divider").change(function(e){edit_color_element("#color_back_edit_divider", "#"+edit_element.id, "background-color")});

      // DIVIDER COLOR

$("#color_edit_divider").change(function(e){edit_color_element("#color_edit_divider", "#"+edit_element.id+" .divider_inner", "border-top-color")});


//FUNCTION FOR LINK

        //LINK SIZE
$("#size_less_edit_link").click(function(event){sizeElement("#size_field_edit_link", "sub", "#"+edit_element.id+" a", "font-size")});

$("#size_plus_edit_link").click(function(event){sizeElement("#size_field_edit_link", "sum", "#"+edit_element.id+" a", "font-size")});

$("#size_field_edit_link").bind("change",function(event){sizeElement("#size_field_edit_link", "change", "#"+edit_element.id+" a", "font-size")});

            // LINK COLOR

$("#color_edit_link").change(function(e){edit_color_element("#color_edit_link", "#"+edit_element.id+" a", "color")});

        //BACKGOUND COLOR

$("#color_back_edit_link").change(function(e){edit_color_element("#color_back_edit_link", "#"+edit_element.id, "background-color")});

        // LINK ALIGN

$('#align_edit_link').click(function(e){alignElement(e, 'link')})

        //FONT FAMILY

$("#font_edit_link").change(function(e){
  font = $("#font_edit_link").find(":selected").text()
  $("#"+edit_element.id+" a").css("font-family",font);
});


        //INSERT LINK

$('#input_edit_link').keyup(function(e){modify_attr_element("#input_edit_link", "#"+edit_element.id+" a", "href")});


//FUNCTION FOR IMAGE

      // INSERT LINK IMAGE

$('#input_edit_image').keyup(function(e){modify_attr_element("#input_edit_image", "#"+edit_element.id+" img", "src")});

        //IMAGE SIZE
$("#size_less_edit_image").click(function(event){sizeElement("#size_field_edit_image", "sub", "#"+edit_element.id+" img", "width")});

$("#size_plus_edit_image").click(function(event){sizeElement("#size_field_edit_image", "sum", "#"+edit_element.id+" img", "width")});

$("#size_field_edit_image").bind("change",function(event){sizeElement("#size_field_edit_image", "change", "#"+edit_element.id+" img", "width")});

        // IMAGE ALIGN

$('#align_edit_image').click(function(e){alignElement(e, 'image')})
        //BACKGOUND COLOR

$("#color_back_edit_image").change(function(e){edit_color_element("#color_back_edit_image", "#"+edit_element.id, "background-color")});



//


// OPERATIONS FOR TABLE

function insert_for_table(e, type){
  try {
    var id_el = e.srcElement.id.toString()
  } catch {
    var id_el = e.path[0].id.toString()
  }

  element = $("#"+id_el+" div").text();
  element = $(element);

  let id_table = $("#"+edit_element.id).parents('table')[0].id   
  index_col_element += 1;  
  var result = $("#"+id_table+" tr:first-child").children().length;
  if (type == 'col'){

    
    $(element).insertBefore($("#"+id_table+" tr td:last-child"))
    $("#"+id_table+" tr td:nth-child("+result+")").each(function( el ) {
      id_elements += 1
      $(this).attr('id',"TableCel_"+id_elements)
                .attr("onclick","callEditCel(event,"+"TableCel_"+id_elements+")")
                .addClass("editable_cel")
                .addClass("index_col_"+index_col_element);
  });

    sizeElement_table('default')
  }
  else{
    id_elements += 1
    element.attr("id","tableRow_box_"+id_elements)
    $('#'+id_table+' tbody').append(element)
    col1 = $('#'+id_table+' tr td:first-child').attr('class').split(/\s+/)[1].split("index_col_")[1]
    col2 = $('#'+id_table+' tr td:last-child').attr('class').split("index_col_")[1]


    var row_id = "tableRow_box_"+id_elements
    $("#"+id_table+" #"+row_id+" td:first-child").attr("id","tableCel_box_"+id_elements+"a")
                  .attr("onclick","callEditCel(event,tableCel_box_"+id_elements+"a)")
                  .addClass('editable_cel')
                  .addClass("index_col_"+col1)
   id_elements += 1
   $("#"+id_table+" #"+row_id+" td:last-child").attr("id","tableCel_box_"+id_elements+"b")
                  .attr("onclick","callEditCel(event,tableCel_box_"+id_elements+"b)")
                  //.addClass('editable_cel')
                  .addClass("index_col_"+col2)


    //console.log(element)
    $("#"+id_table+" tr:first-child td").each(function( el ) {

        id_elements += 1
        if (el != 0 && el != (result-1)){
          let col = $(this).attr('class').split("index_col_")[1]
          element = $("#tableCol_box div").text();
          element = $(element);
          element.attr("id","tableCel_box_"+id_elements+"a")
                  .attr("onclick","callEditCel(event,tableCel_box_"+id_elements+"a)")
                  .addClass('editable_cel')
                  .addClass("index_col_"+col);
          element.insertBefore($("#"+id_table+" #"+row_id+" td:last-child"));
        }
     });
    sizeElement_table('default')
    
  }
  modify_border_color()
}


function callEditCel(e, element){
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    $(".editable_el").css('border','0')
    $(".editable_cel").css('opacity','100%')
    $("#"+$("#"+element.id).parents('table')[0].id+" .editable_cel").css('opacity','50%')
    element.style.opacity = "100%";
    edit_element = element
    $(".edit_menu .options_temp").css("display", "none")
    $("#edit_tableCel").css("display", "flex")
    display_cel_options_edit(element)


    let table = $('#'+edit_element.id).parents('table').attr("id")
    let result = $("#"+table+" tr:first-child").children().length - 1;
    let width = $("#"+table+" tr:first-child td:first-child").css("width").split("px")[0];
    width = Math.round(width/8.95)
    result = result * parseInt(width)
    $("#size_field_edit_table").val(result);
    rgb_to_hex(edit_element.style.backgroundColor,"#color_back_edit_cel","#ffffff")
}

// CHANGE DISPLAY
document.querySelector('#custom_table').onchange = function(e){
  display_cel_options_edit(edit_element)
}

function display_cel_options_edit(element){
  option = $("#custom_table").find(":selected").text()
  $(".table_options").css("display", "none")
  try{

        if (option == "Table"){
        $("#table_option").css("display", "flex")
      }else if(option == "Row, Col and Cel"){
        $("#another_option").css("display", "flex")
      }

    

     
      //Setting default values
        //temp = document.querySelector("#"+element.id+"  h1")


         

   } catch{
    console.log('')
  }

}



// TABLE FUNCTIONS

function table_del(e, type){
  let table = $('#'+edit_element.id).parents('table')
  if (type == "table"){
    table.parent().remove()
    $(".edit_menu .options_temp").css("display", "none")
  }
  else if (type == "row"){
    if ($("#"+table.attr("id")+" tbody").children().length > 1){
      $('#'+edit_element.id).parents('tr').remove()
    }else{
      table.parent().remove()
      $(".edit_menu .options_temp").css("display", "none")
    }
    
  }
  else if (type == "column"){
    if ($('#'+table.attr("id")+" tr:first-child").children().length > 2){
      $("."+$('#'+edit_element.id)[0].classList[1]).remove()
    }else{
      table.parent().remove()
      $(".edit_menu .options_temp").css("display", "none")
    }
  } 
}



function sizeElement_table(operation){
  let input_src = document.getElementById("size_field_edit_table").value;
  var table = $("#"+edit_element.id).parents('table').attr("id")
  var result = $("#"+table+" tr:first-child").children().length - 1;
  var width_col = []

  if (operation == "sum" || operation == "sub"){
    if (operation == "sum"){
      if (parseInt(input_src) <= 90){
        input_src = parseInt(input_src) + 10
        width_col = [input_src/result,100-input_src]
      }
      else if (parseInt(input_src) >= 90 && parseInt(input_src) < 100){
        input_src = input_src + (100 - parseInt(input_src)) 
        width_col = [input_src/result,100-input_src]
      }
    }
    else if (parseInt(input_src) >= 20 && operation == "sub"){
      input_src = parseInt(input_src) - 10
      width_col = [input_src/result,100-input_src]
    }
    

    $("#size_field_edit_table").val(input_src);
    
    $('#'+table+" td").css("width",width_col[0]+"%");
    $('#'+table+" tr td:last-child").css("width",width_col[1]+"%");
  }
  else{
    width_col = [parseInt(input_src)/result,100-parseInt(input_src)]
    $('#'+table+" td").css("width",width_col[0]+"%");
    $('#'+table+" tr td:last-child").css("width",width_col[1]+"%");
  }
}

//SIZE TABLE

$("#size_less_edit_table").click(function(event){sizeElement_table("sub")});

$("#size_plus_edit_table").click(function(event){sizeElement_table("sum")});

$("#size_field_edit_table").bind("change",function(event){sizeElement_table("change")});

//COLOR BORDER TABLE
function modify_border_color(){
  let cels = $("#"+edit_element.id).parents('table').attr("id")
  edit_color_element("#color_edit_table", $("#"+cels+" tr td"), 'border', '1px solid ')
  $("#"+cels+" tr td:last-child").css("border","none")
}
$("#color_edit_table").change(function(e){modify_border_color()});

// COLOR BACK CEL

$("#color_back_edit_cel").change(function(e){edit_color_element("#color_back_edit_cel", $("#"+edit_element.id), "background-color")})





        //INSERT LINK

$('#input_edit_cel').keyup(function(e){modify_attr_element("#input_edit_cel", "#"+edit_element.id+" a", "href")});



//


// MEDIA QUERY CSS

if((window.matchMedia("(min-height:850px)").matches)){
    temp = document.querySelector("#card_informations")
    temp.style.height = '800px';
  }
else if((window.matchMedia("(min-height:750px)").matches)){
    temp = document.querySelector("#card_informations")
    temp.style.height = '700px';
  }
else if((window.matchMedia("(min-height:650px)").matches)){
    temp = document.querySelector("#card_informations")
    temp.style.height = '600px';
  }
  else{
    temp = document.querySelector("#card_informations")
    temp.style.height = '500px';
  }