import React from "react";
import { NavLink } from "react-router";
import { RiHome4Line } from "react-icons/ri";
import { FaRegChartBar } from "react-icons/fa";
import { GiStabbedNote } from "react-icons/gi";
import { GiProcessor } from "react-icons/gi";
import { HiDocumentReport } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { IoChatboxOutline } from "react-icons/io5";
export default function AsideMenu() {
  return (
    <nav>
      <ul className="pt-4 pr-6">
        <li>
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive ? "active nav-style" : "nav-style"
            }
          >
            <RiHome4Line className="me-3 size-5" /> Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/chat"}
            className={({ isActive }) =>
              isActive ? "active nav-style" : "nav-style"
            }
          >
            <IoChatboxOutline className="me-3 size-5" /> Chat
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/financial-analyzer"}
            className={({ isActive }) =>
              isActive ? "active nav-style" : "nav-style"
            }
          >
            <FaRegChartBar className="me-3 size-5" /> Financial Analyzer
          </NavLink>
          <ul className="pl-12">
            <li>
              <NavLink
                to={"/financial-analyzer/cma-data"}
                className={({ isActive }) =>
                  isActive
                    ? "active  flex py-3 text-white"
                    : " flex py-3 text-primary"
                }
              >
                <HiDocumentReport className="me-3 size-5" /> CMA Data
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/financial-analyzer/annual-report"}
                className={({ isActive }) =>
                  isActive
                    ? "active  flex py-3 text-white"
                    : " flex py-3 text-primary"
                }
              >
                <TbReport className="me-3 size-5" /> Annual Report
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/financial-analyzer/news-websites"}
                className={({ isActive }) =>
                  isActive
                    ? "active  flex py-3 text-white"
                    : " flex py-3 text-primary"
                }
              >
                <PiNewspaperClippingLight className="me-3 size-5" /> News
                Websites
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <NavLink
            to={"/process-note"}
            className={({ isActive }) =>
              isActive ? "active nav-style" : "nav-style"
            }
          >
            <GiProcessor className="me-3 size-5" /> Process Note
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/sanction-letter"}
            className={({ isActive }) =>
              isActive ? "active nav-style" : "nav-style"
            }
          >
            <GiStabbedNote className="me-3 size-5" /> Sanction Letter
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
