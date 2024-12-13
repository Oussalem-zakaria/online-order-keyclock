import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { FaFilter, FaSort } from "react-icons/fa";

const SearchAndFilter = ({
  onSearch,
  onSort,
  btnName,
  sortedByColumns,
  children,
  DialogSize,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [size, setSize] = React.useState(null);
  const primaryColor = useSelector((state) => state.settings.primaryColor);

  const handleOpen = (value) => setSize(value);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { handleOpen });
    }
    return child;
  });

  return (
    <div className="flex flex-col space-y-4 items-center lg:space-y-0 lg:flex-row lg:items-center lg:justify-between p-4 bg-white w-full">
      <div className={`${btnName ? 'lg:w-1/2 w-full' : 'w-full'}`}>
        <input
          type="text"
          placeholder="Recherche"
          value={searchTerm}
          onChange={handleSearchChange}
          className={`p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
      </div>
      <div className="flex flex-col space-y-4 lg:space-x-5 lg:flex-row lg:space-y-0">
        {/*  */}
        {btnName && (
          <>
            <Button
              onClick={() => handleOpen(DialogSize)}
              variant="gradient"
              color="blue"
              className="bg-blue-500"
            >
              {btnName}
            </Button>
            <Dialog open={size === DialogSize} size={size} handler={handleOpen}>
              <DialogHeader>{btnName}</DialogHeader>
              <DialogBody className="h-[42rem] overflow-scroll">
                <div className="lg:container">{childrenWithProps}</div>
              </DialogBody>
            </Dialog>
          </>
        )}

        {/*  */}
        <div className="lg:ml-4 flex space-x-1 justify-center items-center">
          <FaSort size={15} />
          <select
            onChange={(e) => onSort(e.target.value)}
            className="p-2 border rounded-md focus:outline-none focus:ring-2"
          >
            <option value="">Trier par</option>
            {sortedByColumns.map((option) => (
              <option key={option.field} value={option.field}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
