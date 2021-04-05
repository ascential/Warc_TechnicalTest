import * as React from "react";
import { Router, Route } from "react-router";
import { Products } from "./Products";
import { Product } from "./Product";
import { EditProduct } from "./EditProduct";
import { ApiProvider } from "../api/ApiProvider";
import { createBrowserHistory } from "history";
import "antd/lib/skeleton/style/index.css";
import "antd/lib/button/style/index.css";

export const AppRoot = () => {
	return (
		<ApiProvider>
			<Router history={createBrowserHistory()}>
				<Route exact={true} path="/" component={Products} />
				<Route exact={true} path="/product/:id" component={Product} />
				<Route
					exact={true}
					path="/edit/product/:id"
					component={EditProduct}
				/>
			</Router>
		</ApiProvider>
	);
};
