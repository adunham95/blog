import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

function Landing({ data }) {
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <div className="landing-container">
        <div className="posts-container">
          <Helmet title={`Blog | ${config.siteTitle}`} />
          <SEO />
          <PostListing postEdges={postEdges} />
        </div>
      </div>
    </Layout>
  );
}

export default Landing;
