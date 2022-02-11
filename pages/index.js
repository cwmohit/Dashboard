import Router from "next/router";
import Sidebar from "../components/modules/Sidebar";

export default function Home() {
  return (
    <div className="app">
      <div className="d-flex">
        <Sidebar />
        <div className="analytics-btn-contain w-100 m-auto">
          <div className="container text-left">
            <h2>Features</h2>
            <p>Reusable Analytics Table Component</p>
            <p>
              DateRange picker option option for the user to input the dates as a
              Date Picker to call the API end point to fetch data
            </p>
            <ul className="list-style-none text-justify">
              <li>
                Allow the user to enable/hide a particular column from view The
                columns for the table need to have a representation separately
                as well. This will allow the user to select/deselect a
                particular column from view
              </li>
              <li>
                Reorderable table columns
              </li>
              <li>Sortings & filters.</li>
              <li>Responsive Table.- Extra</li>
            </ul>
            <h2>Tech-stack</h2>
            <ul className="list-style-none text-justify">
              <li>React + Redux usages</li>
              <li>Table should work as per features set</li>
              <li>Extra - NextJs, DateRange(antd design)</li>
            </ul>
            <button
              className="btn btn-primary"
              onClick={() => Router.push("/analytics")}
            >
              Go to analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
