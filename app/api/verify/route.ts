import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ paid: false, error: "No session ID provided" });
  }

  try {
    const response = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        },
      }
    );

    const session = await response.json();

    if (session.error) {
      return NextResponse.json({ paid: false, error: session.error.message });
    }

    const paid = session.payment_status === "paid";
    return NextResponse.json({ paid });
  } catch (error) {
    return NextResponse.json({ paid: false, error: "Verification failed" });
  }
}
