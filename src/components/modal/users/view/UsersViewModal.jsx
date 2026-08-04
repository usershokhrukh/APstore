import {useGetUsersById} from "@/hooks/users/GetUsersById";
import {useSearchParams} from "next/navigation";
import React, { useEffect, useState } from "react";
import "./view.modules.scss";
import NotFound from "@/components/not-found/NotFound";
import { useNotify } from "@/hooks/useNotify";
import UsersViewLoading from "./UsersViewLoading";

const UsersViewModal = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("user_view");
  // const [data, setData] = useState(null);
  const {data, isPending, refetch} = useGetUsersById(id);
  // const {notice} = useNotify();
  // useEffect(() => {
  //   if(dataUser) {
  //     setData(dataUser)
  //     notice(null)
  //   }
  // }, [dataUser])
  // useEffect(() => {
  //   setData(null);
  //   refetch()
  // }, [])
    const avatarDefault =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4EqrNcj9a_lNfv2gnqBCgXpM8sKQ5sHWJO0fTYCffMA&s=10";

  if (!data && isPending) {
    return <UsersViewLoading/>;
  } else if (data && !isPending) {
    return (
      <div className="view-modal">
        <img className="view-modal__img" src={data?.avatar ||avatarDefault } alt="" />
        <div className="view-modal__box">
          <div className="view-modal__b-left">
            <p className="view-modal__b-thd">Id</p>
            <p className="view-modal__b-thd">Username</p>
            <p className="view-modal__b-thd">Full Name</p>
            <p className="view-modal__b-thd">Last Name</p>
            <p className="view-modal__b-thd">First Name</p>
            <p className="view-modal__b-thd">Email</p>
            <p className="view-modal__b-thd">Phone</p>
            <p className="view-modal__b-thd">Last login at</p>
            <p className="view-modal__b-thd">Status</p>
            <p className="view-modal__b-thd">Updated at</p>
            <p className="view-modal__b-thd">Created at</p>
          </div>
          <div className="view-modal__b-right">
            <p className="view-modal__b-tbd">{data?.id || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.username || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.fullName || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.lastName || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.firstName || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.email || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.phone || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.lastLoginAt || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.isActive ? 'Active' : "Inactive" || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.updatedAt || 'None'}</p>
            <p className="view-modal__b-tbd">{data?.createdAt || 'None'}</p>
          </div>
        </div>
      </div>
    );
  }
  //  else if(!data && !dataUser) {
  //   return <NotFound text={"Could not find the user!"} status={404} />;
  // }
  else{
     return <UsersViewLoading/>;
  }
};

export default UsersViewModal;
