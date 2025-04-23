import React from "react";
import BarChart from "./BarChart";
import RenewalTable from "./RenewalTable";
import GetOrganization from "./GetOrganization";

export default function HomePage() {
  return (
    <section className="flex flex-col h-full overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <h2 className="title-one !mb-0">Accounts due for processing</h2>
        <div className="ms-auto">
          {/* <GetOrganization /> */}
        </div>
         {/* <label className="btn-primary cursor-pointer">
          Upload Excel File
          <input type="file" name="" id="" className="hidden" accept="x" />
      </label>
        <label className="btn-primary cursor-pointer">
          Upload PDF File
          <input type="file" name="" id="" className="hidden" accept="x" />
      </label> */}
      </div>
      <div className="w-full   h-full overflow-y-auto ">
        {/* <div className=" w-full mb-8 ">
          <div className="bg-white/7 text-primary-deep rounded-2xl p-4  ">
            <BarChart />
          </div>
        </div> */}
        <div className=" w-full ">
          <div className="bg-white/7 text-primary-deep rounded-2xl overflow-hidden p-4 ">
            <RenewalTable />
          </div>
        </div>
      </div>
    </section>
  );
}
