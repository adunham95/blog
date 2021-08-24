import React from "react";
import { Helmet } from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Container from "../layout/container.tsx"
import config from "../../data/SiteConfig";
import { PostPreview } from "../components/PostPreview/PostPreview";
import { ProjectPreview } from "../components/ProjectPreview/ProjectPreview";

function HomePage({data}) {
  const recentPosts = data.allMarkdownRemark.nodes;
  const recentProjects = data.allProjectJson.nodes;
  console.log(recentPosts)

  return (
    <Layout>
      <Helmet title={`${config.siteTitle}`} />
      <Container
        background="transparent"
        text="white"
        className="h-screen-1/2 bg-gradient-to-br from-blue-400 to-blue-700"
        innerClassName="flex justify-center p-2 items-center"
        fullWidth
      >
        <div className="text-center">
          <h1 className="text-3xl font-headline pb-2">
            <span className="font-thin text-2xl">console.log</span>
            <br className="block md:hidden"/>
            {'( '}
            <span className="text-black">&lsquo;</span>
            {' '}
            <span>Adrian Dunham</span>
            {' '}
            <span className="text-black">&rsquo;</span>
            {' )'}
            <br className="block md:hidden"/>
          </h1>
          <h2 className="text-2xl font-headline pb-2">Web Developer</h2>
          <p className="max-w-md font-body pb-2 pt-1">I&apos;m a web developer based in Knoxville, Tennessee. I love web tech, Javascript and gadgets.</p>
        </div>
      </Container>
      <Container className="pt-4">
        <h2 className="text-2xl border-b-2 border-blue-400 mb-4">About Me</h2>
        <p>I enjoy solving technical problems. I enjoy using React. And any other tech gadgets.</p>
      </Container>
      <Container className="pt-4">
        <h2 className="text-2xl border-b-2 border-blue-400 mb-4">Recent Posts</h2>
        <div className="flex flex-col md:flex-row">
          {recentPosts.map(p => <PostPreview key={p.id}
            cover={p.frontmatter.cover}
            className="w-full mb-2 md:w-1/3"
            title={p.frontmatter.title}
            tags={p.frontmatter.tags}
            slug={p.fields.slug}
            excerpt={p.excerpt}
          />)}
        </div>
      </Container>
      <Container className="pt-4">
        <h2 className="text-2xl border-b-2 border-blue-400 mb-4">Recent Projects</h2>
        <div className="flex flex-col md:flex-row">
          {recentProjects.map(p => <ProjectPreview key={p.id}
            className="w-full mb-2 md:w-1/3"
            cover={p.cover}
            title={p.title}
            tags={p.tags}
            slug={p.fields.slug}
            description={p.description}
          />)}
        </div>
      </Container>
    </Layout>
  );
}

export default HomePage;

export const query = graphql`
query MostRecent {
  allMarkdownRemark(
    limit: 3
    sort: {fields: frontmatter___date, order: DESC}
    filter: {frontmatter: {draft: {ne: true}}}
  ) {
    nodes {
      id
      frontmatter {
        tags
        title
        category
        cover
      }
      fields {
        slug
      }
      excerpt
    }
  }
  allProjectJson(limit: 3) {
    nodes {
      id
      tags
      title
      fields {
        slug
      }
      description
    }
  }
}
`