import React from "react";
import { Helmet } from "react-helmet";
import config from "../../data/SiteConfig";
import { Header } from "../components/Header/Header";
import "./index.css";

export default function MainLayout({ children }) {
  return (
    <div>
      <Helmet>
        <meta name="description"
          content={config.siteDescription} />
        <html lang="en" />
      </Helmet>
      <Header/>
      <main>
        {children}
      </main>
    </div>
  );
}
