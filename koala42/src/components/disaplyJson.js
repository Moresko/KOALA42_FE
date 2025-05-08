import React, { useState } from "react";
import "../App.css";
import aData from "../example-data.json";
import { LiaBanSolid } from "react-icons/lia";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";

const Row = ({ row, level = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Object.values(row.children).some(
    (group) => group.records.length > 0
  );
  const dataKeys = Object.keys(row.data);

  const toggle = () => {
    setExpanded((prev) => !prev);
  };

  const renderChildren = (children) => {
    return Object.values(children).flatMap((group, groupIndex) =>
      group.records.map((child, index) => (
        <Row
          key={`${child.data.ID || child.data["Nemesis ID"] || child.data["Secrete Code"]}-${groupIndex}-${index}`}
          row={child}
          level={level + 1}
        />
      ))
    );
  };

  const childDataKeys = hasChildren
    ? Object.keys(Object.values(row.children)[0].records[0].data)
    : [];

  return (
    <>
      <tr onClick={toggle}>
        <td>
          {hasChildren && <span>{expanded ? <SlArrowDown /> : <SlArrowRight />}</span>}
        </td>
        {dataKeys.map((key) => (
          <td key={key}>{row.data[key].toString()}</td>
        ))}
        <td className="button-delete">
          <LiaBanSolid />
        </td>
      </tr>

      {expanded && hasChildren && (
        <tr>
          <td colSpan={dataKeys.length + 2}>
            <table>
              <thead>
                <tr>
                  <th></th>
                  {childDataKeys.map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                  <th>Delete</th>
                </tr>
              </thead>
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