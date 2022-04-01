import React, { lazy, Suspense } from "react";
import { Route, Redirect, BrowserRouter, Switch } from "react-router-dom";
import LoaderPage from "./components/loaderPage";

import { PUBLIC_ROUTE, PRIVATE_ROUTE } from "./config/routes";


const routesList = [
    //Pages
    {
        exact: true,
        path: PUBLIC_ROUTE.HOME,
        component: lazy(() => import("./views/home")),
    },
]


export default function Router() {

    return (
        <Suspense fallback={<LoaderPage />}>
            <BrowserRouter>
                <Switch>
                    {routesList.map((route, index) => (
                        <Route key={index} path={route.path} exact={route.exact}>
                            <route.component />
                        </Route>
                    ))}
                    <Redirect
                        to={{
                            pathname: PUBLIC_ROUTE.HOME,
                            state: { from: "/" },
                        }}
                    />
                </Switch>
            </BrowserRouter>
        </Suspense>
    );
}