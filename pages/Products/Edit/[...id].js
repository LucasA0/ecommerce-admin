import { Layout, ProductForm } from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditProductPage() {
	const [productInfo, setProductInfo] = useState(null);
	const router = useRouter();
	const {
		query: { id },
	} = router;
	useEffect(() => {
		if (id) {
			axios.get(`/api/products/?id=${id}`).then((response) => setProductInfo(response.data));
		}
		return;
	}, [id]);

	return (
		<Layout>
			<h1>Edit Product</h1>
			{productInfo && <ProductForm {...productInfo} />}
		</Layout>
	);
}
