function check_pieces_movement(player_){ //DROWING KING
  /* This function calculate if any player piece can do a movement, if not this return is false,
  what consequently the king is drowned*/

  let player_color_actual = ''
  let element_actual = ''
  if (player_.color == 'black'){
    player_color_actual = 'B'
  }else{
    player_color_actual = 'W'
  }
  for (let x = 0; x < 8; x++){
    for (let y = 0; y < 8; y++){
      if (board[x][y][0] != '    '){
        if (board[x][y][0].split("_")[0] == player_color_actual){

          if (board[x][y][0].split("_")[1][0] == 'P'){
            element_actual = player_.pieces.find(element => element.identifier == board[x][y][0])

            if (player_color_actual == 'W'){
              if ((x-1) > 0){
                if (element_actual.check_movement([x-1, y], true)) { return false };
                if (element_actual.check_movement([x-1, y+1], true) && (y+1) < 8) { return false };
                if (element_actual.check_movement([x-1, y-1], true) && (y-1) > 0) { return false };
                if (element_actual.check_movement([x-2, y], true) && (x-2) > 0) { return false };
              }
            }
            else{
              if ((x+1) < 8){
                if (element_actual.check_movement([x+1, y], true)) { return false };
                if (element_actual.check_movement([x+1, y+1], true) && (y-1) > 0) { return false };
                if (element_actual.check_movement([x+1, y-1], true) && (y+1) < 8) { return false };
                if (element_actual.check_movement([x+2, y], true) && (x+2) < 8) { return false };
              }
            }

          }
          else if (board[x][y][0].split("_")[1][0] == 'B' || board[x][y][0].split("_")[1][0] == 'Q'){
            element_actual = player_.pieces.find(element => element.identifier == board[x][y][0])
            if ((x-1) > 0){
              if (element_actual.check_movement([x-1, y-1], true) && (y-1) > 0) { return false };
              if (element_actual.check_movement([x-1, y+1], true) && (y+1) < 8) { return false };
            }
            if ((x+1) < 8){
              console.log(player_)
              console.log(element_actual)
              console.log("x " + x +" y " + y)
              if (element_actual.check_movement([x+1, y+1], true) && (y+1) < 8) { return false };
              if (element_actual.check_movement([x+1, y-1], true) && (y-1) > 0) { return false };
            }
          }
          if (board[x][y][0].split("_")[1][0] == 'T' || board[x][y][0].split("_")[1][0] == 'Q'){
            element_actual = player_.pieces.find(element => element.identifier == board[x][y][0])
            if (element_actual.check_movement([x-1, y], true) && (x-1) > 0) { return false };
            if (element_actual.check_movement([x+1, y], true) && (x+1) < 8) { return false };
            if (element_actual.check_movement([x, y+1], true) && (y+1) < 8) { return false };
            if (element_actual.check_movement([x, y-1], true) && (y-1) > 0) { return false };
          }
          else if (board[x][y][0].split("_")[1][0] == 'H'){
            element_actual = player_.pieces.find(element => element.identifier == board[x][y][0])
            if (element_actual.check_movement([x-2, y-1], true) (x+2) < 8 && (y-1) > 0) { return false };
            if (element_actual.check_movement([x-2, y+1], true) (x-2) > 0 && (y+1) < 8) { return false };
            if (element_actual.check_movement([x-1, y+2], true) (x-1) > 0 && (y+2) < 8) { return false };
            if (element_actual.check_movement([x+1, y+2], true) (x+2) < 8 && (y+2) < 8) { return false };
            if (element_actual.check_movement([x+2, y+1], true) (x+2) > 0 && (y+1) < 8) { return false };
            if (element_actual.check_movement([x+2, y-1], true) (x+2) < 8 && (y-1) > 0) { return false };
            if (element_actual.check_movement([x+1, y-2], true) (x+1) < 8 && (y-2) > 0) { return false };
            if (element_actual.check_movement([x-1, y-2], true) (x-1) > 0 && (y-2) > 0) { return false };
          }


        }
      }

  }
}
return true
}

function check_vertical_movements(self, future_pos){
  /* This function calculate if the piece can do a movement in vertical to the future destin, if not this return is false,
her is responsible calculate the existance of this position or if up to position no has a piece between in way*/
  for (let x = 0; x < 8; x++){
        if ((self.position_board[1]) == future_pos[1]){
          if ((self.position_board[0]-(1+x)) == future_pos[0]){

            for (let x = 0; x < 8; x++){
              if ((self.position_board[0]-(1+x)) > future_pos[0]){
                
                if(board[(self.position_board[0]-(1+x))][self.position_board[1]] != '    '){
                  return false
                }
              }
            }
            return true
          }
          else if ((self.position_board[0]+(1+x)) == future_pos[0]){

            for (let x = 0; x < 8; x++){
              if ((self.position_board[0]+(1+x)) < future_pos[0]){
                if(board[(self.position_board[0]+(1+x))][self.position_board[1]] != '    '){
                  return false
                }
              }
            }
              
              return true
          }
        }
        else if ((self.position_board[0]) == future_pos[0]){
          if ((self.position_board[1]-(1+x)) == future_pos[1]){

            for (let x = 0; x < 8; x++){
              if ((self.position_board[1]-(1+x)) > future_pos[1]){
                if(board[self.position_board[0]][(self.position_board[1]-(1+x))] != '    '){
                  return false
                }
              }
            }
            return true
          }
          else if ((self.position_board[1]+(1+x)) == future_pos[1]){

            for (let x = 0; x < 8; x++){
              if ((self.position_board[1]+(1+x)) < future_pos[1]){
                if(board[self.position_board[0]][(self.position_board[1]+(1+x))] != '    '){
                  return false
                }
              }
            }
            return true
          }

        }
    }
    return false
}

