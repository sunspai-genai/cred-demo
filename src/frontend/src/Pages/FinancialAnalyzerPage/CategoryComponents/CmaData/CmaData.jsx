import React, { useEffect, useState } from "react";
import { getData, postData } from "../../../../ApiService/apiService";
import SuggestionComp from "../../../../Widgets/SuggestionComp/SuggestionComp";
import { useSelector } from "react-redux";
import LineChart from "../../../../Widgets/LineChart/LineChart";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BarChart from "../../../../Widgets/BarChart/BarChart";
import CMAdataModal from "../../../../Widgets/CMAdataModal/CMAdataModal";
import CommonLoader from "../../../../Utils/CommonLoader/CommonLoader";

export default function CmaData() {
  const [CMA_data, setCMA_Data] = useState([]);
  const [chooseBtn, setChooseBtn] = useState(0);
  const [IsLoader, setIsLoader] = useState(0);
  const [ModalClose, setModalClose] = useState(1);

  const companyName = useSelector((state) => state?.company?.companyName);
  const fetchData = async () => {
    setIsLoader(1);

    try {
      const result = await getData(`/api/reports/${companyName}`);
      setCMA_Data(result);
      setIsLoader(2);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoader(0);
    }
  };
  useEffect(() => {
    ModalClose === 0 && companyName?.length > 0 && fetchData();
    // handlePostData();
  }, [companyName]);

  const handlePostData = async () => {
    try {
      const newData = { account_name: "3" }; // Replace with your data
      const result = await postData("cma_data", newData);
      console.log("Data posted successfully:", result);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  const ImgGen = (incoming_data) => {
    const base64String = incoming_data; // Your base64 string from the API

    // Remove the prefix
    const base64Content = base64String.split(",")[1];

    // Decode the base64 string
    const svgContent = atob(base64Content);
    return svgContent;
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const modalCloseFunc = () => {
    companyName?.length > 0 && fetchData();
    setIsLoader(2);
    setModalClose(0);
  };

  return (
    <div>
      {ModalClose === 1 && <CMAdataModal modalCloseFunc={modalCloseFunc} />}
      {IsLoader !== 0 ? (
        <div>
          <h2 className="text-2xl">
            CMA data of <b className="animate-pulse">{companyName}</b>
          </h2>
          <hr className="border-primary-deep my-3" />
        </div>
      ) : (
        <p>No result found...</p>
      )}
      <section className="flex h-full overflow-hidden">
        <div className="w-8/12 pe-4">
          {IsLoader === 1 && <CommonLoader />}
          {IsLoader === 2 && (
            <div className="h-full overflow-y-auto   px-4 bg-black/5">
              <div className="btn-wrapper border-b   border-primary">
                <ul className="flex flex-wrap -mx-3 pt-4">
                  {CMA_data?.map((data, index) => (
                    <li className="w-auto px-3 pb-6" key={index}>
                      <button
                        className={`btn-primary-outline w-full ${
                          chooseBtn === index && "bg-primary"
                        }`}
                        type="button"
                        onClick={() => setChooseBtn(index)}
                      >
                        {data?.report_name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="report pt-3">
                <div className="px-4 mb-6">
                  {/* {console.log(CMA_data[chooseBtn]?.charts)} */}
                  {CMA_data[chooseBtn]?.charts?.length > 0 && (
                    <Slider {...settings}>
                      {CMA_data[chooseBtn]?.charts?.map((data, index) => (
                        <>
                          {data?.chart_type === "bar" && (
                            <BarChart data={data} key={index} />
                          )}
                          {data?.chart_type === "line" && (
                            <LineChart data={data} key={index} />
                          )}
                        </>
                      ))}
                    </Slider>
                  )}
                </div>

                <div
                  dangerouslySetInnerHTML={{
                    __html: CMA_data[chooseBtn]?.content,
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
        {IsLoader === 2 && (
          <div className="w-4/12 ps-4">
            <SuggestionComp isComingSoon={false} />
          </div>
        )}
      </section>
    </div>
  );
}
