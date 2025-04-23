import React from "react";

export default function FileDetailsTable({ fileDetails }) {
  return (
    <div className="rounded-lg overflow-hidden border">
      {fileDetails && (
        <table className="text-start  w-full">
          <thead>
            <tr className="bg-primary/10">
              <th className="p-2 border-r w-9/12 text-start">Name</th>
              <th className="p-2   text-end">Size</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            <tr>
              <td className="p-2 border-r text-start">{fileDetails.name}</td>
              <td className="p-2 font-medium  text-end">{fileDetails.size}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