function check_diagonal_movements(self, future_pos){
  /*This function calculate if the piece can do a movement in diagonal to the future destin, if not this return is false,
this is responsible calculate the existance of this position or if up to position no has a piece between in way*/
  for (let x = 0; x < 8; x++){
        if ((self.position_board[1]+(1+x)) == future_pos[1]){
          if ((self.position_board[0]-(1+x)) == future_pos[0]){
            
            for (let x = 0; x < 8; x++){
              if ((self.position_board[0]-(1+x)) > future_pos[0]){
                if ((self.position_board[1]+(1+x)) < future_pos[1]){
                  if(board[(self.position_board[0]-(1+x))][(self.position_board[1]+(1+x))] != '    '){

                    return false
                  }
                }
              }
            }
            return true
          }
          else if ((self.position_board[0]+(1+x)) == future_pos[0]){
            for (let x = 0; x < 8; x++){
              if ((self.position_board[0]+(1+x)) < future_pos[0]){
                if ((self.position_board[1]+(1+x)) < future_pos[1]){
                  if(board[(self.position_board[0]+(1+x))][(self.position_board[1]+(1+x))] != '    '){
                    return false
                  }
                }
              }
            }
              return true
          }
        }
        else if ((self.position_board[1]-(1+x)) == future_pos[1]){
          if ((self.position_board[0]-(1+x)) == future_pos[0]){
            
            for (let x = 0; x < 8; x++){
              if ((self.position_board[1]-(1+x)) > future_pos[1]){
                if ((self.position_board[0]-(1+x)) > future_pos[0]){
                  if(board[(self.position_board[0]-(1+x))][(self.position_board[1]-(1+x))] != '    '){
                    return false
                  }
                }
              }
            }
            return true
          }
          else if ((self.position_board[0]+(1+x)) == future_pos[0]){

            for (let x = 0; x < 8; x++){
              if ((self.position_board[1]-(1+x)) > future_pos[1]){
                if ((self.position_board[0]+(1+x)) < future_pos[0]){
                  if(board[(self.position_board[0]+(1+x))][(self.position_board[1]-(1+x))] != '    '){
                    return false
                  }
                }
              }
            }
            return true
          }

        }
    }

    return false
}





function catch_piece(king_color, piece, arg1, arg2='default'){
  /*This function try verify if the piece is equal the args and the king color, this is auxiliar of check_king_line function*/
  try{
    piece = piece[0].split("_")
  }catch (TypeError){
      return 'nothing'
    }
  try{
    if (king_color.split("_")[0] != piece[0]){
      if(piece[1][0] == arg1 || piece[1][0] == arg2){
          return true
        }
      }
      
    }catch (TypeError){
      return 'nothing'
    }
    return 'nothing'
}


function catch_king_compare(pos1, pos2){
  /*This function verify if has a piece in the position*/
  try{
    if (board[pos1][pos2] != "    "){
      return true
    }else{
      return false
    }
  }
  catch (TypeError){
        return false
      }
}

function find_piece(self, name){
  for (let x = 0; x < self.pieces.length; x++){
    if (name == self.pieces[x].identifier){
      return x
    }
  }
}

