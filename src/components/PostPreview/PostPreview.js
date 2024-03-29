import { graphql, Link, StaticQuery } from 'gatsby'
import React from 'react'
import { Tag } from '../Tag/Tag'

function generateColor(){
  return 'from-indigo-400 to-indigo-700'
}

export const PostPreview = ({cover='', title, className='', tags=[], slug='', excerpt='' }) => (
  <div className={className}>
    {
      (cover === ""||cover==="1.jpg") ? <div className={`bg-gradient-to-br ${generateColor()} rounded h-28 m-1`} /> : <div><img src={cover}/></div>
    }  
    <h3 className='text-xl truncate'><Link to={slug}>{title}</Link></h3>
    <div className='inline-flex sm'>
      {
        tags !== null && tags.slice(0,3).map(t => <Tag key={t}
          name={t}/>)
      }
      <Tag name='hidden'/>
    </div>
    <p className="text-base py-2">{excerpt}</p>
    <div className='inline-flex justify-end w-full pr-2'>
      <Link to={slug}
        className="text-xs duration-100 border-transparent hover:border-blue-400 border-b-2">Read More</Link>
    </div>
  </div>
)
