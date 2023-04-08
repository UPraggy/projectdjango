const charSocket = new WebSocket(

      (window.location.protocol === 'https:' ? 'wss' : 'ws') + '://'
      + window.location.host
      + '/ws/chess/play/'
      + roomName
      + '/'

    );
charSocket.onmessage = function(e){
  /*receive the json message verify if player can play, or promote pice, or is in check or drowned. 
  Redirect too for pages of Draw, Victory and Lose*/
    console.log('onmessage')

    const data = JSON.parse(e.data);
    const parameters = [data["parameters"][0], action_resign_1, 'Resign'] 

      if (data["parameters"][2] == 'Can play'){
        can_play += 1
        return 0
      }else if (data["parameters"][2] == 'Promoted'){
        let piece_promoted = data["parameters"][1]
        actual_pawn = [actual_pawn.color, actual_pawn.position_board, actual_pawn.identifier]
        let player_ = ''
        if (actual_player != player1.name){
          player_ = player1
        }
        else{
          player_ = player2
        }
        let piece_name = ''
        if (piece_promoted == 'queen'){
          piece_name = '_Q'
        }else if (piece_promoted == 'horse'){
          piece_name = '_H'
        }else if (piece_promoted == 'bishop'){
          piece_name = '_B'
        }else if (piece_promoted == 'tower'){
          piece_name = '_T'
        }
        if (actual_pawn[0] == 'black'){
          piece_name = 'B'+piece_name
        }else{
          piece_name = 'W'+piece_name
        }
            for (let x = 0; x < player_.pieces.length; x++){
              if (player_.pieces[x].identifier == actual_pawn[2]){
                if (piece_promoted == 'queen'){
                  player_.pieces[x] = new Queen(player_,piece_name+actual_pawn[2].split("_")[1][1],actual_pawn[0], actual_pawn[1]);
                }else if (piece_promoted == 'horse'){
                  player_.pieces[x] = new Horse(player_,piece_name+actual_pawn[2].split("_")[1][1],actual_pawn[0], actual_pawn[1]);
                }else if (piece_promoted == 'bishop'){
                  player_.pieces[x] = new Bishop(player_,piece_name+actual_pawn[2].split("_")[1][1],actual_pawn[0], actual_pawn[1]);
                }else if (piece_promoted == 'tower'){
                  player_.pieces[x] = new Tower(player_,piece_name+actual_pawn[2].split("_")[1][1],actual_pawn[0], actual_pawn[1]);
                }
              }
            }
            let target = ''
          if (actual_pawn[0] == 'black'){
            piece_promoted = 'black_'+piece_promoted
          }
          board[actual_pawn[1][0]][actual_pawn[1][1]] = piece_name+actual_pawn[2].split("_")[1][1]
          final_pos = $("#square_"+actual_pawn[1][0]+"_"+actual_pawn[1][1])
          target = $(`<div id="`+piece_name+actual_pawn[2].split("_")[1][1]+`" class="piece" draggable=true actual_position = "`+actual_pawn[1][0]+"_"+actual_pawn[1][1]+`" style="background-image: url('/static/pieces/`+piece_promoted+`.png');"></div>`);
          final_pos.empty()
          final_pos.append(target)
          $("#promote_white").removeClass("collapse_content");
          $("#promote_black").removeClass("collapse_content");
          $(".area").css('pointer-events','auto');
          can_play += 1
          return 0
      }
  if (can_play >= 1){


      if (resign == 0 && data["parameters"][2] == "Resign"){
        print_("\n\nRESIGN\n\n")
        if (player1.name == data["parameters"][0]){
          resign += 1;
          alert("Player "+ data["parameters"][0] + " resign of the match!\n"+ player2.name +" Win!")
          window.location = '../result/'+player2.name+"__vs__"+player1.name;
        }else if (player2.name == data["parameters"][0]){
          resign += 1;
          alert("Player "+ data["parameters"][0] + " resign of the match!\n"+ player1.name +" Win!")
          window.location = '../result/'+player1.name+"__vs__"+player2.name;
          
        }
      }

    pos = [data["parameters"][1][0],data["parameters"][1][1]]
    let checkmate_val = false
    let who_win = ''
    let drowning = ''
    let valid_move = false

    if (player1.name == data["parameters"][2]){
         player1.moved = true
          valid_move = get_future_pos(player1,player2, pos[0].split("_"), pos[1].split("_"), data["parameters"][3])
      }else{
        player2.moved = true
        valid_move = get_future_pos(player2,player1, pos[0].split("_"), pos[1].split("_"), data["parameters"][3])
      }

  if (valid_move == true){    
    if (reset_a_passant >= 1){
        reset_a_passant = 0;
        a_passant = []
        }
    reset_a_passant += 1

    if (actual_player == player1.name){
      actual_player = player2.name
    }else{
      actual_player = player1.name
    }




    if (player1.name == data["parameters"][2]){
        player1.play_state = 'waiting'
        player2.play_state = 'play'
        drowning = checkmate(player2.pieces[12]) 
        checkmate_val = check_king_line(player2.pieces[12], player2.pieces[12].position_board, player1)
        who_win = player1.name
        who_lose = player2.name
      }else{
        player1.play_state = 'play'
        player2.play_state = 'waiting'
        drowning = checkmate(player1.pieces[12]) 
        checkmate_val = check_king_line(player1.pieces[12], player1.pieces[12].position_board, player2)
        who_win = player2.name
        who_lose = player1.name
      }
      target = $("#"+data["parameters"][0])
      target.attr("actual_position",pos[1])
      final_pos = $("#square_"+pos[1])
      initial_pos = pos[0]
      final_pos.empty()
      final_pos.append(target)
    
    console.log("DROWING")
    console.log("DROWING " + drowning)
    console.log("CHECKMATE " + checkmate_val)
    if (checkmate_val == false && drowning == true){
      if(check_pieces_movement(player1) || check_pieces_movement(player2)){
        print_("\n\nDRAW\n\n")
        player2.play_state = 'waiting'
        player1.play_state = 'waiting'
        window.location.href = "../result/draw/"+player1.name+"__vs__"+player2.name;
      }
    }
    if (checkmate_val == true && drowning == true){
        print_("\n\nCHECK MATE\n\n")
        player2.play_state = 'waiting'
        player1.play_state = 'waiting'

        window.location.href = "../result/"+who_win+"__vs__"+who_lose;

      }

    }
  }
}

