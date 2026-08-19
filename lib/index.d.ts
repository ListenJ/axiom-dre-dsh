import type { DshContext } from './types.js';
export declare const name = "dre";
/** 必需服务：tools。 */
export declare const inject: string[];
export declare function apply(ctx: DshContext, rawConfig: unknown): Promise<void> | void;
