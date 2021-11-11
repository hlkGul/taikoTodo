import http from "k6/http";
import {  sleep } from "k6";

export let options = {
    insecureSkipTLSVerify : true,
    noConnectionReuse : false,
    stages: [
        {duration: '10s', target: 100},//below normal load,
        {duration: '1m', target: 100},
        {duration: '10s', target: 1400},//spike to 1400 user
        {duration: '3m', target: 1400},//stay a long duration
        {duration: '10s', target: 100},//scale down
        {duration: '3m', target: 100},
        {duration: '10s', target: 0},
     
    ],
};

const API_URL = 'http://todomvc.com/examples/vue/';

export default () => {
    http.get(API_URL);

};