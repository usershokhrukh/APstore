import React from "react";
import "./page.modules.scss";
import Header from "@/components/header/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import Dashboard from "./dashboard/page";


const Page = () => {
  return (
    <div className="page">
      <Header />
      <main className="page__main">
        <Sidebar />
        <Dashboard />
      </main>
    </div>
  );
};

export default Page;