function check_king_line(self, future_pos, enemy = 'default'){
  //Read the board and find the king opposite color and see if the piece targeted attack the king
  let piece = ''
  let return_catch = 'nothing'


  console.log("\n\n\n\n")


  if (future_pos == undefined){
      return false
    }
    else if (future_pos[0] >= 8 || future_pos[0] < 0){
      return false
    }else if (future_pos[1] >= 8 || future_pos[1] < 0){
      return false
    }
  for (let x = 0; x < 8; x++){
        if (catch_king_compare((future_pos[0]-(1+x)),(future_pos[1]+(1+x)))){
          piece = board[(future_pos[0]-(1+x))][(future_pos[1]+(1+x))]
          return_catch = catch_piece(self.identifier,piece,'Q','B')
          
          if (return_catch == true){
            if(enemy != 'default'){ // if the king is in check, the
              //function looks if the player manages to capture the piece that checked
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }
              return true
          }else if (return_catch == 'nothing'){
            break;
          }

        }
      }
  for (let x = 0; x < 8; x++){
          if (catch_king_compare((future_pos[0]+(1+x)),(future_pos[1]+(1+x)))){
            piece = board[(future_pos[0]+(1+x))][(future_pos[1]+(1+x))]
            return_catch = catch_piece(self.identifier,piece,'Q','B')
            
            if (return_catch == true){

              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }
              return true
            }else if (return_catch == 'nothing'){
              break;
            }
          }
    }
  for (let x = 0; x < 8; x++){
          if (catch_king_compare((future_pos[0]-(1+x)),(future_pos[1]-(1+x)))){
            piece = board[(future_pos[0]-(1+x))][(future_pos[1]-(1+x))]
            return_catch = catch_piece(self.identifier,piece,'Q','B')
            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }
              return true
            }else if (return_catch == 'nothing'){
              break;
            }
          }

  }
  for (let x = 0; x < 8; x++){
          if (catch_king_compare((future_pos[0]+(1+x)),(future_pos[1]-(1+x)))){
            piece = board[(future_pos[0]+(1+x))][(future_pos[1]-(1+x))]
            return_catch = catch_piece(self.identifier,piece,'Q','B')

            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }
              return true
            }else if (return_catch == 'nothing'){
              break;
            }

          }
  }

  //CHECK VERTICAL OR HORIZONTAL PIECES
  for (let x = 0; x < 8; x++){
        if (catch_king_compare((future_pos[0]-(1+x)),future_pos[1])){
          piece = board[(future_pos[0]-(1+x))][future_pos[1]]
          return_catch = catch_piece(self.identifier,piece,'Q','T')
          if (return_catch == true){
            if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }
            return true
          }else if (return_catch == 'nothing'){
            break;
          }

        }
  }
  for (let x = 0; x < 8; x++){
          if (catch_king_compare((future_pos[0]+(1+x)),future_pos[1])){
            piece = board[(future_pos[0]+(1+x))][future_pos[1]]
            return_catch = catch_piece(self.identifier,piece,'Q','T')
            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }
              return true
            }else if (return_catch == 'nothing'){
              break;
            }
          }
    }
  for (let x = 0; x < 8; x++){
          if (catch_king_compare(future_pos[0],(future_pos[1]-(1+x)))){
            piece = board[future_pos[0]][(future_pos[1]-(1+x))]
            return_catch = catch_piece(self.identifier,piece,'Q','T')
            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }

              return true
            }else if (return_catch == 'nothing'){
              break;
            }

          }
  }
  for (let x = 0; x < 8; x++){
          if (catch_king_compare(future_pos[0],(future_pos[1]+(1+x)))){
            piece = board[future_pos[0]][(future_pos[1]+(1+x))]
            return_catch = catch_piece(self.identifier,piece,'Q','T')
            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }

              return true
            }else if (return_catch == 'nothing'){
              break;
            }

          }
  }
  let possible = ''
      possible = [
          [future_pos[0]-2 ,future_pos[1]-1],
          [future_pos[0]-1 ,future_pos[1]-2],
          [future_pos[0]+1 ,future_pos[1]-2],
          [future_pos[0]+2 ,future_pos[1]-1],
          [future_pos[0]-2 ,future_pos[1]+1],
          [future_pos[0]-1 ,future_pos[1]+2],
          [future_pos[0]+1 ,future_pos[1]+2],
          [future_pos[0]+2 ,future_pos[1]+1]
      ]

  for (let x = 0; x < 8; x++){
          if (catch_king_compare(possible[x][0],possible[x][1])){

              piece = board[(possible[x][0])][(possible[x][1])]
              return_catch = catch_piece(self.identifier,piece,'H')
              if (return_catch == true){
                if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }

                return true
              }

          }
    }

  if (self.color == 'black'){
    if (catch_king_compare((future_pos[0]+1),(future_pos[1]+1))){
      piece = board[(future_pos[0]+1)][(future_pos[1]+1)]
            return_catch = catch_piece(self.identifier,piece,'P')
            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }

              return true
            }
    }
    else if (catch_king_compare((future_pos[0]+1),(future_pos[1]-1))){
      piece = board[(future_pos[0]+1)][(future_pos[1]-1)] 
            return_catch = catch_piece(self.identifier,piece,'P')
            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }

              return true
            }
    }
  }
  else if (self.color == 'white'){
    if (catch_king_compare((future_pos[0]-1),(future_pos[1]-1))){
      piece = board[(future_pos[0]-1)][(future_pos[1]-1)]
            return_catch = catch_piece(self.identifier,piece,'P')
            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }

              return true
            }
    }
    else if (catch_king_compare((future_pos[0]-1),(future_pos[1]+1))){
      piece = board[(future_pos[0]-1)][(future_pos[1]+1)]
            return_catch = catch_piece(self.identifier,piece,'P')
            if (return_catch == true){
              if(enemy != 'default'){
              let temp = self.__prototype__.pieces[find_piece(enemy,piece)]
              return !check_king_line(temp, temp.position_board)
            }

              return true
            }
    }
  }

    return false
}



