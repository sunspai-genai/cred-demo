import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyName } from "../../ReduxHouse/ReduxSlice/CompanyNameSlice";
import { getData } from "../../ApiService/apiService";

export default function GetOrganization() {
  const companyName = useSelector((state) => state?.company?.companyName);
  const [IsLoader, setIsLoader] = useState(0);

  const [ListOfCompany, setListOfCompany] = useState([]);
  const [selectedValue, setSelectedValue] = useState(companyName);
  const dispatch = useDispatch();
  const saveComp = (data) => {
    localStorage.setItem("comp", data);
  };
  const handleSelectChange = (event) => {
    const value = event.target.value;
    saveComp(value)
    setSelectedValue(value);
    value?.length > 0
      ? dispatch(setCompanyName(value))
      : dispatch(setCompanyName("null"));
    console.log("Selected value:", value);
  };

  useEffect(() => {
    let value = localStorage.getItem("comp");
    setSelectedValue(value);
    dispatch(setCompanyName(value));
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(`/api/companies`);
        setListOfCompany(result?.data);
        console.log(result);
        setIsLoader(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center">
      <h3 className="text-white m-0 pe-4 text-lg font-medium">Choose Account:</h3>
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
      <select
        defaultValue={selectedValue}
        onChange={handleSelectChange}
        className="flex-grow cursor-pointer h-13 focus:outline-0 outline-0 border-white border-1 rounded-4xl bg-white text-black px-4 pe-10"
      >
        <option value="">Select Account Name</option>
        {localStorage.getItem("comp") && (
          <optgroup label="Recent watch">
            <option selected value={localStorage.getItem("comp")}>
              {localStorage.getItem("comp")}
            </option>
          </optgroup>
        )}
        <optgroup label="List of company">
          {ListOfCompany?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </optgroup>
      </select>
      {/* <button className="btn-primary ms-4" onClick={() => saveComp()}>
        Save Company
      </button> */}
    </div>
  );
}
