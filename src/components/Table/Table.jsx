import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import authStore from "../../store/authStore";
import "./Table.scss";
import { FaTimesCircle } from "react-icons/fa";
import EditTicket from "../EditTicketModal/EditTicket";
import dots from "../../assests/images/dots.svg";
const Table = observer(
  ({
    data,
    headers,
    onPostUpdate,
    pagination = false,
    filter = false,
    actions = false,
    panelPage = true,
    setOpenSideDetailsBar,
  }) => {
    const [modalImage, setModalImage] = useState(null);
    const [filterText, setFilterText] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const handleUpdatePost = (updatedPost) => {
      onPostUpdate?.(updatedPost);
    };

    const columns = Object.keys(headers);

    // Status styles
    const statusStyles = {
      Open: {
        color: "#2a4a1b",
        backgroundColor: "#e5ffd9",
        border: "1px solid #56e116",
        opacity: "0.8",
      },
      Closed: {
        color: "#ff5b55",
        backgroundColor: "#ffdedd",
        border: "1px solid #ff5b55",
        opacity: "0.7",
      },
      "On Hold": {
        color: "#835fd3",
        backgroundColor: "#ebe2ff",
        border: "1px solid #835fd3",
        opacity: "0.6",
      },
      "In Progress": {
        color: "#bc8700",
        backgroundColor: "#ffd25f",
        border: "1px solid #bc8700",
        opacity: "0.8",
      },
    };

    // Filter and paginate data
    const filteredData = data.filter((row) =>
      columns.some(
        (key) =>
          key !== "imageData" &&
          row[key]
            ?.toString()
            ?.toLowerCase()
            ?.includes(filterText?.toLowerCase())
      )
    );

    const paginatedData = filteredData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);

    const handleImageClick = (imageSrc) => setModalImage(imageSrc);
    const closeModal = () => setModalImage(null);
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

    // Render status with styles
    const renderStatus = (status) => {
      const style = statusStyles[status] || {};
      return (
        <div
          style={{
            ...style,
            borderRadius: "5px",
            padding: "4px 8px",
            width: "105px",
            margin: "auto",
          }}
        >
          {status}
        </div>
      );
    };

    // Render table cell
    const renderTableCell = (key, row) => {
      if (key === "imageData") {
        return row?.imageData ? (
          <div className="image-wrapper">
            <img
              src={`${row?.imageMimeType},${row?.imageData}`}
              alt="Row Visual"
              onClick={() => handleImageClick(row?.imageData)}
            />
          </div>
        ) : (
          "No Image"
        );
      } else if (key === "createdAt") {
        return formatDate(
          new Date(row?.updatedAt) > new Date(row?.createdAt)
            ? row?.updatedAt
            : row?.createdAt
        );
      } else if (key === "status") {
        return renderStatus(row[key]);
      } else if (key === "description") {
        return <div>{row[key]}</div>;
      } else {
        return row[key] || "N/A";
      }
    };

    return (
      <div className="table-container">
        {/* Header with Filter */}
        {filter && (
          <header className="table-header">
            {filterText?.length > 0 && (
              <FaTimesCircle
                className="remove-filter"
                onClick={() => setFilterText("")}
              />
            )}
            <input
              className="form-control"
              type="text"
              placeholder="Filter by any text..."
              value={filterText}
              onChange={(e) => handleFilter(e.target.value)}
            />
          </header>
        )}

        <div className={`table-wrapper ${pagination ? "" : "no-pagination"}`}>
          <table>
            <thead>
              <tr>
                {columns?.map((key) => (
                  <th key={key} style={{ width: headers[key]?.width }}>
                    {headers[key]?.label}
                  </th>
                ))}
                {isAdmin && actions && (
                  <th style={{ width: "20%" }}>Actions</th>
                )}
                {panelPage && <th style={{ width: "5%" }}></th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData?.map((row) => (
                <tr key={row?.id}>
                  {columns.map((key) => (
                    <td
                      key={key}
                      style={{ width: headers[key]?.width }}
                      className={
                        key === "description" ? "description-style" : ""
                      }
                    >
                      {renderTableCell(key, row)}
                    </td>
                  ))}
                  {panelPage && (
                    <td style={{ width: "5%" }}>
                      <img
                        onClick={() => setOpenSideDetailsBar(true)} // Trigger state change to open sidebar
                        src={dots}
                        className="panel-page-side"
                        alt="dots"
                      />
                    </td>
                  )}
                  {isAdmin && actions && (
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
        {pagination && (
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
                disabled={
                  currentPage === totalPages || filteredData?.length === 0
                }
              >
                Next
              </button>
            )}
          </div>
        )}

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
  }
);

export default Table;
