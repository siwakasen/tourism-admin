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
  refetch: () => void;
}

export const CreateUpdateTourForm: React.FC<CreateUpdateTourFormProps> = ({
  data,
  title,
  route,
  refetch,
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

  const [isCreated, setIsCreated] = useState<boolean>(data?.id ? true : false);

  const toggleAccordion = (index: number) => {
    if (!data?.id && !isCreated) {
      return;
    }
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [id, setId] = useState<string | null>(data?.id || "");

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
        <div className="h-fit mt-10">
          {/* First Accordion: Tour Package Data */}
          <button
            className="w-full flex  items-center py-4 px-6 bg-gray-100 hover:bg-gray-200 gap-2 rounded-t-lg text-left"
            onClick={() => toggleAccordion(0)}
          >
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
            Tour Package Data
          </button>
          <div
            className={`flex-grow overflow-auto transition-[max-height] duration-300 ease-in-out h-full ${
              activeIndex === 0 ? "max-h-[calc(100vh-306px)]" : "max-h-0"
            }`}
          >
            <InitialForm
              data={data}
              handleNextToImages={() => toggleAccordion(1)}
              setIsCreated={setIsCreated}
              isCreated={isCreated}
              setId={setId}
            />
          </div>

          {/* Second Accordion: Tour Package Images */}
          <div>
            <button
              className={`w-full flex  items-center py-4 px-6 bg-gray-100 hover:bg-gray-200  ${
                activeIndex === 1 ? "" : "rounded-b-lg"
              } text-left`}
              onClick={() => toggleAccordion(1)}
            >
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
              Tour Package Images
            </button>
            <div
              className={`overflow-scroll transition-[max-height] duration-300 ease-in-out ${
                activeIndex === 1 ? "max-h-[calc(100vh-306px)]" : "max-h-0"
              }`}
            >
              <MultipleImageForm
                images={Array.isArray(data?.images) ? data?.images : []}
                id={data?.id ? data?.id : id || ""}
                refetch={refetch}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUpdateTourForm;