function change_table_a_passant(identifier, init_pos, captured_pos, future_pos){
  //"Capture" the part if the capture is applied to the passant rule
    $("#square_"+captured_pos[0]+"_"+captured_pos[1]).empty()
}

function check_a_passant(self, future_pos){
  //verify if the movement is applied to the passant rule
  let init_pos = self.position_board
  future_pos = [parseInt(future_pos[0]),parseInt(future_pos[1])]
  let captured_pos = []
  if (self.color == 'white'){
    let enemy_pawn = board[future_pos[0]+1][future_pos[1]][0]
    let identifier = enemy_pawn[0]
    if (enemy_pawn.split("_")[0] == 'B'){
      for (let x =0; x < a_passant.length; x++){
        if (enemy_pawn == a_passant[x]){
          captured_pos = [future_pos[0]+1,future_pos[1]]
          change_table_a_passant(identifier, init_pos,captured_pos, future_pos)
          return true
        }
      }
      return false
    }
  }else{
    let enemy_pawn = board[future_pos[0]-1][future_pos[1]][0]
    let identifier = enemy_pawn[0]
    if (enemy_pawn[0].split("_")[0] == 'W'){
      for (let x =0; x < a_passant.length; x++){
        if (enemy_pawn[0] == a_passant[x]){
          captured_pos = [future_pos[0]-1,future_pos[1]]
          change_table_a_passant(identifier, init_pos,captured_pos, future_pos)
          return true
        }
      }
      return false
    }
  }
}


class Pawn{
  constructor(proto, identifier = null, color = null, position_board = null, first_move = 2){
    this.__prototype__ = proto;
    this.identifier = identifier;
    this.piece = 'pawn';
    this.color = color;
    this.position_board = position_board;
    this.first_move = first_move;
  }
  check_movement(future_pos = null, test = false){
    /*Check if the movement is valid (possible)*/
    let board_future = board[future_pos[0]][future_pos[1]]
    if (board_future == undefined){
      return false
    }
    let result_expression = ''
    let possible = ''
    possible = {
        'white' : [
          ['normal', this.position_board[0]-1, this.position_board[1]],
          ['first_move', this.position_board[0]-2 ,this.position_board[1], '2'],
          ['first_move', this.position_board[0]-1 ,this.position_board[1], '1'],
          ['capture_piece', this.position_board[0]-1 ,this.position_board[1]-1],
          ['capture_piece', this.position_board[0]-1 ,this.position_board[1]+1],
        ],

        'black' : [
          ['normal', this.position_board[0]+1, this.position_board[1]],
          ['first_move', this.position_board[0]+2 ,this.position_board[1], '2'],
          ['first_move', this.position_board[0]+1 ,this.position_board[1], '1'],
          ['capture_piece', this.position_board[0]+1 ,this.position_board[1]-1],
          ['capture_piece', this.position_board[0]+1 ,this.position_board[1]+1],
        ]
      }

      let between = ''
        between = { 'white' : [(this.position_board[0]-1),this.position_board[1]],

                    'black' : [(this.position_board[0]+1),this.position_board[1]],
        }



      if (parseInt(this.first_move) == 2){
        var wich_op = 'first_move'

      }else{
        wich_op = ''
      }
      for (let x = 0; x < possible[this.color].length; x++){
          if (wich_op == 'first_move'){
            if (board[between[this.color][0]][between[this.color][1]] != '    ' && possible[this.color][x][3] == '2'){
              return false
            }else{
              if (possible[this.color][x][1] == future_pos[0]){
                if (possible[this.color][x][2] == future_pos[1]){
                  if (board_future == '    '  && possible[this.color][x][0] == 'capture_piece'){
                    return false
                  }
                  if (possible[this.color][x][3] == '2'){
                    a_passant.push(this.identifier)
                  }
                  if (test == false){
                    this.first_move -= 1
                  }
                  if (possible[this.color][x][0] == 'capture_piece' && board_future != '    '){
                    if (board_future[0].split("_")[0] == 'W' && this.color == 'white'){
                      return false
                    }else if (board_future[0].split("_")[0] == 'B' && this.color == 'black'){
                      return false
                    }
                  }
                  return true
                }
              }

            }
          }
          else if (possible[this.color][x][1] == future_pos[0]){
            if (possible[this.color][x][2] == future_pos[1]){
              if (possible[this.color][x][0] != 'first_move'){
                if (board[between[this.color][0]][between[this.color][1]] != '    ' && possible[this.color][x][0] != 'capture_piece'){
                    return false
                  }
                  if (board_future == '    ' && possible[this.color][x][0] == 'capture_piece'){
                    result_expression = check_a_passant(this,future_pos)
                    return result_expression
                  }
                  if (possible[this.color][x][0] == 'capture_piece' && board_future != '    '){
                    if (board_future[0].split("_")[0] == 'W' && this.color == 'white'){
                      return false
                    }else if (board_future[0].split("_")[0] == 'B' && this.color == 'black'){
                      return false
                    }
                  }
                    this.first_move -= 1
                    return true
                  }   
              }
          }
      }
      return false
  }
}

