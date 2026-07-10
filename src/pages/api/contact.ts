import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Data = { ok: true } | { error: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		res.setHeader('Allow', 'POST');
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const {
		name, company, email, phone, message,
	} = (req.body ?? {}) as { name?: string; company?: string; email?: string; phone?: string; message?: string };

	if (!email || typeof email !== 'string' || !emailRegex.test(email)) {
		return res.status(400).json({ error: 'Adresă de email invalidă' });
	}

	const apiKey = process.env.SENDGRID_API_KEY;
	const to = process.env.CONTACT_TO_EMAIL;
	const from = process.env.CONTACT_FROM_EMAIL;

	if (!apiKey || !to || !from) {
		// eslint-disable-next-line no-console
		console.error('SendGrid is not configured (SENDGRID_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL)');
		return res.status(500).json({ error: 'Serviciul de email nu este configurat' });
	}

	sgMail.setApiKey(apiKey);

	const safeName = (name ?? '').toString().slice(0, 120).trim();
	const safeCompany = (company ?? '').toString().slice(0, 160).trim();
	const safePhone = (phone ?? '').toString().slice(0, 40).trim();
	const safeMessage = (message ?? '').toString().slice(0, 4000).trim();

	try {
		await sgMail.send({
			to,
			from, // must be a verified sender/domain in SendGrid
			replyTo: email,
			subject: `Solicitare demo Cordiss — ${safeCompany || safeName || email}`,
			text: `Nume: ${safeName || '-'}\nCompanie: ${safeCompany || '-'}\nEmail: ${email}\nTelefon: ${safePhone || '-'}\n\nMesaj:\n${safeMessage || '-'}`,
		});
		return res.status(200).json({ ok: true });
	} catch (err) {
		// eslint-disable-next-line no-console
		console.error('SendGrid send failed', err);
		return res.status(502).json({ error: 'Trimiterea a eșuat. Încercați din nou.' });
	}
}
