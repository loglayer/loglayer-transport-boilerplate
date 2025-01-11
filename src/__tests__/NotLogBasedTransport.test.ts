import { LogLayer } from "loglayer";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import { NotLogBasedTransport, mockService } from "../NotLogBasedTransport.js";

describe("NotLogBasedTransport", () => {
  beforeEach(() => {
    // Reset the mock before each test
    vitest.spyOn(mockService, "send").mockImplementation(() => {});
  });

  function getLoggerInstance() {
    const loglayer = new LogLayer({
      transport: new NotLogBasedTransport({
        id: "custom-service",
      }),
    });

    return {
      loglayer,
    };
  }

  it("should send a basic message", () => {
    const { loglayer } = getLoggerInstance();
    loglayer.info("this is a test message");

    expect(mockService.send).toHaveBeenCalledWith({
      level: "info",
      message: "this is a test message",
      timestamp: expect.any(String),
    });
  });

  it("should send a message with prefix", () => {
    const { loglayer } = getLoggerInstance();
    loglayer.withPrefix("[testing]").info("this is a test message");

    expect(mockService.send).toHaveBeenCalledWith({
      level: "info",
      message: "[testing] this is a test message",
      timestamp: expect.any(String),
    });
  });

  it("should include context data in payload", () => {
    const { loglayer } = getLoggerInstance();
    const context = { test: "context" };

    loglayer.withContext(context).info("this is a test message");

    expect(mockService.send).toHaveBeenCalledWith({
      level: "info",
      message: "this is a test message",
      timestamp: expect.any(String),
      test: "context",
    });
  });

  it("should include metadata in payload", () => {
    const { loglayer } = getLoggerInstance();
    const metadata = { meta: "data" };

    loglayer.withMetadata(metadata).info("this is a test message");

    expect(mockService.send).toHaveBeenCalledWith({
      level: "info",
      message: "this is a test message",
      timestamp: expect.any(String),
      meta: "data",
    });
  });

  it("should include error in payload", () => {
    const { loglayer } = getLoggerInstance();
    const error = new Error("test error");

    loglayer.withError(error).error("an error occurred");

    expect(mockService.send).toHaveBeenCalledWith({
      level: "error",
      message: "an error occurred",
      timestamp: expect.any(String),
      err: error,
    });
  });

  it("should handle multiple log levels", () => {
    const { loglayer } = getLoggerInstance();

    loglayer.info("info message");
    expect(mockService.send).toHaveBeenLastCalledWith({
      level: "info",
      message: "info message",
      timestamp: expect.any(String),
    });

    loglayer.warn("warning message");
    expect(mockService.send).toHaveBeenLastCalledWith({
      level: "warn",
      message: "warning message",
      timestamp: expect.any(String),
    });

    loglayer.error("error message");
    expect(mockService.send).toHaveBeenLastCalledWith({
      level: "error",
      message: "error message",
      timestamp: expect.any(String),
    });

    loglayer.debug("debug message");
    expect(mockService.send).toHaveBeenLastCalledWith({
      level: "debug",
      message: "debug message",
      timestamp: expect.any(String),
    });

    loglayer.trace("trace message");
    expect(mockService.send).toHaveBeenLastCalledWith({
      level: "trace",
      message: "trace message",
      timestamp: expect.any(String),
    });

    loglayer.fatal("fatal message");
    expect(mockService.send).toHaveBeenLastCalledWith({
      level: "fatal",
      message: "fatal message",
      timestamp: expect.any(String),
    });
  });

  it("should combine multiple messages into one", () => {
    const { loglayer } = getLoggerInstance();

    loglayer.info("message 1", "message 2", "message 3");

    expect(mockService.send).toHaveBeenCalledWith({
      level: "info",
      message: "message 1 message 2 message 3",
      timestamp: expect.any(String),
    });
  });
});
