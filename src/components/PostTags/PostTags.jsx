import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import { Tag } from "../Tag/Tag";

function PostTags({ tags }) {
  return (
    <div className="post-tag-container">
      {tags &&
        tags.map((tag) => (
          <Tag
            key={tag}
            name={tag}
          />
        ))}
    </div>
  );
}

export default PostTags;
