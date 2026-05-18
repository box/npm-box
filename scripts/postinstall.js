#!/usr/bin/env node

// Skip in CI environments or if explicitly suppressed
if (process.env.CI || process.env.SUPPRESS_BOX_INSTALL_MESSAGE) {
  process.exit(0);
}

// Detect if terminal supports ANSI codes
const supportsColor = !process.env.NO_COLOR && process.stdout.isTTY;

// ANSI codes
const BLUE = '\x1b[34m';
const BOLD = '\x1b[1m';
const UNDERLINE = '\x1b[4m';
const RESET = '\x1b[0m';

if (supportsColor) {
  // Colorful version with box drawing characters
  const blue = (text) => `${BLUE}${text}${RESET}`;
  const blueBold = (text) => `${BLUE}${BOLD}${text}${RESET}`;
  const blueUnderline = (text) => `${BLUE}${UNDERLINE}${text}${RESET}`;

  console.log(blue('╔══════════════════════════════════════════════════════════════╗'));
  console.log(blue('║                                                              ║'));
  console.log(blue('║   ██████╗  ██████╗ ██╗  ██╗                                  ║'));
  console.log(blue('║   ██╔══██╗██╔═══██╗╚██╗██╔╝                                  ║'));
  console.log(blue('║   ██████╔╝██║   ██║ ╚███╔╝                                   ║'));
  console.log(blue('║   ██╔══██╗██║   ██║ ██╔██╗                                   ║'));
  console.log(blue('║   ██████╔╝╚██████╔╝██╔╝ ██╗                                  ║'));
  console.log(blue('║   ╚═════╝  ╚═════╝ ╚═╝  ╚═╝  npm                             ║'));
  console.log(blue('║                                                              ║'));
  console.log(blue('║   You just installed the Box developer toolkit.              ║'));
  console.log(blue('║                                                              ║'));
  console.log(blue('║   ') + blueBold('SDK') + blue(' ──────────────────────────────────────────────────     ║'));
  console.log(blue('║   import { BoxClient } from \'box/sdk\'                        ║'));
  console.log(blue('║                                                              ║'));
  console.log(blue('║   ') + blueBold('CLI') + blue(' ──────────────────────────────────────────────────     ║'));
  console.log(blue('║   npx box --help                                             ║'));
  console.log(blue('║                                                              ║'));
  console.log(blue('║   Start here → ') + blueUnderline('https://developer.box.com/guides/') + blue('             ║'));
  console.log(blue('║                                                              ║'));
  console.log(blue('╚══════════════════════════════════════════════════════════════╝'));
} else {
  // Plain text fallback
  console.log(`
==================================================================

  BOX npm

  You just installed the Box developer toolkit.

  SDK -----------------------------------------------------
  import { BoxClient } from 'box/sdk';

  CLI -----------------------------------------------------
  npx box --help

  Start here -> https://developer.box.com/guides/

==================================================================
`);
}
