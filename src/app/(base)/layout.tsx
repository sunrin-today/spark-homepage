"use client"
import Footer from "@/components/ui/layout/Footer";
import { Header } from "@/components/ui/layout/Header"

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="w-full">
        <Header />
        {children}
        <Footer />
    </div>;
}