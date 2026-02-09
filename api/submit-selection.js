import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { productId, brand, productName, size, colour } = req.body || {};

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: process.env.RESEND_TO_EMAIL,
      subject: "Sneaker Selected 👟",
      html: `
        <p><strong>Gift selection confirmed</strong></p>
        <p>Product: ${brand || ""} – ${productName || ""}</p>
        <p>ID: ${productId || ""}</p>
        <p>Size: UK ${size ?? ""} · Colour: ${colour ?? ""}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
