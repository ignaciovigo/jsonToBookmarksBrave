import  { useContext } from 'react'
import { convertContext } from '../providers/ConverterProvider'


export default function useConverter() {
    const context = useContext(convertContext)
    if(context == undefined){
        throw new Error('UseConverter must be used within a ConvertProvider')
    }
  return (
    context
  )
}