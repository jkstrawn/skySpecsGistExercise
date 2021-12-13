
import * as buffer from 'buffer';
(window as any).Buffer = buffer.Buffer;
(window as any).global = window;
(window as any).process = {};
(window as any).process = window;
(window as any).process.browser = true;
(window as any).process.version = '';
(window as any).process.versions = { node: false };
(window as any).process.env = { NODE_DEBUG: false };