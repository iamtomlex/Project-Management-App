import * as React from 'react'
import Avatar from '@mui/material/Avatar'

interface Props {
  url: string
  alt:string
}

const AvatarD = ({ url ,alt}: Props) => {
  return <Avatar src={url} alt={alt} sx={{ width: '50px', height: '50px' }} />
}

export default AvatarD
