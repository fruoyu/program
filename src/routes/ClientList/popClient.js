import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, DatePicker, Select, notification } from 'antd';
import moment from 'moment';

import { verify } from '../../utils/cookie';


const FormItem = Form.Item;
const SelectOption = Select.Option;

class PopClientInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      customerBirthday: '',
      customerId: '',
      defDate: '',
    }
  }

  componentWillMount() {
    const rdata = {
      area: 0,
      classc: 0,
      groupc: 0,
      userName: '',
      page: -1
    }
    verify((err, decoded) => {
      if (err) return;
      const { data } = decoded;
      rdata.area = data.areaId ? data.areaId : 0;
      rdata.classc = data.classcId ? data.classcId : 0;
      rdata.groupc = data.groupcId ? data.groupcId : 0;
    });
    this.props.dispatch({
      type: 'userList/getUserList',
      payload: rdata,
    });


  }

  componentDidMount() {
    const { clientData: { edit, customerId, customerName, customerSex, customerBirthday: defDate, customerPhone, customerIdType: idType, customerIdNo, customerLevel, customerFive, customerUser, customerJob, customerMarriage, customerAdress, customerMail }, form: { setFieldsValue } } = this.props;
    this.setState({
      customerId: customerId ? customerId : '',
      defDate: defDate ? {initialValue: moment(defDate, 'YYYY-MM-DD')} : {} ,
    });
    if(edit){
      setFieldsValue({customerName, customerSex, customerPhone, customerIdType: ''+idType, customerIdNo, customerLevel, customerFive, customerUser, customerJob, customerMarriage, customerAdress, customerMail });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const isUpdate = this.state.customerId === '';
        const { customerBirthday, customerId } = this.state;
        const data = { ...values, customerBirthday };
        if(customerId !== '') data.customerId = customerId;
        this.props.dispatch({
          type: `clientList/${isUpdate ? 'addClient' : 'updateClient'}`,
          payload: data,
          cb: (res) => {
            this.handleClose();
            notification['success']({
              message: `${isUpdate ? '客户添加成功' : '客户更新成功'}`,
              description: '',
            });
            this.props.onGetClientList();
          }
        })
      }
    })
  }

  handleClose = () => {
    this.props.onCloseWin();
  }

  render (){
    const { getFieldDecorator } = this.props.form;
    const stars = ['非星','一星','三星','五星','七星','九星'];
    const five = ['认购','认识','认可','认同','认定'];
    const { userList } = this.props.userList;
    const dateInit = {
      ...this.state.defDate,
      rules: [{
      required: true, 
      message: '请选择日期' }],
    }
    return (
      <div className='clientInfoPopWindow' >
        <span className='iconfont icon-htmal5icon19 close'
          onClick = { this.handleClose }
        ></span>
        <Form
        className="formWrap"
        onSubmit={ this.handleSubmit }
        >
          <FormItem
              label="姓名"
            >
            {getFieldDecorator('customerName', {
              rules: [{
                required: true, message: '请输入姓名',
              }],
            })(
              <Input placeholder='请输入姓名' />
            )}
          </FormItem>
          <FormItem
              label="性别"
            >
            {getFieldDecorator('customerSex', {
              initialValue: '0',
              rules: [{
                required: true, message: '请选择性别',
              }],
            })(
              <Select className="sexSelect">
                <SelectOption value="0">男</SelectOption>
                <SelectOption value="1">女</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="出生日期"
            >
            {getFieldDecorator('customerBirthday', dateInit)(
            <DatePicker onChange={(val,date)=>{
              this.setState({
                customerBirthday: date
              })
            }} />
          )}
          </FormItem>
          <FormItem
              label="手机号码"
            >
            {getFieldDecorator('customerPhone', {
              rules: [{
                required: true,
                pattern: /^[1][3-9][0-9]{9}$/g,
                message: '手机号为空或错误',
              }],
            })(
              <Input placeholder='请输入手机号' />
            )}
          </FormItem>
          <FormItem
              label="证件类型"
            >
            {getFieldDecorator('customerIdType', {
              initialValue: '1',
              rules: [{
                required: true, message: '请选择证件类型',
              }],
            })(
              <Select className="sexSelect">
                <SelectOption value="1">身份证</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="证件号码"
            >
            {getFieldDecorator('customerIdNo', {
              rules: [{
                required: true, 
                message: '请输入证件号码',
              }],
            })(
              <Input placeholder='请输入证件号码' />
            )}
          </FormItem>
          <FormItem
              label="星级"
            >
            {getFieldDecorator('customerLevel', {
              initialValue: '非星',
              rules: [{
                required: true, message: '请选择星级',
              }],
            })(
              <Select className="sexSelect">
              {
                stars.map((itm, index) => {
                  return (
                    <SelectOption key={index} value={itm}>{itm}</SelectOption>
                  )
                })
              }
              </Select>
            )}
          </FormItem>
          <FormItem
              label="五认关系"
            >
            {getFieldDecorator('customerFive', {
              initialValue: '认购',
              rules: [{
                required: true, message: '请选择五认关系',
              }],
            })(
              <Select className="sexSelect">
              {
                five.map((itm, index) => {
                  return (
                    <SelectOption key={index} value={itm}>{itm}</SelectOption>
                  )
                })
              }
              </Select>
            )}
          </FormItem>
          <FormItem
              label="所属销售"
            >
            {getFieldDecorator('customerUser', {
              rules: [{
                required: true, message: '请选择所属销售',
              }],
            })(
              <Select className="sexSelect" 
              placeholder="请选择所属销售"
              >
                {
                  userList.map((itm,i)=>{
                    return (<SelectOption key={itm.userName} value={itm.userName}>{ itm.userName + ' / ' + itm.realName }</SelectOption>)
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
              label="职业"
            >
            {getFieldDecorator('customerJob', {
              initialValue: '',
              rules: [{
                message: '请输入职业',
              }],
            })(
              <Input placeholder='请输入职业' />
            )}
          </FormItem>
          <FormItem
              label="感情状况"
            >
            {getFieldDecorator('customerMarriage', {
              initialValue: '-1',
              rules: [{
                message: '请选择感情状况',
              }],
            })(
              <Select className="sexSelect">
                <SelectOption value="-1">未知</SelectOption>
                <SelectOption value="0">已婚</SelectOption>
                <SelectOption value="1">未婚</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="现居地"
            >
            {getFieldDecorator('customerAdress', {
              initialValue: '',
              rules: [{
                message: '请输入现居地',
              }],
            })(
              <Input placeholder='请输入现居地' />
            )}
          </FormItem>
          <FormItem
              label="邮箱"
            >
            {getFieldDecorator('customerMail', {
              initialValue: '',
              rules: [{
                type:'email', message: '请输入正确邮箱',
              }],
            })(
              <Input placeholder='请输入邮箱' />
            )}
          </FormItem>
          <FormItem className="buttonPart">
            <Button className="cancel" onClick={this.handleClose}>取消</Button>
            <Button type="primary" htmlType="submit" className="confirm">确认</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const PopClient = Form.create()(PopClientInfo);

export default connect(({ clientList, userList }) => ({ clientList, userList }))(PopClient);

