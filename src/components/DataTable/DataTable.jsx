import React from 'react';
import { useTable, useRowSelect } from 'react-table';

import './DataTable.css'

const DataTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      { Header: 'Index', accessor: 'index' },
      { Header: 'Brand Name', accessor: 'brandName' },
      { Header: 'Product Type', accessor: 'productType' },
      { Header: 'Plan Name', accessor: 'planName' },
      { Header: 'Charge', accessor: 'charge' },
      { Header: 'Tax', accessor: 'tax' },
      { Header: 'Total', accessor: 'total' },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => {
            const props = getToggleAllRowsSelectedProps();
            return (
              <input
                type="checkbox"
                {...props}
                indeterminate={props.indeterminate ? "true" : undefined}
              />
            );
          },
          Cell: ({ row }) => {
            const props = row.getToggleRowSelectedProps();
            return (
              <input
                type="checkbox"
                {...props}
                indeterminate={props.indeterminate ? "true" : undefined}
              />
            );
          },
        },
        ...columns,
      ]);
    }
  );
  // const display =(data)=> {
  //   console.log(data);
  // }

  return (
    <table {...getTableProps()} className="data-table">
      <thead>
        {headerGroups.map(headerGroup => {
          const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
          // display(headerGroup.getHeaderGroupProps)
          return (
            <tr key={key} {...restHeaderGroupProps}>
              {headerGroup.headers.map(column => {
                const { key, ...restColumnProps } = column.getHeaderProps();
                return (
                  <th key={key} {...restColumnProps}>
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr key={key} {...restRowProps}>
              {row.cells.map(cell => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td key={key} {...restCellProps} >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
