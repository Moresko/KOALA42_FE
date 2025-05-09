import React, { useState } from "react";
import "../App.css";
import aData from "../example-data.json";
import { LiaBanSolid } from "react-icons/lia";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";

const deleteElement = (nodes, idToDelete) => {
  const cleanChildren = (children) => {
    const cleaned = {};
    for (const [relation, { records }] of Object.entries(children || {})) {
      const newRecords = records
        .filter((child) => child.data.ID !== idToDelete)
        .map((child) => ({
          ...child,
          children: cleanChildren(child.children),
        }));
      if (newRecords.length > 0) {
        cleaned[relation] = { records: newRecords };
      }
    }
    return cleaned;
  };

  return nodes
    .filter((node) => node.data.ID !== idToDelete)
    .map((node) => ({
      ...node,
      children: cleanChildren(node.children),
    }));
};

const Row = ({ row, level = 0, onDelete }) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Object.values(row.children).some(
    (group) => group.records.length > 0
  );
  let dataKeys = Object.keys(row.data);

  const toggle = () => {
    setExpanded((prev) => !prev);
  };

  const renderChildren = (children) => {
    return Object.values(children).flatMap((group, groupIndex) =>
      group.records.map((child, index) => (
        <Row
          key={`${
            child.data.ID || child.data["Nemesis ID"] || child.data["Secrete Code"]
          }-${groupIndex}-${index}`}
          row={child}
          level={level + 1}
          onDelete={onDelete}
        />
      ))
    );
  };

  let childDataKeys = [];

  if (hasChildren) {
    const childrenValues = Object.values(row.children);
    const firstChild = childrenValues[0];
    const firstRecord = firstChild.records[0];
  
    if (firstRecord && firstRecord.data) {
      childDataKeys = Object.keys(firstRecord.data);
    }
  }

  return (
    <>
      <tr onClick={toggle}>
        <td>
          {hasChildren && (
            <span>{expanded ? <SlArrowDown /> : <SlArrowRight />}</span>
          )}
        </td>
        {dataKeys.map((key) => (
          <td key={key}>{row.data[key].toString()}</td>
        ))}
        <td className="button-delete" onClick={() => {
            onDelete(row.data.ID);
          }}
        >
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
  const [data, setData] = useState(aData);

  const handleDelete = (id) => {
    const updatedData = deleteElement(data, id);
    setData(updatedData);
  };

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
          {data.map((row, index) => (
            <Row key={row.data + index} row={row} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Display;
