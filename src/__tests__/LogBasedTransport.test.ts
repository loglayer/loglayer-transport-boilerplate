import { LogLayer } from "loglayer";
import { describe, expect, it, vitest } from "vitest";
import { LogBasedTransport } from "../LogBasedTransport.js";

function getLoggerInstance() {
  const logger = console;

  // Mock all log methods
  logger.info = vitest.fn();
  logger.warn = vitest.fn();
  logger.error = vitest.fn();
  logger.debug = vitest.fn();
  logger.trace = vitest.fn();

  const loglayer = new LogLayer({
    transport: new LogBasedTransport({
      id: "loglevel",
      logger,
    }),
  });

  return {
    loglayer,
    logLevelInstance: logger,
  };
}

describe("structured transport with loglevel", () => {
  it("should log a message", () => {
    const { loglayer, logLevelInstance } = getLoggerInstance();
    loglayer.info("this is a test message");

    expect(logLevelInstance.info).toHaveBeenCalledWith("this is a test message");
  });

  it("should log a message with prefix", () => {
    const { loglayer, logLevelInstance } = getLoggerInstance();

    loglayer.withPrefix("[testing]").info("this is a test message");

    expect(logLevelInstance.info).toHaveBeenCalledWith("[testing] this is a test message");
  });

  it("should include context", () => {
    const { loglayer, logLevelInstance } = getLoggerInstance();

    loglayer
      .withContext({
        test: "context",
      })
      .info("this is a test message");

    expect(logLevelInstance.info).toHaveBeenCalledWith({ test: "context" }, "this is a test message");
  });

  it("should include metadata", () => {
    const { loglayer, logLevelInstance } = getLoggerInstance();

    loglayer
      .withMetadata({
        meta: "data",
      })
      .info("this is a test message");

    expect(logLevelInstance.info).toHaveBeenCalledWith({ meta: "data" }, "this is a test message");
  });

  it("should handle fatal level by using error", () => {
    const { loglayer, logLevelInstance } = getLoggerInstance();
    loglayer.fatal("this is a fatal message");

    expect(logLevelInstance.error).toHaveBeenCalledWith("this is a fatal message");
  });
});
