/* eslint "no-console": "off" */

const path = require("path");
const _ = require("lodash");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${_.kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${_.kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({ node, name: "date", value: date.toISOString() });
      }
    }
    createNodeField({ node, name: "slug", value: `/blog${slug}` });
  }
  if(node.internal.type === 'ProjectJson'){
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "title")
    ) {
      slug = `/${_.kebabCase(node.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    createNodeField({ node, name: "slug", value: `/project${slug}` });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.jsx");
  const projectPage = path.resolve("src/templates/project.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");
  const listingPage = path.resolve("./src/templates/listing.jsx");
  const projectListingPage = path.resolve("./src/templates/projectList.jsx");
  const landingPage = path.resolve("./src/templates/landing.jsx");

  // Get a full list of markdown posts
  const markdownQueryResult = await graphql(`
  {
    allMarkdownRemark(filter: {frontmatter: {draft: {ne: true}}}) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            tags
            category
            date
          }
        }
      }
    }
    allProjectJson {
      edges {
        node {
          fields {
            slug
          }
          title
          tags
          stack
        }
      }
    }
  }
  `);

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;
  const projectEdges = markdownQueryResult.data.allProjectJson.edges;

  // Sort posts
  postsEdges.sort((postA, postB) => {
    const dateA = moment(
      postA.node.frontmatter.date,
      siteConfig.dateFromFormat,
    );

    const dateB = moment(
      postB.node.frontmatter.date,
      siteConfig.dateFromFormat,
    );

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  // Sort projects
  projectEdges.sort((projectA, projectB) => {
    const dateA = moment(
      projectA.node.date,
      siteConfig.dateFromFormat,
    );
    const dateB = moment(
      projectB.node.date,
      siteConfig.dateFromFormat,
    );
    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  })

  // Paging
  const { postsPerPage } = siteConfig;
  if (postsPerPage) {
    const pageCount = Math.ceil(postsEdges.length / postsPerPage);

    [...Array(pageCount)].forEach((_val, pageNum) => {
      createPage({
        path: pageNum === 0 ? `/blog` : `/blog/${pageNum + 1}`,
        component: listingPage,
        context: {
          limit: postsPerPage,
          skip: pageNum * postsPerPage,
          pageCount,
          currentPageNum: pageNum + 1,
        },
      });
    });
  } else {
    // Load the landing page instead
    createPage({
      path: `/blog`,
      component: landingPage,
    });
  }

  // Post page creating
  postsEdges.forEach((edge, index) => {
    // Generate a list of tags
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    // Generate a list of categories
    if (edge.node.frontmatter.category) {
      categorySet.add(edge.node.frontmatter.category);
    }

    // Create post pages
    const nextID = index + 1 < postsEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postsEdges.length - 1;
    const nextEdge = postsEdges[nextID];
    const prevEdge = postsEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });
  });

  // Project Pageing
  if (postsPerPage) {
    const pageCount = Math.ceil(projectEdges.length / postsPerPage);

    [...Array(pageCount)].forEach((_val, pageNum) => {
      createPage({
        path: pageNum === 0 ? `/project` : `/project/${pageNum + 1}`,
        component: projectListingPage,
        context: {
          limit: postsPerPage,
          skip: pageNum * postsPerPage,
          pageCount,
          currentPageNum: pageNum + 1,
        },
      });
    });
  } else {
    // Load the landing page instead
    createPage({
      path: `/project`,
      component: landingPage,
    });
  }

  // Create project pages
  projectEdges.forEach((edge, index)=> {
    // Generate List of tags
    if(edge.node.tags){
      edge.node.tags.forEach((tag) => {
        tagSet.add(tag);
      });
      edge.node.stack.forEach((sItem) => {
        tagSet.add(sItem);
      });
    }

    const nextID = index + 1 < projectEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : projectEdges.length - 1;
    const nextEdge = projectEdges[nextID];
    const prevEdge = projectEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: projectPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.title,
        prevslug: prevEdge.node.fields.slug,
      },
    });

  });

  //  Create tag pages
  tagSet.forEach((tag) => {
    createPage({
      path: `/tags/${_.kebabCase(tag)}/`,
      component: tagPage,
      context: { tag },
    });
  });

  // Create category pages
  categorySet.forEach((category) => {
    createPage({
      path: `/categories/${_.kebabCase(category)}/`,
      component: categoryPage,
      context: { category },
    });
  });
};
