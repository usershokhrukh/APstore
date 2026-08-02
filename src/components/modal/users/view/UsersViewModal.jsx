import { useGetUsersById } from '@/hooks/users/GetUsersById';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import "./view.modules.scss"
import NotFound from '@/components/not-found/NotFound';

const UsersViewModal = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("user_view");
  const {data, isPending} = useGetUsersById(id);
  
  if(!data && isPending) {
    return <>Loading...</>
  }else if(data && !isPending) {
return (
    <div className=''>UsersViewModal</div>
  )
  }else {
    return <NotFound text={"Could not find the user!"} status={404}/>
  }
  
}

export default UsersViewModal