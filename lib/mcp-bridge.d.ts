import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type { DshContext, DshToolDefinition } from './types.js';
/**
 * 生成模型可见的公开工具名：`<serverName>__<rawName>`（本插件 serverName='dre'）。
 * 规范化/截断导致名字变化时追加 12 位 SHA-256 哈希，保证不同 MCP 身份不塌缩。
 */
export declare function publicToolName(serverName: string, rawName: string): string;
/** DRE 能力面默认白名单：前缀（以 _ 结尾）或全名。 */
export declare const DEFAULT_DRE_FILTER: string[];
/** 判断工具名是否命中白名单（前缀以 _ 结尾做 startsWith，否则精确匹配全名）。 */
export declare function matchTool(name: string, filter: string[]): boolean;
/** 应用 synapseEnabled：false 时剔除突触工具。 */
export declare function applySynapseGate(filter: string[], synapseEnabled: boolean): string[];
export interface McpBridgeOptions {
    command: string;
    args: string[];
    cwd: string;
    env?: Record<string, string>;
    serverName: string;
    toolCallTimeoutMs: number;
    /** 白名单：前缀（以 _ 结尾）或全名数组。 */
    toolFilter: string[];
}
export interface McpToolMeta {
    name: string;
    description?: string;
    inputSchema?: unknown;
}
export interface McpBridge {
    /** 连接 MCP 服务器、按白名单同步工具并注册进 ctx.tools；幂等。 */
    connect(ctx: DshContext): Promise<void>;
    /** 已桥接的工具数量（未连接为 0）。 */
    toolCount(): number;
    /** 运行状态摘要（诊断用）。 */
    status(): {
        connected: boolean;
        toolCount: number;
        serverName: string;
    };
    /** 关闭连接并卸载已注册工具。 */
    dispose(): void;
}
/** 从 MCP content 块提取纯文本。 */
export declare function extractText(content: unknown, rawName: string): string;
/** 构造 dsh ToolDefinition（parameters 直接透传 MCP JSON Schema）。 */
export declare function toToolDefinition(tool: McpToolMeta, opts: McpBridgeOptions, getClient: () => Client | null): DshToolDefinition;
/** 创建 MCP 桥（惰性连接；按 toolFilter 白名单过滤）。 */
export declare function createMcpBridge(opts: McpBridgeOptions): McpBridge;
