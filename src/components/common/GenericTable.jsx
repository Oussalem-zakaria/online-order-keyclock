import React, { useEffect, useState } from "react";
import { FaChevronRight, FaEdit, FaTrash } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { useLocation } from "react-router-dom";

const GenericTable = ({
  columns,
  data,
  rowsPerPage = 5,
  DialogContent = null,
  FormElement = null,
  deleteHandler,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const currentUser = useSelector((state) => state.user.currentUser);
  const [permissions, setPermissions] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [size, setSize] = React.useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const primaryColor = useSelector((state) => state.settings.primaryColor);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(data.length / rowsPerPage);

  const handleOpen = (value, row = null, edit = false) => {
    setSize(value);
    setSelectedRow(row);
    setIsEdit(edit);
  };

  const handleDelete = (row) => {
    deleteHandler(row);
    handleOpen(null);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    if (currentUser) {
      const rolePermissions = currentUser.permissions;
      setPermissions(rolePermissions);
    }
    console.log("DATA *******", data);
  }, [currentUser]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border shadow">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="px-4 py-3 border-b border-gray-200 bg-gray-100 font-semibold text-left text-xs leading-4 text-gray-700 uppercase tracking-wider"
              >
                {column.label}
              </th>
            ))}
            <th className="px-4 py-3 border-b border-gray-200 bg-gray-100 font-semibold text-left text-xs leading-4 text-gray-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(
                (column, colIndex) => (
                  (
                    <td
                      key={colIndex}
                      className="px-4 py-3 whitespace-no-wrap border-b border-gray-200"
                    >
                      {column.field === "status" ? (
                        <span
                          className={`relative inline-block px-3 py-1 font-medium leading-tight text-center 
        ${
          row.data.status === "En attente"
            ? "text-yellow-900 bg-yellow-100"
            : row[column.field] === "Confirmé"
            ? "text-blue-900 bg-blue-100"
            : row[column.field] === "Annulé"
            ? "text-red-900 bg-red-100"
            : row[column.field] === "Complété"
            ? "text-green-900 bg-green-100"
            : ""
        } 
        rounded-full`}
                        >
                          <span className="relative">{row[column.field]}</span>
                        </span>
                      ) : (
                        <span>{row[column.field]}</span>
                      )}
                    </td>
                  )
                )
              )}

              <td className="px-4 py-3 whitespace-no-wrap border-b border-gray-200">
                <div className="flex space-x-6">
                  {/* {permissions && permissions.update && ( */}
                  <div>
                    <button
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => {
                        handleOpen("xxl", row, true);
                        console.log("Edit: ", row);
                      }}
                    >
                      <FaEdit />
                    </button>
                  </div>
                  {/* )} */}
                  {location.pathname === "/user/reportingproblems/issues" && (
                    <div>
                      <button
                        className="text-blue-500 hover:text-blue-600"
                        onClick={() => {
                          handleOpen("xxl", row, true);
                          console.log("Edit: ", row);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </div>
                  )}
                  {/* {permissions && permissions.delete && ( */}
                  <div>
                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => {
                        setIsDelete(true);
                        handleOpen("sm", row.data);
                        console.log("Delete", row);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                  {/* )} */}
                  {location.pathname === "/user/reportingproblems/issues" && (
                    <div>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => {
                          setIsDelete(true);
                          handleOpen("sm", row.data);
                          console.log("Delete", row);
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                  <div>
                    <button
                      className="text-gray-500 hover:text-gray-600"
                      onClick={() => {
                        handleOpen("xxl", row);
                        console.log("More", row);
                      }}
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <Dialog
        open={size === "xxl"}
        size={"xxl"}
        handler={() => handleOpen(null)}
      >
        <DialogHeader>{isEdit ? "Modifier" : "Détails"}</DialogHeader>
        <DialogBody className="h-[42rem] overflow-scroll">
          <div className="container">
            {isEdit ? (
              <FormElement
                btnName={"Modifier"}
                data={selectedRow}
                isEdit={isEdit}
                handleOpen={handleOpen}
              />
            ) : DialogContent && selectedRow ? (
              <DialogContent data={selectedRow} />
            ) : (
              "More ..."
            )}
          </div>
        </DialogBody>
        {!isEdit && (
          <div className="container">
            <DialogFooter>
              <Button
                variant="text"
                color="red"
                onClick={() => handleOpen(null)}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                className="bg-blue-500"
                onClick={() => handleOpen(null)}
              >
                <span>Confirm</span>
              </Button>
            </DialogFooter>
          </div>
        )}
      </Dialog>

      <Dialog open={size === "sm"} size={"sm"} handler={() => handleOpen(null)}>
        <DialogHeader>Suppression</DialogHeader>
        <DialogBody>
          <h2 className="text-2xl font-semiBold">
            Êtes-vous sûr de vouloir supprimer cette ligne ?
          </h2>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleOpen(null)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            className="bg-blue-500"
            onClick={() => handleDelete(selectedRow)}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default GenericTable;
