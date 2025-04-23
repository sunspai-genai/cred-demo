import React, { useEffect, useState } from "react";
import SuggestionComp from "../../Widgets/SuggestionComp/SuggestionComp";
import CmaData from "./CategoryComponents/CmaData/CmaData";
import { HiDocumentReport } from "react-icons/hi";
import { TbReport } from "react-icons/tb";
import { PiNewspaperClippingLight } from "react-icons/pi";
import { NavLink, Outlet, useLocation } from "react-router";
import "./FinancialAnalyzerPage.scss";
export default function FinancialAnalyzerPage() {
  const [chooseBtn, setChooseBtn] = useState(1);
  const location = useLocation();
  const paths = ["cma-data", "annual-report", "news-websites"];
  const isActive = paths.some((path) => location.pathname.includes(path));
  return (
    <section className="flex h-full overflow-hidden">
      <div className="w-full pe-4">
       
        <div className="h-full overflow-y-auto   px-4 bg-black/5">
          {isActive === false ? (
            <div className="btn-wrapper">
              <ul className="flex flex-wrap -mx-4 ">
                <li className="w-4/12 px-4 py-3">
                  <NavLink to={"/financial-analyzer/cma-data"}>
                    <button
                      className={`btn-primary-outline w-full h-70 rounded-lg text-3xl font-light bg-primary/15 hover:bg-primary`}
                      type="button"
                      onClick={() => setChooseBtn(1)}
                    >
                      <HiDocumentReport className="size-24 mx-auto" /> <br />
                      CMA Data
                    </button>
                  </NavLink>
                </li>
                <li className="w-4/12 px-4 py-3">
                  <NavLink to={"/financial-analyzer/annual-report"}>
                    <button
                      className={`btn-primary-outline w-full h-70 rounded-lg text-3xl font-light bg-primary/15 hover:bg-primary`}
                      type="button"
                      onClick={() => setChooseBtn(2)}
                    >
                      <TbReport className="size-24 mx-auto" /> <br />
                      Annual Report
                    </button>
                  </NavLink>
                </li>
                <li className="w-4/12 px-4 py-3">
                  <NavLink to={"/financial-analyzer/news-websites"}>
                    <button
                      className={`btn-primary-outline w-full h-70 rounded-lg text-3xl font-light bg-primary/15 hover:bg-primary`}
                      type="button"
                      onClick={() => setChooseBtn(3)}
                    >
                      <PiNewspaperClippingLight className="size-24 mx-auto" />{" "}
                      <br />
                      News Websites
                    </button>
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </section>
  );
}
