import React from "react";
import "./page.modules.scss";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Dashboard from "../components/dashboard/page";

const Page = () => {
  return (
    <div className="page">
      <Sidebar />
      <main className="page__main">
        <Header />
        <Dashboard />
      </main>
    </div>
  );
};

export default Page;
