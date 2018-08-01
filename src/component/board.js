import React, { Component } from "react";
import BoardInfo from "./boardInfo";
import update from "react-addons-update"; //immutability Helper
import BoardCreate from "./boardCreate";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createClick: false,
      keyword: "",
      boardData: [
        {
          idx: "1",
          writer: "kms",
          title: "good!",
          content: "good good good",
          date: "2019-07-31"
        },
        {
          idx: "2",
          writer: "kms",
          title: "good!2",
          content: "good2 good good",
          date: "2019-07-31"
        },
        {
          idx: "3",
          writer: "kms",
          title: "good!3",
          content: "good3 good good",
          date: "2019-07-31"
        },
        {
          idx: "4",
          writer: "kms",
          title: "good!4",
          content: "good4 good good",
          date: "2019-07-31"
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

  handleChange(e) {
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
    console.log("remove " + idx);

    this.setState({
      boardData: update(this.state.boardData, {
        $splice: [[idx, 1]]
      })
    });
  }

  handleEdit(idx, title, content) {
    console.log(idx);
    this.setState({
      boardData: update(this.state.boardData, {
        [idx - 1]: {
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
