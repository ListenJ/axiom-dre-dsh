export interface AxiomDreConfig {
    /** 后端数据目录（SQLite/记忆落盘）；默认 <插件>/data，自动创建。 */
    dataDir: string;
    /** 是否拉起内置 DRE 后端（stdio）并桥接 DRE 白名单工具。 */
    mcpEnabled: boolean;
    mcpCommand: string;
    mcpArgs: string[];
    mcpEnv: Record<string, string>;
    /** MCP 工具公开名前缀（dre__<tool>）。 */
    mcpServerName: string;
    mcpToolCallTimeoutMs: number;
    /** 初始连接/工具同步失败时是否让插件 fiber 失败（默认容忍并记录）。 */
    mcpFailOnStartupError: boolean;
    /**
     * 工具白名单：前缀（以 `_` 结尾，如 `dre_`）或全名（如 `task_graph_execute`）。
     * 空数组 = 使用内置 DRE 白名单（DEFAULT_DRE_FILTER）。
     */
    toolFilter: string[];
    /** false 时剔除突触工具（mind_synapse_* 与 mind_suggest）。 */
    synapseEnabled: boolean;
}
export type NormalizedConfig = AxiomDreConfig;
/** 解析插件根目录：源码布局 plugins/dre-dsh/src、产物布局 plugins/dre-dsh/lib → 上溯 1 层。 */
export declare function resolvePluginRoot(importMetaUrl: string): string;
/** 归一化插件配置（所有字段带默认值）。 */
export declare function normalizeConfig(raw: unknown, importMetaUrl: string): NormalizedConfig;
/** 给状态工具用的配置摘要（不含密钥）。 */
export declare function configSummary(config: NormalizedConfig): Record<string, unknown>;
