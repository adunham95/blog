import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Container from "../layout/container.tsx";
import PostTags from "../components/PostTags/PostTags";
import config from "../../data/SiteConfig";

export default function ProjectTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const project = data.projectJson;
  console.log(project)
  if (!project.id) {
    project.id = slug;
  }

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${project.title} | ${config.siteTitle}`}</title>
        </Helmet>

        <Container>
          {(project.cover === '' || project.cover === "1.png")? <div className="bg-gradient-to-br from-indigo-400 to-indigo-700 rounded-b h-80 m-1 mt-0" />: <div><img className='rounded-b h-80 m-1 mt-0'
            src={project.cover}/></div>} 
          <h1 className="text-5xl my-2">{project.title}</h1>
          <p>{project.openSource? "Open Source": "Closed Source"}</p>
          <div className="mb-2">
            <PostTags tags={[...project.tags, ...project.stack]} />
          </div>
        </Container>
      
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
        stack
        title
      }
  }
`;
