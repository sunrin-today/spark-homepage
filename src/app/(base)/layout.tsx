"use client"
import { Header } from "@/components/ui/layout/Header"
export default function BaseLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="w-full">
        <Header />
        {children}
    </div>;
}