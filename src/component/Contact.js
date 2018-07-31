import React, { Component } from "react";
import ContactInfo from "./ContactInfo";
import ContactDetails from "./ContactDetails";
import update from "react-addons-update"; //immutability Helper
import ContactCreate from "./ContactCreate";

export default class Contact extends Component {
  constructor(props) {
    //react-hot-loader는 컴포넌트 수정되서 리로딩 될때 state 유지시킴
    //그 부작용으로 리액트 컴포넌트가 리로딩될때 생성자 실행 안함 -> 생성자 수정 되면 새로고침 해줘야함
    super(props);
    this.state = {
      selectedKey: -1,
      keyword: "",
      contactData: [
        {
          name: "A",
          phone: "010-0000-0001"
        },
        {
          name: "B",
          phone: "010-0000-0002"
        },
        {
          name: "C",
          phone: "010-0000-0003"
        },
        {
          name: "D",
          phone: "010-0000-0004"
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
  componentWillMount() {
    //컴포넌트 렌더링 되기 전에 contactData가 저장되어 있는지 보고 되어 있다면 그거 사용
    const contactData = localStorage.contactData;
    if (contactData) {
      this.setState({
        contactData: JSON.parse(contactData)
      });
    }
  }

  componentDidUpdate(preProps, prevState) {
    if (
      JSON.stringify(prevState.contactData) !==
      JSON.stringify(this.state.contactData)
    ) {
      localStorage.contactData = JSON.stringify(this.state.contactData); //바꼈으면 loacalStorage에 저장
    }
  }
  //handleChange는 this가 뭔지 모름 그러므로 위처럼 bind 해줘야함
  handleChange(e) {
    //e : 이벤트 객체
    this.setState({
      keyword: e.target.value
    });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key
    });

    console.log(key, "is selected");
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
    const mapToComponents = data => {
      data.sort(); //오름차순 정렬하기 때문에 파라미터 생략가능
      data = data.filter(contact => {
        return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
      });
      //컴포넌트에서는 onClick 같은 이벤트 적용안됨 네이티브 돔 이런 곳에 적용됨
      return data.map((contact, i) => {
        return (
          <ContactInfo
            contact={contact}
            key={i}
            //onClick props로 전달된다. 그래서 contactinfo에서 전달 받음
            onClick={() => {
              this.handleClick(i);
            }}
          />
        );
      });
    };

    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="search"
          value={this.state.keword}
          onChange={this.handleChange}
        />
        <div>{mapToComponents(this.state.contactData)}</div>
        <ContactDetails
          isSelected={this.state.selectedKey !== -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate onCreate={this.handleCreate} />
      </div>
    );
  }
}
