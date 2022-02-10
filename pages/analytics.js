import { Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../components/modules/DynamicTable";
import Sidebar from "../components/modules/Sidebar";
import { useState } from "react";

let AvailableColumns = [
  { name: "Date", slug: "date" },
  { name: "App Name", slug: "app_name" },
  { name: "Clicks", slug: "clicks" },
  { name: "Ad Requests", slug: "requests" },
  { name: "Ad Responses", slug: "responses" },
  { name: "Impression", slug: "impressions" },
  { name: "Revenue", slug: "revenue" },
  { name: "Fill Rate", slug: "fill_rate" },
];

export default function Home({ data }) {
  const [selectedCol, setSelectedCol] = useState(["date", "app_name"]);
  const getPosition = (val) => {
    return selectedCol.includes(val) ? selectedCol.indexOf(val) + 1 : "";
  };
  const options = [
    {
      label: (
        <>
          Date <Badge count={getPosition("date")} />
        </>
      ),
      value: "date",
    },
    {
      label: (
        <>
          App <Badge count={getPosition("app_name")} />
        </>
      ),
      value: "app_name",
    },
    {
      label: (
        <>
          Clicks <Badge count={getPosition("clicks")} />
        </>
      ),
      value: "clicks",
    },
    {
      label: (
        <>
          Ad Requests <Badge count={getPosition("requests")} />
        </>
      ),
      value: "requests",
    },
    {
      label: (
        <>
          Ad Responses <Badge count={getPosition("responses")} />
        </>
      ),
      value: "responses",
    },
    {
      label: (
        <>
          Impression <Badge count={getPosition("impressions")} />
        </>
      ),
      value: "impressions",
    },
    {
      label: (
        <>
          Revenue <Badge count={getPosition("revenue")} />
        </>
      ),
      value: "revenue",
    },
    {
      label: (
        <>
          Fill Rate <Badge count={getPosition("fill_rate")} />
        </>
      ),
      value: "fill_rate",
    },
  ];
  const { columns } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  console.log("columns", columns);
  return (
    <div className="app">
      <div className="d-flex">
        <Sidebar />
        <DynamicTable
          apps={data?.data}
          columns={columns}
          setColumns={(data) => dispatch({ type: "SET_COLUMN", payload: data })}
          options={options}
          selectedCol={selectedCol}
          setSelectedCol={(val) => setSelectedCol(val)}
          defaultDateRange={["2021-01-01", "2021-01-31"]}
          availableColumns={AvailableColumns}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://go-dev.greedygame.com/v3/dummy/apps`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
