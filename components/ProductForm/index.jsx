import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ProductForm({
	_id,
	title: prevTitle,
	description: prevDescription,
	price: prevPrice,
	images: prevImages,
}) {
	const [title, setTitle] = useState(prevTitle || "");
	const [description, setDescription] = useState(prevDescription || "");
	const [price, setPrice] = useState(prevPrice || "");
	const [redirect, setRedirect] = useState(false);
	const [images, setImages] = useState(prevImages || []);

	const router = useRouter();

	async function saveProduct(e) {
		e.preventDefault();
		const data = { title, description, price, images };
		if (_id) {
			// update product
			await axios.put("/api/products", { ...data, _id });
		} else {
			// create product
			await axios.post("/api/products", data);
		}

		setRedirect(true);
	}

	async function uploadImages(ev) {
		const files = ev.target?.files;
		if (files?.length > 0) {
			const data = new FormData();
			for (const file of files) {
				data.append("file", file);
			}

			const response = await axios.post("/api/upload", data);

			setImages((oldImages) => {
				return [...oldImages, ...response?.data?.links];
			});
		}
	}

	if (redirect) router.push("/Products");

	return (
		<form action='' onSubmit={saveProduct}>
			<label htmlFor='product name'>
				Nome do Produto*
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					id='product name'
				/>
			</label>
			<label>Imagens</label>
			<div className='mb-2 flex flex-wrap gap-2'>
				{!!images?.length &&
					images.map((link) => (
						<div key={link} className='h-24'>
							<img src={link} alt='' className='rounded-lg' />
						</div>
					))}
				<label
					className='w-24 h-24 text-center flex items-center justify-center flex-col text-sm gap-1
           text-gray-500 rounded-lg bg-gray-200 cursor-pointer'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
						/>
					</svg>
					<div>Upload</div>
					<input type='file' className='hidden' onChange={uploadImages} />
				</label>
				{!images?.length && <div>Produto sem imagem</div>}
			</div>
			<label htmlFor='description'>
				Descrição
				<textarea
					name='description'
					id='description'
					cols='30'
					rows='10'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</label>
			<label htmlFor='price'>
				Valor (em BRL)*
				<input
					type='number'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
					id='price'
					required
				/>
			</label>
			<button type='submit' className='btn-primary'>
				Salvar
			</button>
		</form>
	);
}
