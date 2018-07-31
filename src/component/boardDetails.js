import React, { Component } from "react";
import PropTypes from "prop-types";

export default class contactDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: "",
      phone: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleChange(e) {
    let nextState = {}; //비어있는 객체 만들어서 이렇게 하면 여러개의 input태그 처리가능
    nextState[e.target.name] = e.target.value; //target.name 은 input name에 설정된 name
    this.setState(nextState);
  }

  handleEdit() {
    this.props.onEdit(this.state.name, this.state.phone);
  }
  handleToggle() {
    if (!this.state.isEdit) {
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone
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
    const edit = this.state.boardData.map((data, i) => {
      <table>
        <tr>
          <th colspan="2">
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
              <button onClick={this.handleToggle}>OK</button>
              <button>취소</button>
            </form>
          </td>
        </tr>
      </table>;
    });

    // const details = (
    //   <div>
    //     <p>{this.props.contact.name}</p>
    //     <p>{this.props.contact.phone}</p>
    //   </div>
    // );

    // const edit = (
    //   <div>
    //     <input
    //       name="name"
    //       value={this.state.name}
    //       onChange={this.handleChange}
    //     />
    //     <br />
    //     <input
    //       name="phone"
    //       value={this.state.phone}
    //       onChange={this.handleChange}
    //     />
    //   </div>
    // );
    //  const view = this.state.isEdit ? edit : details;

    const blank = <div>Not Selected</div>;
    return (
      <div>
        <h2>Details</h2>
        {/* {this.props.isSelected ? view : blank} */}
        <button onClick={this.handleToggle}>
          {this.state.isEdit ? "OK" : "Edit"}
        </button>
        <button onClick={this.props.onRemove}>Remove</button>
      </div>
    );
  }
}

//이거 안해주면 <p>{this.props.contact.name}</p> 이 부분 오류남
//첨에는 선택을 안해주니까 name이 뭔지 몰라서 오류남
contactDetails.defaultProps = {
  contact: {
    name: "",
    phone: ""
  },
  onRemove: () => {
    console.error("onRemove not defined");
  },
  onEdit: () => {
    console.error("onEdit not defined");
  }
};

contactDetails.propTypes = {
  contact: PropTypes.object,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func
};
