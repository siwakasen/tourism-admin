import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

export const tourPackageCreateRoute = "/admin/tour-package/create";
export const tourPackageListRoute = "/admin/tour-package";

export default function CreateTourPackage(): React.ReactElement {
  return (
    <>
      <div className="ps-28 h-full w-full">
        <div className="max-w-screen-xl h-full p-10">
          <h1 className="text-xl font-bold text-slate-700">
            <Link to={tourPackageListRoute} className="inline-block pr-3">
              <IoChevronBack className="inline-block" size={"32px"} />
            </Link>
            Create New Tour Package
          </h1>
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-white pt-4 px-4 pb-8 mt-10">
            {/* Package Name */}
            <div className="col-span-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-700">
                    Package Name
                  </span>
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

            {/* Images */}
            <div className="col-span-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-700">Images</span>
                </div>
                <input
                  type="file"
                  multiple
                  className="file-input file-input-bordered w-full"
                />
              </label>
            </div>

            {/* Package Price */}
            <div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-700">
                    Package Price
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
                  <span className="label-text text-slate-700">
                    Duration (days)
                  </span>
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
                    Max Group Size
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
                    Children Price
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
                <textarea
                  placeholder="Enter itineraries (separate by commas)"
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
              </label>
            </div>

            {/* Includes */}
            <div className="col-span-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-700">Includes</span>
                </div>
                <textarea
                  placeholder="Enter includes (separate by commas)"
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
              </label>
            </div>

            {/* Pickup Areas */}
            <div className="col-span-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-700">
                    Pickup Areas
                  </span>
                </div>
                <textarea
                  placeholder="Enter pickup areas (separate by commas)"
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
              </label>
            </div>

            {/* Terms & Conditions */}
            <div className="col-span-2">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text text-slate-700">
                    Terms & Conditions
                  </span>
                </div>
                <textarea
                  placeholder="Enter terms & conditions (separate by commas)"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </label>
            </div>

            {/* Status */}
            <div className="col-span-2">
              <label className="form-control flex items-center gap-2">
                <span className="label-text text-slate-700">Active</span>
                <input type="checkbox" className="toggle toggle-success" />
              </label>
            </div>

            {/* Submit Button */}
            <div className="col-span-2 text-right">
              <button className="btn btn-primary">Create Package</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
