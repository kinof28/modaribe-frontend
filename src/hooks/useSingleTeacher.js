import {useQuery} from 'react-query'

async function getTeacher(id,currency)
{
    const response = await fetch(`${process.env.REACT_APP_API_KEY}api/v1/teacherSession/${id}?currency=${currency}`)
    return response.json()
}

export const useSingleTeacher = (id,currency)=>
{
    return useQuery(['get-single-teacher',id],()=>getTeacher(id,currency))
}