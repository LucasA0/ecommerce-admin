import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime-types";
import multiparty from "multiparty";

const bucketName = "lucasa0-nextjs-ecommerce";

export default async function handle(req, res) {
	const form = new multiparty.Form();

	const { fields, files } = await new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
			if (err) reject(err);
			resolve({ fields, files });
		});
	});

	console.log("length:", files.file.length);
	const client = new S3Client({
		region: "sa-east-1",
		credentials: {
			accessKeyId: process.env.S3_ACCESS_KEY,
			secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		},
	});

	const links = [];
	for (const file of files.file) {
		const extension = file.originalFilename.split(".").pop();
		const newFilename = `${Date.now()}.${extension}`;
		await client.send(
			new PutObjectCommand({
				Bucket: bucketName,
				Key: newFilename,
				Body: fs.readFileSync(file.path),
				ACL: "public-read",
				ContentType: mime.lookup(file.path),
			}),
		);
		const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
		links.push(link);
	}

	return res.json({ links });
}

export const config = {
	api: { bodyParser: false },
};
