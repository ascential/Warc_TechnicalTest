import * as React from "react";
import { Skeleton, Button } from "antd";
import { ApiProviderContext } from "../api/ApiProvider";
import { useHistory, useParams } from "react-router";

export const EditProduct = () => {
	const { id } = useParams();
	const api = React.useContext(ApiProviderContext);
	const history = useHistory();
	const [product, setProduct] = React.useState(undefined);
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		if (id) {
			setLoading(true);
			api.productApi
				.getProduct(id)
				.then((res) => setProduct(res))
				.finally(() => setLoading(false));
		}
	}, [id]);

	const updateProduct = (delta) => {
		setProduct({ ...product, ...delta });
	};
	const save = () => {
		setLoading(true);
		api.productApi.updateProduct(product).finally(() => {
			setLoading(false);
			history.push(`/product/${id}`);
		});
	};

	if (loading) {
		return <Skeleton />;
	}

	if (!product) {
		return null;
	}

	return (
		// Don't include field for id. Possible that this page was scaffolded.
		// <div className="row form-group">
		//     <div className="col-md-4">
		//         @Html.LabelFor(m => m.Id)
		//     </div>
		//     <div className="col-md-8">
		//         @Html.TextBoxFor(m => m.Id, new { @readonly = "readonly", @class = "form-control" })
		//     </div>
		// </div>
		<>
			<h1>Edit product</h1>
			<div className="row form-group">
				<div className="col-md-4">Title</div>
				<div className="col-md-8">
					<input
						className="form-control"
						value={product.title || ""}
						onChange={(e) =>
							updateProduct({ title: e.target.value })
						}
					/>
				</div>
			</div>
			<div className="row form-group">
				<div className="col-md-4">Description</div>
				<div className="col-md-8">
					<input
						className="form-control"
						value={product.description || ""}
						onChange={(e) =>
							updateProduct({ description: e.target.value })
						}
					/>
				</div>
			</div>
			<div className="row form-group">
				<div className="col-md-4">Image Path</div>
				<div className="col-md-8">
					<input
						className="form-control"
						value={product.imagePath || ""}
						onChange={(e) =>
							updateProduct({ imagePath: e.target.value })
						}
					/>
				</div>
			</div>
			<div className="row form-group">
				<div className="col-md-4">Price</div>
				<div className="col-md-8">
					<input
						className="form-control"
						type="number"
						value={product.price}
						onChange={(e) =>
							updateProduct({ price: e.target.value })
						}
					/>
				</div>
			</div>

			<div className="row form-group">
				<Button type="primary" onClick={() => save()}>
					Save
				</Button>
			</div>
		</>
	);
};
