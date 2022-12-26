import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";
export default function ProductPage(props) {
    const [data, setData] = useState();

    const [productName, setProductName] = useState();
    const [productCategory, setProductCategory] = useState();
    const [productAmount, setProductAmount] = useState();
    const [amountUnit, setAmountUnit] = useState();
    const [company, setCompany] = useState();
    const [success, SetSuccess] = useState(false);
    const [errorField, SetErrorField] = useState("");
    const [companyNameError, SetCompanyNameError] = useState("");
    const history = useHistory();
    const Error = (props) => {
        const message = props.ErrorType;
        return <div className="my-3">
            <div className='text-xs text-red-500 font-bold'>{message}</div>
        </div>
    }
    const Success = () => {
        if (success === true) {
            return <div className="my-2">
                <div className='text-xs text-green-500 font-bold'>You have successfully updated the information.</div>
            </div>
        }

    }
    useEffect(() => {
        let productname = props.match.params.productpage;
        axios.post("https://ete-cube-backend-melih-erpek.vercel.app/findproduct", { productname }).then(json => setData(json.data));

    }, [])
    const submit = async (e) => {
        e.preventDefault();
        SetErrorField("");
        SetCompanyNameError("");
        SetSuccess(false);
        try {
            let pProductName = props.match.params.productpage;
            const response = await axios.post("https://ete-cube-backend-melih-erpek.vercel.app/productupdate", { pProductName,productName, productCategory, productAmount, amountUnit, company });
            console.log(response)
            if (response.data.success) { SetSuccess(true) };
        }
        catch (error) {

            console.log(error)
            if (error.response.data.ErrorType === "Field") {
                SetErrorField(error.response.data);
            }
            if (error.response.data.ErrorType === "CompanyDontExist") {
                SetCompanyNameError(error.response.data);
            }
            if (error.response.data.ErrorType === "ProductExist") {
                SetCompanyNameError(error.response.data);
            }
        }
    };
    const remove = async () => {
        try {
            let productname = props.match.params.productpage;
            const response = await axios.post("https://ete-cube-backend-melih-erpek.vercel.app/productremove", { productname });
            history.push("/products")
        }
        catch (error) {

            console.log(error)

        }
    };
    return (
        <div> {
            data ? (
                <div className='container flex justify-center sm:mx-48 mt-24'>
                    <form className="bg-zinc-200 shadow-md rounded-2xl sm:w-1/2 px-8 pt-6 pb-8 mb-4" onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Product Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="companyName"
                                placeholder={data.ProductName}
                                value={productName}
                                onChange={(event) => setProductName(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Product Category
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="companyLegalNumber"
                                placeholder={data.ProductCategory}
                                value={productCategory}
                                onChange={(event) => setProductCategory(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Product Amount
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="incorporationCountry"
                                placeholder={data.ProductAmount}
                                value={productAmount}
                                onChange={(event) => setProductAmount(event.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Amount Unit
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="webSite"
                                placeholder={data.AmountUnit}
                                value={amountUnit}
                                onChange={(event) => setAmountUnit(event.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Company Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="webSite"
                                placeholder={data.Company}
                                value={company}
                                onChange={(event) => setCompany(event.target.value)}
                            />
                        </div>
                        <Error ErrorType={errorField.ErrorMessage} />
                        <Error ErrorType={companyNameError.ErrorMessage} />
                        <Success />
                        <div className="flex items-center ">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Update
                            </button>
                            <div
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-12 cursor-pointer"
                                onClick={() => remove()}
                                target="_blank"
                            >
                                Remove Product
                            </div>

                        </div>
                    </form>

                </div>
            ) : (<>
                <div>
                    <div className='text-zinc-200 font-bold text-xl mr-8'>There isn't company with that name.</div>
                </div>
            </>)
        }</div>
    )
}
