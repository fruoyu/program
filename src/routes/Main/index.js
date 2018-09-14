import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import {
  DanaoWrapper,
  CommonHeader,
} from '../../components';
import './main.less';
import '../../assets/iconfont/iconfont.css';
import { notifyError } from '../../services/app';
import $ from 'jquery';
import {ifToken, verify, } from "../../utils/cookie";
let count = 0;
// let totalNumber = 0;
let filesTotal = [];
let ajaxArr = [];
let uploadedNumber = 0;


class Main extends Component {
  constructor() {
    super();
    this.state = {
      nameArr: ['子女信息','年龄','性别','婚姻状况', '从事行业','房产情况','车辆情况','社保','商保',
        '保险购买人','投资类型', '投资打理人','投资占比','投资时长','理财偏好','爱好活动','欣赏什么样的人'],
      uploadDialog: true,
      gotoOtherPage: false,
      fileSuccess: true,
      uploadSure: false,
      uploadFileList: [],
      totalNumber: 0,
    };
  }

  componentDidMount() {
    $('body').on('click', '.icon-shuaxin', (e) => {
      const indexOut = $(e.currentTarget).parents('.list-wrap').index();
      const indexInner = $(e.currentTarget).parents('.upload-item').index();
      const currentUploadItme = $('.list-wrap').eq(indexOut).find('.upload-item').eq(indexInner);
      const file = [filesTotal[indexOut][indexInner]];
      this.uploadFile({
        url: '/api/openApi/voiceQuality/uploadFilesIo',
        data: {},
        files: file,
        isShuaxin: true,
        filter: [],  // 后缀文件筛选
        sendBefore: (files) => {
          // 开始之前
          currentUploadItme.find('.progress-grey').css('width','100%');
          currentUploadItme.find('.icon-shuaxin').hide();
          currentUploadItme.find('.percent').show();
        },
        success: (data, index) => {
          // 某个文件传完
          currentUploadItme.find('.icon-gou1').show();
          currentUploadItme.attr('status','success');
          const successNum = $('.upload-item[status=success]').length;
          const totalNum = $('.upload-item').length;
          if (successNum == totalNum) {
            $('.upload-failed').hide();
          }
        },
        error: (err, index) => {
          currentUploadItme.attr('status','error');
          currentUploadItme.find('.progress-grey').addClass('width100');
          currentUploadItme.find('.icon-shuaxin').show();
          currentUploadItme.find('.percent').html('0%').css('left','0').hide();
        },
        progress: (file) => {
          // 某个文件的上传进度

          // file.loaded  已经上传的
          // flie.total  总量
          // file.percent  百分比
          // file.index   第多少个文件
          const per = file.percent.split('%')[0];
          currentUploadItme.find('.percent').html(per+'%');
          currentUploadItme.find('.progress-grey').css('width', (100-per) + '%');
          console.log(file.name + ":第" + file.index + '个:' + file.percent);
        },
      });
    });
  }

