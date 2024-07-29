import React from 'react'

const AnimeCover = ({ posterSrc }) => {
  if(!posterSrc) {
    return (
      <div className='w-full h-[250px] object-cover rounded-sm' >
        <div className='skeleton-universal' />
      </div>
    )
  }
  return (
    <img
        className="w-full h-[250px] object-cover rounded-sm animated"
        src={posterSrc}
      />
  )
}

export default AnimeCover