import React, { useState } from 'react'
import { Banner } from './Banner';

const links = [
  {title: "Home", link:'/'},
  {title: "Blog", link:'/blog'},
  // {title: "Projects", link:'/project'},
]

const banner = {
  show: false,
  text: "We announced a brand new product!", 
  cta: "Learn more", 
  link: "#",
}

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <>
      {
        banner.show && <Banner {...banner}/>
      }
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              {/* <!-- Mobile menu button--> */}
              <button type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                onClick={()=>setNavOpen(!navOpen)}
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {/* <!--
              Icon when menu is closed.
  
              Heroicon name: outline/menu
  
              Menu open: "hidden", Menu closed: "block"
            --> */}
                <svg className={`${navOpen?"hidden":"block"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* <!--
              Icon when menu is open.
  
              Heroicon name: outline/x
  
              Menu open: "block", Menu closed: "hidden"
            --> */}
                <svg className={`${navOpen?"block":"hidden"} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex-shrink-0 flex items-center text-white">
            Adrian Dunham
              </div>
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4" />
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6 absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {
                links.map(l =>
                  <a href={l.link}
                    key={`${l.title}-desktop`}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">{l.title}</a>,
                )
              }
            </div>
          </div>
        </div>
  
        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div className={`sm:hidden ${navOpen? "block": 'hidden'}`}
          id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {
              links.map(l =>
                <a href={l.link}
                  key={`${l.title}-mobile`}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">{l.title}</a>,
              )
            }
            
          </div>
        </div>
      </nav>
    </>
  )}
