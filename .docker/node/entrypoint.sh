#!/bin/bash
yarn
wait-for db:3306 -t 60 -- yarn start