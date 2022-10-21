import React, { useEffect, useState } from "react";
import { ReCron, Tab } from "@sbzen/re-cron";
import Cron, { HEADER } from "react-cron-generator";
import ReactJSCron from "./ReactJsCron";
import parser from "cron-parser";
import "./styles.scss";

let interval = parser.parseExpression("*/2 * * * *");
interval = interval.next().toString();

var options = {
  currentDate: new Date("Wed, 26 Dec 2021 12:38:53 UTC"),
  endDate: new Date("Wed, 26 Dec 2022 14:40:00 UTC"),
  iterator: true
};

export default function App() {
  const [intervalString, setIntervalString] = useState(interval);
  const [reactCronValue, setReactCronValue] = useState(interval);
  const [futureJobs, setFutureJobs] = useState(["a"]);
  const [cronValue, setCronValue] = useState(
    "0,1,2 2/4 6/2 1,14,7,21 2-7 ? 2019/1"
  );

  useEffect(() => {
    let intervals = [];
    try {
      const interval = parser.parseExpression("*/22 * * * *", options);
      let isDone = true;
      while (isDone) {
        try {
          var obj = interval.next();
          console.log("value:", obj.value.toString(), "done:", obj.done);
          intervals.push(obj.value.toString());
          isDone = obj.done === false;
        } catch (e) {
          break;
        }
      }

      setFutureJobs((prev) => [...prev, ...intervals]);
    } catch (err) {
      console.log("Error: " + err.message);
    }
  }, []);

  return (
    <div>
      <h2>Later.js parsing</h2>
      <p>Next Job: {interval} </p>

      <p>Intervals until end date:</p>
      <ul>
        {futureJobs.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>

      <hr />
      <div className="py-2">
        <b>Cron Value: </b>
        <code>{cronValue}</code>
      </div>
      <h2>ReCron library</h2>
      {/* https://bzenkosergey.github.io/ng-cron/react/#/doc/customization/css-styling */}
      <ReCron
        cssClassPrefix="re-cron-"
        value={cronValue}
        onChange={setCronValue}
        tabs={[Tab.DAY, Tab.MONTH]}
      />

      <hr />

      <h2>react-cron-generator library</h2>

      <Cron
        onChange={(e) => {
          setReactCronValue(e);
        }}
        value={reactCronValue}
        showResultText={true}
        showResultCron={true}
        options={{
          headers: [HEADER.MONTHLY, HEADER.WEEKLY, HEADER.DAILY]
        }}
      />

      <hr />

      <h2>ReactJSCron</h2>
      <ReactJSCron />
    </div>
  );
}
