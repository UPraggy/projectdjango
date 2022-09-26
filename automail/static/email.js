//



function showopt(type) {

    $(".side_items").css("display", "none");
    //console.log($("."+type))
    $("."+type).css("display", "block");

}



//

var toggle_el_left = ' '


//Menu Toggle Script 
   /* $(".menu-toggle-right").click( function(e){
        e.preventDefault();
        //console.log(e)
        $("#wrapper-right").toggleClass("MenuDisplayed");
        
    });*/

    $(".menu-toggle").click( function(e){
        e.preventDefault();
        if ((toggle_el_left != ' ') && (toggle_el_left != e.currentTarget) && document.getElementById("wrapper").classList.contains('MenuDisplayed')){
            toggle_el_left = e.currentTarget
        }else{
            toggle_el_left = e.currentTarget
            
            $("#wrapper.MenuDisplayed #page-content-wrapper").addClass("content-reverse");
            $("#wrapper.MenuDisplayed #sidebar-wrapper").addClass("wrapper-reverse");
            $(".opt").addClass("menu-toggle");
            $("#wrapper").toggleClass("MenuDisplayed");
        }
        
        
    });
