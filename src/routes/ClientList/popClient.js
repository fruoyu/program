import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';


const FormItem = Form.Item;

class PopClientInfo extends Component {

  render (){
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='clientInfoPopWindow'>
        <Form
        className="formWrap"
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
              rules: [{
                required: true, message: '请输入性别',
              }],
            })(
              <Input placeholder='请输入性别' />
            )}
          </FormItem>
          <FormItem
              label="出生日期"
            >
            {getFieldDecorator('customerBirthday', {
              rules: [{
                required: true, message: '请输入性别',
              }],
            })(
              <Input placeholder='请输入性别' />
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
              rules: [{
                required: true, message: '请输入性别',
              }],
            })(
              <Input placeholder='请输入性别' />
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
              rules: [{
                required: true, message: '请输入星级',
              }],
            })(
              <Input placeholder='请输入星级' />
            )}
          </FormItem>
          <FormItem
              label="五认关系"
            >
            {getFieldDecorator('customerFive', {
              rules: [{
                required: true, message: '请选择五认关系',
              }],
            })(
              <Input placeholder='请选择五认关系' />
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
              <Input placeholder='请选择所属销售' />
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
              rules: [{
                required: true, message: '请选择感情状况',
              }],
            })(
              <Input placeholder='请选择感情状况' />
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
          <FormItem
              label="邮箱"
            >
            {getFieldDecorator('customerAdress', {
              rules: [{
                 message: '请输入邮箱',
              }],
            })(
              <button placeholder='请输入邮箱' />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}
const PopClient = Form.create()(PopClientInfo);

export default PopClient;

