import "./styles.css";
import _ from "underscore";
import { useEffect, useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("");
  const [firstNo, setFirstNo] = useState([]);
  const [secondNo, setSecondNo] = useState([]);
  const [independentNo, setIndependentNo] = useState("");
  const [slidesPerPage, setSlidesPerPage] = useState(2);
  const [showAdv, setShowAdv] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handlePageCount = (value, add = 0) => {
    console.clear();
    // let slidesPerPage = 2;

    // let value = e.target.value;

    if (value == "" || slidesPerPage > parseInt(value)) {
      setMsg("Enter valid number");
      setFirstNo([]);
      setSecondNo([]);
      return;
    }
    let range = _.range(1 + add, parseInt(value) + 1 + add);
    console.log("range", range);
    let chunks = _.chunk(range, slidesPerPage);
    let { first, second } = splitArray(chunks);
    if (first.length != second.length) {
      setMsg("Remove a page");
    } else {
      setMsg("");
    }
    let secondChunks = _.chunk(second, slidesPerPage);
    secondChunks = secondChunks.reverse();
    if (secondChunks[0]?.length < slidesPerPage) {
      setIndependentNo(secondChunks[0].join(","));
      secondChunks.shift();
      setMsg("");
    } else {
      setIndependentNo("");
    }
    secondChunks = _.flatten(secondChunks);

    setFirstNo(first.join(","));
    setSecondNo(secondChunks.join(","));
  };

  const splitArray = (candid) => {
    var oddOnes = [],
      evenOnes = [];
    for (var i = 0; i < candid.length; i++)
      (i % 2 == 0 ? evenOnes : oddOnes).push(candid[i]);
    // return [evenOnes, oddOnes];
    return { first: _.flatten(evenOnes), second: _.flatten(oddOnes) };
  };
  const toggleAdvanced = () => {
    setShowAdv(!showAdv);
    setFirstNo([]);
    setSecondNo([]);
    setMsg("");
    setIndependentNo("");
    setStart("");
    setEnd("");
  };
  const handleStart = (e) => {
    setStart(parseInt(e.target.value));
    // advancedUtil();
  };
  const handleEnd = (e) => {
    setEnd(parseInt(e.target.value));
    // advancedUtil();
  };
  useEffect(() => {
    advancedUtil();
  }, [start, end]);
  const advancedUtil = () => {
    console.log("in adv mode", start, end);
    if (!isNaN(start) && !isNaN(end) && start < end && start >= 0 && end >= 0) {
      console.log("in advanced trigger success");
      handlePageCount(end - start, start);
    } else {
      console.log("in advanced mode failed");
      if (isNaN(start) || start == "") {
        setMsg("Start should be a number");
      }

      if (isNaN(end) || end == "") {
        setMsg("End should be a number");
      }
      if (start >= end) {
        setMsg("Start should be less than End");
      }
      setFirstNo([]);
      setSecondNo([]);
      setIndependentNo("");
    }
  };
  return (
    <div className="App">
      <h1>Hello</h1>
      <button onClick={toggleAdvanced}>
        {showAdv ? "normal" : "advanced"}
      </button>
      <br />
      {!showAdv && (
        <>
          {" "}
          No of slides :{" "}
          <input
            type="text"
            onChange={(e) => handlePageCount(e.target.value, 0)}
          />
        </>
      )}
      {showAdv && (
        <>
          <div>in advanced mode</div>
          <div>
            start : <input type="text" onChange={handleStart} />
          </div>
          <div>
            end : <input type="text" onChange={handleEnd} />
          </div>
        </>
      )}

      <h2 id="firstPageNumbers">{firstNo}</h2>
      <h2 id="AddInfo">{msg}</h2>
      <h2 id="independentNo">{independentNo}</h2>
      <h2 id="SecondPageNumbers">{secondNo}</h2>
    </div>
  );
}