  changeUploadFile = (e) => {
    let files = e.currentTarget.files;
    let $wrap = $('<div class="list-wrap"></div>');
    verify((err, decoded) => {
      this.uploadFile({
        url: "/api/openApi/voiceQuality/uploadFilesIo",
        data: {
          userName: decoded.data.userName,
        },
        files,
        filter: [],
        sendBefore: (sendFiles) => {
          // 开始之前
          let str = '';
          for (let i = 0; i < sendFiles.length; i ++) {
            const item = sendFiles[i];
            const itemName = item.name.substr(0,item.name.length-4);
            const fileNameStrArr = itemName.split('-');
            const patrn = /^(?:.+-){3}([0-9]+)$/g;
            const patrnPhone = /^[1][3-9][0-9]{9}$/g;
            const regArr = patrn.exec(itemName);
            if (!patrnPhone.test(regArr[1])) {
              return;
            } else if (fileNameStrArr.indexOf('') > -1) {
              return;
            }
            // this.setState({
            //   uploadFileList: [sendFiles, ...this.state.uploadFileList],
            // });
            str += '<div class="upload-item">' +
                '<div class="file-info">' + item.name + '</div>' +
                '<div class="file-progress">' +
                '<div class="progress-color"></div>' +
                '<div class="progress-grey"><span class="percent">0%</span></div>' +
                '</div>' +
                '<div class="is-complete">' +
                '<span class="iconfont icon-gou1"></span>' +
                '<span class="iconfont icon-shuaxin"></span>' +
                '</div>' +
                '</div>';
          }
          $wrap.prepend(str);
          $('.upload-bottom').prepend($wrap);
        },
        success: (data, index, _count) => {
          // 某个文件传完
          const length = $('.list-wrap').length - _count - 1;
          $('.list-wrap').eq(length).find('.upload-item').eq(index).find('.icon-gou1').show();
          $('.list-wrap').eq(length).find('.upload-item').eq(index).attr('status', 'success');
          $('.list-wrap').eq(length).find('.upload-item').eq(index).find('.percent').html('100%');
          $('.list-wrap').eq(length).find('.upload-item').eq(index).find('.progress-grey').css('width','0%');
          if (!this.state.gotoOtherPage) {
            this.setState({
              gotoOtherPage: true,
              fileSuccess: true,
            });
          }
        },
        error: (err, index, _count) => {
          $('.upload-failed').show();
          const length = $('.list-wrap').length - _count - 1;
          $('.list-wrap').eq(length).find('.upload-item').eq(index).find('.icon-shuaxin').show();
          $('.list-wrap').eq(length).find('.upload-item').eq(index).attr('status', 'error');
          $('.list-wrap').eq(length).find('.upload-item').eq(index).find('.progress-grey').addClass('width100');
          $('.list-wrap').eq(length).find('.upload-item').eq(index).find('.percent').html('0%').hide();
          if (!this.state.gotoOtherPage) {
            this.setState({
              gotoOtherPage: true,
              fileSuccess: false,
            });
          }
        },
        progress: (file) => {
          // 某个文件的上传进度

          // file.loaded  已经上传的
          // flie.total  总量
          // file.percent  百分比
          // file.index   第多少个文件
          const length = $('.list-wrap').length - file._count - 1;
          // console.log(length, file, file._count, $('.list-wrap').eq(length))
          const per = file.percent.split('%')[0];
          $('.list-wrap').eq(length).find('.upload-item').eq(file.index).find('.percent').html(per+'%');
          $('.list-wrap').eq(length).find('.upload-item').eq(file.index).find('.progress-grey').css('width',(100-per) + '%');
          // console.log(file.name + ':第' + file.index + '个:' + file.percent);
        },
      });
    })


    // let s = setInterval(() => {
    //   let ajaxArr1 = ajaxArr.filter(function(item,index){
    //     if (item.readyState == 4) {
    //       return true;
    //     }
    //   });
    //   if (ajaxArr1.length == ajaxArr.length && ajaxArr.length != 0) {
    //     $('#upload-voice .close').trigger('click');
    //     clearInterval(s)
    //   }
    // }, 1000);
  }

  uploadFile = (option) => {
    let _count;
    if (!option.isShuaxin) {
      _count = count++;
    }
    let defau = {
      type: 'post',
      cache: false,
      url: '',
      data: {
      },
      files: [''],
      isShuaxin: option.isShuaxin,
      processData: false,
      contentType: false,
      success: () => {},
      error: () => {},
      progress: () => {},
      sendBefore: () => {},
      filter: [],  //可以接受的文件后缀
    };
    option = $.extend(true, defau, option);

    let fileP = $('#upload').attr('data-name') || "file";  //传给后端得 file对应字段
    // let fileP = this.refs || "file";  //传给后端得 file对应字段
    let files = defau.files;
    //伪数组转换为数组
    files = Array.prototype.slice.call(files);
    //排除掉格式错误的数据
    files = files.filter((ele, index, array) => {
      // const patrn = /^(?:[\u4E00-\u9FA5]+-){3}([0-9]+)$/g;
      // const patrnPhone = /^[1][3-9][0-9]{9}$/g;

      let fileName = ele.name.substr(0, ele.name.length - 4);
      let fileNameStrArr = fileName.split('-');
      if (fileNameStrArr.length != 4) {
        // alert('当前文件格式错误');
        return false;
      } else {
        if (fileNameStrArr.indexOf('') > -1) {
          // alert('当前文件格式错误');
          return false;
        }
      }
      return true;
    });
    if (files.length != defau.files.length) {
      $('#upload').val('');
      notifyError('当前上传存在文件格式错误,正确格式为大区-销售名称-客户名称-客户电话!', 'Error', 4);
    }
    if (files.length > 0) {
      $('.upload-btn .icon-shangchuan').css('font-size','55px');
      $('#upload-voice').addClass('big').find('.upload-bottom').show();
      $('.upload-num').show()
    }
    if (!defau.isShuaxin) {
      let {totalNumber} = this.state;
      totalNumber += files.length;
      this.setState({
        totalNumber
      },()=>{$('.total-num').html(totalNumber);})
      
      filesTotal.unshift(files);
    }
    //发送之前
    option.sendBefore(files);

    let index = -1;
    for (let i = 0,len = files.length; i < len; i++) {
      let fs = files[i];
      let fileName = fs.name.substr(0, fs.name.length - 4);
      let fNmae = fs.name.substr(fs.name.length - 4, 4);
      let str = '';
      if(option.filter.length > 0 && option.filter.indexOf(fNmae) !== -1){
        option.error("文件后缀不符",i);
        continue;
      }
      index++;
      fileUpload(files[index], index);
    }

    function fileUpload (file, index) {
      let fd = new FormData();
      fd.append(fileP,file);

      // 追加其他参数
      for(let i in option.data){
        fd.append(i,option.data[i]);
      }

      const ajax = $.ajax({
        url: option.url,
        type: option.type,
        data: fd,
        cache: option.cache,
        processData: option.processData,
        contentType: option.contentType,
        success: (data) => {
          option.success(data, index,_count);
          uploadedNumber++;
          $('.uploaded-number').html(uploadedNumber);
          $('#upload').val('');
        },
        error:(error) => {
          console.log(error);
          option.error(error,index,_count);
        },
        xhr: () => {
          let xhr = $.ajaxSettings.xhr();
          if(onprogress && xhr.upload) {
            xhr.upload.addEventListener("progress", onprogress, false);
            return xhr;
          }
        }
      });
      ajaxArr.push(ajax);


      function onprogress (evt) {
        let loaded = evt.loaded;     //已经上传大小情况
        let tot = evt.total;      //附件总大小
        let per = Math.floor(100*loaded/tot);  //已经上传的百分比
        if(per == 100) per = 99;
        file.loaded = loaded;
        file.total = tot;
        file.percent = per + '%';
        file.index = index;
        file._count = _count;
        option.progress(file);
      }
    }
  }

