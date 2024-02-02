import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import addUser from "../actions";
import ButtonComponent from "./ButtonComponent";
import styled from "styled-components";
import DataTable from "react-data-table-component";

const tableCustomStyles = {
  headCells: {
    style: {
      fontSize: "15px",
      fontWeight: "bold",
      justifyContent: "center",
    },
  },
  Header: "Action",
  columns: [
    {
      accessor: "Action",
      Cell: (row) => <div style={{ textAlign: "Center" }}>{row.value}</div>,
    },
  ],
};

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <TextField
      id="search"
      type="text"
      placeholder="Filter By Name"
      aria-label="Search Input"
      value={filterText}
      onChange={onFilter}
    />
  </>
);

export const Filtering = (props) => {
  const userList = Object.values(props);
  const [data, setData] = useState([]);
  useEffect(() => {
  setData(userList)
  }, [props]);


  const [filterText, setFilterText] = React.useState("");

  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  const columns = [
    {
      name: "First Name",
      selector: (row) => row.user.firstName,
      sortable: true,
    },
    {
      name: "Last Name",
      selector: (row) => row.user.lastName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.user.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.user.phone,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.user.gender,
      sortable: true,
    },
    {
      name: "Country",
      selector: (row) => row.user.country,
      sortable: true,
    },
    {
      name: "Hobbies",
      selector: (row) => row.user.hobbies.join(", "),
      sortable: true,
    },
    {
      name: "Languages",
      selector: (row) => row.user.languages.join(', '),
      sortable: true,
    },

    {
      name: "Action",
      cell: (row, index) => <ButtonComponent user={index} getData={getData} />,
    },
  ];
  const filteredItems = data.filter(
    (item) =>
      item.firstName &&
      item.firstName.toLowerCase().includes(filterText.toLowerCase())
  );

  const getData = (receivedData) => {
    setData(receivedData);
    console.log("this is edited data" + JSON.stringify(receivedData));
  };

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <DataTable
      title="Data List"
      columns={columns}
      data={data} 
      pagination
      paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
      subHeader
      subHeaderComponent={subHeaderComponentMemo}
      selectableRows
      persistTableHead
      customStyles={tableCustomStyles}
    />
  );
};

const mapStateToProps = (state) => ({
  ...state,
});
const mapDispatchToProps = (dispatch) => ({
 
});

export default connect(mapStateToProps, mapDispatchToProps)(Filtering);
