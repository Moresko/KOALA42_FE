import React, { useState } from "react";
import "../App.css";
import aData from "../example-data.json";
import { LiaBanSolid } from "react-icons/lia";
import { SlArrowRight, SlArrowDown } from "react-icons/sl";

const deleteElement = (n, dataToDelete) => {
    const deleteN = (nList) => {
        return nList
        .filter((node) => node !== dataToDelete)
        .map((node) => {
            let newCh = {};
            for (const [rel, { records }] of Object.entries(node.children || {})) 
            {
                const filtered = deleteN(records);
                if (filtered.length > 0) 
                {
                    newCh[rel] = { records: filtered };
                }
            }
            return {
            ...node,
            children: newCh,
            };
        });
  };

  return deleteN(n);
};

const Line = ({ LineOfData, level, onDelete }) => {
    const [idDown, setDown] = useState(false);
    const hasMoreElements = Object.values(LineOfData.children).some(
    (group) => group.records.length > 0
    );

    let dataKeys = Object.keys(LineOfData.data);

    const clickDownArrow = () => setDown((swch) => !swch);

    const displayChilderElement = (children) => {
    return Object.values(children).flatMap((group, groupIndex) =>
        group.records.map((child, index) => (
        <Line
            key={`${
            child.data.ID || child.data["Nemesis ID"] || child.data["Secrete Code"]
            }-${groupIndex}-${index}`}
            LineOfData={child}
            level={level + 1}
            onDelete={onDelete}
        />
        ))
        );
    };

    let chKeys = [];

    if (hasMoreElements)
    {
        let chGroup = Object.values(LineOfData.children);
        let fGroup = chGroup[0];
        
        if (fGroup && fGroup.records && fGroup.records[0]) 
        {
            let fRec = fGroup.records[0];
            
            if (fRec.data) {
                chKeys = Object.keys(fRec.data);
            }
        }
    }

    return (
        <>
            <tr onClick={clickDownArrow}>
                <td>
                    {hasMoreElements && (
                    <span>{idDown ? <SlArrowDown /> : <SlArrowRight />}</span>
                    )}
                </td>
                {dataKeys.map((key) => (
                <td key={key}>{LineOfData.data[key].toString()}</td>
                ))}
                <td
                className="button-delete"
                onClick={() => {
                onDelete(LineOfData); 
                }}
                >
                    <LiaBanSolid />
                </td>
            </tr>

            {idDown && hasMoreElements && (
            <tr>
                <td colSpan={dataKeys.length + 2}>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {chKeys.map((key) => (
                                <th key={key}>{key}</th>
                                ))}
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>{displayChilderElement(LineOfData.children)}</tbody>
                    </table>
                </td>
            </tr>
            )}
        </>
    );
};

const Display = () => {
    const [data, setData] = useState(aData);

    const clickDelete = (dataToDelete) => {
    let newData = deleteElement(data, dataToDelete);
    setData(newData);
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
                {data.map((LineOfData, index) => (
                <Line key={index} LineOfData={LineOfData} onDelete={clickDelete} />
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default Display;