  // 渲染上传文件弹框
  renderUpload = () => {
    return (
      <div id="upload-voice" className={this.state.uploadSure ? 'big' : ''}>
        <div className="upload-top">
          <div className="title">上传语音文件</div>
          <span
            className="close iconfont icon-htmal5icon19" onClick={() => {
              $('#upload-voice').hide();
            }}
          />
        </div>
        <div className="upload-middle">
          <div className="upload-btn">
            {/* <accept="audio/wav, audio/mp3">*/}
            <input id="upload" type="file" data-name='file' multiple="multiple" accept="audio/wav, audio/mp3, audio/m4a" ref='uploadInput' hidden onChange={(e) => {
              this.changeUploadFile(e);
            }} />
            <span className="iconfont icon-shangchuan" />
            <p style={{ marginBottom: '10px' }}>上传文件</p>
            <p>支持扩展名 .wav .mp3 .m4a</p >
          </div>
          <div className="upload-num">
            <span className="total">共<span className="total-num">0</span>个文件</span>
            <span className="already">已完成<span className="uploaded-number">0</span>个</span>
          </div>
        </div>
        <div className="upload-bottom">
          <span className="upload-failed">*上传文件中断，请刷新重新上传</span>
        </div>
      </div>
    );
  }

  // 渲染上传文件成功后弹框
  renderFile = () => {
    return (
      <div className="successWrap">
        <div className="success">
          <span className="iconfont icon-htmal5icon19" onClick={() => {
            this.setState({
              gotoOtherPage: false,
            })
          }}></span>
          <div className="img">
            <img src={require('../../assets/image/yun.png')} alt=""></img>
          </div>
          {
            this.state.fileSuccess ? <div className="successTop">
              您已成功上传<span className="successNum"></span>文件，现在可以去往历史任务页面查看分析结果。
            </div> : <div className="unSuccessTop">
              您有文件未上传成功，是否终止上传
            </div>
          }
          {
            <div className={['bottom', this.state.fileSuccess ? 'b_success' : 'b_unsuccess'].join(' ')}>
              <div className={this.state.fileSuccess ? 'guanbi' : 'go-anyway'} onClick={() => {
                this.setState({
                  gotoOtherPage: false,
                })
              }}>{this.state.fileSuccess ? '关闭' : '去意已决'}</div>
              <div className={this.state.fileSuccess ? 'toHistory' : 'wait'} onClick={() => {
                if (this.state.fileSuccess) {
                  this.props.dispatch(routerRedux.push({
                    pathname: '/history',
                  }));
                } else {
                  this.setState({
                    gotoOtherPage: false,
                  })
                }
              }}>{this.state.fileSuccess ? '历史任务' : '我再等等'}</div>
            </div>
          }
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="mainShouye">
        {/* 头部信息 */}
        <CommonHeader isMain isUserPort home customer />
        <div id="info">告诉MOXI你想要挖掘的信息</div>
        {/* 启动洞察 */}
        <div
          id="start-insight"
          onClick={() => {
            $('#upload-voice').show();
          }}
        />
        <DanaoWrapper>
          <div className="circleWrap">
            {
              this.state.nameArr.map((item, index) => (
                <div className="circle" data-number={index} key={index}>
                  <span>{item}</span>
                </div>
              ))
            }
          </div>
        </DanaoWrapper>
        {/* 上传文件*/}
        {
          this.renderUpload()
        }
        {
          this.state.gotoOtherPage && this.renderFile()
        }
      </div>
    );
  }
}
export default connect(({ home }) => ({ home }))(Main);

