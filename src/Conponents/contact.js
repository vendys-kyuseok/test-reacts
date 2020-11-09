import React from 'react';
import Contactinfo from './contactinfo';
import ContactDetails from './contactDetails';
import ContactCreate from './contactCreate';
import update from 'react-addons-update';


export default class Contact extends React.Component {
  
    constructor(props){

      super(props);

      this.state = {

        selectedKey: -1,

        keyword: '',

        contactData:[
          {name: 'a ', phone: '010-7151-9116'},
          {name: 'c ', phone: '010-1234-5678'},
          {name: 'b ', phone: '010-1111-2222'},
          {name: 'd ', phone: '010-4321-8765'}
        ]
      }
      //console.log('a');

      this.heandleChange = this.heandleChange.bind(this);

      this.haandleclick = this.haandleclick.bind(this);
      this.handleCreate = this.handleCreate.bind(this);
      this.handleRemove = this.handleRemove.bind(this);
      this.handleEdit = this.handleEdit.bind(this);
    }
    
    componentDidMount() {
      const contactData = localStorage.contactData;

      if(contactData) {
        this.setState({
          contactData: JSON.parse(contactData)
        })
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if(JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)) {
        localStorage.contactData = JSON.stringify(this.state.contactData)
      }
    }

    // 검색 -------------->
    heandleChange(e){
      this.setState({
        keyword: e.target.value
      })
    }


    // 클릭 --------------->
    haandleclick(key){
      this.setState({
        selectedKey: key
      })
      console.log(key, 'is selected')
    }
    
    // 추가 ---------------->
    handleCreate(contact) {
      this.setState({
          contactData: update(this.state.contactData, { $push: [contact] })
      })
    }

    // 삭제 ---------------->
    handleRemove() {
      if(this.state.selectedKey < 0){
        return;
      }

      this.setState({
        contactData: update(this.state.contactData,
          { $splice: [[this.state.selectedKey, 1]] }
        ),
        //selectedKey: -1
      })
    }

    // 수정 ---------------->
    handleEdit(name, phone) {
      this.setState({
          contactData: update(this.state.contactData,
              {
                  [this.state.selectedKey]: {
                      name: { $set: name },
                      phone: { $set: phone }
                  }
              }
          )
      });
    }

    render(){
      
      const mapToComponent = (data) => {

        // 검색 -------------------->
        data.sort();
        data = data.filter(
          (contact) => {
            return contact.name.toLowerCase().toUpperCase().indexOf
              (this.state.keyword.toLowerCase().toUpperCase()) > -1;
          }
        )

      
        return data.map((contact, i) => {

          return (
            <Contactinfo 
              contact={contact} 
              key={i}
              onClick={() => this.haandleclick(i)} 
            />);
        })
      };
     



      return(
        <div>

          <h1>Contact</h1>

          {/* 검색창 */}
          <input 
            name='keyword'
            placeholder='Search' 
            value={this.state.keyword}
            onChange={this.heandleChange}> 
          </input>

          {/* 출력물 */}
          <div>{mapToComponent(this.state.contactData)}</div>

          {/* 상세보기 */}
          <ContactDetails 
            isSelected={this.state.selectedKey !== -1}
            contact={this.state.contactData[this.state.selectedKey]}
            onRemove={this.handleRemove}
            onEdit={this.handleEdit}
          />

          {/* 생성 */}
          <ContactCreate 
            onCreate={this.handleCreate}
          />

        </div>
      );
    }
  }
  