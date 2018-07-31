import React, { Component } from "react";

export default class ContactInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      boardData: [],
      idx: 0,
      writer: "",
      title: "",
      content: "",
      date: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  componentDidMount() {
    this.setState({
      boardData: this.props.boardData
    });
  }

  handleChange(e) {
    let nextState = {}; //비어있는 객체 만들어서 이렇게 하면 여러개의 input태그 처리가능
    nextState[e.target.name] = e.target.value; //target.name 은 input name에 설정된 name
    this.setState(nextState);
  }

  handleEdit() {
    this.props.onEdit(this.state.idx,
      this.state.title,
      this.state.content);
  }
  handleToggle(idx) {
    if (!this.state.isEdit) {
      this.setState({
        idx: idx,
        title: this.state.title,
        content: this.state.content
      });
    } else {
      this.handleEdit();
    }
    this.setState({
      isEdit: !this.state.isEdit
    });
    // console.log(isEdit); //젤 첨에 isEdit 토글되고 true 나올 것 같지만 setState가 비동기라서 log 먼저 실행해서 false 나옴
  }

  render() {
    const boards = boardData => {
      return boardData.length > 0
        ? boardData.map((data, i) => {
            return (
              <div>
                <table style={{ border: "1px solid" }}>
                  <tbody>
                    <tr>
                      <th style={{ border: "1px solid" }}>{data.idx}</th>
                      <th style={{ border: "1px solid" }}>
                        {data.title}
                      </th>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid" }}>
                        작성자 : {data.writer}
                      </td>
                      <td style={{ border: "1px solid" }}>
                        작성일 : {data.date}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={{ border: "1px solid" }}>
                        {data.content}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="2" style={{ border: "1px solid" }}>
                        <form>
                          <button onClick={this.handleToggle(data.idx)}>수정</button>
                          <button onClick={this.props.onRemove(data.idx)}>삭제</button>
                        </form>
                      </td>
                    </tr>
                    <tr>댓글다는곳</tr>
                  </tbody>
                </table>
                <p />
              </div>
            );
          })
        : "게시글이 없습니다";
    };

    const edit = this.state.boardData.map((data, i) => {
      return (
        <table>
          <tr>
            <th style={{ border: "1px solid" }}> {data.idx} </th>
            <th>
              <input
                name="title"
                value={data.title}
                onChange={this.handleChange}
              />
            </th>
          </tr>
          <tr>
            <td>{data.writer}</td>
            <td>{data.date}</td>
          </tr>
          <tr>
            <td colspan="2">
              <textarea
                name="content"
                value={data.content}
                onChange={this.handleChange}
              />
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <form>
                <button onClick={this.handleToggle(data.idx)}>OK</button>
                <button>취소</button>
              </form>
            </td>
          </tr>
        </table>
      );
    });
    return <div>{boards(this.state.boardData)}</div>;
  }
}
