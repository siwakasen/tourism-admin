import { useState } from "react";

interface CheckboxMultipleInputProps {
  label: string;
  placeholder: string;
  items: string[];
  setItems: (items: string[]) => void;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  errors: string;
}

const CheckboxMultipleInput: React.FC<CheckboxMultipleInputProps> = ({
  label,
  placeholder,
  items,
  setItems,
  selectedItems,
  setSelectedItems,
  errors,
}) => {
  const [itemsInput, setItemsInput] = useState<string>("");

  const handleAddSelectedItem = (item: string) => {
    setSelectedItems([...selectedItems, item]);
  };
  const handleAddItem = () => {
    if (itemsInput.trim()) {
      setItems([...items, itemsInput.trim()]);
      setItemsInput("");

      handleAddSelectedItem(itemsInput.trim());
    }
  };

  const handleCheckboxItems = (input: string) => {
    if (selectedItems.includes(input)) {
      setSelectedItems(selectedItems.filter((item) => item !== input));
    } else {
      setSelectedItems([...selectedItems, input]);
    }
  };

  return (
    <>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text text-slate-700">{label}</span>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={itemsInput}
            onChange={(e) => setItemsInput(e.target.value)}
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
        {errors && <div className="text-error text-sm">{errors}</div>}
      </label>
      {/* List of Pick Up Areas */}
      <ul
        className={` ${
          items.length == 0 && "hidden"
        }  list-disc px-3 mt-3 border p-1 rounded-lg grid grid-cols-2 gap-2`}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-2 border-b border-gray-200 gap-2 hover:bg-gray-100 "
          >
            <span className="flex items-center gap-2  overflow-auto">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox "
                onClick={() => handleCheckboxItems(item)}
              />
              <span>{item}</span>
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CheckboxMultipleInput;
