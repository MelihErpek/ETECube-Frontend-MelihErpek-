import React, { useState, useContext } from 'react'
import axios from 'axios';
import AuthContext from "../Context/AuthContext";

export default function ProductAdd() {
    const [productName, setProductName] = useState();
    const [productCategory, setProductCategory] = useState();
    const [productAmount, setProductAmount] = useState();
    const [amountUnit, setAmountUnit] = useState();
    const [company, setCompany] = useState();
    const [errorField, SetErrorField] = useState("");
    const [companyNameError, SetCompanyNameError] = useState("");
    const { userData, setUserData, loggedIn, setLoggedIn } = useContext(AuthContext);
    const [success, SetSuccess] = useState(false);
    const Error = (props) => {
        const message = props.ErrorType;
        return <div className="my-3">
            <div className='text-xs text-red-500 font-bold'>{message}</div>
        </div>
    }
    const Success = () => {
        if (success === true) {
            return <div className="my-2">
                <div className='text-xs text-green-500 font-bold'>You have successfully added.</div>
            </div>
        }

    }
    const submit = async (e) => {
        e.preventDefault();
        SetErrorField("");
        SetCompanyNameError("");

        try {

            const response = await axios.post("https://ete-cube-backend-melih-erpek.vercel.app/productadd", { productName, productCategory, productAmount, amountUnit, company });
            if (response.data.success) { SetSuccess(true) };
        }
        catch (error) {

            SetErrorField("");
            SetCompanyNameError("");
            console.log(error);

            if (error.response.data.ErrorType === "Field") {
                SetErrorField(error.response.data);
            }

            if (error.response.data.ErrorType === "CompanyExist") {
                SetCompanyNameError(error.response.data);
            }
        }
    };
    return (
        <div className='container flex justify-center sm:mx-48 mt-24 '>
            {
                userData.user ? (
                    <><form className="bg-zinc-200 shadow-md rounded-2xl sm:w-1/2 px-8 pt-6 pb-8 mb-4" onSubmit={submit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Product Name
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="companyName"
                                placeholder="Product Name"
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
                                placeholder="Product Category"
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
                                placeholder="Product Amount"
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
                                placeholder="Amount Unit"
                                value={amountUnit}
                                onChange={(event) => setAmountUnit(event.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                                Company
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="webSite"
                                placeholder="Company"
                                value={company}
                                onChange={(event) => setCompany(event.target.value)}
                            />
                        </div>
                        <Error ErrorType={errorField.ErrorMessage} />
                        <Error ErrorType={companyNameError.ErrorMessage} />
                        <Success />
                        <div className="flex items-center justify-between">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Add Product
                            </button>

                        </div>
                    </form></>
                ) : (<>
                    <div>
                        <div className='text-zinc-200 font-bold text-xl mr-8'>You are not logged in.</div>
                        <div className='text-zinc-200 font-bold text-xl ml-4'>Go to <a href="/login" className="text-red-400 underline decoration-2">Login</a> page.</div>
                    </div>
                </>)
            }

        </div>
    );
}
