import React, { useContext, useState, useEffect } from 'react'
import AuthContext from "../Context/AuthContext";
import axios from 'axios';
import { Card } from 'antd';


export default function Home() {
    const { userData } = useContext(AuthContext);
    const [data, setData] = useState();

    useEffect(() => {
        axios.get("https://ete-cube-backend-melih-erpek.vercel.app/companys").then(json => setData(json.data));
        

    }, [])

    const Last3Companys = () => {
        if (data) {
            return data.map(({ CompanyName, WebSite }, index) => {
                if (data.length - 3 <= index) {
                    return (
                        <a href={"/companypage/"+CompanyName}>
                            <div className='flex flex-col mt-5'>
                                <div className="site-card-border-less-wrapper">
                                    <Card title={CompanyName} bordered={false} >
                                        <p>{WebSite}</p>
                                    </Card>
                                </div>

                            </div>
                        </a>
                    );
                }



            }).reverse();
        }
    }
    return (
        <div>
            {
                data ? (<div className="flex justify-center text-sm w-screen sm:w-auto sm:text-lg font-bold text-zinc-200  mt-12  ">
                    <div>
                        <div >There are {data.length} companies in the system</div>
                        <div >Lastly added companies: (List of latest added companies)</div>
                        <Last3Companys />
                    </div>
                </div>) : (<><div></div></>)
            }
        </div>
    )
}
