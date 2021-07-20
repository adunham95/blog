import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import config from "../../data/SiteConfig";

function NotFoundPage() {
  return (
    <Layout>
      <Helmet title={`404 | ${config.siteTitle}`} />
      <div className="h-96 flex justify-center items-center flex-col">
        <h1 className='cursor-not-allowed'>Page Not Found</h1>
        <h2 className="text-5xl hover:text-transparent duration-75 cursor-default">404</h2>
      </div>
    </Layout>
  );
}

export default NotFoundPage;