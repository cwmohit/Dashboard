import Router from "next/router";
import Sidebar from "../components/modules/Sidebar";

export default function Home() {
  return (
    <div className="app">
      <div className="d-flex">
        <Sidebar />
        <div className="analytics-btn-contain w-100 text-center m-auto">
            <button className="btn btn-primary" onClick={()=>Router.push("/analytics")}>Go to analytics</button>
        </div>
      </div>
    </div>
  );
}
