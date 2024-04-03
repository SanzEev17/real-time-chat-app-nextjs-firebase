import React from "react";
export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="h-dvh px-6 lg:px-36 py-10 w-full flex justify-center items-center ">
      {children}
    </section>
  );
}
