import { useSelector, useDispatch } from "react-redux";
import DynamicTable from "../components/modules/DynamicTable";
import Head from "next/head";
import Sidebar from "../components/modules/Sidebar";

export default function Home({ data }) {
  const { columns } = useSelector((state) => state.main);
  const dispatch = useDispatch();
  console.log("columns", columns);
  return (
    <div className="app">
      <Head>
        <title>Greedy-Analytics</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
      </Head>
      <div className="d-flex">
        <Sidebar />
        <DynamicTable
          apps={data?.data}
          columns={columns}
          setColumns={(data) => dispatch({ type: "SET_COLUMN", payload: data })}
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
