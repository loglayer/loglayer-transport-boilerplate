import { type LogLayerTransportParams, LoggerlessTransport, type LoggerlessTransportConfig } from "@loglayer/transport";

export const mockService = {
  send: (payload: any) => {
    console.log("Sending payload", payload);
  },
};

export interface NotLogBasedTransportConfig extends LoggerlessTransportConfig {
  // Add configuration options here if necessary
}

/**
 * Boilerplate for a transport that doesn't use a logging library.
 */
export class NotLogBasedTransport extends LoggerlessTransport {
  constructor(config: NotLogBasedTransportConfig = {}) {
    super(config);
  }

  shipToLogger({ logLevel, messages, data, hasData }: LogLayerTransportParams) {
    const payload = {
      level: logLevel,
      message: messages.join(" "),
      timestamp: new Date().toISOString(),
      ...(data && hasData ? data : {}),
    };

    // Send to your service
    mockService.send(payload);

    return messages;
  }
}
