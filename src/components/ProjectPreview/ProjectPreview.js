import { Link } from 'gatsby'
import React from 'react'
import { Tag } from '../Tag/Tag'

function generateColor(){
  return 'from-indigo-400 to-indigo-700'
}

export const ProjectPreview = ({cover='', title, className='', tags=[], stack=[], slug='', description='' }) => (
  <div className={className}>
    {
      cover === "" ? <div className={`bg-gradient-to-br ${generateColor()} rounded h-28 m-1`} /> : <div className='rounded h-28 m-1'><img className='rounded'
        src={cover} /></div>

    }  
    <h3 className='text-xl truncate'><Link to={slug}>{title}</Link></h3>
    <div className='inline-flex sm'>
      {
        tags !== null && [...stack, ...tags].slice(0,3).map(t => <Tag key={t}
          name={t}/>)
      }
      <Tag name='hidden'/>
    </div>
    <p className="text-base py-2">{description}</p>
    <div className='inline-flex justify-end w-full pr-2'>
      <Link to={slug}
        className="text-xs duration-100 border-transparent hover:border-blue-400 border-b-2">Read More</Link>
    </div>
  </div>
)
