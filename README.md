# axiom-dre-dsh

Axiom 确定性推理引擎（DRE）的 [DeepSeek Harness (dsh)](https://github.com/deepseek-ai/dsh) 插件：
以 `dre__<tool>` 前缀暴露知识验证、确定性认知、约束求解、心智模型与突触记忆能力，强化 dsh 的信息确定能力。

> MIT License · 支持 `dsh plugin add/rm` 热插拔

## 安装

```bash
dsh plugin --profile web add github:ListenJ/axiom-dre-dsh
```

重启 dsh（`dsh web`）后，工具列表出现 `dre__*` 工具与 `dre_plugin_status` 诊断工具。

## 卸载

```bash
dsh plugin --profile web rm axiom-dre-dsh
```

## 前置依赖

本插件是一个 MCP 桥：它拉起并桥接一个提供 DRE 服务的 MCP 服务器（运行于 Bun）。
通过配置 `axiomHome`（或环境变量 `AXIOM_HOME`）指向该服务器所在仓库；留空时按插件文件位置上溯 3 层推断。

## 配置（cordis.patch.yml，行 id `dre`）

| 键 | 默认 | 说明 |
| --- | --- | --- |
| `axiomHome` | 空 | DRE MCP 服务器所在仓库根；解析：config → `$AXIOM_HOME` → 上溯 3 层 |
| `mcpEnabled` | true | 拉起 MCP 服务器并桥接 |
| `mcpCommand` / `mcpArgs` | bun / `run src/mcp/server.ts --stdio` | MCP 启动命令 |
| `mcpServerName` | `dre` | 工具公开前缀（`<serverName>__<tool>`） |
| `mcpToolCallTimeoutMs` | 60000 | 工具调用超时 |
| `mcpFailOnStartupError` | false | true=启动失败即报错；false=容忍并告警 |
| `toolFilter` | `[]` | 空=内置 DRE 白名单；显式数组完全替换（前缀以 `_` 结尾 / 全名） |
| `synapseEnabled` | true | false 时剔除 `mind_synapse_*` 与 `mind_suggest` |

## 工具（前缀 `dre__`）

- 知识验证：`dre_write_knowledge` `dre_search_knowledge` `dre_read_knowledge` `dre_subgraph` `dre_status` `dre_constraint_inject`
- 确定性认知：`cognitive_loop` `cognitive_loop_full` `cognitive_pipeline_run` `cognitive_pipeline_run_full` `cognitive_state` `task_graph_execute`
- 推理图：`reasoning_build` `reasoning_detect_gaps` `reasoning_fill_gap` `reasoning_result`
- 约束求解：`constraint_check` `constraint_list` `constraint_select_best` `constraint_stats`
- Actor / 心智模型：`actor_list` `actor_send` `mental_model_list` `mental_model_match` `mental_model_predict`
- 突触记忆：`mind_suggest` `mind_synapse_activate` `mind_synapse_create` `mind_synapse_spread` `mind_synapse_suggest` `mind_synapse_trace` `mind_synapse_verify`
- 诊断：`dre_plugin_status`

## License

MIT
