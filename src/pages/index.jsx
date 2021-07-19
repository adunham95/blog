import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../layout";
import Container from "../layout/container.tsx"
import config from "../../data/SiteConfig";

function AboutPage() {
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
            {'( '}
            <span className="text-black">&lsquo;</span>
            {' '}
            <span>Adrian Dunham</span>
            {' '}
            <span className="text-black">&rsquo;</span>
            {' )'}
          </h1>
          <h2 className="text-2xl font-headline pb-2">Web Developer</h2>
          <p className="max-w-md font-body pb-2 pt-1">I&apos;m a web developer based in Knoxville, Tennessee. I love web tech, Javascript and gadgets.</p>
        </div>
      </Container>
    </Layout>
  );
}

export default AboutPage;
