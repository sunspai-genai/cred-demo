import React from "react";
import "./ProgressBar.scss";
export default function ProgressBar({ value}) {
  return (
    <div className="progress-custom-design">
      <p style={{ width: "100%" }} data-value={value}>
        File uploading
      </p>
      <progress max="100" value={value} class="html5">
        <div class="progress-bar">
          <span>{value}%</span>
        </div>
      </progress>
    </div>
  );
}
