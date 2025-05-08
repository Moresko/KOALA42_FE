import React from "react";
import aData from "../example-data.json";
import "../App.css"

const Display = () => {
   
    return (
        <div className="App">
           <table >
                <thead>
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
                </thead>
                <tbody>
                    {
                        aData.map((row, i) => (
                            <tr key={i}>
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
                                    <button>ok</button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
           </table>
        </div>
    );
};

export default Display;