import React, { useEffect, useState } from "react";
import "./SuggestionComp.scss";
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { useSelector } from "react-redux";
import { getData } from "../../ApiService/apiService";
import Recommended from "./Recommended";
 

export default function SuggestionComp({ isComingSoon }) {
  const companyName = useSelector((state) => state?.company?.companyName);

  const [IsLoader, setIsLoader] = useState(0);
  const [ListOfAlerts, setListOfAlerts] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Walmart");
  const [checkedItems, setCheckedItems] = useState([]);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value);
    console.log("Selected value:", value);
  };
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(`/api/alerts/${companyName}`);
        setListOfAlerts(result?.alerts);
         setIsLoader(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#2a3a3a] py-10 px-8 h-full rounded-md overflow-hidden">
      <div className="flex flex-col overflow-hidden h-full">
        <div className="h-full overflow-auto">
          {isComingSoon === false ? (
            <>
              <div className="">
                <h3 className="mb-3 pe-4 font-medium text-2xl">
                  Customer Alerts:
                </h3>
                {IsLoader === 0 && (
                  <button
                    type="button"
                    className="bg-primary/3 rounded inline-flex px-8 py-3"
                    disabled
                  >
                    <svg
                      className="mr-3 -ml-1 size-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing…
                  </button>
                )}
                {IsLoader === 1 && (
                  <ul className="list-decimal font-medium ps-5 font-light leading-8">
                    {ListOfAlerts?.map((data, ind) => (
                      <li
                      key={ind}
                        className={`${
                          data.includes("Low Alert:") && "text-primary-light"
                        } ${
                          data.includes("High Alert:") && "text-[#f26d6d]"
                        }`}
                      >
                        {data}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="pt-8  ">
               
                <Recommended />
              
              </div>
            </>
          ) : (
            <p>Coming soon...</p>
          )}
        </div>
      </div>
    </div>
  );
}
