import { Layout } from "@/components";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewProduct() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [redirect, setRedirect] = useState(false);

	const router = useRouter();

	async function createProduct(e) {
		e.preventDefault();
		const data = { title, description, price };
		await axios.post("/api/products", data);
		setRedirect(true);
	}

	if (redirect) router.push("/Products");

	return (
		<Layout>
			<form action='' onSubmit={createProduct}>
				<h1>New Product</h1>
				<label htmlFor='product name'>
					Product Name
					<input
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='product name'
						id='product name'
					/>
				</label>
				<label htmlFor='description'>
					Description
					<textarea
						name='description'
						id='description'
						cols='30'
						rows='10'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder='description'
					/>
				</label>
				<label htmlFor='price'>
					Price (in BRL)
					<input
						type='number'
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						placeholder='price'
						id='price'
					/>
				</label>
				<button type='submit' className='btn-primary'>
					Save
				</button>
			</form>
		</Layout>
	);
}