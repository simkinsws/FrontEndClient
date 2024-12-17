import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore"; // Adjust the import path as needed
import "./Table.scss";

const Table = observer(({ data, headers }) => {
  const [modalImage, setModalImage] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const columns = Object.keys(headers);

  // Filter and Paginate Data Dynamically
  const filteredData = data.filter((row) =>
    columns.some(
      (key) =>
        key !== "imageData" &&
        row[key]?.toString().toLowerCase().includes(filterText.toLowerCase())
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
    setCurrentPage(1); // Reset to the first page on filter
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
        <input
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
              {columns.map((key) => (
                <th key={key} style={{ width: headers[key].width }}>
                  {headers[key].label}
                </th>
              ))}
              {isAdmin && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row) => (
              <tr key={row.id}>
                {columns.map((key) => (
                  <td key={key} style={{ width: headers[key].width }}>
                    {key === "imageData" ? (
                      row.imageData ? (
                        <img
                          src={row.imageData}
                          alt="Row Visual"
                          onClick={() => handleImageClick(row.imageData)}
                        />
                      ) : (
                        "No Image"
                      )
                    ) : key === "createdAt" ? (
                      formatDate(row[key])
                    ) : (
                      row[key] || "N/A"
                    )}
                  </td>
                ))}
                {isAdmin && (
                  <td>
                    <button onClick={() => alert(`Action for row: ${row.id}`)}>
                      Action
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
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
