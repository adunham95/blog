import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Container from "../layout/container.tsx";
import config from "../../data/SiteConfig";
import { PostPreview } from "../components/PostPreview/PostPreview";

export default function TagTemplate({ pageContext, data }) {
  const { tag } = pageContext;
  const postEdges = data.allMarkdownRemark.edges;
  return (
    <Layout>
      <Helmet title={`Posts tagged as "${tag}" | ${config.siteTitle}`} /><Container className="pt-5">
        <h2 className="text-4xl border-b-2 border-blue-400 mb-4 pb-2">Posts tagged as {tag}</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap">
          {postEdges.map(p => <PostPreview key={p.id}
            className="w-full mb-2 md:w-1/3"
            title={p.node.frontmatter.title}
            tags={p.node.frontmatter.tags}
            slug={p.node.fields.slug}
            excerpt={p.node.excerpt}
          />)}
        </div>
      </Container>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            cover
            date
          }
        }
      }
    }
  }
`;
