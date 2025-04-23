import React, { useState } from "react";
import { postData } from "../../ApiService/apiService";
import { useSelector } from "react-redux";
import { AiOutlineFileSearch } from "react-icons/ai";
import { LuCloudUpload } from "react-icons/lu";
import ProgressBar from "../../Utils/ProgressBar/ProgressBar";
import FileDetailsTable from "../../Utils/FileDetailsTable/FileDetailsTable";
import CommonLoader from "../../Utils/CommonLoader/CommonLoader";
export default function CMAdataModal({ modalCloseFunc }) {
  const companyName = useSelector((state) => state?.company?.companyName);
  const [IsLoader, setIsLoader] = useState(0);

  const [fileDetails, setFileDetails] = useState(null);
  const [FileUploadScreen, setFileUploadScreen] = useState(0);
  const [file, setFile] = useState(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [TriggerUpload, setTriggerUpload] = useState(0);
  const [SuccessfullyDone, setSuccessfullyDone] = useState(0);
  const [SuccessOrFailStatus, setSuccessOrFailStatus] = useState("");

  const handleFileChange = (e) => {
    setFileUploadScreen(1);
    const selectedFile = e.target.files[0];
    console.log(selectedFile);
    if (
      selectedFile &&
      selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFile(selectedFile);

      setFileDetails({
        name: selectedFile.name,
        size: (selectedFile.size / 1024).toFixed(2) + " KB",
        type: selectedFile.type,
        location: URL.createObjectURL(selectedFile),
      });
    } else {
      alert("Please upload a valid Excel file (.xlsx)");
    }
  };

  const handleUpload = async () => {
    setSuccessOrFailStatus("");
    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("account_name", companyName);
    formData.append("file", file);
    formData.append("data_source", "cma_data");

    try {
      setTriggerUpload(1);
      setFileDetails("");
      setIsLoader(1);
      let customHeaders = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentage = Math.floor((loaded * 100) / total);
          setUploadPercentage(percentage);
        },
      };
      const result = await postData("api/analysis", formData, customHeaders);
      console.log("Data posted successfully:", result);
      setTriggerUpload(0);
      setIsLoader(0);
      setSuccessfullyDone(1);
    } catch (error) {
      console.error("Error posting data:", error);
      setTriggerUpload(0);
      setIsLoader(0);
      error?.response?.status === 404
        ? setSuccessOrFailStatus(error?.response?.data?.detail + " Try again.")
        : setSuccessOrFailStatus("Some thing went wrong." + " Try again.");
    }
  };

  return (
    <div className="fixed z-50 w-full h-dvh bg-black/30 backdrop-blur-xs left-0 top-0 right-0 bottom-0  flex">
      <div className="flex flex-col m-auto  w-180 bg-gray-100 text-primary-deep py-4 px-8 rounded-lg">
        <div className="w-full mb-4">
          <h3 className="text-3xl font-bold ">CMA data upload</h3>
          <p className="text-gray-700">
            You can upload new file for CMA data processing or continue with old one.
          </p>
        </div>
        <div className="opacity-20">
          <hr />
        </div>
        <div className="w-full py-10 text-center">
          <h4 className="text-xl mb-5 text-gray-600 font-semibold">
            {FileUploadScreen === 0 && <span>What do you want?</span>}
            {FileUploadScreen === 1 && (
              <>
                <span>Choose file and upload for CMA data process.</span>
                <p className="text-[80%] text-secondary font-normal">
                  * You can upload only one <b>.xlsx</b> file.
                </p>
              </>
            )}
          </h4>
          <div className="flex items-center">
            {FileUploadScreen === 0 && (
              <>
                <button
                  onClick={() => setFileUploadScreen(1)}
                  className="btn-primary w-6/12 hover:bg-primary-deep cursor-pointer"
                >
                  Continue with <b className="font-semibold uppercase">new</b>{" "}
                  file
                </button>
                <div className="px-6">
                  <span>OR</span>
                </div>
                <button
                  onClick={() => modalCloseFunc()}
                  className="btn-primary w-6/12 hover:bg-primary-deep"
                >
                  Continue with <b className="font-semibold uppercase">old</b>{" "}
                  file
                </button>
              </>
            )}
          </div>
          {FileUploadScreen === 1 && (
            <div className="text-start pt-5">
              <div className="flex">
                <label className="bg-primary/20 border-primary/20 shadow-lg p-4 rounded-4xl px-8 font-semibold  w-full hover:bg-white cursor-pointer hover:text-primary inline-flex items-center">
                  <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <AiOutlineFileSearch className="size-6" />{" "}
                  <span className="ps-2">Choose .xlsx file</span>
                </label>
                {fileDetails && (
                  <button
                    onClick={() => handleUpload()}
                    className="btn-primary inline-flex items-center ms-4 shadow-lg hover:text-primary "
                  >
                    <LuCloudUpload className="size-6 animate-pulse" />{" "}
                    <span className="ps-2">Upload</span>
                  </button>
                )}
              </div>
              {fileDetails && (
                <div className="pt-4">
                  <FileDetailsTable fileDetails={fileDetails} />
                </div>
              )}
              {TriggerUpload === 1 && (
                <div className="pt-4 pb-6">
                  <ProgressBar value={uploadPercentage} />
                  <p className="mb-2">
                    Financial Analyzer Agent is processing the CMA data for &#160;
                    <b className="text-primary">{companyName}</b>. Please don't refresh, it takes 2-3 mins.
                  </p>
                </div>
              )}
           <div className="text-center">  {IsLoader === 1 && <CommonLoader beauty={"dark"} />}</div> 
              {SuccessOrFailStatus?.length > 0 && (
                <p className="pt-5 text-secondary">{SuccessOrFailStatus}</p>
              )}
              {SuccessfullyDone === 1 && (
                <p className="pt-5 text-center">
                  <span className="text-primary">Successfully done.</span> <br /> <br />
                  <button
                    onClick={() => modalCloseFunc()}
                    className="btn-primary inline-flex items-center ms-4 shadow-lg hover:text-primary "
                  >
                    <span className="ps-2">View CMA data</span>
                  </button>
                </p>
              )}
            </div>
          )}
        </div>
        <div className="opacity-20">
          <hr />
        </div>
        <div className="w-full pt-4 text-right">
          <a href="/">
            <button className="text-red-600 bg-red-600/10 hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg">
              CLose
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}
