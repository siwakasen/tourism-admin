import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import { TourPackage } from "../../../../__interface/tourpackage.interface";

interface InitialFormProps {
  data: TourPackage | null;
  handleNextToImages: () => void;
}

import {
  pickupAreasDummy,
  termsConditionsDummy,
} from "../../../../data/dummy/tour-package.dummy";

const InitialForm: React.FC<InitialFormProps> = ({
  data,
  handleNextToImages,
}: InitialFormProps) => {
  const [itineraries, setItineraries] = useState<string[]>(
    data?.itineraries || []
  );
  const [itineraryInput, setItineraryInput] = useState<string>("");

  const [includes, setIncludes] = useState<string[]>(data?.includes || []);
  const [includeInput, setIncludeInput] = useState<string>("");

  const [pickUpAreas, setPickUpAreas] = useState<string[]>(
    data?.pickup_areas || pickupAreasDummy
  );
  const [pickUpAreaInput, setPickUpAreaInput] = useState<string>("");

  const [termsConditions, setTermsConditions] = useState<string[]>(
    data?.terms_conditions || termsConditionsDummy
  );
  const [termsConditionsInput, setTermsConditionsInput] = useState<string>("");

  const [selectedPickUpAreas, setSelectedPickUpAreas] = useState<string[]>(
    data?.pickup_areas || pickupAreasDummy
  );
  const [selectedTermsConditions, setSelectedTermsConditions] = useState<
    string[]
  >(data?.terms_conditions || termsConditionsDummy);

  const handleAddItinerary = () => {
    if (itineraryInput.trim()) {
      setItineraries([...itineraries, itineraryInput.trim()]);
      setItineraryInput("");
    }
  };

  const handleRemoveItinerary = (index: number) => {
    setItineraries(itineraries.filter((_, i) => i !== index));
  };

  const handleAddInclude = () => {
    if (includeInput.trim()) {
      setIncludes([...includes, includeInput.trim()]);
      setIncludeInput("");
    }
  };
  const handleRemoveInclude = (index: number) => {
    setIncludes(includes.filter((_, i) => i !== index));
  };

  const handleAddPickUpArea = () => {
    if (pickUpAreaInput.trim()) {
      setPickUpAreas([...pickUpAreas, pickUpAreaInput.trim()]);
      setPickUpAreaInput("");

      handleAddSelectedPickUpArea(pickUpAreaInput.trim());
    }
  };

  const handleAddTermsConditions = () => {
    if (termsConditionsInput.trim()) {
      setTermsConditions([...termsConditions, termsConditionsInput.trim()]);
      setTermsConditionsInput("");
      handleAddSelectedTermsConditions(termsConditionsInput.trim());
    }
  };

  const handleAddSelectedPickUpArea = (area: string) => {
    setSelectedPickUpAreas([...selectedPickUpAreas, area]);
  };

  const handleCheckboxPickUpArea = (area: string) => {
    if (selectedPickUpAreas.includes(area)) {
      setSelectedPickUpAreas(
        selectedPickUpAreas.filter((item) => item !== area)
      );
    } else {
      setSelectedPickUpAreas([...selectedPickUpAreas, area]);
    }
  };

  const handleAddSelectedTermsConditions = (condition: string) => {
    setSelectedTermsConditions([...selectedTermsConditions, condition]);
  };

  const handleCheckboxTermsConditions = (condition: string) => {
    if (selectedTermsConditions.includes(condition)) {
      setSelectedTermsConditions(
        selectedTermsConditions.filter((item) => item !== condition)
      );
    } else {
      setSelectedTermsConditions([...selectedTermsConditions, condition]);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg bg-white pt-4 px-4 pb-8 ">
      {/* Package Name */}
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Package Name</span>
          </div>
          <input
            type="text"
            placeholder="Enter the package name"
            className="input input-bordered w-full"
          />
        </label>
      </div>

      {/* Description */}
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Description</span>
          </div>
          <textarea
            placeholder="Type the package description"
            className="textarea textarea-bordered w-full"
            rows={3}
          />
        </label>
      </div>

      {/* Package Price */}
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">
              Package Price (USD)
            </span>
          </div>
          <input
            type="number"
            placeholder="Enter package price"
            className="input input-bordered w-full"
          />
        </label>
      </div>

      {/* Duration */}
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Duration (days)</span>
          </div>
          <input
            type="number"
            placeholder="Enter duration"
            className="input input-bordered w-full"
          />
        </label>
      </div>

      {/* Max Group Size */}
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">
              Maximum Group Size (people)
            </span>
          </div>
          <input
            type="number"
            placeholder="Enter max group size"
            className="input input-bordered w-full"
          />
        </label>
      </div>

      {/* Children Price */}
      <div>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">
              Children Price (USD)
            </span>
          </div>
          <input
            type="number"
            placeholder="Enter children price"
            className="input input-bordered w-full"
          />
        </label>
      </div>

      {/* Itineraries */}
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Itineraries</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={itineraryInput}
              onChange={(e) => setItineraryInput(e.target.value)}
              placeholder="Enter itinerary item"
              className="input input-bordered w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddItinerary();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddItinerary}
              className="btn btn-primary "
            >
              Add
            </button>
          </div>
        </label>
        {/* List of Itineraries */}
        <ul
          className={` ${
            itineraries.length == 0 && "hidden"
          }  list-disc px-3 mt-3 border p-1 rounded-lg grid grid-cols-2 gap-2`}
        >
          {itineraries.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-1 border-b gap-2 border-gray-200 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2 overflow-auto">
                <span>
                  <GoDotFill />
                </span>
                <span>{item}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemoveItinerary(index)}
                className="btn btn-xs btn-error text-white"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Includes */}
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Includes</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={includeInput}
              onChange={(e) => setIncludeInput(e.target.value)}
              placeholder="Enter include item"
              className="input input-bordered w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddInclude();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddInclude}
              className="btn btn-primary "
            >
              Add
            </button>
          </div>
        </label>
        {/* List of Includes */}
        <ul
          className={` ${
            includes.length == 0 && "hidden"
          }  list-disc px-3 mt-3 border p-1 rounded-lg grid grid-cols-2 gap-2`}
        >
          {includes.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-1 border-b gap-2 border-gray-200 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2 overflow-auto">
                <span>
                  <GoDotFill />
                </span>
                <span>{item}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemoveInclude(index)}
                className="btn btn-xs btn-error text-white"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Pick Up Areas */}
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">Pick Up Areas</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={pickUpAreaInput}
              onChange={(e) => setPickUpAreaInput(e.target.value)}
              placeholder="Add new pick up area"
              className="input input-bordered w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddPickUpArea();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddPickUpArea}
              className="btn btn-primary "
            >
              Add
            </button>
          </div>
        </label>
        {/* List of Pick Up Areas */}
        <ul
          className={` ${
            pickUpAreas.length == 0 && "hidden"
          }  list-disc px-3 mt-3 border p-1 rounded-lg grid grid-cols-2 gap-2`}
        >
          {pickUpAreas.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-200 gap-2 hover:bg-gray-100 "
            >
              <span className="flex items-center gap-2  overflow-auto">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox "
                  onClick={() => handleCheckboxPickUpArea(item)}
                />
                <span>{item}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Terms & Conditions */}
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">
              Terms & Conditions
            </span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={termsConditionsInput}
              onChange={(e) => setTermsConditionsInput(e.target.value)}
              placeholder="Add new terms & conditions"
              className="input input-bordered w-full"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddTermsConditions();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddTermsConditions}
              className="btn btn-primary "
            >
              Add
            </button>
          </div>
        </label>
        {/* List of Terms & Conditions */}
        <ul
          className={` ${
            termsConditions.length == 0 && "hidden"
          }  list-disc px-3 mt-3 border p-1 rounded-lg`}
        >
          {termsConditions.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b gap-2 border-gray-200 hover:bg-gray-100"
            >
              <span className="flex items-center gap-2 overflow-auto">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox"
                  onClick={() => {
                    handleCheckboxTermsConditions(item);
                  }}
                />
                <span>{item}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-span-2 text-right">
        <button
          type="button"
          onClick={handleNextToImages} // Navigate to images accordion
          className="btn btn-primary"
        >
          Next: Images
        </button>
      </div>
    </div>
  );
};

export default InitialForm;
