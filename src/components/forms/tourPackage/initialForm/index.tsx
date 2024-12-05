import { useState } from "react";
import { TourPackage } from "../../../../__interface/tourpackage.interface";
import ItemsMultipleInput from "../../../input/items-multiple-input";
import CheckboxMultipleInput from "../../../input/checkbox-multiple-input";

interface InitialFormProps {
  data: TourPackage | null;
  handleNextToImages: (index: number) => void;
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
  const [includes, setIncludes] = useState<string[]>(data?.includes || []);

  const [pickUpAreas, setPickUpAreas] = useState<string[]>(
    data?.pickup_areas || pickupAreasDummy
  );

  const [termsConditions, setTermsConditions] = useState<string[]>(
    data?.terms_conditions || termsConditionsDummy
  );

  const [selectedPickUpAreas, setSelectedPickUpAreas] = useState<string[]>(
    data?.pickup_areas || pickupAreasDummy
  );

  const [selectedTermsConditions, setSelectedTermsConditions] = useState<
    string[]
  >(data?.terms_conditions || termsConditionsDummy);

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
      <ItemsMultipleInput
        items={itineraries}
        setItems={setItineraries}
        label={"Itineraries"}
        placeholder="Enter itinerary item"
      />

      {/* Includes */}
      <ItemsMultipleInput
        items={includes}
        setItems={setIncludes}
        label={"Includes"}
        placeholder="Enter included items"
      />

      {/* Pick Up Areas */}
      <div className="col-span-2">
        <CheckboxMultipleInput
          label={"Pickup Areas"}
          placeholder={"Add new pickup areas"}
          items={pickUpAreas}
          setItems={setPickUpAreas}
          selectedItems={selectedPickUpAreas}
          setSelectedItems={setSelectedPickUpAreas}
        />
      </div>
      {/* Terms & Conditions */}
      <div className="col-span-2">
        <CheckboxMultipleInput
          label={"Terms & Conditions"}
          placeholder={"Add new terms & conditions"}
          items={termsConditions}
          setItems={setTermsConditions}
          selectedItems={selectedTermsConditions}
          setSelectedItems={setSelectedTermsConditions}
        />
      </div>
      <div className="col-span-2 text-right">
        <button
          type="button"
          onClick={() => handleNextToImages(1)} // Navigate to images accordion
          className="btn btn-primary"
        >
          Next: Images
        </button>
      </div>
    </div>
  );
};

export default InitialForm;
