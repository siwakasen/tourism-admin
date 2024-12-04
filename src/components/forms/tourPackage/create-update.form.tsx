import { TourPackage } from "../../../__interface/tourpackage.interface";

import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useRef } from "react";
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
  const imagesAccordionRef = useRef<HTMLDivElement | null>(null); // Reference to the images accordion

  const handleNextToImages = () => {
    console.log("Next to images", imagesAccordionRef.current);
    if (imagesAccordionRef.current) {
      // Simulate a click or expand the accordion programmatically
      const button = imagesAccordionRef.current.querySelector(
        "button.hs-accordion-toggle"
      ) as HTMLButtonElement;
      if (button) button.click(); // Trigger the accordion toggle
    }
  };

  return (
    <>
      <div className="max-w-screen-xl  h-fit p-10">
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
        <div className="hs-accordion-group mt-10">
          {/* First Accordion: Tour Package Data */}
          <div
            className="hs-accordion active"
            id="hs-basic-with-arrow-heading-one"
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-slate-800 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-slate-800 dark:text-gray-600 dark:hover:text-slate-700 dark:focus:text-gray-800"
              aria-expanded="true"
              aria-controls="hs-basic-with-arrow-collapse-one"
            >
              <svg
                className="hs-accordion-active:hidden block size-4"
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
              <svg
                className="hs-accordion-active:block hidden size-4"
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
              Tour Package Data
            </button>
            <div
              id="hs-basic-with-arrow-collapse-one"
              className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              role="region"
              aria-labelledby="hs-basic-with-arrow-heading-one"
            >
              <InitialForm
                data={data}
                handleNextToImages={handleNextToImages}
              />
            </div>
          </div>

          {/* Second Accordion: Tour Package Images */}
          <div
            className="hs-accordion"
            id="hs-basic-with-arrow-heading-two"
            ref={imagesAccordionRef} // Reference for targeting
          >
            <button
              className="hs-accordion-toggle hs-accordion-active:text-slate-800 py-3 inline-flex items-center gap-x-3 w-full font-semibold text-start text-gray-800 hover:text-gray-500 focus:outline-none focus:text-gray-500 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:hs-accordion-active:text-slate-800 dark:text-gray-600 dark:hover:text-slate-700 dark:focus:text-gray-800"
              aria-expanded="false"
              aria-controls="hs-basic-with-arrow-collapse-two"
            >
              <svg
                className="hs-accordion-active:hidden block size-4"
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
              <svg
                className="hs-accordion-active:block hidden size-4"
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
              Tour Package Images
            </button>
            <div
              id="hs-basic-with-arrow-collapse-two"
              className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300"
              role="region"
              aria-labelledby="hs-basic-with-arrow-heading-two"
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
