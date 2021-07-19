import React from 'react';

type ContainerProps = {
  children: React.ReactNode,
  className?: string,
  innerClassName?: string,
  background?: string,
  text?: string,
  fullWidth?: boolean,
}

export default function Container({ children, className = '',innerClassName= '', background="background", text='text-on-background', fullWidth=false }: ContainerProps) {
  if(fullWidth){
    return <div className={`px-1 bg-${background} text-${text} ${className}`}>
    <div className={`container mx-auto lg:max-w-3xl h-full ${innerClassName}`} >
      {children}
    </div>
  </div>;
  }
  return <div className={`container mx-auto lg:max-w-3xl px-1 bg-${background} text-${text} ${className}`}>{children}</div>;
}
