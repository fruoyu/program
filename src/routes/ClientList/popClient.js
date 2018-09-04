import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Input, Button, DatePicker, Select } from 'antd';

import { verify } from '../../utils/cookie';


const FormItem = Form.Item;
const SelectOption = Select.Option;

class PopClientInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
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
      // rdata.userName = data.userName;
      rdata.classc = data.classcId ? data.classcId : 0;
      rdata.groupc = data.groupcId ? data.groupcId : 0;
    });
    this.props.dispatch({
      type: 'userList/getUserList',
      payload: rdata,
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    })
  }

  render (){
    const { getFieldDecorator } = this.props.form;
    const stars = ['非星','一星','三星','五星','七星','九星'];
    const five = ['认购','认识','认可','认同','认定'];

    const { userList } = this.props.userList;
    return (
      <div className='clientInfoPopWindow' style={{display: this.props.popClientShow ? 'block' : 'none'}} >
        <span className='iconfont icon-htmal5icon19 close'
          onClick = { this.props.onCloseWin }
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
              initialValue: 'male',
              rules: [{
                required: true, message: '请选择性别',
              }],
            })(
              <Select className="sexSelect">
                <SelectOption value="male">男</SelectOption>
                <SelectOption value="female">女</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="出生日期"
            >
            {getFieldDecorator('customerBirthday', {
              rules: [{ type: 'object', 
              required: true, 
              message: '请选择日期' }],
            })(
            <DatePicker />
          )}
          </FormItem>
          <FormItem
              label="手机号码"
            >
            {getFieldDecorator('customerPhone', {
              rules: [{
                required: true, message: '请输入性别',
              }],
            })(
              <Input placeholder='请输入性别' />
            )}
          </FormItem>
          <FormItem
              label="证件类型"
            >
            {getFieldDecorator('custoerIdType', {
              initialValue: '身份证',
              rules: [{
                required: true, message: '请选择证件类型',
              }],
            })(
              <Select className="sexSelect">
                <SelectOption value="身份证">身份证</SelectOption>
                <SelectOption value="居住证">居住证</SelectOption>
                <SelectOption value="军人证">军人证</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="证件号码"
            >
            {getFieldDecorator('customerIdNo', {
              rules: [{
                required: true, message: '请输入证件号码',
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
              initialValue: '未知',
              rules: [{
                message: '请选择感情状况',
              }],
            })(
              <Select className="sexSelect">
                <SelectOption value="">未知</SelectOption>
                <SelectOption value="已婚">已婚</SelectOption>
                <SelectOption value="未婚">未婚</SelectOption>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="现居地"
            >
            {getFieldDecorator('customerAdress', {
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
              rules: [{
                type:'email', message: '请输入正确邮箱',
              }],
            })(
              <Input placeholder='请输入邮箱' />
            )}
          </FormItem>
          <FormItem className="buttonPart">
            <Button className="cancel" onClick={this.props.onCloseWin}>取消</Button>
            <Button type="primary" htmlType="submit" className="confirm">确认</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const PopClient = Form.create()(PopClientInfo);

export default connect(({ userList }) => ({ userList }))(PopClient);

