import React, { Component } from "react";
import PropTypes from "prop-types";
import { METHODS } from "http";

export default class BoardCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idx: this.props.idx,
      writer: "",
      title: "",
      content: "",
      date: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    let nextState = {}; //비어있는 객체 만들어서 이렇게 하면 여러개의 input태그 처리가능
    nextState[e.target.name] = e.target.value; //target.name 은 input name에 설정된 name
    this.setState(nextState);
  }

  handleClick() {
    const board = {
      idx: this.props.idx,
      writer: this.state.writer,
      title: this.state.title,
      content: this.state.content,
      date: new Date().toString()
    };

    this.props.onCreate(board);

    this.setState({
      writer: "",
      title: "",
      content: ""
    });
    this.writerInput.focus(); //포커스는 ref사용해야댐
  }

  handleKeyPress(e) {
    //엔터로 클릭하게
    if (e.charCode === 13) {
      //enter == 13
      this.handleClick();
    }
  }
  render() {
    return (
      <div>
        <h2>글쓰기</h2>
        <table style={{ border: "1px solid" }}>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="writer"
                  placeholder="작성자"
                  value={this.state.writer}
                  onChange={this.handleChange}
                  ref={ref => {
                    //ref는 dom 외에더 컴포넌트에도 지정 가능
                    this.writerInput = ref;
                  }}
                />{" "}
              </td>
            </tr>
            <tr>
              <td>
                <input
                  type="text"
                  name="title"
                  placeholder="제목을 입력하세요"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <textarea
                  type="text"
                  name="content"
                  placeholder="내용을 입력하세요"
                  value={this.state.content}
                  onChange={this.handleChange}
                  onKeyPress={this.handleKeyPress}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button onClick={this.handleClick}>등록</button>
      </div>
    );
  }
}
//func 함수라는 의미
BoardCreate.propTypes = {
  onCreate: PropTypes.func
};

BoardCreate.defaultProps = {
  onCreate: () => {
    console.error("onCreate not defined");
  }
};
