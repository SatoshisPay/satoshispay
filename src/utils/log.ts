import RingBuffer from 'ringbufferjs';

export const LOG_BUFFER = new RingBuffer(1024 * 64);

export const log = (level: string, ...args: any[]) => {
  if (level === 'TRACE') {
    return;
  }
  const line = `${new Date().toISOString()} [${level}]: ${args.join(' ')}`;
  console.log(line);
  LOG_BUFFER.enq(line);
};

export const debug = (...args: any[]) => log('DEBUG', ...args);
export const info = (...args: any[]) => log('INFO', ...args);
export const warn = (...args: any[]) => log('WARN', ...args);
export const error = (...args: any[]) => log('ERROR', ...args);
