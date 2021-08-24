import React from 'react'
import HTMLIcon from "../Icons/HTMLIcon"
import CSSIcon from "../Icons/CSSIcon"
import JavascriptIcon from "../Icons/JavascriptIcon"
import ReactIcon from '../Icons/ReactIcon'
import SCSSIcon from '../Icons/SCSSIcon'
import VSCodeIcon from '../Icons/VSCodeIcon'
import NodeJSIcon from '../Icons/NodeJSIcon'
import GithubIcon from '../Icons/GitHubIcon'

const iconStyles = "p-2 h-auto w-1/4 md:w-1/8"

export const AboutMe = () => (
  <div>
    <p>I enjoy solving technical problems. I enjoy using React. And any other tech gadgets.</p>
    <div className="flex flex-wrap">
      <HTMLIcon className={iconStyles}/>
      <CSSIcon  className={iconStyles}/>
      <JavascriptIcon className={iconStyles}/>
      <ReactIcon className={iconStyles}/>
      <NodeJSIcon className={iconStyles}/>
      <SCSSIcon className={iconStyles}/>
      <VSCodeIcon className={iconStyles}/>
      <GithubIcon className={iconStyles}/>
    </div>
  </div>
)
