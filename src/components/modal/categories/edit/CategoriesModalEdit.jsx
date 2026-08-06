import {useGetOneCategory} from "@/hooks/categories/GetOneCategory";
import {useSearchParams} from "next/navigation";
import React, {useContext, useEffect, useState} from "react";
import CategoryModalLoading from "../CategoryModalLoading";
import NotFound from "@/components/not-found/NotFound";
import {useNotify} from "@/hooks/useNotify";
import {usePatchCategories} from "@/hooks/categories/PatchCategories";
import { ModalContext } from "@/context/ModalContext";

const CategoriesModalEdit = ({id}) => {
  const {data, error, isPending} = useGetOneCategory(id);
  const {data: patchData, mutate, isSuccess} = usePatchCategories();
  const {notice} = useNotify();
  const {setClose, setComp} = useContext(ModalContext)

  const [input, setInput] = useState({
    name: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    if (!data && !isPending) {
      notice(
        `Could not find the category! ${error?.message}`,
        "error",
        3000,
        false,
      );
    }
  }, [data, isPending]);

  useEffect(() => {
    if(error?.message) {
      notice("Could not resolve! Try again later!", "error", 3000, false)
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setInput({
        name: data?.name || "",
        image: data?.image || "",
        description: data?.description || "",
      });
    }
  }, [data]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target?.name]: e.target?.value,
    });
  };

  useEffect(() => {
    if(patchData && isSuccess) {
      notice("Successfully edited!", "success", 2000, false)
      setClose(false);
    }
  }, [patchData])
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!input?.name || !input?.description || !input?.image) return notice("Inputs should be filled!", "error", 3000, false);
    notice("Pending...","info", "infinite", false);
    mutate([id, input])
  }

  return (
    <>
      {data ? (
        <form onSubmit={handleSubmit} className="global-modal__form">
          <input
            onChange={handleChange}
            name="name"
            placeholder="Name"
            className="global-modal__input"
            type="text"
            value={input.name}
          />
          <input
            onChange={handleChange}
            name="image"
            placeholder="Image"
            className="global-modal__input"
            type="url"
            value={input.image}
          />
          <textarea
            onChange={handleChange}
            placeholder="Description"
            className="global-modal__textarea"
            name="description"
            id=""
            value={input.description}
          ></textarea>
          <button className="global-modal__submit">Submit</button>
        </form>
      ) : !data && isPending ? (
        <CategoryModalLoading />
      ) : (
        <NotFound text="Could not find the category!" status={404} />
      )}
    </>
  );
};

export default CategoriesModalEdit;
