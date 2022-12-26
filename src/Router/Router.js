import React from 'react'
import {
    BrowserRouter as Routers,
    Switch,
    Route
} from "react-router-dom";

import Login from "../Components/Login"
import Register from "../Components/Register"
import Home from "../Components/Home"
import CompanyAdd from "../Components/CompanyAdd"
import Companies from "../Components/Companies"
import CompanyPage from "../Components/CompanyPage"
import Products from "../Components/Products"
import ProductAdd from "../Components/ProductAdd"
import ProductPage from "../Components/ProductPage"


export default function Router() {
    return (
        <div>
            <Routers >
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/home" component={Home} />
                    <Route path="/addcompany" component={CompanyAdd} />
                    <Route path="/companies" component={Companies} />
                    <Route path="/products" component={Products} />
                    <Route path="/addproduct" component={ProductAdd} />
                    <Route path="/companypage/:companyname" component={CompanyPage} />
                    <Route path="/productpage/:productpage" component={ProductPage} />
                </Switch>
            </Routers>


        </div>
    )
}
