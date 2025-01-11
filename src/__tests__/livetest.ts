import { testTransportOutput } from "@loglayer/transport";
import { LogLayer } from "loglayer";
import { LogBasedTransport } from "../LogBasedTransport.js";
import { NotLogBasedTransport } from "../NotLogBasedTransport.js";

// Test with default configuration (appendObjectData: false)
const logBased = new LogLayer({
  transport: new LogBasedTransport({
    logger: console,
  }),
});

// Test with appendObjectData: true
const notLogBased = new LogLayer({
  transport: new NotLogBasedTransport(),
});

testTransportOutput("log-based", logBased);

testTransportOutput("not-log-based", notLogBased);
