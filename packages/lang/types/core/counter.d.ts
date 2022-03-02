/**
 * Counter context class.
 */
export declare class Context {
    #private;
    /**
     * Get the current counter value for the specified key object.
     * @param object Key object.
     * @param initial Initial value.
     * @returns Returns the counter value.
     */
    count<T extends object>(object: T, initial?: number): number;
    /**
     * Increment the counter value for the specified key object.
     * @param object Key object.
     * @param initial Initial value.
     * @returns Returns the previous counter value.
     */
    increment<T extends object>(object: T, initial?: number): number;
}
