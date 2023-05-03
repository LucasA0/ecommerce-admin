import { Layout } from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
	const router = useRouter();
	const { id } = router.query;
	const [productInfo, setProductInfo] = useState(null);

	useEffect(() => {
		if (id) {
			axios.get(`/api/products?id=${id}`).then((response) => {
				setProductInfo(response.data);
			});
		}
	}, [id]);

	function goBack() {
		router.push("/Products");
	}

	async function deleteProduct() {
		await axios.delete(`/api/products?id=${id}`);

		goBack();
	}

	return (
		<Layout>
			<h1 className='text-center'>
				Deseja realmente apagar <b>{productInfo?.title}</b>?
			</h1>
			<div className='flex gap-2 justify-center'>
				<button onClick={deleteProduct} className='btn-red'>
					SIM
				</button>
				<button onClick={goBack} className='btn-default'>
					NÃO
				</button>
			</div>
		</Layout>
	);
}
