import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { Table } from 'antd';


export default function Companies() {
    const [data, setData] = useState();
    const history = useHistory();
    const [filterData, setFilterData] = useState("companyname");
    const [filterText, setFilterText] = useState("");
    let result;

    const columns = [
        {
            title: 'Company Name',
            dataIndex: 'CompanyName',
            key: 'CompanyName',
            render: (text) => <a href={"/companypage/" + text}>{text}</a>,
        },
        {
            title: 'Incorporation Country',
            dataIndex: 'IncorporationCountry',
            key: 'IncorporationCountry',
        },
        {
            title: 'Company Legal Number',
            dataIndex: 'CompanyLegalNumber',
            key: 'CompanyLegalNumber',
        },
        {
            title: 'Web Site',
            dataIndex: 'WebSite',
            key: 'WebSite',
        },
    ];
    const goTo = async () => {

        history.push("/addcompany")

    };

    useEffect(() => {
        axios.get("https://ete-cube-backend-melih-erpek.vercel.app/companys").then(json => setData(json.data));

    }, [])

    const FilteredData = () => {
        result = data;
        if (data) {


            if (filterData === "companyname") { result = data.filter(data => data.CompanyName.includes(filterText)); }
            if (filterData === "IncorporationCountry") { result = data.filter(data => data.IncorporationCountry.includes(filterText)); }
            if (filterData === "CompanyLegalNumber") { result = data.filter(data => data.CompanyLegalNumber.includes(filterText)); }
            if (filterData === "WebSite") { result = data.filter(data => data.WebSite.includes(filterText)); }
        }
        return (

            <Table dataSource={result} columns={columns} />

        );
    }
    return (
        <div>
            {
                data ? (
                    <div className="sm:flex sm:justify-center sm:text-lg font-bold text-zinc-200  mt-12   ">

                        <div>
                            <div >
                                <div
                                    className=" bg-blue-500 hover:bg-blue-300 text-center text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  cursor-pointer mx-auto  "
                                    onClick={() => goTo()}
                                >

                                    Add Company
                                </div>

                                <div className='mb-4 text-black'>
                                    <div className="flex justify-center mt-8 h-8">
                                        <div className='font-bold my-auto'>Choose A Field For Filter:</div>
                                    </div>

                                    <div className='flex justify-center '>
                                        <select name="fields" id="fields" className='sm:mx-4 border-spacing-10  border-2 rounded-md' onChange={e => setFilterData(e.target.value)} >
                                            <option value="companyname">Company Name</option>
                                            <option value="IncorporationCountry">Incorporation Country</option>
                                            <option value="CompanyLegalNumber">Company Legal Number</option>
                                            <option value="WebSite">Web Site</option>
                                        </select>
                                        <input type="text" onChange={e => setFilterText(e.target.value)} className='  border-2 rounded-md' />
                                    </div>

                                </div>
                                <div>
                                    <FilteredData />
                                </div>

                            </div>
                        </div>

                    </div>
                ) : (<><div></div></>)
            }
        </div>
    )
}
