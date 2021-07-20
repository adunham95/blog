
import { graphql, Link, StaticQuery } from 'gatsby'
import React from 'react'

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
      const info = data.allTagsJson.nodes.filter(d => d.name===name);
      const defaultStyles = "text-xs pt-0.5 px-1 pb-1 mr-1 rounded"
  
      if(name==='hidden'){
        return(
          <span className={`${defaultStyles} bg-transparent text-transparent`}>{name}</span>
        )
      }
      if(info.length > 0){
        const tagData = info[0];
        return(
          <Link to={to}
            className={`${defaultStyles} text-white bg-black`}
            style={{backgroundColor:tagData.color}}>{name}</Link>
        )
      }
          
      return(
        <Link to={to}
          className={`${defaultStyles} text-white bg-black`}>{name}</Link>
      )
  
    }}
  />
)