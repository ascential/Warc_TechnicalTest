export class ProductApi {
	getProduct = (id) => {
		return fetch(`/api/product/${id}`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => data.product);
	};
	getProducts = () => {
		return fetch(`/api/product/all`)
			.then((response) => {
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => data.products);
	};
	updateProduct = (product) => {
		return fetch(`/api/product/update/${product.id}`, {
			method: "POST",
			body: JSON.stringify(product),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
		});
	};
}
