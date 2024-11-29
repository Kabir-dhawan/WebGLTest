import React from "react";
import { Button } from "../buttons/Button";
import { ContactUsFormFor } from "./ContactUsFormFor";
import { Header } from "./Header";
import { SceneSelection } from "./SceneSelection";
import line20 from "./line-20.svg";
import line212 from "./line-21-2.svg";
import rectangle23 from "./rectangle-2-3.png";
import rectangle24 from "./rectangle-2-4.png";
import rectangle25 from "./rectangle-2-5.png";
import rectangle26 from "./rectangle-2-6.png";
import rectangle27 from "./rectangle-2-7.png";
import rectangle28 from "./rectangle-2-8.png";
import rectangle29 from "./rectangle-2-9.png";
import rectangle210 from "./rectangle-2-10.png";
import rectangle212 from "./rectangle-2-12.png";
import rectangle213 from "./rectangle-2-13.png";
import rectangle215 from "./rectangle-2-15.png";
import rectangle216 from "./rectangle-2-16.png";

export const Screen = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[3310px] relative">
        <div className="absolute w-[1440px] h-[2020px] top-[239px] left-0">
          <div className="flex flex-col w-[1440px] h-[684px] items-center justify-between absolute top-[1336px] left-0 [background:radial-gradient(50%_50%_at_50%_50%,rgba(150,91,146,0.64)_0%,rgba(171,191,202,0.8)_100%)] bg-[url(/frame-37388.png)] bg-cover bg-[50%_50%]">
            <img
              className="relative self-stretch w-full h-[4.45px] mt-[-0.50px]"
              alt="Line"
              src={line20}
            />

            <div className="flex flex-col w-[1280px] items-center gap-10 px-0 py-5 relative flex-[0_0_auto]">
              <div className="relative self-stretch mt-[-1.00px] font-title-desktop-vnvinvt font-[number:var(--title-desktop-vnvinvt-font-weight)] text-white text-[length:var(--title-desktop-vnvinvt-font-size)] text-center tracking-[var(--title-desktop-vnvinvt-letter-spacing)] leading-[var(--title-desktop-vnvinvt-line-height)] [font-style:var(--title-desktop-vnvinvt-font-style)]">
                Custom Animation
              </div>

              <div className="flex flex-col items-center justify-center gap-[100px] relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative w-fit mt-[-1.00px] font-h2-desktop-vnvinvt font-[number:var(--h2-desktop-vnvinvt-font-weight)] text-white text-[length:var(--h2-desktop-vnvinvt-font-size)] text-center tracking-[var(--h2-desktop-vnvinvt-letter-spacing)] leading-[var(--h2-desktop-vnvinvt-line-height)] [font-style:var(--h2-desktop-vnvinvt-font-style)]">
                  Want Us To Create Custom Animation ?
                </p>

                <ContactUsFormFor
                  buttonProperty1="variant-3"
                  buttonPropertyDefaultClassName="!self-stretch !mr-[-2.00px] !ml-[-2.00px] !mb-[-2.00px] !flex-[0_0_auto] !w-full"
                  className="!flex-[0_0_auto]"
                  transform
                />
              </div>
            </div>

            <img
              className="relative w-[1440px] h-[5px]"
              alt="Line"
              src={line212}
            />
          </div>

          <div className="flex flex-col w-[1340px] items-center gap-[49px] absolute top-0 left-[50px]">
            <div className="flex flex-col h-[1235px] items-start justify-center gap-5 relative self-stretch w-full rounded-[30px] overflow-hidden shadow-[0px_1px_2px_#0000004c]">
              <div className="relative self-stretch w-full h-[693px] mt-[-150.00px] bg-black rounded-[20px_20px_0px_0px]" />

              <div className="flex items-center justify-center gap-2.5 px-[50px] py-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex-1 h-11 mt-[-1.00px] font-h3-desktop-vnvinvt font-[number:var(--h3-desktop-vnvinvt-font-weight)] text-black text-[length:var(--h3-desktop-vnvinvt-font-size)] tracking-[var(--h3-desktop-vnvinvt-letter-spacing)] leading-[var(--h3-desktop-vnvinvt-line-height)] [font-style:var(--h3-desktop-vnvinvt-font-style)]">
                  Trending Scenes
                </div>
              </div>

              <div className="flex items-start gap-5 px-[50px] py-5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden overflow-x-scroll">
                <div className="flex flex-col w-[409px] h-[251px] items-center gap-5 relative mt-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid border-stroke-constant shadow-effect-deactive">
                  <img
                    className="self-stretch w-full relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle210}
                  />
                </div>

                <SceneSelection
                  className="!h-[unset] !mt-[-0.50px] !mb-[-0.50px]"
                  rectangle="rectangle-2-11.png"
                  rectangleClassName="![align-self:unset] !h-[212px] !flex-[unset] !grow-[unset] !w-[408px]"
                  selected
                />
                <div className="flex flex-col w-[409px] h-[251px] items-center gap-5 relative mt-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid border-stroke-constant shadow-effect-deactive">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle212}
                  />
                </div>

                <div className="flex flex-col w-[409px] h-[251px] items-center gap-5 relative mt-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid border-stroke-constant shadow-effect-deactive">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle213}
                  />
                </div>

                <SceneSelection
                  className="!h-[unset] !mt-[-0.50px] !mb-[-0.50px]"
                  frameClassName="![align-self:unset] !w-[408px]"
                  rectangle="rectangle-2-14.png"
                  rectangleClassName="![align-self:unset] !h-[212px] !flex-[unset] !grow-[unset] !w-[408px]"
                  selected
                />
                <div className="flex flex-col w-[409px] h-[251px] items-center gap-5 relative mt-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid border-stroke-constant shadow-effect-deactive">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle215}
                  />
                </div>

                <div className="flex flex-col w-[409px] h-[251px] items-center gap-5 relative mt-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid border-stroke-constant shadow-effect-deactive">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle216}
                  />
                </div>
              </div>

              <div className="flex items-center justify-center gap-2.5 px-[50px] py-2.5 relative self-stretch w-full flex-[0_0_auto]">
                <div className="relative flex-1 h-11 mt-[-1.00px] font-h3-desktop-vnvinvt font-[number:var(--h3-desktop-vnvinvt-font-weight)] text-black text-[length:var(--h3-desktop-vnvinvt-font-size)] tracking-[var(--h3-desktop-vnvinvt-letter-spacing)] leading-[var(--h3-desktop-vnvinvt-line-height)] [font-style:var(--h3-desktop-vnvinvt-font-style)]">
                  Most Used
                </div>
              </div>

              <div className="flex items-start gap-5 px-[50px] py-5 relative self-stretch w-full flex-[0_0_auto] overflow-hidden overflow-x-scroll">
                <div className="h-[251px] border-stroke-constant shadow-effect-deactive flex flex-col w-[409px] items-center gap-5 relative mt-[-0.50px] mb-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle23}
                  />
                </div>

                <div className="h-[251px] border-stroke-constant shadow-effect-deactive flex flex-col w-[409px] items-center gap-5 relative mt-[-0.50px] mb-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle24}
                  />
                </div>

                <div className="h-[251px] border-stroke-constant shadow-effect-deactive flex flex-col w-[409px] items-center gap-5 relative mt-[-0.50px] mb-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle25}
                  />
                </div>

                <div className="h-[251px] border-stroke-constant shadow-effect-deactive flex flex-col w-[409px] items-center gap-5 relative mt-[-0.50px] mb-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle26}
                  />
                </div>

                <div className="h-[251px] border-stroke-constant shadow-effect-deactive flex flex-col w-[409px] items-center gap-5 relative mt-[-0.50px] mb-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle27}
                  />
                </div>

                <div className="h-[251px] border-stroke-constant shadow-effect-deactive flex flex-col w-[409px] items-center gap-5 relative mt-[-0.50px] mb-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle28}
                  />
                </div>

                <div className="h-[251px] border-stroke-constant shadow-effect-deactive flex flex-col w-[409px] items-center gap-5 relative mt-[-0.50px] mb-[-0.50px] bg-white rounded-[20px] border-[0.5px] border-solid">
                  <img
                    className="w-[408px] relative flex-1 grow"
                    alt="Rectangle"
                    src={rectangle29}
                  />
                </div>
              </div>
            </div>

            <Button
              className="!flex-[0_0_auto]"
              property1="default"
              text="View More"
            />
          </div>
        </div>

        <Header
          className="!absolute !left-0 !bg-transparent !top-[7px]"
          img="rectangle-18-2.png"
          line="line-20-2.svg"
          line1="line-21-3.svg"
          rectangle="rectangle-11-2.png"
          rectangle1="rectangle-19-2.png"
          rectangle2="rectangle-13-2.png"
          rectangle3="rectangle-14-2.png"
          rectangle4="rectangle-15-2.png"
          rectangle5="rectangle-15-3.png"
          searchBarMagnifier="magnifier-3.png"
        />
      </div>
    </div>
  );
};
