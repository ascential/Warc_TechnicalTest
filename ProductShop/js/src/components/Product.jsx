import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "antd";
import { ApiProviderContext } from "../api/ApiProvider";

const Product = () => {
	const { id } = useParams();
	const api = React.useContext(ApiProviderContext);
	const [product, setProduct] = React.useState(undefined);
	const [loading, setLoading] = React.useState(false);

	React.useEffect(() => {
		setLoading(true);
		api.productApi
			.getProduct(id)
			.then((res) => setProduct(res))
			.finally(() => setLoading(false));
	}, [id]);

	if (loading) {
		return <Skeleton />;
	}

	if (!product) {
		return <>Product not found!</>;
	}

	return (
		<div className="row">
			<div className="col-md-8">
				<ProductView {...product} showEditBtn={true} />
			</div>
		</div>
	);
};

const ProductView = (props) => {
	const showDescription =
		props.showDescription === undefined ? true : props.showDescription;
	const showEditBtn =
		props.showEditBtn === undefined ? false : props.showEditBtn;
	return (
		<>
			<h2>{props.title}</h2>
			<img
				className="product-image"
				src={props.imagePath}
				alt={props.title}
			/>
			<div className="price">
				<span className="price-tag">Price: </span>
				{props.price}
			</div>
			{showDescription && (
				<div className="description">{props.description}</div>
			)}
			{showEditBtn ? (
				<p>
					<Link
						className="btn btn-default"
						to={`/edit/product/${props.id}`}
					>
						Edit
					</Link>
				</p>
			) : (
				<p>
					<Link
						className="btn btn-default"
						to={`/product/${props.id}`}
					>
						View
					</Link>
				</p>
			)}
		</>
	);
};

export { Product, ProductView };
