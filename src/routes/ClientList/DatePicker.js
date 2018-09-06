import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const DataPicker = (props) => {
  const { onChangeFn } = props;
  return (
    <div className="search-calendar">
      <div className="form-group d_t_dater">
        <div className="col-sm-12">
          <div className="input-group">
            <RangePicker allowClear="true" onChange={onChangeFn} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataPicker;