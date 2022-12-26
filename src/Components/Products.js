import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Table } from 'antd';


export default function Products() {
  const [data, setData] = useState();
  const history = useHistory();
  const [filterData, setFilterData] = useState("ProductName");
  const [filterText, setFilterText] = useState("");
  let result;
  const columns = [

    {
      title: 'Product Name',
      dataIndex: 'ProductName',
      key: 'ProductName',
      render: (text) => <a href={"/productpage/" + text}>{text}</a>
    },
    {
      title: 'Product Category',
      dataIndex: 'ProductCategory',
      key: 'ProductCategory',
    },
    {
      title: 'Product Amount',
      dataIndex: 'ProductAmount',
      key: 'ProductAmount',
    },
    {
      title: 'Amount Unit',
      dataIndex: 'AmountUnit',
      key: 'AmountUnit',
    },
    {
      title: 'Company Name',
      dataIndex: 'Company',
      key: 'CompanyName',
      render: (text) => <a href={"/companypage/" + text}>{text}</a>,
    },
  ];
  const goTo = async () => {

    history.push("/addproduct")

  };

  const FilteredData = () => {
    result = data;
    if (data) {


      if (filterData === "ProductName") { result = data.filter(data => data.ProductName.includes(filterText)); }
      if (filterData === "ProductCategory") { result = data.filter(data => data.ProductCategory.includes(filterText)); }
      if (filterData === "ProductAmount") { result = data.filter(data => data.ProductAmount.includes(filterText)); }
      if (filterData === "AmountUnit") { result = data.filter(data => data.AmountUnit.includes(filterText)); }
      if (filterData === "Company") { result = data.filter(data => data.Company.includes(filterText)); }
    }
    return (

      <Table dataSource={result} columns={columns} />

    );
  }

  useEffect(() => {
    axios.get("https://ete-cube-backend-melih-erpek.vercel.app/products").then(json => setData(json.data));

  }, [])

  return (
    <div>
      {
        data ? (<div className="sm:flex sm:justify-center sm:text-lg font-bold text-zinc-200  mt-12   ">

          <div >
            <div
              className=" bg-blue-500 hover:bg-blue-300 text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  cursor-pointer mx-auto  "
              onClick={() => goTo()}
            >

              Add Product
            </div>
            <div className='mb-4 text-black'>
              <div className="flex justify-center mt-8 h-8">
                <div className='font-bold my-auto'>Choose A Field For Filter:</div>
              </div>

              <div className='flex justify-center '>
                <select name="fields" id="fields" className='sm:mx-4 border-spacing-10  border-2 rounded-md' onChange={e => setFilterData(e.target.value)} >
                  <option value="ProductName">Product Name</option>
                  <option value="ProductCategory">Product Category	</option>
                  <option value="ProductAmount">Product Amount	</option>
                  <option value="AmountUnit">Amount Unit</option>
                  <option value="Company">Company Name</option>
                </select>
                <input type="text" onChange={e => setFilterText(e.target.value)} className='  border-2 rounded-md' />
              </div>

            </div>
            <div>
              <FilteredData />
            </div>

          </div>
        </div>) : (<><div></div></>)
      }
    </div>
  )
}
