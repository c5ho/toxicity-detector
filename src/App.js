import React, { useRef, useState } from "react";
import { load } from "@tensorflow-models/toxicity";

const threshold = 0.9;
export default function App() {
  const textarea = useRef();
  const [toxicity, setToxicity] = useState("---");

  const check = () => {
    console.log(textarea.current.value);

    load(threshold).then((model) => {
      console.log("Model loaded...");
      return model.classify(textarea.current.value).then((predictions) => {
        console.log(predictions);
        const isToxic = predictions[6].results[0].match;
        console.log(isToxic);
        setToxicity(isToxic);
        console.log(toxicity);
        return isToxic;
      });
    });
  };
  return (
    <div>
      <textarea style={{ width: "50%" }} ref={textarea} />
      <button onClick={check}>Submit</button>
      <div>{toxicity}</div>
    </div>
  );
}
