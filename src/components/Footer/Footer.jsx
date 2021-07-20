import React from "react";
import { Link } from "gatsby";
import UserLinks from "../UserLinks/UserLinks";
import "./Footer.css";

function Footer({ config }) {
  const url = config.siteRss;
  const { copyright } = config;
  if (!copyright) {
    return null;
  }
  return (
    <footer className="pt-10 pb-2">
      <UserLinks config={config}
        rss={url}
        labeled />
      <div className="flex justify-center text-sm">
        <p>{copyright}</p>
      </div>
    </footer>
  );
}

export default Footer;
