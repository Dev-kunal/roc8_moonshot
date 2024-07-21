import React from "react";

export default function Navbar(props) {
  return (
    <>
      <div className="flex justify-end p-1">
        <ul className="flex gap-3 text-sm font-light">
          <li>Help</li>
          <li>Order & Returns</li>
          <li>Hi John</li>
        </ul>
      </div>
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">E-Commerce</h2>
        <div>
          <nav>
            <ul className="flex gap-3 text-sm font-semibold">
              <li>Categories</li>
              <li>Sale</li>
              <li>Clearance</li>
              <li>New Stock</li>
              <li>Trending</li>
            </ul>
          </nav>
        </div>

        <div className="flex gap-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </div>
      </div>
      <div className="bg-gray-100 flex justify-center items-center py-1">
        &lt; Get 10% off on business signup &gt;
      </div>
    </>
  );
}
