import Stripe from "stripe";
import { NextResponse } from "next/server";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        // const { items } = await req.json();

        // Example: convert your items to Stripe line items
        // const line_items = items.map((item) => ({
        //   price_data: {
        //     currency: "usd",
        //     product_data: { name: item.name },
        //     unit_amount: item.price * 100, // in cents
        //   },
        //   quantity: item.quantity,
        // }));
        const line_items = [
            {
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: "Luxury Hotel Room",
                        description: "1 night stay in 5-star hotel",
                    },
                    unit_amount: 15000, // $150.00 (amount in cents)
                },
                quantity: 1,
            },
            {
                price_data: {
                    currency: "gbp",
                    product_data: {
                        name: "Airport Pickup",
                        description: "Luxury car transfer",
                    },
                    unit_amount: 5000, // $50.00
                },
                quantity: 1,
            },
        ];
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/hotels/checkout`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/hotels/checkout`,
        });
        return NextResponse.json({ url: session.url })
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
