import PropTypes from "prop-types";
import React from "react";

export const Button = ({ property1, className }) => {
  return (
    <button
      className={`all-[unset] box-border flex items-center gap-2.5 px-3.5 py-4 overflow-hidden rounded-[10px] justify-center relative ${["variant-2", "variant-3"].includes(property1) ? "border-2 border-solid" : ""} ${property1 === "variant-2" ? "border-text-icons-color" : (property1 === "variant-3") ? "border-text-color" : ""} ${property1 === "default" ? "w-[182px]" : "w-[186px]"} ${property1 === "variant-3" ? "shadow-effect-deactive" : "shadow-effect-active"} ${property1 === "default" ? "bg-text-icons-color" : ""} ${className}`}
    >
      <div
        className={`font-h4-desktop-vnvinvt w-[154px] tracking-[var(--h4-desktop-vnvinvt-letter-spacing)] text-[length:var(--h4-desktop-vnvinvt-font-size)] [font-style:var(--h4-desktop-vnvinvt-font-style)] relative font-[number:var(--h4-desktop-vnvinvt-font-weight)] text-center leading-[var(--h4-desktop-vnvinvt-line-height)] ${property1 === "default" ? "mt-[-1.00px]" : ""} ${property1 === "variant-2" ? "text-text-icons-color" : (property1 === "variant-3") ? "text-text-color" : "text-white"}`}
      >
        Button Text
      </div>
    </button>
  );
};

Button.propTypes = {
  property1: PropTypes.oneOf(["variant-2", "variant-3", "default"]),
};
