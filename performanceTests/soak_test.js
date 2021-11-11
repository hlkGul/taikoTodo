import http from "k6/http";
import {  sleep } from "k6";

export let options = {
    insecureSkipTLSVerify : true,
    noConnectionReuse : false,
    stages: [
        {duration: '2m', target: 400},//ramp up to 400 user
        {duration: '3h56m', target: 400},//stay at 400 for about 4 hours
        {duration: '2m', target: 0},//optional scale down
            
    ],
};

const API_URL = 'http://todomvc.com/examples/vue/';

export default () => {
    http.get(API_URL);
    sleep(1);

};