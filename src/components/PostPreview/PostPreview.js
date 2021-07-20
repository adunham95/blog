import { graphql, Link, StaticQuery } from 'gatsby'
import React from 'react'

function generateColor(){
  return 'from-indigo-400 to-indigo-700'
}

const Tag = ({name}) => (
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
          <span className={`${defaultStyles} text-white bg-black`}
            style={{backgroundColor:tagData.color}}>{name}</span>
        )
      }
        
      return(
        <span className={`${defaultStyles} text-white bg-black`}>{name}</span>
      )

    }}
  />
)

export const PostPreview = ({cover='', title, className='', tags=[], slug='', story='' }) => (
  <div className={className}>
    {
      cover === "" ? <div className={`bg-gradient-to-br ${generateColor()} rounded h-28 m-1`} /> : <div />
    }  
    <h3 className='text-xl'><Link to={slug}>{title}</Link></h3>
    <div className='inline-flex sm'>
      {
        tags !== null && tags.slice(0,3).map(t => <Tag name={t}/>)
      }
      <Tag name='hidden'/>
    </div>
    <p className="text-base py-2">This is a large set of text</p>
    <div className='inline-flex justify-end w-full pr-2'>
      <Link to={slug}
        className="text-xs duration-100 border-transparent hover:border-blue-400 border-b-2">Read More</Link>
    </div>
  </div>
)
