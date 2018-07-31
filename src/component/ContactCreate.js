import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ContactCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: ""
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
    const contact = {
      //값이 지정되고 바뀔일 없으니 const로 지정
      name: this.state.name,
      phone: this.state.phone
    };

    this.props.onCreate(contact);

    this.setState({
      name: "",
      phone: ""
    });
    this.nameInput.focus(); //포커스는 ref사용해야댐
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
        <h2>Create Contact</h2>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            ref={ref => {
              //ref는 dom 외에더 컴포넌트에도 지정 가능
              this.nameInput = ref;
            }}
          />
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}
//func 함수라는 의미
ContactCreate.propTypes = {
  onCreate: PropTypes.func
};

ContactCreate.defaultProps = {
  onCreate: () => {
    console.error("onCreate not defined");
  }
};
