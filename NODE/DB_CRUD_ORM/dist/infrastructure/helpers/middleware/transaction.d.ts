import { EntityManager } from "typeorm/entity-manager/EntityManager";
export declare const wrapTransaction: <T>(fun: (t: EntityManager) => Promise<T>) => Promise<T>;
