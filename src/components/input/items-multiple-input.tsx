import { useState } from "react";
import { FieldError, Merge } from "react-hook-form";
import { GoDotFill } from "react-icons/go";

interface ItemsMultipleInputProps {
  label: string;
  placeholder: string;
  items: string[];
  setItems: (items: string[]) => void;
  errors: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}
const ItemsMultipleInput: React.FC<ItemsMultipleInputProps> = ({
  label,
  placeholder,
  items,
  setItems,
  errors,
}) => {
  const [itemInput, setItemInput] = useState<string>("");
  const handleAddItem = () => {
    if (itemInput.length > 0) {
      setItems([...items, itemInput]);
      setItemInput("");
    }
  };
  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };
  return (
    <>
      <div className="col-span-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-slate-700">{label}</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={itemInput}
              onChange={(e) => setItemInput(e.target.value)}
              placeholder={placeholder}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleAddItem();
                }
              }}
              className={`input input-bordered w-full ${
                errors ? "input-error" : ""
              }`}
            />

            <button
              type="button"
              onClick={handleAddItem}
              className="btn btn-primary "
            >
              Add
            </button>
          </div>
          {errors && <div className="text-error text-sm">{errors.message}</div>}
        </label>
        <ul
          className={` ${
            items.length == 0 && "hidden"
          }  list-disc px-3 mt-3 border p-1 rounded-lg grid grid-cols-2 gap-2`}
        >
          {items.map((item, index) => (
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
                onClick={() => handleRemoveItem(index)}
                className="btn btn-xs btn-error text-white"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ItemsMultipleInput;
