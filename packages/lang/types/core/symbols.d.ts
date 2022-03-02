import * as Core from '@xcheme/core';
/**
 * Event callback.
 */
declare type EventCallback = (record: Core.Record) => void;
/**
 * Record metadata.
 */
export declare type Metadata = {
    /**
     * Record type.
     */
    type: Types;
    /**
     * Record origin.
     */
    origin: Origins;
    /**
     * Record path.
     */
    name: string;
    /**
     * Record identifier.
     */
    identifier: string;
    /**
     * Record identity.
     */
    identity: number;
    /**
     * Record location.
     */
    location: string;
    /**
     * Determines whether or not the record is dynamic.
     */
    dynamic: boolean;
    /**
     * Determines whether or not the record is imported.
     */
    imported: boolean;
    /**
     * Determines whether or not the record is exported.
     */
    exported: boolean;
    /**
     * Array of dependencies.
     */
    dependencies: Core.Record[];
    /**
     * Array of dependents.
     */
    dependents: Core.Record[];
    /**
     * Record pattern.
     */
    pattern: Core.Pattern | string | undefined;
};
/**
 * Record types.
 */
export declare const enum Types {
    Unknown = 0,
    Skip = 1,
    Token = 2,
    Node = 3
}
/**
 * Record origins.
 */
export declare const enum Origins {
    User = 0,
    Loose = 1
}
/**
 * Symbol aggregator class.
 */
export declare class Aggregator {
    #private;
    /**
     * Determines whether or not a record with the given identifier exists.
     * @param identifier Record identifier.
     * @returns Returns true when the record exists, false otherwise.
     */
    has(identifier: string): boolean;
    /**
     * Get the record that correspond to the given identifier.
     * @param identifier Record identifier.
     * @returns Returns the corresponding record or undefined when it doesn't exists.
     */
    get(identifier: string): Core.Record | undefined;
    /**
     * Add the specified record,.
     * @param record Symbol record.
     * @throws Throws an error when the specified record already exists.
     * @returns Returns the added record.
     */
    add(record: Core.Record): Core.Record;
    /**
     * Link an existing record to another one.
     * @param identifier Record identifier.
     * @param alias Alias identifier.
     * @throws Throws an error when the specified alias already exists or the given identifier doesn't exists.
     * @returns Returns the linked record.
     */
    link(identifier: string, alias: string): Core.Record;
    /**
     * Add an event to be triggered once a record with the given identifier is added.
     * @param identifier Record identifier.
     * @param callback Trigger callback.
     */
    listen(identifier: string, callback: EventCallback): void;
    /**
     * Iterable generator.
     */
    [Symbol.iterator](): Generator<Core.Record, void, unknown>;
}
/**
 * Determines whether or not the given record is referenced.
 * @param record System record.
 * @param types Symbol types.
 * @returns Returns true when the record is referenced, false otherwise.
 */
export declare const isReferencedBy: (record: Core.Record, ...types: Types[]) => boolean;
export {};
