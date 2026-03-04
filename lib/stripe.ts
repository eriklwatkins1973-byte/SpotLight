import Stripe from "stripe";
import { env, hasRequiredEnv } from "@/lib/env";

export function getStripeClient() {
  if (!hasRequiredEnv(["STRIPE_SECRET_KEY"])) {
    return null;
  }

  return new Stripe(env.STRIPE_SECRET_KEY!, {
    apiVersion: "2025-02-24.acacia"
  });
}

export async function createCinephileCheckoutSession() {
  const stripe = getStripeClient();
  if (!stripe) {
    return null;
  }

  return stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: `${env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/?checkout=success`,
    cancel_url: `${env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/?checkout=cancelled`,
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Cinephile Subscription" },
          unit_amount: 199,
          recurring: { interval: "month" }
        },
        quantity: 1
      }
    ]
  });
}