export class Logger {
  [Symbol.for('logger')]() {
    console.log('Here Iam')
  }
}

const log = new Logger();

log[Symbol.for('logger')]();