import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

export const options = {
  vus: 10,
  duration: "15s",
  thresholds: {
    errors: ["count<10"]
  }
};

export default function() {

  let res = http.get(`http://todomvc.com/examples/vue/`);
  let success = check(res, {
    "status is 200": r => r.status === 200,
    "text verification" : r => r.body.includes("buy some milk")
  });
  if (!success) {
    ErrorCount.add(1);
  }

  sleep(2);
}

