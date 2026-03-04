import { NextResponse } from "next/server";
import { createCinephileCheckoutSession } from "@/lib/stripe";

export async function POST() {
  const session = await createCinephileCheckoutSession();

  if (!session?.url) {
    return NextResponse.json(
      {
        error: "Stripe is not configured. Add STRIPE_SECRET_KEY to enable checkout."
      },
      { status: 503 }
    );
  }

  return NextResponse.json({ url: session.url });
}