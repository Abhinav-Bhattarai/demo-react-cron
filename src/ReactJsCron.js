import React, { useState, useRef, useCallback } from "react";
import Cron from "react-js-cron";
import "antd/dist/antd.css";

const Demo = () => {
  const inputRef = useRef(null);
  const defaultValue = "30 5 * * 1,6";
  const [value, setValue] = useState(defaultValue);
  const customSetValue = useCallback(
    (newValue) => {
      setValue(newValue);
      inputRef.current && inputRef.current.setValue(newValue);
    },
    [inputRef]
  );
  const [error, setError] = useState();

  return (
    <div style={{ padding: 20 }}>
      <Cron
        className="my-project-cron"
        value={value}
        setValue={customSetValue}
        setError={setError}
        leadingZero="always"
      />

      <div>
        <span style={{ fontSize: 12 }}>
          Double click on a dropdown option to automatically select / unselect a
          periodicity
        </span>
      </div>

      {error && (
        <p style={{ marginTop: 20 }}>
          Error: {error ? error.description : "undefined"}
        </p>
      )}
    </div>
  );
};

export default Demo;