class Tower{
  constructor(proto, identifier = null, color = null, position_board = null){
    this.__prototype__ = proto;
    this.identifier = identifier;
    this.piece = 'tower';
    this.color = color;
    this.position_board = position_board;
  }
  /*Check if the movement is valid (possible)*/
  check_movement = (future_pos) => {return check_vertical_movements(this, future_pos)}
}

class Horse{
  constructor(proto, identifier = null, color = null, position_board = null){
    this.__prototype__ = proto;
    this.identifier = identifier;
    this.piece = 'horse';
    this.color = color;
    this.position_board = position_board;
  }
  check_movement(future_pos){
    /*Check if the movement is valid (possible)*/
    let possible = ''
      possible = [
          [this.position_board[0]-2 ,this.position_board[1]-1],
          [this.position_board[0]-1 ,this.position_board[1]-2],
          [this.position_board[0]+1 ,this.position_board[1]-2],
          [this.position_board[0]+2 ,this.position_board[1]-1],
          [this.position_board[0]-2 ,this.position_board[1]+1],
          [this.position_board[0]-1 ,this.position_board[1]+2],
          [this.position_board[0]+1 ,this.position_board[1]+2],
          [this.position_board[0]+2 ,this.position_board[1]+1]
      ]

      for (let x = 0; x < 8; x++){

          if (possible[x][0] == future_pos[0]){
            if (possible[x][1] == future_pos[1]){
              return true
            }
          }


      }
  }
}

class Bishop{
  constructor(proto, identifier = null, color = null, position_board = null,){
    this.__prototype__ = proto;
    this.identifier = identifier;
    this.piece = 'bishop';
    this.color = color;
    this.position_board = position_board;
  }
  /*Check if the movement is valid (possible)*/
  check_movement = (future_pos) => { return check_diagonal_movements(this, future_pos)}

}

class Queen{
  constructor(proto, identifier = null, color = null, position_board = null,){
    this.__prototype__ = proto;
    this.identifier = identifier;
    this.piece = 'queen';
    this.color = color;
    this.position_board = position_board;
  }
  /*Check if the movement is valid (possible)*/
  check_movement = (future_pos) => { return (check_diagonal_movements(this, future_pos)||check_vertical_movements(this, future_pos))}

}

function do_rock_func(color, side, final_pos){
  /*Check if the rock movement is valid (possible), 
  is invalid if has any piece bettween king and rock, or possible check, or king ou tower has moved*/
  let valid_move = ''
  let tower = ''

  if (color == 'black'){
    tower = "B"+side
  }else{
    tower = "W"+side
  }
  tower = $("#"+tower)
  let init_pos = ''
  init_pos = tower.attr("actual_position").split("_")
  init_pos = [parseInt(init_pos[0]) , parseInt(init_pos[1])]

  if (color == 'white'){
      if (side == '_TR'){

        valid_move = !check_king_line(player1.pieces[12], [7,5]) && !check_king_line(player1.pieces[12], [7,6])
      }else{
        valid_move = !check_king_line(player1.pieces[12], [7,3]) && !check_king_line(player1.pieces[12], [7,2])
      }
      //print_(" valid_move"+ valid_move + " side" + side)
    if (valid_move == true){
      valid_move = get_future_pos(player1,player2, init_pos, final_pos)
    }
    //print_(" valid_move"+ valid_move + " side" + side)
  }else{
    if (side == '_TR'){
        valid_move = !check_king_line(player2.pieces[12], [0,5]) && !check_king_line(player2.pieces[12], [0,6])
      }else{
        valid_move = !check_king_line(player2.pieces[12], [0,3]) && !check_king_line(player2.pieces[12], [0,2])

      }
    if (valid_move == true){
      valid_move = get_future_pos(player2,player1, init_pos, final_pos) 
    }
  }

  //print_(" valid_move FINAL "+ valid_move + " ")
  if (valid_move == true){
    tower.attr("actual_position",final_pos[0]+"_"+final_pos[1])
    final_pos = $("#square_"+final_pos[0]+"_"+final_pos[1])
    final_pos.append(tower)
    return true
  }
  return false
  
}


function checkmate(king){
  //verify if the king is in state of checkmate
  let is_true = false
  let pos_king = [king.position_board[0], king.position_board[1]]
  let possible_mate = ''
      possible_mate = [
          [(pos_king[0]-1) ,pos_king[1]],
          [(pos_king[0]-1) ,(pos_king[1]+1)],
          [pos_king[0]     ,(pos_king[1]+1)],
          [(pos_king[0]+1) ,(pos_king[1]+1)],
          [(pos_king[0]+1) ,pos_king[1]],
          [(pos_king[0]+1) ,(pos_king[1]-1)],
          [pos_king[0]     ,(pos_king[1]-1)],
          [(pos_king[0]-1) ,(pos_king[1]-1)],
      ]
  for (let y = 0; y < 9; y++){

   is_true = king.check_movement(possible_mate[y]) && !check_king_line(king, possible_mate[y])

    if (is_true == true){
        return false
    }
  }
  return true
}


