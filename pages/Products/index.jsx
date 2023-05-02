import { Layout } from "@/components";
import Link from "next/link";

export default function Products() {
	return (
		<Layout>
			<Link href={"/Products/New"} className='btn-primary'>
				Add new product
			</Link>
		</Layout>
	);
}
