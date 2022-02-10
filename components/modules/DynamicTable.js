import React, { useEffect, useState } from "react";
import "antd/dist/antd.css";
import { DatePicker, Checkbox, Badge, Spin } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

function DynamicTable({
  apps,
  columns,
  setColumns,
  options,
  selectedCol,
  setSelectedCol,
  defaultDateRange,
  availableColumns,
}) {
  const [data, setData] = useState([]);
  const [dateRange, setDateRange] = useState(defaultDateRange);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSettings, setIsOpenSettings] = useState(true);
  const getAppName = (id) => {
    let index = apps.findIndex((app) => app.app_id === id);
    return apps[index].app_name;
  };
  const _getTableData = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `http://go-dev.greedygame.com/v3/dummy/report?startDate=${dateRange[0]}&endDate=${dateRange[1]}`
      );
      let result = await res.json();
      // console.log(data,"hey")
      result = result?.data.map((item) => ({
        ...item,
        app_name: getAppName(item?.app_id),
        fill_rate: ((item.requests / item.responses) * 100).toFixed(2) + "%",
        date: moment(item?.date).format("DD MMM YYYY"),
      }));
      setIsLoading(false);
      setData(result);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  function disabledDate(current) {
    // Can not select days before today and today
    let start = defaultDateRange[0];
    let end = defaultDateRange[1];
    if (current < moment(start)) {
      return true;
    } else if (current > moment(end)) {
      return true;
    } else {
      return false;
    }
  }

  const setRangeFilter = (val) => {
    let start = moment(val[0]).format("YYYY-MM-DD");
    let end = moment(val[1]).format("YYYY-MM-DD");
    setDateRange([start, end]);
  };

  const onApplyFilters = () => {
    _getTableData();

    let selected = selectedCol.map((item) => {
    let index = availableColumns.findIndex((col) => col.slug === item);

      return {
        ...availableColumns[index],
      };
    });

    setColumns(selected);
  };

  useEffect(() => {
    _getTableData();
  }, []);
  return (
    <div className="container-fluid px-2">
      <div className="d-flex mt-5 justify-content-between first-layer">
        <div className="analytics-title">
          <h4 className="text-dark font-weight-bold">Analytics</h4>
          {isOpenSettings && (
            <>
              <RangePicker
                disabledDate={disabledDate}
                onChange={(val) => setRangeFilter(val)}
                defaultValue={[
                  moment("2021-01-01", "YYYY-MM-DD"),
                  moment("2021-01-31", "YYYY-MM-DD"),
                ]}
              />
              <div className="main-filters">
                <Checkbox.Group
                  style={{ width: "100%" }}
                  onChange={(val) => setSelectedCol(val)}
                  defaultValue={selectedCol}
                >
                  {options.map((item, i) => (
                    <Checkbox key={i} className="my-2" value={item.value}>
                      {item.label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </div>
              <div className="text-right">
                <button
                  onClick={() => setIsOpenSettings(false)}
                  className="btn btn-light align-self-baseline settings-btn"
                >
                  Close
                </button>
                <button
                  onClick={() => onApplyFilters()}
                  className="btn btn-primary align-self-baseline settings-btn mx-2"
                >
                  Apply
                </button>
              </div>
            </>
          )}
        </div>
        <button
          onClick={() => setIsOpenSettings(!isOpenSettings)}
          className="btn btn-light align-self-baseline settings-btn"
        >
          Settings
        </button>
      </div>
      <div className="px-4 main-table table-responsive">
        {isLoading ? (
          <div>
            <Spin />
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                {columns.map((item, index) => {
                  return (
                    <th key={index} scope="col">
                      {item?.name}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  {columns.map((col, i) => (
                    <td key={i}>{item[col.slug]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default DynamicTable;
