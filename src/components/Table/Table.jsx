import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import "./Table.scss";
import { FaTimesCircle } from "react-icons/fa";
import EditTicket from "../EditTicketModal/EditTicket";

const Table = observer(({ data, headers, onPostUpdate }) => {
  const [modalImage, setModalImage] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleUpdatePost = (updatedPost) => {
    onPostUpdate?.(updatedPost);
  };

  const columns = Object.keys(headers);

  // Filter and Paginate Data Dynamically
  const filteredData = data.filter((row) =>
    columns.some(
      (key) =>
        key !== "imageData" &&
        row[key]?.toString()?.toLowerCase()?.includes(filterText?.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleImageClick = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  const handleFilter = (searchTerm) => {
    setFilterText(searchTerm);
    setCurrentPage(1);
  };

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date)
      ? "Invalid Date"
      : new Intl.DateTimeFormat("en-GB").format(date);
  };

  const isAdmin = authStore?.userRole === "Admin";

  return (
    <div className="table-container">
      {/* Header with Filter */}
      <header className="table-header">
        {filterText?.length > 0 && (
          <FaTimesCircle
            className="remove-filter"
            onClick={() => setFilterText("")}
          ></FaTimesCircle>
        )}
        <input
          className="form-control"
          type="text"
          placeholder="Filter by any text..."
          value={filterText}
          onChange={(e) => handleFilter(e.target.value)}
        />
      </header>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              {columns?.map((key) => (
                <th key={key} style={{ width: headers[key]?.width }}>
                  {headers[key]?.label}
                </th>
              ))}
              {isAdmin && <th style={{ width: "20%" }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((row) => (
              <tr key={row?.id}>
                {columns.map((key) => (
                  <td key={key} style={{ width: headers[key]?.width }}>
                    {key === "imageData" ? (
                      row?.imageData ? (
                        <img
                          src={`${row?.imageMimeType},${row?.imageData}`}
                          alt="Row Visual"
                          onClick={() => handleImageClick(row?.imageData)}
                        />
                      ) : (
                        "No Image"
                      )
                    ) : key === "createdAt" ? ( // Check for issuedDate key
                      formatDate(
                        new Date(row?.updatedAt) > new Date(row?.createdAt)
                          ? row?.updatedAt
                          : row?.createdAt
                      )
                    ) : (
                      row[key] || "N/A"
                    )}
                  </td>
                ))}
                {isAdmin && (
                  <td style={{ width: "15%" }}>
                    <div className="group-buttons">
                      <EditTicket data={row} onSave={handleUpdatePost} />
                      <button
                        className="delete-button"
                        onClick={() => alert(`Action for row: ${row.id}`)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        {filteredData?.length > 0 && (
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1 || filteredData?.length === 0}
          >
            Previous
          </button>
        )}
        <span>
          {filteredData.length === 0
            ? "No data available"
            : `Page ${currentPage} of ${totalPages}`}
        </span>
        {filteredData?.length > 0 && (
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages || filteredData?.length === 0}
          >
            Next
          </button>
        )}
      </div>

      {/* Modal for Image */}
      {modalImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Full-size view" />
          </div>
        </div>
      )}
    </div>
  );
});

export default Table;
