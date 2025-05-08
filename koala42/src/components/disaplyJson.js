import React, { useState } from "react";
import "../App.css";
import aData from "../example-data.json";

const Row = ({ row, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Object.keys(row.children).length > 0;

  const toggle = () => {
    setExpanded((prev) => !prev);
  };

  const renderDetails = (data) => {
    const keys = Object.keys(data);
    return (
      <tr>
        <td >
          <table>
            <thead>
              <tr>
                {keys.map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {keys.map((key) => (
                  <td key={key}>{data[key].toString()}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    );
  };

  const renderChildren = (children) => {
    return Object.values(children).flatMap((group) =>
      group.records.map((child, index) => (
        <React.Fragment key={`${child.data.ID}-${index}`}>
          {renderDetails(child.data)}
          {child.children && <Row row={child} />}
        </React.Fragment>
      ))
    );
  };

  return (
    <>
      <tr onClick={toggle}>
        <td>
          {hasChildren && <span>{expanded ? "v" : ">"}</span>}
        </td>
        <td>{row.data.ID}</td>
        <td>{row.data.Name}</td>
        <td>{row.data.Gender}</td>
        <td>{row.data.Ability}</td>
        <td>{row.data["Minimal distance"]}</td>
        <td>{row.data.Weight}</td>
        <td>{row.data.Born}</td>
        <td>{row.data["In space since"]}</td>
        <td>{row.data["Beer consumption (l/y)"]}</td>
        <td>{row.data["Knows the answer?"]}</td>
        <td>
          <button>Delete</button>
        </td>
      </tr>

      {expanded && hasChildren && (
        <tr>
          <td colSpan={12}>
            <table>
              <tbody>{renderChildren(row.children)}</tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};

const Display = () => {
  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Gender</th>
            <th>Ability</th>
            <th>Minimal distance</th>
            <th>Weight</th>
            <th>Born</th>
            <th>In space since</th>
            <th>Beer consumption (l/y)</th>
            <th>Knows the answer?</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {aData.map((row, i) => (
            <Row key={row.data.ID + i} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Display;
