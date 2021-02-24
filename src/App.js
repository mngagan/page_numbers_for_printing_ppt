import "./styles.css";
import _ from "underscore";
import { useState } from "react";

export default function App() {
  const [msg, setMsg] = useState("");
  const [firstNo, setFirstNo] = useState([]);
  const [secondNo, setSecondNo] = useState([]);
  const [independentNo, setIndependentNo] = useState("");
  const [slidesPerPage, setSlidesPerPage] = useState(2);

  const handlePageCount = (e) => {
    console.clear();
    // let slidesPerPage = 2;

    let value = e.target.value;

    if (value == "" || slidesPerPage > parseInt(value)) {
      setMsg("Enter valid number");
      setFirstNo([]);
      setSecondNo([]);
      return;
    }
    let range = _.range(1, parseInt(value) + 1);
    let chunks = _.chunk(range, slidesPerPage);
    let { first, second } = splitArray(chunks);
    console.log("in change event triggerd", first, second);
    // if (first.length - second.length >= slidesPerPage) {
    //   console.log("REMOVE A PAGE 123");
    //   setMsg("Remove a page");
    // } else {
    //   setMsg("");
    // }
    if (first.length != second.length) {
      console.log("REMOVE A PAGE 456");
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
    console.log("----", first.length, secondChunks.length);
  };

  const splitArray = (candid) => {
    var oddOnes = [],
      evenOnes = [];
    for (var i = 0; i < candid.length; i++)
      (i % 2 == 0 ? evenOnes : oddOnes).push(candid[i]);
    // return [evenOnes, oddOnes];
    return { first: _.flatten(evenOnes), second: _.flatten(oddOnes) };
  };

  return (
    <div className="App">
      <h1>Hello</h1>
      No of slides : <input type="text" onChange={handlePageCount} />
      <h2 id="firstPageNumbers">{firstNo}</h2>
      <h2 id="AddInfo">{msg}</h2>
      <h2 id="independentNo">{independentNo}</h2>
      <h2 id="SecondPageNumbers">{secondNo}</h2>
    </div>
  );
}
