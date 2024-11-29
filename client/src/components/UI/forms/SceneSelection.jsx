import PropTypes from "prop-types";
import React from "react";
import { Button } from "../buttons/Button";
import image from "./image.png";
import rectangle2 from "./rectangle-2.png";

export const SceneSelection = ({ selected, className }) => {
  return (
    <div
      className={`border-[0.5px] border-solid flex flex-col items-center gap-5 rounded-[20px] bg-white relative ${!selected ? "border-stroke-constant" : "border-stroke-active"} ${selected ? "w-[409px]" : ""} ${!selected ? "shadow-effect-deactive" : "shadow-effect-active"} ${selected ? "pt-0 pb-5 px-0" : ""} ${!selected ? "h-[251px]" : "h-[305px]"} ${selected ? "justify-center" : ""} ${className}`}
    >
      <img
        className="w-full self-stretch grow flex-1 relative"
        alt="Rectangle"
        src={selected ? rectangle2 : image}
      />

      {selected && (
        <div className="flex flex-col items-center justify-center gap-2.5 px-5 py-0 relative self-stretch w-full flex-[0_0_auto]">
          <Button
            className="!self-stretch !flex-[0_0_auto] !px-3.5 !py-2.5 !w-full"
            divClassName="!flex-1 !w-[unset]"
            property1="default"
            text="SELECT"
          />
        </div>
      )}
    </div>
  );
};

SceneSelection.propTypes = {
  selected: PropTypes.bool,
};