class King{
  constructor(proto, identifier = null, color = null, position_board = null){
    this.__prototype__ = proto;
    this.identifier = identifier;
    this.piece = 'king';
    this.color = color;
    this.position_board = position_board;
    this.do_rock = true;
  }
  check_movement(future_pos){
    /*Check if the movement is valid (possible)*/
    if (future_pos == undefined){
      return false
    }
    else if (future_pos[0] >= 8 || future_pos[0] < 0){
      return false
    }else if (future_pos[1] >= 8 || future_pos[1] < 0){
      return false
    }
    let a_check = false
    let possible_rock_return = false
    let possible = ''
      possible = [
          [this.position_board[0]-1 ,this.position_board[1]],
          [this.position_board[0]+1 ,this.position_board[1]],
          [this.position_board[0]   ,this.position_board[1]-1],
          [this.position_board[0]   ,this.position_board[1]+1],
          [this.position_board[0]-1 ,this.position_board[1]-1],
          [this.position_board[0]-1 ,this.position_board[1]+1],
          [this.position_board[0]+1 ,this.position_board[1]-1],
          [this.position_board[0]+1 ,this.position_board[1]+1]
      ]
    let possible_rock = ''
    possible_rock = {
      'white' : [
          [this.position_board[0], this.position_board[1]+2],
          [this.position_board[0],this.position_board[1]-2],
        ],

        'black' : [
          [this.position_board[0], this.position_board[1]+2],
          [this.position_board[0],this.position_board[1]-2],
        ]
    }
    let count_pieces_bettween = 0
    if (this.do_rock == true){
            if (possible_rock[this.color][0][0] == future_pos[0]){
              if (possible_rock[this.color][0][1] == future_pos[1]){
                for (let x = 1; x < 3; x++){
                  if (board[this.position_board[0]][this.position_board[1]+x] != '    '){
                    count_pieces_bettween += 1 
                  }
                }
                if (count_pieces_bettween == 0){
                  possible_rock_return = do_rock_func(this.color, "_TR", [this.position_board[0],5])
                  if (possible_rock_return == true){
                    this.do_rock = false
                    return true
                  }
                  
                }
                return false
              }
            }
            count_pieces_bettween = 0
            if (possible_rock[this.color][1][0] == future_pos[0]){
              if (possible_rock[this.color][1][1] == future_pos[1]){
                for (let x = 1; x < 4; x++){
                  if (board[this.position_board[0]][this.position_board[1]-x] != '    '){
                    count_pieces_bettween += 1 
                  }
                }
                if (count_pieces_bettween == 0){
                  possible_rock_return = do_rock_func(this.color, "_TL", [this.position_board[0],3])
                  if (possible_rock_return == true){
                    this.do_rock = false
                    return true
                  }
                }
                return false
              }
            }

    }
      for (let x = 0; x < 8; x++){
          if (possible[x][0] == future_pos[0]){

            if (possible[x][1] == future_pos[1]){
              try{
                if (board[future_pos[0]][future_pos[1]][0].split("_")[0] == this.identifier.split("_")[0]){
                return false
                }
                return true
              }
              catch{
                return false
              }
            }
          }


      }
  }
}





















function create_pieces(proto, color){
  /* Init piece classes for player  Piece(player, identifier, color, position_board)*/
  if (color == 'white'){
    return [new Pawn(proto,'W_P1','white', [6,0]),new Pawn(proto,'W_P2','white', [6,1]),new Pawn(proto,'W_P3','white', [6,2]), 
    new Pawn(proto,'W_P4','white', [6,3]),new Pawn(proto,'W_P5','white', [6,4]),new Pawn(proto,'W_P6','white', [6,5]), 
    new Pawn(proto,'W_P7','white', [6,6]),new Pawn(proto,'W_P8','white', [6,7]),new Tower(proto,'W_TL','white', [7,0]),
    new Horse(proto,'W_HL','white', [7,1]),new Bishop(proto,'W_BL','white', [7,2]),new Queen(proto,'W_Q','white', [7,3]),
    new King(proto,'W_K','white', [7,4]),new Bishop(proto,'W_BR','white', [7,5]),new Horse(proto,'W_HR','white', [7,6]),
    new Tower(proto,'W_TR','white', [7,7])]
  }
  else{
    return [new Pawn(proto,'B_P1','black', [1,0]),new Pawn(proto,'B_P2','black', [1,1]),new Pawn(proto,'B_P3','black', [1,2]), 
    new Pawn(proto,'B_P4','black', [1,3]),new Pawn(proto,'B_P5','black', [1,4]),new Pawn(proto,'B_P6','black', [1,5]), 
    new Pawn(proto,'B_P7','black', [1,6]),new Pawn(proto,'B_P8','black', [1,7]),new Tower(proto,'B_TL','black', [0,0]),
    new Horse(proto,'B_HL','black', [0,1]),new Bishop(proto,'B_BL','black', [0,2]),new Queen(proto,'B_Q','black', [0,3]),
    new King(proto,'B_K','black', [0,4]),new Bishop(proto,'B_BR','black', [0,5]),new Horse(proto,'B_HR','black', [0,6]),
    new Tower(proto,'B_TR','black', [0,7])]
  }
  

}


