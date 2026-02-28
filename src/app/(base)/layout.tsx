"use client"
import Footer from "@/components/ui/layout/Footer";
import { Header } from "@/components/ui/layout/Header"

export default function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}