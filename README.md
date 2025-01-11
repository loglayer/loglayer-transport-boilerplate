# Transport Boilerplate for LogLayer

This is a template for creating transports for use with [LogLayer](https://loglayer.dev).

See the [Creating Transports](https://loglayer.dev/transports/creating-transports.html) documentation
for more information.

## Installation

```bash
npm install
```

## Run Tests

```bash
npm run test
```

## Run Live Tests

```bash
npm run livetest
```

## Lint + Fix

Uses [Biome](https://biomejs.dev/) for linting and formatting.

```bash
npm run lint
```

## Build

Uses [tsup](https://github.com/egoist/tsup) to build commonjs and esm versions.

```bash
npm run build
```

## Project Structure

```plaintext
.
├── src/
│   ├── __tests__/                # Test files
│   ├── index.ts                  # Entrypoint
│   ├── LogBasedTransport.ts      # Transport implementation using a log library
│   └── NotLogBasedTransport.ts   # Transport implementation not using a log library
```