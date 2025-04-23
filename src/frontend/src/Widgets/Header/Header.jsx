import React, { useState } from "react";
import Logo from "../../assets/images/logo.png";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { FiAlertTriangle } from "react-icons/fi";
import { ImOffice } from "react-icons/im";
export default function Header() {
  const [userName, setUserName] = useState("Soumen Maity");
  const companyName = useSelector((state) => state?.company?.companyName);

  return (
    <header className="flex w-full items-center">
      <div className="logo w-80 me-auto theme-gradient h-20">
        <a href="/" title="Cred360 Agentic AI">
          <img src={Logo} alt="" className="max-w-full max-h-full" />
        </a>
      </div>
      <div className="flex flex-grow h-20 border-b border-[#174c49] text-white justify-end items-center px-11 ">
        <div className="me-auto flex items-center">
          {companyName !== null && (
            <p>
              <ImOffice className="size-7 text-primary" />
            </p>
          )}
          {companyName === null ? (
            <p className="bg-primary-deep p-3 rounded flex items-center">
              <FiAlertTriangle className="inline align-middle animate-pulse animate-bounce text-secondary size-7 me-3" />
              <span className="inline leading-4  ">
                Company not selected. <br />
                <small>
                  Select company from{" "}
                  <a href="/" className="font-semibold">
                    HOME
                  </a>{" "}
                  page.
                </small>
              </span>
            </p>
          ) : (
            <h3 className="ps-3 text-2xl font-medium"> {companyName}</h3>
          )}
        </div>
        <div className="userBox flex">
          <span title={userName} className="me-1">
            <FaRegUser className="size-8 cursor-pointer text-primary" />
          </span>
          <span className="me-10 leading-4 ">
            Hello, <br /> Soumen Maity
          </span>
          <span className="" title="Logout">
            <IoMdLogOut className="size-6 cursor-pointer text-secondary" />
          </span>
        </div>
      </div>
    </header>
  );
}
