


//habilita copia de codigo
async function execCopy(e) {
  let text = e.target.parentElement.children[1].value;
  await navigator.clipboard.writeText(text);

}


//modifica a documentação após carregada
function callModifications() {

  $("pre code").parent().prepend(`<input style="display:none;" /><button  class="copyCode" onclick="execCopy(event)"></button>`);

  $("pre code").each((i, value) => {
    let parent = value.parentElement
    parent.children[1].value = value.textContent
    let el = $("<div class='divCode'></div>")
    el.append(value)
    parent.appendChild(el[0]);
  })




  //edita para cada titulo voltar para o indice
  $('h1').each((i, value) => {
    if (i === 0) {
      $('h1').addClass("titleMid");
    }

    $(`<div class="slashModule"></div>`).insertBefore(`h1[id=` + value.id + `]`);
  })

  $("h1")[0].style.fontSize = "4em";
  $("#indexOpt").append($("ul")[0]);
  $("#indice").remove();

  //titleMd
  $(".slashModule ")[0].remove()


}
var height_ = screen.availHeight;//screen.height;
var width_ = screen.availWidth;//screen.width;

if (width_ <= 576) {
  $(".indexTab").addClass("hide_index_mob").css("width", "100%");
  $("#content").css("margin", "0 auto").css("max-width", "90%");
} else {
  $(".indexTab").addClass("show_index_mob")
  $("#content").css("max-width", "85%").css("padding", "0");
}
function showIndice() {

  let index = $('.indexTab');
  if (width_ > 576) {
    index.hasClass('show_index_mob') ? $("#content").css("margin", "0").css("padding", "0 5%") :
      $("#content").css("padding", "0").css("max-width: 85%;");//.css("margin", "0 17%")
  }


  index.hasClass('show_index_mob') ? hasOrno(index, true) : hasOrno(index, false);

}

function hasOrno(index, val) {
  if (val == true) {
    index.removeClass("show_index_mob").addClass("hide_index_mob")

  } else {
    index.addClass("show_index_mob").removeClass("hide_index_mob")

  }
}

if (width_ <= 576) {
  $("#indexOpt").click(() => {

    showIndice();
  })
}
