import React, { Component } from "react";
import BoardInfo from "./boardInfo";
import BoardDetails from "./boardDetails";
import update from "react-addons-update"; //immutability Helper
import BoardCreate from "./boardCreate";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      commentData: [
        {
          cIdx: "1",
          cPost: "1",
          cWriter: "kms",
          cContent: "good good good",
          cDate: "2019-07-31"
        },
        {
          cIdx: "1",
          cPost: "2",
          cWriter: "kms",
          cContent: "ggggg",
          cDate: "2019-07-31"
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
  // componentWillMount() {
  //   const boardData = localStorage.boardData;
  //   if (boardData) {
  //     this.setState({
  //       boardData: JSON.parse(boardData)
  //     });
  //   }
  // }

  // componentDidUpdate(preProps, prevState) {
  //   if (
  //     JSON.stringify(prevState.boardData) !==
  //     JSON.stringify(this.state.boardData)
  //   ) {
  //     localStorage.boardData = JSON.stringify(this.state.boardData); //바꼈으면 loacalStorage에 저장
  //   }
  // }
  //handleChange는 this가 뭔지 모름 그러므로 위처럼 bind 해줘야함
  handleChange(e) {
    //e : 이벤트 객체
    this.setState({
      keyword: e.target.value
    });
  }

  handleClick() {
    this.setState({
      createClick: !this.state.createClick
    });
  }

  handleCreate(board) {
    this.setState({
      boardData: update(this.state.boardData, {
        $push: [board]
      })
    });
  }

  handleRemove(idx) {
    this.setState({
      boardData: update(this.state.boardData, {
        $splice: [[idx, 1]] //배열의 배열로 전달해줘야함
      })
    });
  }

  handleEdit(idx, title, content) {
    this.setState({
      boardData: update(this.state.boardData, {
        [idx]: {
          title: { $set: title },
          content: { $set: content },
          date: { $set: new Date().toString() }
        }
      })
    });
  }

  render() {
    const mapToComponents = board => {
      //board.sort();
      board = board.filter(board => {
        return board.title.toLowerCase().indexOf(this.state.keyword) > -1;
      });
      return (
        <BoardInfo
          boardData={board}
          onEdit={this.handleEdit}
          onRemove={this.handleRemove}
        />
      );
    };

    return (
      <div>
        <h1>fakeBook</h1>
        <input
          name="keyword"
          placeholder="search"
          value={this.state.keword}
          onChange={this.handleChange}
        />{" "}
        <button onClick={this.handleClick}>글쓰기</button>
        {this.state.createClick && (
          <BoardCreate
            idx={this.state.boardData.length + 1}
            onCreate={this.handleCreate}
          />
        )}
        <p />
        <div>{mapToComponents(this.state.boardData)}</div>
      </div>
    );
  }
}
