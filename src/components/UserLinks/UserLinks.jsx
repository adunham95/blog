import { Link } from "gatsby";
import React from "react";
import { EmailIcon } from "../Icons/EmailIcons";
import { GithubIcon } from "../Icons/GithubIcon";
import { LinkedinIcon } from "../Icons/LinkedinIcon";
import { Rssicon } from "../Icons/RSSIcon";
import { TwitterIcon } from "../Icons/TwitterIcon";

function UserLinks({ config, labeled, rss='' }) {

  function getIcon(iconName){
    switch (iconName.toLowerCase()) {
    case "github":
      return <GithubIcon height="30px"
        width="30px"/>
    case "twitter":
      return <TwitterIcon height="30px"
        width="30px"/>
    case "email":
      return <EmailIcon height="30px"
        width="30px"/>
    case "linkedin":
      return <LinkedinIcon height="30px"
        width="30px"/>
    default:
      return <span>{iconName}</span>
    }
  }

  function getLinkElements() {
    const { userLinks } = config;


    return userLinks.map((link) => (
      <a href={link.url}
        className='p-2'
        key={link.label}>
        {getIcon(link.label)}
      </a>
    ));
  }

  const { userLinks } = config;
  if (!userLinks) {
    return null;
  }
  return <div className="flex justify-center">
    {getLinkElements()}
    {
      rss !== '' ? <Link to={rss}
        className="p-2">
        <Rssicon height="30px"/>
      </Link> : ''
    }
  </div>;

}

export default UserLinks;
