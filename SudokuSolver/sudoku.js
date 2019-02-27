var squares = new Array();
var set = new Array();
var before_guess = new Array();
var guessing  = [0, 0, 0];

var AllowGuessing = true;
var ShowPosibleNumbers = false;
var filled = false;

		for(var i = 0; i < 9; i++){
			squares[i] = new Array();
			for(var j = 0; j < 9; j++){
				squares[i][j] = new Array();
				squares[i][j][0] = 0;

				squares[i][j][1] = true;
				squares[i][j][2] = true;
				squares[i][j][3] = true;
				squares[i][j][4] = true;
				squares[i][j][5] = true;
				squares[i][j][6] = true;
				squares[i][j][7] = true;
				squares[i][j][8] = true;
				squares[i][j][9] = true;

				squares[i][j][10] = ( Math.floor(j/3) + 3*Math.floor(i/3) );
			}
		}

		/*/squares[0][0][0] = 8; 
		squares[0][1][0] = 9; 
		squares[1][1][0] = 4; 
		squares[0][5][0] = 1; 
		squares[2][5][0] = 8; 
		squares[1][6][0] = 5;
		squares[0][8][0] = 6;
		squares[1][8][0] = 1; 
 		squares[2][8][0] = 4; 
 		squares[3][0][0] = 2;
		squares[4][0][0] = 9; 
 		squares[5][1][0] = 6;
 		squares[3][3][0] = 7;
		squares[5][3][0] = 8; 
 		squares[4][5][0] = 6;
 		squares[5][5][0] = 5;
		squares[5][6][0] = 7; 
 		squares[6][1][0] = 5;
 		squares[8][1][0] = 7;
		squares[8][2][0] = 2; 
 		squares[6][3][0] = 2;
 		squares[7][4][0] = 1;
		squares[6][5][0] = 4; 
 		squares[7][8][0] = 5;/*/

 		/*/squares[0][2][0] = 7;
 		squares[0][3][0] = 6;
 		squares[0][8][0] = 4;  
 		squares[1][0][0] = 4;
 		squares[1][1][0] = 1; 
 		squares[1][4][0] = 9;  
 		squares[2][0][0] = 9; 
 		squares[2][3][0] = 8;
 		squares[2][5][0] = 5; 
 		squares[2][6][0] = 6; 
 		squares[2][8][0] = 7; 
 		squares[3][4][0] = 6; 
 		squares[3][6][0] = 7;
 		squares[4][5][0] = 9;
 		squares[4][6][0] = 2;
 		squares[4][8][0] = 8;
 		squares[5][2][0] = 2;
 		squares[5][3][0] = 7;
 		squares[5][4][0] = 8;
 		squares[6][0][0] = 5;
 		squares[6][8][0] = 6;
 		squares[7][1][0] = 7;
 		squares[7][4][0] = 2;
 		squares[7][6][0] = 8;
 		squares[7][8][0] = 9;
 		squares[8][6][0] = 4;/*/

		function checkRow(x, y){
			if(squares[y][x][0] == 0){	
				for(var i = 0; i < 9; i++){
					for(var j = 1; j < 10; j++){
						if(squares[y][i][0] == j ){
							squares[y][x][j] = false;
							//document.getElementById('x' + x + "y" + y).innerHTML += "<strike>" + j + "</strike>";
							break;
						}
					}
				}
 			}
		}

		function checkCol(x, y){
			if(squares[y][x][0] == 0){
				for(var i = 0; i < 9; i++){
					for(var j = 1; j < 10; j++){
						if(squares[i][x][0] == j ){
							squares[y][x][j] = false;
							//document.getElementById('x' + x + "y" + y).innerHTML += "<strike>" + j + "</strike>";
						}
					}
				}
 			}
		}

		function checkQuad(x, y){
			if(squares[y][x][0] == 0){
				for(var i = 0; i < 9; i++){
					for(var j = 0; j < 9; j++){
						for(var n = 1; n < 10; n++){
							if(squares[i][j][10] == squares[y][x][10] && squares[i][j][0] == n ){
								squares[y][x][n] = false;
								//document.getElementById('x' + x + "y" + y).innerHTML += "<strike>" + j + "</strike>";
							}
						}
					}
				}
 			}
		}


		function testCol (x, y) {
			var bool = true;
			if(squares[y][x][0] == 0){
				for(var j = 1; j < 10; j++){
					bool = true;
					if(squares[y][x][j]){
						for(var i = 0; i < 9; i++){
							if( squares[i][x][j] == true && squares[i][x][0] == 0 && i != y ){
								bool = false;
								break;
							}
						}
						if(bool == true){
							set.push( [ x, y, j ] );
							//document.write( "(x" + x + "y" + y +") <b>" + j + "</b><br>");
						}
					}
				}
			}
		}


		function testRow (x, y) {
			var bool = true;
			if(squares[y][x][0] == 0){
				for(var j = 1; j < 10; j++){
					bool = true;
					if(squares[y][x][j]){
						for(var i = 0; i < 9; i++){
							if( squares[y][i][j] == true && squares[y][i][0] == 0 && i != x ){
								bool = false;
								break;
							}
						}
						if(bool == true){
							set.push( [ x, y, j ] );
							//document.write( "(x" + x + "y" + y +") <b>" + j + "</b><br>");
						}
					}
				}
			}
		}

		function testQuad (x, y) {
			var bool = true;
			if(squares[y][x][0] == 0){
				for(var n = 1; n < 10; n++){
					bool = true;
					if(squares[y][x][n]){
						

						for(var i = 0; i < 9; i++){


							for (var j = 0; j < 9; j++) {
								if( squares[i][j][0] == 0 && (j != x || i != y) &&  squares[i][j][n] && squares[y][x][10] == squares[i][j][10] ){
									bool = false;
								}
							}
						}

						if(bool){
							set.push( [ x, y, n ] );
							//document.write( "(x" + x + "y" + y +") <b>" + n + "</b><br>");
						}
					}
				}
			}
		}
		function testSquare (x, y) {
			var count = 0;
			var number = "";

			if(squares[y][x][0] == 0){
				for(var n = 1; n <= 9; n++){
					if(squares[y][x][n] == true){
						number = n;
						count++;
					}
				}
				if(count == 1){
					set.push( [ x, y, number ] );
				}
			}
		}


		document.write("<table>");
		for(var i = 0; i < 9; i++){
			document.write("<tr>");

			for(var j = 0; j < 9; j++){

				var color = "white";
				if(squares[i][j][10] % 2 == 0) 
					color = "silver"; 
				else
					color = "white";

				var str = "          <br>          ";
				if(squares[i][j][0] != 0)
					str = squares[i][j][0];

				document.write("<td style='background: " + color + "' id='x" + j + "y" + i + "'><b onclick='showInput(" + j + "," + i + ")'>"  + str + "</b><br></td>");
			}
			document.write("</tr>");
		}
		document.write("</table>");
		document.write("<button onclick='solve();'> > </button><br><br>");
		document.write("<button onclick='iterations = 0;while(!filled){solve(); iterations++; if(iterations > 1000){break;}}'> solve </button><br><br>");
		document.write("<input type='checkbox' id='AllowGuessing' checked='true'> Allow Guessing<br>");
		document.write("<input type='checkbox' id='ShowPosibleNumbers'> Show Posible Numbers<br>");

		function showInput ( x, y) {
			document.getElementById("x" + x + "y" + y).innerHTML = "<input id='input' value='" + squares[y][x][0] + "' type='number' min='0' max='9' onblur='hideInput(" + x + "," + y + ")'>";
			document.getElementById("input").focus();
			document.getElementById("input").select();
			document.getElementById("input").setSelectionRange(0,1);
		}
		function hideInput( x, y) {
			squares[y][x][0] = document.getElementById("input").value;
			var str = "          <br>          ";
			if(squares[y][x][0] != 0)
				str = squares[y][x][0];
			document.getElementById("x" + x + "y" + y).innerHTML = "<b onclick='showInput(" + x + "," + y + ")'>"  + str + "</b><br>";
		}
		document.getElementById("AllowGuessing").onclick = function () {
			AllowGuessing = document.getElementById("AllowGuessing").checked;
		}
		document.getElementById("ShowPosibleNumbers").onclick = function () {
			ShowPosibleNumbers = document.getElementById("ShowPosibleNumbers").checked;
			if(ShowPosibleNumbers){
				for(var i = 0; i < 9; i++){
					for(var j = 0; j < 9; j++){
						if(squares[i][j][0] == 0){
							var str = "";
							for(var n = 1; n <= 9; n++){
								if(squares[i][j][n]){
									str += n;
									if(n != 9)
										str += ", ";
								}
							}
							document.getElementById("x" + j + "y" + i).innerHTML = "<b onclick='showInput(" + j + "," + i + ")'>          <br>          </b>";
							document.getElementById("x" + j + "y" + i).innerHTML += "<br><font style='font-size: 8px;'>(" + str + ")</font>";
						}
					}
				}
			}else{
				for(var i = 0; i < 9; i++){
					for(var j = 0; j < 9; j++){
						if(squares[i][j][0] == 0){
							document.getElementById("x" + j + "y" + i).innerHTML = "<b onclick='showInput(" + j + "," + i + ")'>          <br>          </b>";
						}
					}
				}
			}
		}

		function solve () {

			set.length =0;

			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					checkRow(i, j);
					checkCol(i,j);
					checkQuad(i,j);
					
				}
			}


			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					if(squares[j][i][0] != 0)
						document.getElementById("x" + i + "y" + j).innerHTML = "<b onclick='showInput(" + i + "," + j + ")'>"  + squares[j][i][0] + "</b>";
					/*/else{
						document.getElementById("x" + i + "y" + j).innerHTML = "<font style='font-size: 8px;'>(</font>";
						for(var n = 1; n <= 9; n++){
							if(squares[j][i][n] == true)
								document.getElementById("x" + i + "y" + j).innerHTML += "<font style='font-size: 8px;'>" + n + ", </font>";
						}
						document.getElementById("x" + i + "y" + j).innerHTML += "<font style='font-size: 8px;'>)</font>";
						//document.getElementById("x" + i + "y" + j).innerHTML = "<b onclick='showInput(" + i + "," + j + ")'> </b><br>";
					}/*/
					
					testRow(i,j);
					testCol(i,j);
					testQuad(i,j);
					testSquare(i,j);
					
				}
			}

			if(AllowGuessing){
				if(set.length == 0){
					if(before_guess.length == 0){
						console.log("guessing...");
						before_guess = JSON.parse(JSON.stringify(squares))
						guess();
					}
					else{
						console.log("bad guess...");
						squares = JSON.parse(JSON.stringify(before_guess));
						before_guess = new Array();
						squares[guessing[1]][guessing[0]][guessing[2]] = false;
					}
				}
			}

			for(var i = 0; i < set.length; i++){
				if(squares[ set[i][1] ][ set[i][0] ][ set[i][2] ]){
					document.getElementById("x" + set[i][0] + "y" + set[i][1]).innerHTML = " <b style='color: red;'>" + set[i][2] + "</b>";
					squares[ set[i][1] ][ set[i][0] ][0] =  set[i][2];
				}
			}

			if(ShowPosibleNumbers){
				for(var i = 0; i < 9; i++){
					for(var j = 0; j < 9; j++){
						if(squares[i][j][0] == 0){
							var str = "";
							for(var n = 1; n <= 9; n++){
								if(squares[i][j][n]){
									str += n;
									if(n != 9)
										str += ", ";
								}
							}
							document.getElementById("x" + j + "y" + i).innerHTML = "<b onclick='showInput(" + j + "," + i + ")'>          <br>          </b>";
							document.getElementById("x" + j + "y" + i).innerHTML += "<br><font style='font-size: 8px;'>(" + str + ")</font>";
						}
					}
				}
			}

			filled = true;
			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					if(squares[i][j][0] == 0){
						filled = false;
						break;
					}
				}
			}
			isRight();
		}

		function guess() {

			best_square = [0, 0, Infinity];
			var nums = new Array();
			for(var i = 0; i < 9; i++){
				for(var j = 0; j < 9; j++){
					var count = 0;
					if(squares[i][j][0] == 0){
						for(var n = 1; n <= 9; n++){
							if(squares[i][j][n]){
								count++;
							}
						}
						if(count < best_square[2]){
							best_square = [j, i, count];
						}
					}
				}
			}
			for(var n = 1; n <= 9; n++){
				if(squares[best_square[1]][best_square[0]][n] == true){
					nums.push(n);
				}
			}
			if(best_square[2] != Infinity){
				guessing[0] = best_square[0];
				guessing[1] = best_square[1];
				guessing[2] = nums[0];
				set.push( [ best_square[0],best_square[1],nums[0] ] );
			}
		}




		function isRight(){
			var bool = true;
			for(var i = 0; i < 9; i++){
				for(var n = 1; n <= 9; n++){
					x_n = 0;
					for(var j = 0; j < 9; j++){
						if(squares[i][j][0] == n)
							x_n++;
						if(x_n > 1){
							document.getElementById("x" + j + "y" + i).style.background = "#AA0000";
							bool = false;
							break;
						}
					}
					if(x_n > 1)
						break;
				}
			}
			for(var i = 0; i < 9; i++){
				for(var n = 1; n <= 9; n++){
					y_n = 0;
					for(var j = 0; j < 9; j++){
						if(squares[j][i][0] == n)
							y_n++;
						if(y_n > 1){
							document.getElementById("x" + i + "y" + j).style.background = "#AA0000";
							bool = false;
							break;
						}
					}
					if(y_n > 1)
						break;
				}
			}
			for(var q = 0; q < 9; q++){
				for(var n = 1; n <= 9; n++){
					count = 0;
					for(var i = 0; i < 9; i++){
						for(var j = 0; j < 9; j++){
							if(squares[i][j][10] == q && squares[i][j][0] == n)
								count++;
							if(count > 1){
								document.getElementById("x" + j + "y" + i).style.background = "#AA0000";
								bool = false;
								break;
							}
						}
						if(count>1)
							break;
					}
				}
			}
			return bool;
		}

		//solve();