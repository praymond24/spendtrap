import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SpendTrap — Subscription Trap Detector",
  description: "Find every subscription, fee, and hidden charge draining your account. Free preview. Full audit $4.99 one-time.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
