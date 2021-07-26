import { graphql, Link } from 'gatsby';
import React from 'react'
import { Helmet } from 'react-helmet';
import config from '../../data/SiteConfig';
import SEO from '../components/SEO/SEO';
import Layout from "../layout";
import Container from "../layout/container.tsx"
import {ProjectPreview} from "../components/ProjectPreview/ProjectPreview"

const ProjectListing = ({ pageContext, data }) =>{

  function renderPaging() {
    const { currentPageNum, pageCount } = pageContext;
    const prevPage = currentPageNum - 1 === 1 ? "/blog" : `/blog/${currentPageNum - 1}/`;
    const nextPage = `/blog/${currentPageNum + 1}/`;
    const isFirstPage = currentPageNum === 1;
    const isLastPage = currentPageNum === pageCount;
    
    return (
      <div>
        {!isFirstPage && <Link className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          to={prevPage}>Previous</Link>}
        {[...Array(pageCount)].map((_val, index) => {
          const pageNum = index + 1;
          return (
            <Link
              key={`listing-page-${pageNum}`}
              to={pageNum === 1 ? "/blog" : `/blog/${pageNum}/`}
              className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
            >
              {pageNum}
            </Link>
          );
        })}
        {!isLastPage && <Link className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
          to={nextPage}>Next</Link>}
      </div>
    );
  }

  const projectEdges = data.allProjectJson.edges;
  console.log(projectEdges)

  return (
    <Layout>
      <Helmet title={config.siteTitle} />
      <SEO/>
      <Container className="pt-5">
        <h2 className="text-4xl border-b-2 border-blue-400 mb-4">Projects</h2>
        <div className="flex flex-col md:flex-row md:flex-wrap">
          {
            projectEdges.map(p => <ProjectPreview
              key={p.node.id}
              className="w-full mb-2 md:w-1/3"
              title={p.node.title}
              tags={p.node.tags}
              slug={p.node.fields.slug}
              description={p.node.description}
            />)
          }
        </div>
        <nav className="pt-1 relative z-0 flex justify-end rounded-md -space-x-px"
          aria-label="Pagination">
          {renderPaging()}
        </nav>
      </Container>
    </Layout>
  );  
}

export default ProjectListing


export const listingProjectQuery = graphql`
query ProjectListingQuery($skip: Int!, $limit: Int!) {
    allProjectJson(limit: $limit, skip: $skip) {
      edges {
        node {
          fields {
            slug
          }
          description
          cover
          title
          tags
          id
        }
      }
    }
  }
`;