class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: [["p0"], ["p0"], ["p0"], ["p0"], ["p0"], ["p0"], ["p0"], ["p0"], ["p0"]],
                   red: {
                     piece: [1, 2, 3, 4],
                     stock: false,
                   },
                   blue: {
                     piece: [1, 2, 3, 4],
                     stock: false,
                   },
                   turn: "red",
                   stock_position: false,
                  };
  }

  /*
    配列に特定の要素が入っているか確認
  */
  isIndexContained(array, key) {
    return array.indexOf(key) >= 0;
  }

  /*
    stockとpieceを更新する
  */
  updateStockAndPiece(tmp_piece, tmp_stock, color, key) {
    if (tmp_stock === false) {
      if (this.isIndexContained(tmp_piece, key)) {
        tmp_stock = key;
        tmp_piece.splice(tmp_piece.indexOf(tmp_stock), 1);
      }
    } else {
      if (this.isIndexContained(tmp_piece, key)) {
        tmp_piece.unshift(tmp_stock);
        tmp_stock = key;
        tmp_piece.splice(tmp_piece.indexOf(tmp_stock), 1);
      } else if (tmp_stock === key) {
        tmp_piece = tmp_piece.concat(tmp_stock);
        tmp_stock = false;
      }
    }

    if (color === "red") {
      this.setState({ red: { piece: tmp_piece, stock: tmp_stock } }); // 片方の指定のみ（pieceのみ or stockのみ)だとundefinedになってしまう！
    } else if (color === "blue") {
      this.setState({ blue: { piece: tmp_piece, stock: tmp_stock } });
    }
  }

  /*
    コマの選択
  */
  togglePieceClass(color, key) {
    var tmp_piece, tmp_stock;

    /*
      指定された色のpiece(配列)を取得
    */
    if (color === "red") {
      tmp_piece = this.state.red.piece;
      tmp_stock = this.state.red.stock;
    } else if (color === "blue") {
      tmp_piece = this.state.blue.piece;
      tmp_stock = this.state.blue.stock;
    } else {

    }

    this.updateStockAndPiece(tmp_piece, tmp_stock, color, key)
  }

  /*
    ターンを変更する
  */
  toggleTurn() {
    if(this.state.turn === "red") {
      this.setState({ turn: "blue" });
    } else if(this.state.turn === "blue") {
      this.setState({ turn: "red" });
    } else {

    }
  }

  /*
    マス状の数字を選択した場合に使用する関数
  */
  selectPieceOnSquare(piece_array) {
    var tmp_stock = false;

    if(this.state.turn === "red") {
      if(piece_array.slice(-1)[0].slice(0, 3) === "red") {
        tmp_stock = piece_array.pop();
        tmp_stock = tmp_stock.slice(-1);
      }
    } else if(this.state.turn === "blue") {
      if (piece_array.slice(-1)[0].slice(0, 4) === "blue") {
        tmp_stock = piece_array.pop();
        tmp_stock = tmp_stock.slice(-1);
      }
    }
    
    return piece_array, tmp_stock;
  }

  /*
    コマをマスに配置する
  */
  deploy(key) {
    var stock, id, piece, stock_position;
    var whole_array = this.state.squares;
    var array = this.state.squares[key];

    if(this.state.turn === "red") {
      stock = this.state.red.stock;
      id = "red" + stock;
      piece = this.state.red.piece;
    } else if(this.state.turn === "blue") {
      stock = this.state.blue.stock;
      id = "blue" + stock;
      piece = this.state.blue.piece;
    }

    if ((this.state.stock_position === key) && !(this.state.stock_position === false)) {
      array.push(id);
      whole_array[key] = array;
      stock = false;
      this.setState({ stock_position: false });
    }
    /*
      この条件(if)によりコマの配置が可能 → ターンを切り替える
    */
    else if ((parseInt(this.state.squares[key].slice(-1)[0].slice(-1), 10) < stock) && !(stock === false)) {
      array.push(id);
      whole_array[key] = array;
      this.toggleTurn();
      stock = false;
      this.setState({ stock_position: false });
    } 
    else if (!(stock === false) && !(this.state.stock_position === false )){
      array = this.state.squares[this.state.stock_position];
      array.push(this.state.turn + stock);
      whole_array[this.state.stock_position] = array;
      stock = false;
      this.setState({ stock_position: false });
    }
    else if (this.state.squares[key].slice(-1)[0] !== "p0" && (stock === false)) { /* ストックが存在しないが，数字のコマを選択したとき */
      if ((this.state.squares[key].slice(-1)[0].slice(0, 3) === this.state.turn) || (this.state.squares[key].slice(-1)[0].slice(0, 4) === this.state.turn)){
        this.setState({ stock_position: key });
        array, stock = this.selectPieceOnSquare(this.state.squares[key]);
        whole_array[key] = array;
      }
    }
    else if (this.state.squares[key].slice(-1)[0] !== "p0" && !(stock === false)) {
      if(this.state.turn === "red") {
        piece.push(this.state.red.stock);
        stock = false;
      } else if(this.state.turn === "blue") {
        piece.push(this.state.blue.stock);
        stock = false;
      } else {
        console.log("Error: deploy");
      }
    }

    /*
      実際の配置処理
    */
    this.setState({squares: whole_array});

    if (this.state.turn === "red") {
      this.setState({ red: { piece: piece, stock: stock } });
    } else if (this.state.turn === "blue") {
      this.setState({ blue: { piece: piece, stock: stock } });
    }

  }

  /*
    マスに数字を表示する
  */
  showPieceToSquares(piece) {
    if(piece > 0) {
      return piece;
    }
  }

  /*
    マスの数字の色を指定する
  */
  showColorToSquares(piece) {
    if(piece.slice(0, 3) === "red") {
      return "square_red";
    } else if (piece.slice(0, 4) === "blue") {
      return "square_blue";
    } else {
      return " ";
    }
  }

  /*
    ストックしているコマの表示
  */
  showStock(color) {
    if(color === "red") {
      if(this.state.red.stock) {
        return this.state.red.stock;
      }
    } else if (color === "blue") {
      if (this.state.blue.stock) {
        return this.state.blue.stock;
      }
    } else {
      console.log("Error: showStock");
    }

    return "";
  }

  render() {
    return (
      <div className="main">

        {/* 赤チームのコマ */}
        <div className={"piece_field " + (this.state.turn === "red" ? " " : "not_turn ")} id="red_piece_field">

          {/* 赤チームのターン */}
          <div className={(this.state.turn === "red" ? "red_turn" : " ")}></div>

          <p className={
                        "piece red_piece "
                        + (this.isIndexContained(this.state.red.piece, 1) ? " " : " stocked ")
                       }
             id="red1"
             onClick={
               () => { this.togglePieceClass("red", 1) }
             }>
            1
          </p>
          <p className={
                        "piece red_piece "
                        + (this.isIndexContained(this.state.red.piece, 2) ? " " : " stocked ")
                       }
             id="red2"
             onClick={
               () => { this.togglePieceClass("red", 2) }
             }>
            2
          </p>
          <p className={
                        "piece red_piece "
                        + (this.isIndexContained(this.state.red.piece, 3) ? " " : " stocked ")
                       }
             id="red3"
             onClick={
               () => { this.togglePieceClass("red", 3) }
             }>
            3
          </p>
          <p className={
                        "piece red_piece "
                        + (this.isIndexContained(this.state.red.piece, 4) ? " " : " stocked ")
                       }
             id="red4"
             onClick={
               () => { this.togglePieceClass("red", 4) }
             }>
            4
          </p>
        </div>

        <table className="squares">
          <div id="stack_red_box" className={this.state.red.stock ? "square_red_stock" : " "}>{this.showStock("red")}</div>
          <tbody>
            <tr>
              <td id="square0" onClick={() => { this.deploy(0) }}><span className={this.showColorToSquares(this.state.squares[0].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[0].slice(-1)[0].slice(-1))}</span></td>
              <td id="square1" onClick={() => { this.deploy(1) }}><span className={this.showColorToSquares(this.state.squares[1].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[1].slice(-1)[0].slice(-1))}</span></td>
              <td id="square2" onClick={() => { this.deploy(2) }}><span className={this.showColorToSquares(this.state.squares[2].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[2].slice(-1)[0].slice(-1))}</span></td>
            </tr>
            <tr>
              <td id="square3" onClick={() => { this.deploy(3) }}><span className={this.showColorToSquares(this.state.squares[3].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[3].slice(-1)[0].slice(-1))}</span></td>
              <td id="square4" onClick={() => { this.deploy(4) }}><span className={this.showColorToSquares(this.state.squares[4].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[4].slice(-1)[0].slice(-1))}</span></td>
              <td id="square5" onClick={() => { this.deploy(5) }}><span className={this.showColorToSquares(this.state.squares[5].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[5].slice(-1)[0].slice(-1))}</span></td>
            </tr>
            <tr>
              <td id="square6" onClick={() => { this.deploy(6) }}><span className={this.showColorToSquares(this.state.squares[6].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[6].slice(-1)[0].slice(-1))}</span></td>
              <td id="square7" onClick={() => { this.deploy(7) }}><span className={this.showColorToSquares(this.state.squares[7].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[7].slice(-1)[0].slice(-1))}</span></td>
              <td id="square8" onClick={() => { this.deploy(8) }}><span className={this.showColorToSquares(this.state.squares[8].slice(-1)[0])}>{this.showPieceToSquares(this.state.squares[8].slice(-1)[0].slice(-1))}</span></td>
            </tr>
          </tbody>
          <div id="stack_blue_box" className={this.state.blue.stock ? "square_blue_stock" : " "}>{this.showStock("blue")}</div>
        </table>

        {/* 青チームのコマ */}
        <div className={"piece_field " + (this.state.turn === "blue" ? " " : "not_turn ")} id="blue_piece_field">
          <p className={
            "piece blue_piece "
            + (this.isIndexContained(this.state.blue.piece, 1) ? " " : " stocked ")
          }
            id="blue1"
            onClick={
              () => { this.togglePieceClass("blue", 1) }
            }>
            1
          </p>
          <p className={
            "piece blue_piece "
            + (this.isIndexContained(this.state.blue.piece, 2) ? " " : " stocked ")
          }
            id="blue2"
            onClick={
              () => { this.togglePieceClass("blue", 2) }
            }>
            2
          </p>
          <p className={
            "piece blue_piece "
            + (this.isIndexContained(this.state.blue.piece, 3) ? " " : " stocked ")
          }
            id="blue3"
            onClick={
              () => { this.togglePieceClass("blue", 3) }
            }>
            3
          </p>
          <p className={
            "piece blue_piece "
            + (this.isIndexContained(this.state.blue.piece, 4) ? " " : " stocked ")
          }
            id="blue4"
            onClick={
              () => { this.togglePieceClass("blue", 4) }
            }>
            4
          </p>

          {/* 青チームのターン */}
          <div className={(this.state.turn === "blue" ? "blue_turn" : " ")}></div>
        </div>

      </div>
    );
  }
}

const target = document.querySelector('#app');
ReactDOM.render(<App />, target);
