import * as React from "react";
import { ProductApi } from "./productApi";

const ApiProviderContext = React.createContext(undefined);
const ApiProvider = (props) => {
	return (
		<ApiProviderContext.Provider value={{ productApi: new ProductApi() }}>
			{props.children}
		</ApiProviderContext.Provider>
	);
};
export { ApiProviderContext, ApiProvider };