class Player{
  constructor(name = null, color = null, pieces = null, play_state = 'play', check = false){
    this.name = name;
    this.play_state = play_state;
    this.check = check;
    this.color = color;
    this.pieces = pieces;
    this.moved = false //count time for player, if not play the player resign automatically
  }
  
}

//create board
var board = [[['B_TL'],['B_HL'],['B_BL'],['B_Q'],['B_K'],['B_BR'],['B_HR'],['B_TR']],
                  [['B_P1'],['B_P2'],['B_P3'],['B_P4'],['B_P5'],['B_P6'],['B_P7'],['B_P8']],
                  [['    '],['    '],['    '],['    '],['    '],['    '],['    '],['    ']],
                  [['    '],['    '],['    '],['    '],['    '],['    '],['    '],['    ']],
                  [['    '],['    '],['    '],['    '],['    '],['    '],['    '],['    ']],
                  [['    '],['    '],['    '],['    '],['    '],['    '],['    '],['    ']],
                  [['W_P1'],['W_P2'],['W_P3'],['W_P4'],['W_P5'],['W_P6'],['W_P7'],['W_P8']],
                  [['W_TL'],['W_HL'],['W_BL'],['W_Q'],['W_K'],['W_BR'],['W_HR'],['W_TR']]];

var a_passant = []

var reset_a_passant = 0










function get_future_pos(player,enemy_player, init_pos = null, future_pos = null){
  /* get player and realize operations on the board, changing positions, change check state of player, and promote piece. 
  Do movements identifieng if the player can move the piece if : color is equal to player's color, 
  position is valid, and the player not is in check or will not be  in check.*/
  let valid_move = false
  let check_my_enemy = false
  let check_my_king = false
  init_pos = [parseInt(init_pos[0]),parseInt(init_pos[1])]
  future_pos = [parseInt(future_pos[0]),parseInt(future_pos[1])]
 if (player.play_state == 'play'){

  for (let x = 0; x < player.pieces.length; x++){
    if (board[init_pos[0]][init_pos[1]] == player.pieces[x].identifier){
        if (player.color == player.pieces[x].color){
            let temp_color = ''
            if (player.pieces[x].color == 'white'){
              temp_color = 'W'
            }else{
              temp_color = 'B'
            }
            if (temp_color == board[future_pos[0]][future_pos[1]][0].split("_")[0]){
              //SAME COLORS
              return false
            }else{
              //DIFFERENT COLORS  
              valid_move = player.pieces[x].check_movement(future_pos)
              if (valid_move == true){

                if (player.pieces[x].piece == 'pawn'){
                  if (future_pos[0] == 0 && player.pieces[x].color == 'white'){
                      $(".area").css('pointer-events','none');
                      actual_pawn = player.pieces[x];
                      can_play = 0
                      if (request_player == player.name){
                        $("#promote_white").toggleClass("collapse_content");
                      }
                    }else if (future_pos[0] == 7 && player.pieces[x].color == 'black'){
                      $(".area").css('pointer-events','none');
                      can_play = 0
                      actual_pawn = player.pieces[x];
                      if (request_player == player.name){
                        $("#promote_black").toggleClass("collapse_content");
                      }
                    }
                }
                

                board[future_pos[0]][future_pos[1]] = board[player.pieces[x].position_board[0]][player.pieces[x].position_board[1]]
                board[player.pieces[x].position_board[0]][player.pieces[x].position_board[1]] = ['    ']
                
                if (player.pieces[x].piece == 'king'){
                  check_my_king = check_king_line(player.pieces[12],future_pos)
                }else{
                  check_my_king = check_king_line(player.pieces[12],player.pieces[12].position_board)
                }
                

              if (check_my_king == false){


                
                player.pieces[x].position_board = [future_pos[0],future_pos[1]]
                check_my_enemy = check_king_line(enemy_player.pieces[12],enemy_player.pieces[12].position_board)
                enemy_player.check = check_my_enemy;
                //print_board(board)
                return true


              }else{
                board[player.pieces[x].position_board[0]][player.pieces[x].position_board[1]] = board[future_pos[0]][future_pos[1]];
                board[future_pos[0]][future_pos[1]] = ['    ']
                player.check = true;
                valid_move = false;
              }

              }else{
                //console.log("\n\n###################\n#####FAIL######\n###################")
              }
              return valid_move;
              
            }          
        }
    }
  }
}
  return false
}







