import React from 'react'
import { Skeleton } from '../ui/skeleton'

const AnimeCover = ({ posterSrc }) => {
  if(!posterSrc) {
    return (
      <div className='w-full h-[250px] object-cover rounded-sm' >
        <Skeleton className='w-full h-full' />
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