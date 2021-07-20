import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostTags from "../components/PostTags/PostTags";
import SEO from "../components/SEO/SEO";
import Footer from "../components/Footer/Footer";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import "./post.css";

export default function ProjectTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const project = data.projectJson;
  if (!project.id) {
    project.id = slug;
  }

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${project.title} | ${config.siteTitle}`}</title>
        </Helmet>
        
        <div>
          <h1>{project.title}</h1>
          <p>{project.openSource? "Open Source": "Closed Source"}</p>
          <p>{project.description}</p>
          {/* <h1>{post.title}</h1>
          {/* eslint-disable-next-line react/no-danger */}
          {/* <div dangerouslySetInnerHTML={{ __html: postNode.html }} /> */}
          <div className="post-meta">
            <PostTags tags={project.tags} />
          </div> 
          <Footer config={config} />
        </div>
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query ProjectBySlug($slug: String!) {
    projectJson(fields: {slug: {eq: $slug}}) {
        cover
        description
        openSource
        tags
        title
      }
  }
`;
