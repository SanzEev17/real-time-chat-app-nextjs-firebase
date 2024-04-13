import Header from "@/components/Header/Header";
import "../globals.css";
import UserData from "@/components/UserData";

export default function PageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserData>
      <main className="h-dvh flex flex-col">
        <Header />
        {children}
      </main>
    </UserData>
  );
}
