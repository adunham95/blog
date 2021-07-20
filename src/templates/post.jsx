import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Container from "../layout/container.tsx";
import PostTags from "../components/PostTags/PostTags";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";

export default function PostTemplate({ data, pageContext }) {
  const { slug } = pageContext;
  const postNode = data.markdownRemark;
  const post = postNode.frontmatter;
  if (!post.id) {
    post.id = slug;
  }

  return (
    <Layout>
      <div>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug}
          postNode={postNode}
          postSEO />
        <Container>
          {post.cover? <div className="bg-gradient-to-br from-indigo-400 to-indigo-700 rounded-b h-80 m-1 mt-0" />: "Cover Image"} 
          <h1 className="text-5xl my-2">{post.title}</h1>
          <div className="mb-2">
            <PostTags tags={post.tags} />
          </div>
          {/* // eslint-disable-next-line react/no-danger */}
          <div className='text-base break-words'
            dangerouslySetInnerHTML={{ __html: postNode.html }} />
        </Container>
        
      </div>
    </Layout>
  );
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        slug
        date
      }
    }
  }
`;
