import React, { useEffect } from "react";
import Glide from "@glidejs/glide";
import { carouselData } from "../../data/componentsData/carouselData";
import CarouselItem from "./CarouselItem";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Carousel() {
  useEffect(() => {
    const slider = new Glide(".glide-03", {
      type: "carousel",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      // gap: 24,
      classNames: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
      //   breakpoints: {
      //     1024: {
      //       perView: 2,
      //     },
      //     768: {
      //       perView: 1,
      //     },
      //   },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <>
      {/*<!-- Component: Carousel with indicators & controls inside --> */}
      <div className="glide-03 relative w-full group">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul
            className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] 
          [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0 "
          >
            {/* {carouselData.map(({ id, URL, }) => (
              <CarouselItem key={id} URL={URL} />
            ))} */}
            {
              carouselData.map(({ id, URL, textColor }) => (
                <CarouselItem key={id} URL={URL} textColor={textColor} />
              ))
            }
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute opacity-0 left-0 top-1/2 flex h-0 w-full items-center justify-between px-6 
          group-hover:opacity-100 transition-all duration-[1000ms]"
          data-glide-el="controls"
        >
          <button
            className="inline-flex h-8 w-8 items-center justify-center  border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-10 lg:w-10
            group/prev"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <FaAngleLeft className="group-hover/prev:scale-[1.5] transition-all ease-linear duration-[200ms]" />
          </button>
          <button
            className="inline-flex h-8 w-8 items-center justify-center border border-slate-700 bg-white/20 text-slate-700 transition duration-300 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-10 lg:w-10
            group/next"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <FaAngleRight className="group-hover/next:scale-[1.5] transition-all ease-linear duration-[200ms]" />
          </button>
        </div>
      </div>
      {/*<!-- End Carousel with indicators & controls inside --> */}
    </>
  );
}

// {/*    <!-- Indicators --> */}
// <div
// className="absolute bottom-0 flex w-full items-center justify-center gap-2"
// data-glide-el="controls[nav]"
// >
// <button
//   className="group p-4"
//   data-glide-dir="=0"
//   aria-label="goto slide 1"
// >
//   <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
// </button>
// <button
//   className="group p-4"
//   data-glide-dir="=1"
//   aria-label="goto slide 2"
// >
//   <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
// </button>
// <button
//   className="group p-4"
//   data-glide-dir="=2"
//   aria-label="goto slide 3"
// >
//   <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
// </button>
// <button
//   className="group p-4"
//   data-glide-dir="=3"
//   aria-label="goto slide 4"
// >
//   <span className="block h-2 w-2 rounded-full bg-white/20 ring-1 ring-slate-700 transition-colors duration-300 focus:outline-none"></span>
// </button>
// </div>
