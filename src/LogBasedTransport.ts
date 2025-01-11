import {
  BaseTransport,
  type LogLayerTransportConfig,
  type LogLayerTransportParams,
  LogLevel,
} from "@loglayer/transport";

type ConsoleType = typeof console;

export interface LogBasedTransportConfig extends LogLayerTransportConfig<ConsoleType> {
  // Add configuration options here if necessary
}

/**
 * Boilerplate for a transport that uses a library that has standard logging methods
 * like info(), warn(), error(), etc.
 *
 * BaseTransport provides the logger property, which is the instance of the library.
 */
export class LogBasedTransport extends BaseTransport<ConsoleType> {
  constructor(config: LogBasedTransportConfig) {
    super(config);
  }

  shipToLogger({ logLevel, messages, data, hasData }: LogLayerTransportParams) {
    if (data && hasData) {
      // Put the data at the end of the message array
      messages.unshift(data);
    }

    switch (logLevel) {
      case LogLevel.info:
        this.logger.info(...messages);
        break;
      case LogLevel.warn:
        this.logger.warn(...messages);
        break;
      case LogLevel.error:
        this.logger.error(...messages);
        break;
      case LogLevel.trace:
        this.logger.trace(...messages);
        break;
      case LogLevel.debug:
        this.logger.debug(...messages);
        break;
      case LogLevel.fatal:
        // There's no fatal level for the console logger, so use error instead
        this.logger.error(...messages);
        break;
    }

    return messages;
  }
}
