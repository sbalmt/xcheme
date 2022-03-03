/**
 * Exception class.
 */
export class Exception extends Error {
  /**
   * Default constructor.
   * @param message Message.
   */
  constructor(message: string) {
    super(message);
  }
}