charSocket.onclose = function(e){
    console.log('onclose')
  }


function call_socket(target, pos, actual_player){
    const parameters = [target, pos, actual_player] 
    charSocket.send(JSON.stringify({
      'parameters' : parameters,
    }));

    return false;
  }



//GAME
//Initialize the players
player1 = new Player(player1_name, color='white')
player1.pieces = create_pieces(player1, player1.color)
player1.play_state = 'play'
var actual_player = player1.name

player2 = new Player(player2_name, color='black')
player2.pieces = create_pieces(player2, player2.color)
player2.play_state = 'waiting'


var player_color = ''
if (request_player == player1.name){
  player_color = player1.color
}else{
  player_color = player2.color
}


// DRAG AND DROP

var dragStart = function(e){
  let element_clicked = $(".area").filter(function() {
   return $(this).css('background-color') == 'rgb(38, 150, 126)';
})
  if (element_clicked.length == 1){
    actual_selected_area.style.backgroundColor = color_selected_area
    color_selected_area = ''
    actual_selected_area = ''
  }


   e.target.parentElement.classList.add('active');
      setTimeout(() => {
        e.target.parentElement.classList.remove('active');
      }, 1);
}
var dragEnd = function(e){
  var areas = document.querySelectorAll(".area"); 
  if (player1.play_state == 'play'){
    actual_player = player1.name
  }else{
    actual_player = player2.name
  }
  if (actual_player != request_player){
    return false
  }


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

            actual_position = target.getAttribute("actual_position")
            future_position = area.getAttribute("actual_position")


          let pos = future_position.split("_")
          pos = [parseInt(pos[0]),parseInt(pos[1])]
          let init_pos = actual_position.split("_")
          init_pos = [parseInt(init_pos[0]),parseInt(init_pos[1])]
          if (can_play >= 1){

            call_socket(target.id, [actual_position, future_position], actual_player)
          }

}}}

