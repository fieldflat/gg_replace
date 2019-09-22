class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { squares: [false, false, false, false, false, false, false, false, false],
                   red: {
                     piece: [1, 2, 3, 4],
                     stock: false,
                   },
                   blue: {
                     piece: [1, 2, 3, 4],
                     stock: false,
                   } };
  }

  /*
    関数サンプル
  */
  changeName(name) {
    this.setState({name: name})
  }

  /*
    配列に特定の要素が入っているか確認
  */
  isIndexContained(array, key) {
    return array.indexOf(key) >= 0;
  }

  /*
    stockとPieceを更新する
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

    /*
      stock & pieceの更新
    */
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
      console.log(tmp_piece + " " + tmp_stock);
    } else {
      console.log("Error: togglePieceClass (invalid color)");
    }

    this.updateStockAndPiece(tmp_piece, tmp_stock, color, key)
  }

  render() {
    return (
      <div className="main">

        {/* 赤チームのコマ */}
        <div className="piece_field" id="red_piece_field">
          <p className={"piece red_piece " + (this.isIndexContained(this.state.red.piece, 1) ? " " : " stocked")} id="red1" onClick={() => { this.togglePieceClass("red", 1) }}>1</p>
          <p className={"piece red_piece " + (this.isIndexContained(this.state.red.piece, 2) ? " " : " stocked")} id="red2" onClick={() => { this.togglePieceClass("red", 2) }}>2</p>
          <p className={"piece red_piece " + (this.isIndexContained(this.state.red.piece, 3) ? " " : " stocked")} id="red3" onClick={() => { this.togglePieceClass("red", 3) }}>3</p>
          <p className={"piece red_piece " + (this.isIndexContained(this.state.red.piece, 4) ? " " : " stocked")} id="red4" onClick={() => { this.togglePieceClass("red", 4) }}>4</p>
        </div>

        <table className="squares">
          <tbody>
            <tr>
              <td id="square0"></td>
              <td id="square1"></td>
              <td id="square2"></td>
            </tr>
            <tr>
              <td id="square3"></td>
              <td id="square4"></td>
              <td id="square5"></td>
            </tr>
            <tr>
              <td id="square6"></td>
              <td id="square7"></td>
              <td id="square8"></td>
            </tr>
          </tbody>
        </table>

        {/* 青チームのコマ */}
        <div className="piece_field" id="blue_piece_field">
          <p className={"piece blue_piece " + (this.isIndexContained(this.state.blue.piece, 1) ? " " : " stocked")} id="blue1" onClick={() => { this.togglePieceClass("blue", 1) }}>1</p>
          <p className={"piece blue_piece " + (this.isIndexContained(this.state.blue.piece, 2) ? " " : " stocked")} id="blue2" onClick={() => { this.togglePieceClass("blue", 2) }}>2</p>
          <p className={"piece blue_piece " + (this.isIndexContained(this.state.blue.piece, 3) ? " " : " stocked")} id="blue3" onClick={() => { this.togglePieceClass("blue", 3) }}>3</p>
          <p className={"piece blue_piece " + (this.isIndexContained(this.state.blue.piece, 4) ? " " : " stocked")} id="blue4" onClick={() => { this.togglePieceClass("blue", 4) }}>4</p>
        </div>
      </div>
    );
  }
}

const target = document.querySelector('#app');
ReactDOM.render(<App />, target);
