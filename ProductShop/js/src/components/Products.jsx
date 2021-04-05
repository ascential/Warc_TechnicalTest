import * as React from "react";
import { ProductView } from "./Product";
import { Skeleton } from "antd";
import { ApiProviderContext } from "../api/ApiProvider";

export const Products = (props) => {
	const api = React.useContext(ApiProviderContext);
	const [products, setProducts] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		api.productApi
			.getProducts()
			.then((data) => setProducts(data))
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Skeleton />;
	}
	if (!products) {
		return <>No Products!</>;
	}
	return (
		<>
			<div className="jumbotron">
				<h1>Product Shop</h1>
				<p>The best place to buy products</p>
			</div>
			<div className="row">
				{products.map((product) => (
					<div key={product.id} className="col-md-4">
						<ProductView {...product} showDescription={false} />
					</div>
				))}
			</div>
		</>
	);
};
