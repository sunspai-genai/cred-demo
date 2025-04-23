import React, { useEffect, useState } from "react";
import { getData } from "../../ApiService/apiService";
import { useSelector } from "react-redux";

export default function Recommended() {
  const [IsLoader, setIsLoader] = useState(0);
  const [RecommendedList, setRecommendedList] = useState(null);
  const [RecommendedActionsList, setRecommendedActionsList] = useState([]);
  const [RecommendedOption, setRecommendedOption] = useState("current_month");

  const companyName = useSelector((state) => state?.company?.companyName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData(`/api/recommendations/${companyName}`);
        setRecommendedList(result?.recommended_action);
        setRecommendedActionsList(result?.recommended_action?.current_month);
        console.log("====", result?.recommended_action);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    companyName?.length > 0 && fetchData();
    // handlePostData();
  }, [companyName]);

  const handleRadioChange = (event) => {
    const value = event.target.value;
    setRecommendedOption(value);
    if (value === "current_month") {
      setRecommendedActionsList(RecommendedList.current_month);
    } else {
      setRecommendedActionsList(RecommendedList.next_3_month);
    }
  };

  //   const handleCheckboxChange = (id) => {
  //     setCheckedItems((prev) => {
  //       if (prev.includes(id)) {
  //         return prev.filter((item) => item !== id);
  //       } else {
  //         return [...prev, id];
  //       }
  //     });
  //   };

  //   const handleButtonClick = () => {
  //     console.log("Selected checkboxes:", checkedItems);
  //   };
  return (
    <div>
      <h3 className="pe-4 text-2xl font-medium mb-5">Recommended Actions:</h3>
      <div className="flex RecommendedTab">
        <div className="pr-4">
          <label className="cursor-pointer block">
            <input
              type="radio"
              value="current_month"
              checked={RecommendedOption === "current_month"}
              onChange={handleRadioChange}
              hidden
            />
            <span className="px-8 py-3 rounded-4xl transition-all duration-300 block border-1 border-primary">
              Current Month
            </span>
          </label>
        </div>
        <div className="pe-4">
          <label className="cursor-pointer block">
            <input
              type="radio"
              value="next_3_month"
              checked={RecommendedOption === "next_3_month"}
              onChange={handleRadioChange}
              hidden
            />
            <span className="px-8 py-3 rounded-4xl transition-all duration-300 block border-1 border-primary">
              Next 3 months
            </span>
          </label>
        </div>
        {/* <p>Selected: {RecommendedOption}</p> */}
        <div></div>
      </div>
      <div className="pt-6">
        <ul>
          {RecommendedActionsList?.length > 0 ? RecommendedActionsList?.map((item, id) => (
            <li key={item} className="py-2">
              <label className="flex items-center cursor-pointer">
                {/* <input
                  hidden
                  type="checkbox"
                  checked={checkedItems.includes(item.id)}
                  onChange={() => handleCheckboxChange(item.id)}
                /> */}
                {/* {checkedItems?.includes(item?.id) ? (
                  <MdOutlineCheckBox className="me-2 size-6 text-secondary" />
                ) : (
                  <MdOutlineCheckBoxOutlineBlank className="me-2 size-6 text-primary" />
                )} */}
                {id + 1}
                {`>`} {item}
              </label>
            </li>
          )):<p>No Recommended Actions found for {RecommendedOption}</p>}
        </ul>
        {/* <button onClick={handleButtonClick}>
                Log Selected Checkboxes
              </button> */}
      </div>
    </div>
  );
}