document.addEventListener("dragstart" , dragStart);
document.addEventListener("dragend" ,   dragEnd);




// CLICK AND MOVE - change the color of the squares by clicking on it
var actual_selected_piece = ''
var actual_selected_area = ''
var color_selected_area = ''
$(".piece").click(function(e){
  let color = e.target.id.split("_")[0]
  if (color == 'W'){
    color = 'white'
  }else{
    color = 'black'
  }
  if (player_color == color){
    actual_selected_piece = e.target
  }

  if (actual_selected_area != ''){
    actual_selected_area.style.backgroundColor = color_selected_area
    color_selected_area = ''
    actual_selected_area = ''
  }
})


$(".area").click(function(e){
  if (actual_player != request_player){
    return false
  }
  let color = e.target.id.split("_")[0]
  if (color == 'W'){
    color = 'white'
  }else{
    color = 'black'
  }

  if (e.target.id.split("_")[0] != 'square' && player_color != color){
    color_selected_area = ''
    actual_selected_area = ''
  }else if(actual_selected_area == ''){
    color_selected_area = e.currentTarget.style.backgroundColor
    actual_selected_area = e.currentTarget
    e.currentTarget.style.backgroundColor = 'rgb(38, 150, 126)'
    
  }else{
    actual_selected_area.style.backgroundColor = color_selected_area
    color_selected_area = ''
    actual_selected_area = ''
  }
  if (player1.play_state == 'play'){
    actual_player = player1.name
  }else{
    actual_player = player2.name
  }
  

  if (e.target.id != ''){
    target = e.target
  }
  else{
    target = e.target.parentNode
    for(let temp of [1,2,3,4]){
      target = target.parentNode
    }
  }

  actual_position = actual_selected_piece.getAttribute("actual_position")
  future_position = e.target.getAttribute("actual_position")

  let pos = future_position.split("_")
  pos = [parseInt(pos[0]),parseInt(pos[1])]
  let init_pos = actual_position.split("_")
  init_pos = [parseInt(init_pos[0]),parseInt(init_pos[1])]
  if (can_play >= 1){
      call_socket(actual_selected_piece.id, [actual_position, future_position], actual_player)
  }
  
})




// CHANGE PAGE - LOST MATCH
// resign if change or close the page 
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
}

document.addEventListener(visibilityChange, action, false);
var action_resign_1 = 0
function action() {
 if (player1.name == request_player || player2.name == request_player){

  var b = $('body');
  action_resign_1 += 1
    if (document.hidden) {
        const parameters = [request_player, action_resign_1, 'Resign'] 
    charSocket.send(JSON.stringify({
      'parameters' : parameters,
    }));
    } 

 }
  
}

action();

// count time for resign if no move any piece in the begin of the match

var verify_playing = 0 

var can_play = 0

var resign = 0
function can_do_play(){
  if (request_player == player2.name){
    call_socket('', '', 'Can play')
    setTimeout(add_one, 10000)
  }
  if (can_play < 1){
    setTimeout(can_do_play, 500)
  }
  
}


function add_one(){
  verify_playing += 1;
  if (verify_playing <= 2){
  setTimeout(add_one, 5000)
  if (verify_playing == 1 && player1.moved == false){
    call_socket(player1.name, 3, 'Resign')
  }else if (verify_playing == 2 && player2.moved == false){
    call_socket(player2.name, 3, 'Resign')
  }
  }
}

setTimeout(can_do_play, 1000)

function resigns_match(){
  if (request_player == player1_name){
    call_socket(player1.name, 3, 'Resign')
  }else if (request_player == player2_name){
    call_socket(player2.name, 3, 'Resign')
  }
}



// colapse content for promote pawn
var actual_pawn = ''
function promote_actual_piece(piece_prom){
  
  call_socket('', piece_prom, 'Promoted')
}
