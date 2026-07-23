"use strict";

import mongoose from "mongoose";
import os from "os";
import process from "process";

export const countConnect = () => {
  const numConnection = mongoose.connections.length;
  console.log("Number connections: ", numConnection);
};

const _SECONDS = 5000;
export const checkOverload = () => {
  const interval = setInterval(() => {
    const numConnection = mongoose.connections.length;
    const numCore = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    // example
    const maxConnections = numCore * 5;

    console.log("Active connections:", numConnection);
    console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
    if (numConnection > maxConnections) {
      console.log("Connection overload detected");
    }
  }, _SECONDS);
  interval.unref();
  return interval;
};
