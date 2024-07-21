"use client";

import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import axios from "axios";
import { getPageRange } from "../utils";
import useDebounce from "../customHooks/UseDebounce";
import uniqBy from "lodash.uniqby";

const INITIAL_PAGES = [1, 2, 3, 4, 5, 6, 7];

export default function Onboarding(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [userSelectedCategories, setUserSelectedCategories] = useState([]);
  const [userSelectedCategoriesMap, setUserSelectedCategoriesMap] = useState(
    () =>
      userSelectedCategories?.reduce(function (map, obj) {
        map[obj.categoryId] = true;
        return map;
      }, {})
  );

  useEffect(() => {
    setUserSelectedCategoriesMap(
      userSelectedCategories?.reduce(function (map, obj) {
        map[obj.categoryId] = true;
        return map;
      }, {})
    );
  }, [userSelectedCategories]);

  const debouncedCategoryChange = useDebounce(userSelectedCategories, 800);

  useEffect(() => {
    async function fethcUserCategories() {
      const res = await axios.get(`/api/categories/usercategories`);
      const { success, userCategories } = res.data;
      console.log({ new: userCategories });
      if (success)
        setUserSelectedCategories(
          userCategories.map((c) => ({ ...c, isSelected: true }))
        );
    }
    fethcUserCategories();
  }, []);

  useEffect(() => {
    // update the userCategories
    async function updateUserCategories() {
      const uniqUpdates = uniqBy(debouncedCategoryChange, "categoryId");
      if (uniqUpdates.length > 0) {
        console.log("calling debounce update-->", uniqUpdates);
        const res = await axios.post(`/api/categories/usercategories`, {
          updates: uniqUpdates,
        });
      }
    }
    updateUserCategories();
  }, [debouncedCategoryChange]);

  const totalPages = Math.ceil(100 / 6);
  const visiblePageNumbers = totalPages
    ? getPageRange(totalPages, currentPage)
    : INITIAL_PAGES;

  useEffect(() => {
    async function fetchCategories() {
      const res = await axios.get(`/api/categories?currentPage=${currentPage}`);
      const { success, categories } = res.data;
      if (success) setCategories(categories);
    }
    fetchCategories();
  }, [currentPage]);

  const handleCategorySelection = (id, isChecked) => {
    console.log({ id, isChecked, userSelectedCategories });
    setUserSelectedCategories((oldState) => {
      let isCategoryAlreadyExist = oldState.find((c) => c.categoryId === id);
      if (isChecked) {
        if (isCategoryAlreadyExist)
          return uniqBy(
            oldState.map((c) =>
              c.categoryId === id
                ? { categoryId: id, isSelected: isChecked }
                : c
            ),
            "categoryId"
          );
        else
          return uniqBy(
            [...oldState, { categoryId: id, isSelected: isChecked }],
            "categoryId"
          );
      } else
        return uniqBy(
          oldState.filter((s) => s.categoryId !== id),
          "categoryId"
        );
    });
  };

  return (
    <>
      <div className="">
        <div className="border-2 border-gray-200 rounded-[1.3rem] p-8 sm:p-16  flex-col max-w-lg lg:max-w-lg mx-auto mt-8">
          <h2 className="text-2xl font-medium text-center mb-4">
            Please mark your interests!
          </h2>
          <h3 className="text-sm mb-4 text-center font-light">
            we will keep you notified.
          </h3>
          <form className="max-w-lg mx-auto">
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 text-base text-gray-90 font-semibold"
              >
                My Saved Interests
              </label>
            </div>

            {categories?.map(({ id, label }) => (
              <div key={id} className=" flex items-center mb-4">
                <input
                  type="checkbox"
                  name="check"
                  id="check"
                  className="accent-black size-[1.1rem] rounded-md"
                  value={id}
                  checked={userSelectedCategoriesMap[id] ? true : false}
                  onChange={(e) =>
                    handleCategorySelection(id, e.target.checked)
                  }
                />
                <label
                  htmlFor="check"
                  className="block text-xs ml-4 font-base text-gray-90"
                >
                  {label}
                </label>
              </div>
            ))}

            <div className="mt-8 text-center">
              <Pagination
                currentPage={currentPage}
                visiblePageNumbers={visiblePageNumbers}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                isListLoading={false}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
