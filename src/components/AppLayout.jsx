"use client";
import React, {Suspense} from "react";
import "../app/page.modules.scss";
import {usePathname} from "next/navigation";
import Sidebar from "@/components/sidebar/Sidebar";
import Header from "@/components/header/Header";
import "../app/page.modules.scss";

export default function AppLayout({children}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="page">
      <Sidebar />
      <main className="page__main">
        <Header />
        <Suspense  fallback={<div>Loading...</div>}>{children}</Suspense>
      </main>
    </div>
  );
}
