import React from 'react'
import HTMLIcon from "../Icons/HTMLIcon"
import CSSIcon from "../Icons/CSSIcon"
import JavascriptIcon from "../Icons/JavascriptIcon"
import ReactIcon from '../Icons/ReactIcon'
import SCSSIcon from '../Icons/SCSSIcon'
import VSCodeIcon from '../Icons/VSCodeIcon'
import NodeJSIcon from '../Icons/NodeJSIcon'

export const AboutMe = () => (
  <div>
    <p>I enjoy solving technical problems. I enjoy using React. And any other tech gadgets.</p>
    <div className="flex">
      <HTMLIcon className="pt-1"/>
      <CSSIcon  className="pt-1"/>
      <JavascriptIcon className="pt-1"/>
      <ReactIcon className="pt-1"/>
      <NodeJSIcon className="pt-1"/>
      <SCSSIcon className="pt-1"/>
      <VSCodeIcon className="pt-1"/>
    </div>
  </div>
)
