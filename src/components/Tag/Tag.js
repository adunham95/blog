
import { graphql, Link, StaticQuery } from 'gatsby'
import React from 'react'
import _ from "lodash";

export const Tag = ({name, className, to='#'}) => (
  <StaticQuery
    query={graphql`
      query TagQuery {
          allTagsJson {
            nodes {
              color
              name
            }
          }
        }
        `}
    render={data => {
      const info = data.allTagsJson.nodes.filter(d => d.name.toLowerCase()===name.toLowerCase());
      const defaultStyles = "text-xs pt-0.5 px-1 pb-1 mr-1 rounded"
  
      if(name==='hidden'){
        return(
          <span className={`${defaultStyles} bg-transparent text-transparent`}>{name}</span>
        )
      }
      if(info.length > 0){
        const tagData = info[0];
        return(
          <Link to={`/tags/${_.kebabCase(name)}`}
            className={`${defaultStyles} text-white bg-black`}
            style={{backgroundColor:tagData.color}}>{name}</Link>
        )
      }
          
      return(
        <Link to={`/tags/${_.kebabCase(name)}`}
          className={`${defaultStyles} text-white bg-black`}>{name}</Link>
      )
  
    }}
  />
)