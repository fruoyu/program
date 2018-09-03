import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Select } from 'antd';


const FormItem = Form.Item;

class PopClientInfo extends Component {

  render (){
    const { getFieldDecorator } = this.props.form;
    const stars = ['非星','一星','三星','五星','七星','九星'];
    const five = ['认购','认识','认可','认同','认定'];
    return (
      <div className='clientInfoPopWindow' style={{display: this.props.popClientShow ? 'block' : 'none'}} >
        <span className='iconfont icon-htmal5icon19 close'
          onClick = { this.props.onCloseWin }
        ></span>
        <Form
        className="formWrap"
        // onSubmit={}
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
                <Option value="male">男</Option>
                <Option value="female">女</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="出生日期"
            >
            {getFieldDecorator('customerBirthday', {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
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
                <Option value="身份证">身份证</Option>
                <Option value="居住证">居住证</Option>
                <Option value="军人证">军人证</Option>
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
                stars.map((itm) => {
                  return (
                    <Option value={itm}>{itm}</Option>
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
                five.map((itm) => {
                  return (
                    <Option value={itm}>{itm}</Option>
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
              initialValue: '张三',
              rules: [{
                required: true, message: '请选择所属销售',
              }],
            })(
              <Select className="sexSelect">
                <Option value="张三">张三</Option>
                <Option value="四星">四星</Option>
                <Option value="五星">五星</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="职业"
            >
            {getFieldDecorator('customerJob', {
              rules: [{
                required: true, message: '请输入职业',
              }],
            })(
              <Input placeholder='请输入职业' />
            )}
          </FormItem>
          <FormItem
              label="感情状况"
            >
            {getFieldDecorator('customerMarriage', {
              initialValue: '已婚',
              rules: [{
                required: true, message: '请选择感情状况',
              }],
            })(
              <Select className="sexSelect">
                <Option value="已婚">已婚</Option>
                <Option value="未婚">未婚</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
              label="现居地"
            >
            {getFieldDecorator('customerAdress', {
              rules: [{
                required: true, message: '请输入现居地',
              }],
            })(
              <Input placeholder='请输入现居地' />
            )}
          </FormItem>
          <FormItem
              label="邮箱"
            >
            {getFieldDecorator('customerAdress', {
              rules: [{
                 message: '请输入邮箱',
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

export default PopClient;

