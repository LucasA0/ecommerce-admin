import { Layout } from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function EditProductPage() {
	const router = useRouter();
	const {
		query: { id },
	} = router;
	useEffect(() => {
		if (id) {
			axios.get(`/api/products/?id=${id}`).then((response) => console.log(response.data));
		}
		return;
	}, [id]);

	return <Layout>Edit product from here</Layout>;
}
