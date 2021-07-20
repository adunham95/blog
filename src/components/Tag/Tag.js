
import { graphql, Link, StaticQuery } from 'gatsby'
import React from 'react'
import _ from "lodash";

function pickTextColorBasedOnBgColorSimple(bgColor, lightColor, darkColor) {
  const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186)
    ? darkColor : lightColor;
}

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
            className={`${defaultStyles} ${pickTextColorBasedOnBgColorSimple(tagData.color, 'text-white', 'text-black')}`}
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