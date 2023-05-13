import React, { useMemo } from 'react';
  import { useTable, usePagination } from 'react-table';

  
  const TableData = ({ columns, data, isLoading, key }) => {
    const columnData = useMemo(() => columns, [columns]);
    const rowData = useMemo(() => data, [data]);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns: columnData,
        data: rowData,
      },
      usePagination,
    );
  return (
    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th
              {...column.getHeaderProps()}
              style={{
                borderBottom: 'solid 3px red',
                background: 'aliceblue',
                color: 'black',
                fontWeight: 'bold',
              }}
            >
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row)
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => {
              return (
                <td
                  {...cell.getCellProps()}
                  style={{
                    padding: '10px',
                    border: 'solid 1px gray',
                    background: 'papayawhip',
                  }}
                >
                  {cell.render('Cell')}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  </table>
  );
};
export default TableData;