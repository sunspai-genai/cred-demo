import React, { useEffect, useState } from "react";
import { RiInformation2Line } from "react-icons/ri";
import { getData } from "../../ApiService/apiService";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaSquareCheck } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setCompanyName } from "../../ReduxHouse/ReduxSlice/CompanyNameSlice";
import CommonLoader from "../../Utils/CommonLoader/CommonLoader";
export default function RenewalTable() {
  const companyName = useSelector((state) => state?.company?.companyName);
  const dispatch = useDispatch();
  const [SearchInput, setSearchInput] = useState("");
  const [IsLoader, setIsLoader] = useState(0);
  const [ListOfOrganization, setListOfOrganization] = useState([]);
  const [ListOfOrganizationSort, setListOfOrganizationSort] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(`/api/company_details`);
        setListOfOrganization(result?.data);
        setListOfOrganizationSort(result?.data);
        console.log(result);
        setIsLoader(1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const dueDateCalculator = (data) => {
    let day = data - 335;
    if (day > 0) {
      return day;
    } else {
      return 0;
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  const formatDate = (apiDate) => {
    // Split the date string into parts
    const [month, day, year] = apiDate.split("/"); // Create a new Date object

    const date = new Date(`20${year}`, month - 1, day); // Format the date

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const handleSelectChange = (event) => {
    let sortBy = event.target.value;

    switch (sortBy) {
      case "remove":
        setListOfOrganizationSort(ListOfOrganization); // Remove all data
      case "date":
        setListOfOrganizationSort(
          [...ListOfOrganization].sort(
            (a, b) =>
              new Date(a.date_last_sanction) - new Date(b.date_last_sanction)
          )
        );
      case "dueDays":
        setListOfOrganizationSort(
          [...ListOfOrganization].sort(
            (a, b) => b.days_since_last_sanction - a.days_since_last_sanction
          )
        );
      case "name":
        return ListOrg.sort((a, b) =>
          a.company_name.localeCompare(b.company_name)
        );
      case "lone1Amount":
        return ListOrg.sort((a, b) => a.loan1_amount - b.loan1_amount);
      case "lone2Amount":
        return ListOrg.sort((a, b) => a.loan2_amount - b.loan2_amount);
      case "60days":
        return setListOfOrganizationSort(
          [...ListOfOrganization].filter(
            (item) => item.days_since_last_sanction - 335 > 60
          )
        );
      case "30to60days":
        return setListOfOrganizationSort(
          [...ListOfOrganization].filter(
            (item) =>
              item.days_since_last_sanction - 335 >= 30 &&
              item.days_since_last_sanction - 335 <= 60
          )
        );
      case "less30days":
        return setListOfOrganizationSort(
          [...ListOfOrganization].filter(
            (item) =>
              item.days_since_last_sanction - 335 < 30 &&
              item.days_since_last_sanction - 335 > 0
          )
        );
      default:
        return setListOfOrganizationSort([...ListOfOrganization]); // No sorting
    }
  };
  const ChooseAccount = (value) => {
    // console.log(value);
    dispatch(setCompanyName(value));
  };

  return (
    <div className="">
      <div className="flex items-center  mb-3">
        <h3 className="text-white  pe-4 text-2xl font-medium">
          List of accounts({ListOfOrganizationSort?.length})
        </h3>
        <div className="ms-auto me-5 px-4">
          <input
            onChange={(e) =>
              setSearchInput(e?.target?.value.toLocaleLowerCase())
            }
            placeholder="Search account name"
            type="search"
            className="min-w-2xl max-w-full flex-grow cursor-pointer h-13 focus:outline-0 outline-0 border-primary border-1 rounded-4xl bg-primary/25 text-white px-4 pe-10"
          />
        </div>
        <div className="inline-flex items-center">
          <label className="text-white text-xl font-semibold me-4">
            Filter by:
          </label>

          <select
            className="flex-grow cursor-pointer h-13 focus:outline-0 outline-0 border-white border-1 rounded-4xl bg-white text-black px-4 pe-10"
            onChange={(e) => handleSelectChange(e)}
          >
            <option value="remove">Select filter</option>
            {/* <option value="date">Short by last sanction date</option> */}
            {/* <option value="dueDays">Short by due days</option> */}
            {/* <option value="name">Short by name</option> */}
            {/* <option value="lone1Amount">Short by Lone 1 amount</option> */}
            {/* <option value="lone2Amount">Short by Lone 2 amount</option> */}
            <option value="60days">Due by More than 60 days</option>
            <option value="30to60days">Due by 30 to 60 days</option>
            <option value="less30days">Due by Less then 30 days</option>
          </select>
        </div>
      </div>

      <div className="relative overflow-x-auto ">
        {IsLoader === 0 && (
          <CommonLoader />
        )}
        {IsLoader === 1 && (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-300 text-[1rem]">
            <thead className=" text-gray-700   bg-gray-50 dark:bg-primary dark:text-white font-sans">
              <tr>
                <th scope="col" className="px-4 py-3">
                  Sr No.
                </th>
                <th scope="col" className="px-4 py-3" title="Account Name">
                  Acc Name{" "}
                  <RiInformation2Line className="inline align-baseline cursor-pointer" />
                </th>
                <th
                  scope="col"
                  className="px-4 py-3"
                  title="Date of last Sanction"
                >
                  DOLS{" "}
                  <RiInformation2Line className="inline align-baseline cursor-pointer" />
                </th>
                <th
                  scope="col"
                  className="px-4 py-3"
                  title="Days since last sanction/renewal"
                >
                  Due Days
                  {/* DSLS/R{" "} */}
                  {/* <RiInformation2Line className="inline align-baseline cursor-pointer" /> */}
                </th>
                <th scope="col" className="px-4 py-3" title="Sanctioned Limit">
                  Loan 1
                  {/* <RiInformation2Line className="inline align-baseline cursor-pointer" /> */}
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-end"
                  title="Sanctioned Limit"
                >
                  Amount($)
                  {/* <RiInformation2Line className="inline align-baseline cursor-pointer" /> */}
                </th>
                <th scope="col" className="px-4 py-3" title="Sanctioned Limit">
                  Loan 2
                  {/* <RiInformation2Line className="inline align-baseline cursor-pointer" /> */}
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-end"
                  title="Sanctioned Limit"
                >
                  Amount($)
                  {/* <RiInformation2Line className="inline align-baseline cursor-pointer" /> */}
                </th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {ListOfOrganizationSort.length > 0 ? (
                ListOfOrganizationSort?.filter((e) =>
                  e.company_name.toLowerCase().includes(SearchInput)
                )
                  .sort((a, b) => a.company_name.localeCompare(b.company_name))
                  .map((data, ind) => (
                    <tr
                      key={ind}
                      className={`border-b dark:bg-primary-deep border-primary/15 border-gray-200 hover:bg-[#172923] hover:text-primary ${
                        companyName === data?.company_name &&
                        "!bg-black   text-lg"
                      }`}
                    >
                      <td className="px-4 py-4">
                        {companyName === data?.company_name ? (
                          <FaSquareCheck className="inline align-middle size-6 cursor-pointer" />
                        ) : (
                          <MdCheckBoxOutlineBlank
                            className="inline align-middle size-6 cursor-pointer"
                            onClick={() => ChooseAccount(data?.company_name)}
                          />
                        )}
                        <span className="ps-2"> {ind + 1}</span>
                      </td>
                      <th
                        scope="row"
                        className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data?.company_name}
                      </th>
                      <td className="px-4 py-4">
                        {formatDate(data?.date_last_sanction)}
                      </td>
                      <td
                        className={`px-4 py-4 text-xl text-center ${
                          dueDateCalculator(data?.days_since_last_sanction) >
                            0 && "text-secondary font-bold"
                        }`}
                      >
                        <span
                          className={`${
                            dueDateCalculator(data?.days_since_last_sanction) >
                              0 && "animate-pulse"
                          }`}
                        >
                          {dueDateCalculator(data?.days_since_last_sanction)}
                        </span>
                        {/* days "
                    {data?.days_since_last_sanction}" */}
                      </td>
                      <td className="px-4 py-4">{data?.loan_type_1}</td>
                      <td className="px-4 py-4 text-end">
                        {formatPrice(data?.loan1_amount)}
                      </td>
                      <td className="px-4 py-4">{data?.loan_type_2}</td>
                      <td className="px-4 py-4 text-end">
                        {formatPrice(data?.loan2_amount)}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr className="border-b dark:bg-primary-deep border-primary/15 border-gray-200 hover:bg-[#212423] hover:text-primary">
                  <td className="px-4 py-4" colSpan={7}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
