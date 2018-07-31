import React, { Component } from "react";
import BoardInfo from "./boardInfo";
import BoardDetails from "./boardDetails";
import update from "react-addons-update"; //immutability Helper
import BoardCreate from "./boardCreate";

export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createClick: false,
      keyword: "",
      // contactData: [
      //   {
      //     name: "A",
      //     phone: "010-0000-0001"
      //   },
      //   {
      //     name: "B",
      //     phone: "010-0000-0002"
      //   },
      //   {
      //     name: "C",
      //     phone: "010-0000-0003"
      //   },
      //   {
      //     name: "D",
      //     phone: "010-0000-0004"
      //   }
      // ]
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
  //   const contactData = localStorage.contactData;
  //   if (contactData) {
  //     this.setState({
  //       contactData: JSON.parse(contactData)
  //     });
  //   }
  // }

  // componentDidUpdate(preProps, prevState) {
  //   if (
  //     JSON.stringify(prevState.contactData) !==
  //     JSON.stringify(this.state.contactData)
  //   ) {
  //     localStorage.contactData = JSON.stringify(this.state.contactData); //바꼈으면 loacalStorage에 저장
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

  handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, {
        $push: [contact]
      })
    });
  }

  handleRemove() {
    if (this.state.selectedKey < 0) {
      return;
    }
    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]] //배열의 배열로 전달해줘야함
      }),
      selectedKey: -1
    });
  }

  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: { $set: name },
          phone: { $set: phone }
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
