import { TourPackage } from "../../../__interface/tourpackage.interface";

import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState } from "react";
import MultipleImageForm from "./images-form";
import InitialForm from "./initialForm";

interface CreateUpdateTourFormProps {
  data: TourPackage | null;
  title: string;
  route: string;
}

export const CreateUpdateTourForm: React.FC<CreateUpdateTourFormProps> = ({
  data,
  title,
  route,
}: CreateUpdateTourFormProps) => {
  //   const imagesAccordionRef = useRef<HTMLDivElement | null>(null); // Reference to the images accordion

  //   const handleNextToImages = () => {
  //     if (imagesAccordionRef.current) {
  //       const button = imagesAccordionRef.current.querySelector(
  //         "button.hs-accordion-toggle"
  //       ) as HTMLButtonElement;
  //       if (button) button.click(); // Trigger the accordion toggle
  //     }
  //   };

  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div className=" h-full p-10">
        <h1 className="text-xl font-bold text-slate-700">
          <div className="relative inline-block group">
            <Link to={route} className="inline-block pr-3">
              <IoChevronBack className="inline-block" size={"32px"} />
            </Link>
            <span className="absolute left-8 top-8 transform -translate-y-1/2 text-sm text-gray-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Back
            </span>
          </div>
          {title}
        </h1>
        <div className="h-full ">
          {/* First Accordion: Tour Package Data */}
          <button
            className="w-full flex justify-between items-center py-4 px-6 bg-gray-100 hover:bg-gray-200 text-left"
            onClick={() => toggleAccordion(0)}
          >
            Tour Package Data
            {activeIndex === 0 ? (
              <svg
                className=" size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            ) : (
              <svg
                className=" size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 15-6-6-6 6"></path>
              </svg>
            )}
          </button>
          <div
            className={`flex-grow overflow-auto transition-[max-height] duration-300 ease-in-out h-full ${
              activeIndex === 0 ? "max-h-[calc(100vh-256px)]" : "max-h-0"
            }`}
          >
            <InitialForm
              data={data}
              handleNextToImages={() => toggleAccordion(1)}
            />
          </div>

          {/* Second Accordion: Tour Package Images */}
          <div>
            <button
              className="w-full flex justify-between items-center py-4 px-6 bg-gray-100 hover:bg-gray-200 text-left"
              onClick={() => toggleAccordion(1)}
            >
              Tour Package Images
              {activeIndex === 0 ? (
                <svg
                  className=" size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6"></path>
                </svg>
              ) : (
                <svg
                  className=" size-4"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 15-6-6-6 6"></path>
                </svg>
              )}
            </button>
            <div
              className={`overflow-scroll transition-[max-height] duration-300 ease-in-out ${
                activeIndex === 1 ? "max-h-96" : "max-h-0"
              }`}
            >
              <MultipleImageForm images={[]} desc="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUpdateTourForm;