// INIT CHESS PIECES
//create and set pieces in the page
function create_and_set_pieces(piece_id, piece_name, position) {
  element = $(`<div id="`+piece_id+`" class="piece" draggable=true actual_position = "`+position+`" style="background-image: url('/static/pieces/`+piece_name+`.png');"></div>`);

  $("#square_"+position).append(element);
}
function create_and_set_pawn(piece_id, piece_name, row) {
  for (let x = 1; x <= 9; x++){
    element = $(`<div id="`+piece_id+x+`" class="piece" draggable=true actual_position = "`+row+`_`+(x-1)+`" style="background-image: url('/static/pieces/`+piece_name+`.png');"></div>`);

  $("#square_"+row+"_"+(x-1)).append(element);
  }
}



//call the function
create_and_set_pieces("B_TL","black_tower","0_0");
create_and_set_pieces("B_HL","black_horse","0_1");
create_and_set_pieces("B_BL","black_bishop","0_2");
create_and_set_pieces("B_Q","black_queen","0_3");
create_and_set_pieces("B_K","black_king","0_4");//0_4
create_and_set_pieces("B_BR","black_bishop","0_5");
create_and_set_pieces("B_HR","black_horse","0_6");
create_and_set_pieces("B_TR","black_tower","0_7");

create_and_set_pawn("B_P","black_pawn","1");


create_and_set_pieces("W_TL","tower","7_0");
create_and_set_pieces("W_HL","horse","7_1");
create_and_set_pieces("W_BL","bishop","7_2");
create_and_set_pieces("W_Q","queen","7_3");
create_and_set_pieces("W_K","king","7_4");
create_and_set_pieces("W_BR","bishop","7_5");
create_and_set_pieces("W_HR","horse","7_6");
create_and_set_pieces("W_TR","tower","7_7");

create_and_set_pawn("W_P","pawn","6");







//board debug helper function
function print_board(board){
  //console.clear()
    console.log(
      "\n     0         1         2         3        4        5        6       7"+
      "\n  ------------------------------------------------------------------------\n"+
      0+"  |  "+board[0][0]+"  |  "+board[0][1]+"  |  "+board[0][2]+"  |  "+board[0][3]+"  |  "+board[0][4]+"  |  "+board[0][5]+"  |  "+board[0][6]+"  |  "+board[0][7]+"  |  "
      +"\n  ------------------------------------------------------------------------\n"
      +1+"  |  "+board[1][0]+"  |  "+board[1][1]+"  |  "+board[1][2]+"  |  "+board[1][3]+"  |  "+board[1][4]+"  |  "+board[1][5]+"  |  "+board[1][6]+"  |  "+board[1][7] +"  |  "
      +"\n  ------------------------------------------------------------------------\n"
      +2+"  |  "+board[2][0]+"  |  "+board[2][1]+"  |  "+board[2][2]+"  |  "+board[2][3]+"  |  "+board[2][4]+"  |  "+board[2][5]+"  |  "+board[2][6]+"  |  "+board[2][7] +"  |  "
      +"\n  ------------------------------------------------------------------------\n"
      +3+"  |  "+board[3][0]+"  |  "+board[3][1]+"  |  "+board[3][2]+"  |  "+board[3][3]+"  |  "+board[3][4]+"  |  "+board[3][5]+"  |  "+board[3][6]+"  |  "+board[3][7] +"  |  "
      +"\n  ------------------------------------------------------------------------\n"
      +4+"  |  "+board[4][0]+"  |  "+board[4][1]+"  |  "+board[4][2]+"  |  "+board[4][3]+"  |  "+board[4][4]+"  |  "+board[4][5]+"  |  "+board[4][6]+"  |  "+board[4][7] +"  |  "
      +"\n  ------------------------------------------------------------------------\n"
      +5+"  |  "+board[5][0]+"  |  "+board[5][1]+"  |  "+board[5][2]+"  |  "+board[5][3]+"  |  "+board[5][4]+"  |  "+board[5][5]+"  |  "+board[5][6]+"  |  "+board[5][7] +"  |  "
      +"\n  ------------------------------------------------------------------------\n"
      +6+"  |  "+board[6][0]+"  |  "+board[6][1]+"  |  "+board[6][2]+"  |  "+board[6][3]+"  |  "+board[6][4]+"  |  "+board[6][5]+"  |  "+board[6][6]+"  |  "+board[6][7] +"  |  "
      +"\n  ------------------------------------------------------------------------\n"
      +7+"  |  "+board[7][0]+"  |  "+board[7][1]+"  |  "+board[7][2]+"  |  "+board[7][3]+"  |  "+board[7][4]+"  |  "+board[7][5]+"  |  "+board[7][6]+"  |  "+board[7][7] +"  |  "
      +"\n  ------------------------------------------------------------------------\n")
}

//print helper (facilitate printing and debug in console)
function print_(arg){
 console.log(arg)
}
