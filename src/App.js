import React, { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [data, setData] = useState([]);
  const [isComparing, setCcomparing] = useState([]);
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos/?_limit=15")
      .then((res) => res.json())
      .then((result) => {
        setData(result);
      });
  }, []);
  const handleCompare = (item) => {
    let currentItem = isComparing;
    currentItem.push(item.id);
    setCcomparing(currentItem);
    setCompareData((prev) => [...prev, ...[item]]);
  };
  const handleRemove = (delId) => {
    const currItem = isComparing.filter((item) => item !== delId);
    setCcomparing(currItem);
    const filterData = compareData?.filter((dt) => dt.id !== delId);
    setCompareData(filterData);
  };
  return (
    <div className="App">
      <div class="container">
        <div class="row">
          {data.map((item) => {
            const { title, thumbnailUrl, url } = item;
            return (
              <div key={item.id} class="col-sm cardContainer">
                <div className="card">
                  <img
                    style={{ height: 200 }}
                    className="card-img-top"
                    src={thumbnailUrl}
                    alt="Card image cap"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{url}</p>
                    <button
                      onClick={() =>
                        isComparing.includes(item.id)
                          ? handleRemove(item.id)
                          : handleCompare(item)
                      }
                      type="button"
                      className={`btn btn-${
                        !isComparing.includes(item.id) ? "primary" : "danger"
                      }`}
                    >
                      {!isComparing.includes(item.id) ? "Compare" : "Remove"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <br />
      <h3>Comparing items</h3>
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Url</th>
          </tr>
        </thead>
        <tbody>
          {compareData.length !== 0 &&
            compareData.map((dt) => {
              return (
                <>
                  <tr>
                    <td>
                      <img
                        style={{ height: 100 }}
                        className="card-img-top"
                        src={dt.thumbnailUrl}
                        alt="Card image cap"
                      />
                    </td>
                    <td>{dt.id}</td>
                    <td>{dt.title}</td>
                    <td>{dt.url}</td>
                  </tr>
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
