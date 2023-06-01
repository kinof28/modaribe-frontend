import {useQuery} from 'react-query'

async function getLessons(id,token)
{
    const response = await fetch(`${process.env.REACT_APP_API_KEY}api/v1/teacher/lessons/${id}`,{
        headers:{
            "Authorization":token
        }
    })
    return response.json()
}

export const useTeacherLessons = (id,token)=>
{
    return useQuery(['get-teacher-allLessons',id],()=>getLessons(id,token))
}