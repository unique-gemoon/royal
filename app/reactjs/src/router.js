import React, { lazy, Suspense } from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";

import { PUBLIC_ROUTE, PRIVATE_ROUTE } from "./config/routes";
import Home from "./views/Home";

export default function Router() {

    return (
        <Suspense fallback={<>Loading...</>}>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}