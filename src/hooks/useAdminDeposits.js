import {useQuery} from 'react-query'

async function getDeposits(token)
{
    const response = await fetch(`${process.env.REACT_APP_API_KEY}api/v1/admin/wallets`,{
        headers:{
            "Authorization":token
        }
    })
    return response.json()
}

export const useAdminDeposits = (token)=>
{
    return useQuery('get-admin-deposits',()=>getDeposits(token))
}