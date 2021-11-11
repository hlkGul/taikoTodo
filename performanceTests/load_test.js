import http from "k6/http";
import {  sleep } from "k6";

export let options = {
    insecureSkipTLSVerify : true,
    noConnectionReuse : false,
    stages: [
        {duration: '5m', target: 100},//simulate ramp-up traffic 1 to 100 users
        {duration: '10m', target: 100},//stay at 100 users for 10 min.
        {duration: '5m', target: 0},//ramp down 0 user

    ],
    thresholds: {
        http_req_duration : ['p(99)<150'],//99% of requests must complete below 150ms
    }
};

//const API_URL = 'http://todomvc.com/examples/vue/';

export default () => {
    let response = http.get("http://todomvc.com/examples/vue/");
    sleep(1);
};