# 煎饼派对出海——阿里云 ClickHouse 企业版托管方案
## PPT演讲大纲（约15页）

---

## 第1页：封面

**标题：煎饼派对出海——阿里云 ClickHouse 企业版托管方案**

- 副标题：从自建 Doris 到 Agent 时代实时分析底座
- 演讲者：Solution Architect
- 场景：游戏出海 · 实时分析 · 托管化演进

**演讲要点**：一句话点明本次分享解决的核心问题——出海背景下，自建 OLAP 的运维与扩展成本如何转化为托管方案的价值。

---

## 第2页：客户与业务背景

**标题：快速成长的中国数字原生企业，加速出海**

- **客户**：“煎饼派对”：快速成长的中国数字原生企业，正在加速拓展海外市场
- **当前数据分析平台**：自建 Apache Doris
- **数据链路**：
  - 实时链路：用户终端数据 → Kafka → Flink Job → Apache Doris
  - 批处理链路：Hive / Spark Batch Job → Apache Doris
- **数据应用（原第3页内容已并入本页）**：
  - 玩家行为分析：流失节点识别、留存率与召回、道具定价与投放
  - 运营指标监控：DAU/MAU、付费转化率与 ARPU、服务器延迟与崩溃率
  - 商业智能分析：地区/设备付费能力对比、营销效果评估、LTV 预测
- **业务诉求**：海外市场拓展，分析平台需同步全球化，落地速度需要满足快速的业务扩张的要求；成本可控

**演讲要点**：用一张完整的数据栈同时交代“客户是谁、平台怎么跑、业务怎么用”；原第3页“三大核心场景”已并入本页，不再单独成页。

---

## 第3页：数据画像（Data Profile）

**标题：20TB/天、亿级事件、200+ 维度、高基数**

- **规模**：每天 20TB 玩家行为数据，日均亿级事件
- **维度**：200+ 分析指标；高基数维度（玩家 ID 可能上亿）
- **时效**：实时监控需求
- **写入**：50–200 MB/s，峰值可达 50 万消息每秒
- **事件粒度示例**：单玩家一次副本战斗可产生 50+ 条事件日志（移动轨迹、技能释放、伤害统计等）

**演讲要点**：用数据画像建立“这不是普通报表负载”的认知，直接引出架构选型约束。

---

## 第4页：痛点一——运维成本高

**标题：自建Apache Doris的运维成本高昂**
可能（不局限）的运维困难包括:
1. **存储可靠性**：On-prem管理的Doris，单盘故障可能引发分片级崩溃，部分项目长时间数据不可用；数据盘级联故障在高磁盘占用项目中并不罕见
2. **MinIO 运维**：在线升级风险高；扩容收效甚微；故障频繁导致 ETL 崩溃，Airflow 工程师大量时间用于排查恢复
3. **Apache Doris 自身的运维**：升级、备份、故障排查均不轻松
4. **Apache Doris 扩容复杂**：FE/BE 需分别扩容；BE 扩容后数据再平衡可能耗时数小时至数天，引发性能下降，影响业务稳定性

**演讲要点**：第4点是本页重点——扩容代价直接对应游戏“版本上线洪峰”的业务节奏。

---

## 第5页：痛点二与三——数据洪峰与实时决策

**标题：运维人员的手跟不上出海的业务的扩张**
**副标题： 峰值10-20倍爆发，决策要求秒级响应**

**区域扩张**
- 数据分析底座需要迅速扩大覆盖到新的地区，支持全球化业务
- 区域的增加不应造成线性增加的运维压力

**数据洪峰**
- 新版本上线日志量瞬时爆发 10–20 倍
- 需具备水平扩展性：线性写入吞吐、高效压缩、稳定实时可见性
- 同时要求平稳期可缩容，避免资源浪费

**实时决策**
- 异常道具交易波动（外挂预警）
- 新手关卡流失点（快速调优）
- 活动参与热度（动态调整奖励）
- **性能指标：亿级事件聚合约 1 秒内完成**

---

## 第6页：Objectives——五项验收标准

**标题：从“能跑”到“可信、可扩、可控成本”**

1. 存储可靠性（Storage Reliability）
2. 运维可靠性（Operational Reliability）
3. 易于维护（Ease of Maintenance）
4. 可扩展性（Flexibility for Growth）
5. 预算内的最优成本（Optimal Cost for Our Budget）

**演讲要点**：这五项将作为后续方案价值页的逐项回扣依据，形成闭环。

---

## 第7页：ClickHouse Enterprise 简介

**标题：为 AI 时代实时分析负载而设计的列式 OLAP**

四宫格布局：
1. **毫秒级处理**：PB 级数据毫秒返回
2. **高 QPS 并发**：高并发查询同时执行
3. **极高压缩率**：存储容量缩减数十倍
4. **弹性伸缩**：按负载动态扩缩容

**演讲要点**：四项特性与第5–7页痛点一一映射，避免泛泛而谈产品。

---

## 第8页：方案架构总览

**标题：数据源 → 集成 → Lakehouse → 数据应用**

（堆栈式架构图：左侧数据源与集成，中部 ClickHouse 企业版，右侧数据应用；ODS 冷数据层位于 ClickHouse 下方）

- **数据源**：Database、Data API、Game Log
- **实时链路（两条）**：
  - **Flink Job**：Game Log / Data API → LogHub → Flink Job → ClickHouse
  - **Database CDC**：Database → 阿里云 DTS服务 → ClickHouse
- **批处理链路**：ODS（Iceberg/Hive）→ Hive/Spark Job → ClickHouse
- **Lakehouse**：ODS（Iceberg/Hive，冷数据，位于 ClickHouse 下方）+ ClickHouse 企业版分层（DWD/DWS/ADS，分层保持不变）
- **数据应用**：玩家行为分析、运营指标监控、商业智能分析
- **冷热分层**：Hot-to-Cold 数据分层 ↓ / 查询加速 ↑

**演讲要点**：强调架构不是推倒重来，而是保留 Lakehouse 分层、替换核心 OLAP 引擎。

---

## 第9页：典型分析场景实现

**标题：留存魔法矩阵、漏斗、经济监控、作弊检测**

- **7 日留存魔法矩阵**：传统方案半小时 → ClickHouse 秒级响应（countDistinctIf + 子查询）
- **DAU 统计**：COUNT(DISTINCT) 按日聚合
- **留存率分析**：首登表 JOIN 行为表，7 日窗口留存
- **道具购买分析**：按道具聚合买家数、收入、均价
- **行为路径漏斗**：windowFunnel(3600) 追踪副本转化
- **实时经济监控**：JSON 提取物价，HAVING 过滤异常波动
- **作弊检测**：统计异常（道具获取量 + 均值偏离 10 倍）

**演讲要点**：选 2–3 个 SQL 片段现场讲解即可，其余作为附页；重点展示“秒级”与“窗口函数/JSON 能力”。

---

## 第10页：迁移策略——国内双跑五步、海外新建

**标题：国内双跑，海外新建 / 国内双跑验证一致再切换，海外从第一天就只有一个引擎**

**国内存量系统 · 双跑**
- 四条路径同时双跑：
  - 实时：Kafka 事件（如 CDC）双系统消费
  - 实时：Flink 任务双路写入
  - 批量：Hive / Spark 任务双路写入
  - 存量：经阿里云 DTS 批量导入 ClickHouse（回填）
- 五步迁移细节（双跑的具体执行路径）：
  1. **DDL 解析与模型适配**：解析原表结构，推导排序键、分区与性能模型
  2. **任务复制与双路写入**：Hive/Kafka→Doris 任务无缝复制为 Hive/Kafka→ClickHouse；离线链路经阿里云 DTS 批量导入
  3. **存量数据弹性补数**：缺失 Hive 历史时搭建 ClickHouse Dump 专有集群，HardLink 隔离线上读写，导出吞吐 1 GB/s；Hive 完整时用 Spark 调度重刷
  4. **四阶段自动化数据校验**：行数统计 → 核心指标聚合 → 浮点精度阈值 → 真实业务 SQL 回放比对；偏差自动触发断路器
  5. **正式下线 Doris 集群与写入任务**
- 结果 100% 匹配后再切换

**海外新系统 · 新建**
- 阿里云上新建，所有数据源直接路由至 ClickHouse Enterprise
- 架构与第 2、8 页保持一致：
  - 数据源：Game Log · Data API（LogHub → Flink）、Database · CDC（阿里云 DTS）、Hive / Spark Job（批处理）
  - 核心：ClickHouse 企业版，DWD → DWS → ADS 分层保持不变
  - 冷热：ODS（Iceberg / Hive）· Hot → Cold 分层 / 查询加速
  - 应用：玩家行为分析、运营指标监控、商业智能分析
- 新建成本 0 → 1，无历史包袱

**演讲要点**：国内双跑是降低迁移风险的关键设计，不是可选项；五步是双跑的具体执行路径。海外没有存量包袱，直接对齐目标架构。

---

## 第11页：性能实践——避免 JOIN

**标题：Non-Join 比 Join 快 10–100 倍**

- **原则**：避免不必要的 JOIN 或低效 JOIN
- **方法一**：预构建宽表，从模型层消除 JOIN
- **方法二**：右表转字典（Dictionary）或使用 Direct Join
- **方法三**：使用Join table engine

**演讲要点**：这是从 Doris（强 JOIN、CBO）迁移到 ClickHouse 时最需要转变的建模习惯，需提前与客户数据团队对齐。

---

## 第12页：性能实践——预聚合与跳数索引

**页面定位**：在核心方案与迁移路径讲完后，作为“落地调优经验”补充页，展示 Architect 对 ClickHouse 特性的实战掌握，增强方案可信度。

**核心信息**：针对游戏赛季、固定指标、高选择性过滤三类典型场景，ClickHouse 各有一个低成本、高收益的原生手段。

**2栏布局（每栏：技巧 → 场景 → 收益）**

**1、固定维度指标预聚合：SummingMergeTree**
- **场景**：日活、游玩时长、付费总额等固定维度指标被高频查询
- **做法**：
```sql
CREATE TABLE daily_user_stats (
    stat_date Date,
    user_id UInt64,
    login_count UInt16,
    play_minutes UInt32,
    payment_total Decimal(18,2)
) ENGINE = SummingMergeTree()
ORDER BY (stat_date, user_id);
```
- **收益**：查询时直接读预聚合结果，避免每次扫描明细，显著降低计算与延迟

**2、特定条件查询加速：跳数索引（Data Skipping Index）**
- **场景**：按道具 ID 等高选择性字段过滤查询
- **做法**：
```sql
ALTER TABLE game_events ADD INDEX idx_item(item_id) TYPE bloom_filter GRANULARITY 3
```
- **收益**：Bloom Filter 跳过不相关数据块，减少扫描量，加速点查与过滤

**底部一句话（选型判断，演讲收束）**
- **预聚合**解决“指标高频查”，**跳数索引**解决“过滤要快”——二者都应在建模阶段就纳入设计，而非事后补救。

---

## 第13页：方案价值（一）——自身收益与目标回扣

**标题：成本可比，收益数倍覆盖；五项 Objective 逐项达成**

**一、收益回扣 Objectives**

| Objective | 达成情况 | 说明 |
|---|---|---|
| 存储可靠性 | 100% | 关键组件（DB、S3）均纳入“服务”保障 |
| 运维可靠性 | 100% | 大量复杂运维任务卸载至托管服务 |
| 可扩展性 | 100% | 无停机、无数据再平衡，仅扩无状态计算节点，数分钟内 2x/5x/10x |
| 预算内最优成本 | 100% | 降低总TCO，服务成本可比，且被收益数倍覆盖 |
| 易于维护 | 80–85% | 显著降低但未完全消除，结合投入看结果良好 |

**二、投入与回报**
- 投入：2 名工程师 3 个月 + 架构师 1 个月
- 回报：节省大量工程师时间，足以覆盖略增的服务成本

**三、复杂度降低**
- MinIO → Amazon S3
- 清理大量旧服务器搭建与维护的冗余配置和脚本

**演讲要点**：先讲“达到了什么”，再讲“代价是什么”，最后讲“为什么仍然值得”——用节省的工程师时间解释成本合理性，用 80–85% 的诚实数据增强可信度。

---

## 第14页：方案价值（二）——生态延展

**标题：拥抱开放活跃的Clickhouse生态**

**核心信息**：生态延展决定分析底座的能力半径。

**五类生态领域**
- **Observability（可观测性）**：ClickStack、SigNoz、PromQL → Prometheus、Grafana
- **AI / ML（智能应用）**：Agnoo、DSPy、LangChain、LlamaIndex、PydanticAI、LibreChat
- **Open Table Formats & Catalogs（开放表格式与 Catalog）**：Delta Lake、Iceberg、Iceberg REST catalog、Apache Polaris、Unity Catalog
- **Cloud Native（云原生）**：clickhouse-operator
- **Pipelines（数据管道）**：ClickPipe、Apache Airflow、dbt

**演讲要点**：生态延展不是附属品，而是方案价值的一部分——用“5 类领域 / 19 个组件”说明底座的可延展半径，避免逐项念名单。

---

## 第15页：客户验证——游戏行业头部平台

**标题：头部游戏平台的选择，可复用的行业信心**

**客户证言**
- **Uken Games**：1 节点、170GB traces、成本降低 87%（配合 SigNoz/Prometheus/Grafana）
- **Suprema Gaming**：50 万用户、70 国、成本降低 62%
- **Azur Games**：120TB, 系统简化，分钟级扩缩容，运维成本下降60%，开发成本下降40%
- **Roblox**：记录机器学习决策、追踪模型判定结果、实时对比多个模型，>90%的审核决策，～100M events/day

**收尾一句话（建议）**：对出海游戏而言，实时分析的竞争力不在“能不能查”，而在“峰值不塌、扩容不痛、成本可控、生态可延展”——这正是托管方案要交付的确定性。

**演讲要点**：本页只做信心建设，不展开技术细节；用“证言—场景—对应关系”的结构让客户看到与自己相似的已落地案例。

---

# Backup Slides（现场 Q&A 备用，不占正文页数）

## Backup 1：ClickHouse Enterprise vs. Doris / StarRocks

**定位**：消除客户“Doris 强于 ClickHouse”的顾虑。仅在客户现场提出对比质疑时调用，不在正文主动展开。

**核心论点**
1. Doris 优于**开源** ClickHouse，而非 ClickHouse **企业版**
2. Non-Join 始终快于 Join（正文第11页已展开）
3. Doris 扩容需 BE 数据再平衡；ClickHouse Enterprise 无需再平衡即可扩缩
4. 选 ClickHouse Enterprise = 选一个广泛生态，而非单一引擎

**对比维度（按客户提问选择性展开）**
下面表格的第2、3列来自于SelectDB的官网，但是最关键的是缺少了第4列“企业版 ClickHouse”，这正是客户最关心的对比点。演讲时可用“开源 ClickHouse”作为锚点，逐步引导到“企业版 ClickHouse”的优势。
https://www.velodb.io/solutions/comparisons/alternative-to-clickhouse

| Category                     | Apache Doris                                                                                                                                                                                                                                                                    | ClickHouse OpenSource                                                                                                                                                                                                                                 | Clickhouse Enterprise                                                                                                                                                              |
|------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Architecture & SQL**       | • Based on MPP architecture<br>• Standard SQL, MySQL-compatible                                                                                                                                                                                                                 | • Uses Scatter-Gather architecture<br>• SQL-like capabilities but with non-standard SQL                                                                                                                                                               | • Parallel replicas mitigate impact to high concurrent query by Scatter-Gather scheduling                                                                                          |
| **Queries**                  | • Distributed joins<br>• Cost-Based Optimization (CBO)<br>• Query rewrites and multi-table materialized views<br>• Higher concurrent performance<br>• Native ASOF JOIN, faster in all 11 scenarios                                                                              | • Poor join implementation<br>• Lacks a Cost-Based Optimizer (CBO)<br>• Only supports single-table materialized views<br>• Lower concurrency performance<br>• ASOF JOIN 1.6x to 7x slower in the same tests                                           | • Join is 26x faster since 22.4<br> • Statistics-based join reordering <br>• Only supports single-table materialized views<br>• Parallel replicas mitigate high concurrency impact |
| **Real-time Updates**        | • Performance: Real-time updates 18-34x faster on SSB, 2.5-4.6x on ClickBench<br>• Built-in CDC for MySQL and PostgreSQL, no external pipeline<br>• Strong consistency: upserts and deletes visible to the next query<br>• Merge-on-write: primary key index with delete bitmap | • Query performance degrades as updates increase<br>• CDC changes land only as new row versions until a merge runs<br>• Old values readable until a background merge completes<br>• ReplacingMergeTree deduplicates at read time with FINAL or argMax | • the same as opensource version                                                                                                                                                   |
| **Data API**                 | • Offers high-throughput read APIs based on Arrow-flight, facilitating integration with other engines such as data science/AI tools                                                                                                                                             | • Only inefficient data reading via JDBC API                                                                                                                                                                                                          | • both Clickhouse Server/Client support Arrow Flight<br> • Server support Flight SQL as well                                                                                       |
| **Building Open Lakehouse**  | • Serves as a Lakehouse SQL engine, supporting queries on Hive, Hudi, Iceberg, and Parquet data lake formats                                                                                                                                                                    | • Limited Lakehouse integration capabilities                                                                                                                                                                                                          | • Serves as a Lakehouse SQL engine, supporting queries on Hive, Hudi, Iceberg, and Parquet data lake formats                                                                       |
| **Operations & Maintenance** | • Supports automatic scaling in, scaling out, and replica balancing                                                                                                                                                                                                             | • Requires manual rebalancing during scaling operations                                                                                                                                                                                               | • Scale-in, Scale-out only involve stateless compute node, no data rebalance required                                                                                              |
| **Performance**              | • In wide table benchmarks (ClickBench), Doris ranked top 1 or top 2 in October 2022 and October 2024, outperforming ClickHouse<br>• In large TPC-H and TPC-DS tests, Doris achieved leading performance                                                                        | • In terms of ClickBench performance, ClickHouse and Doris have been taking turns leading<br>• Experiences many OOM (Out of Memory) queries in large TPC-H and TPC-DS tests                                                                           | • As Clickhouse new version come out, the result is different. <br>• Join is 26x faster in TPC-H SF100 than 22.4                                                                   |
| **Deployment**               | • VeloDB, a commercial company with products based on Apache Doris, provides cloud-native services on AWS, Azure, and GCP, as well as mature SaaS and Bring Your Own Cloud (BYOC) versions<br>• VeloDB also offers an on-premises enterprise version                            | • Currently, ClickHouse's BYOC version is still in invite-only beta testing<br>• No on-premises enterprise version is available for ClickHouse                                                                                                        | • Only support Cloud version                                                                                                                                                       |

ClickBench: https://benchmark.clickhouse.com/#system=+AD(|h%20D|liH|s(em|%E2%98%81w|Cra(|Dois|Distt|oius|r2|ehned|%20sc|GnB|nisl|(%20t%20|PSt|Sris|tR|Raa|akqg|vD&type=-&machine=-&cluster_size=-&opensource=-&hardware=+c&tuned=+n&storage=+v|ld&metric=combined&queries=-

**应答策略**
- 先承认 Doris 在 JOIN、CBO、实时更新上的优势，避免正面否定客户认知
- 再将对比锚点从“开源 ClickHouse”切换到“ClickHouse Enterprise”
- 最后落到本客户的实际负载特征：高基数、高并发、写入洪峰、扩容频繁——这些正是企业版与生态价值的发力点

---

## Backup 2：JOIN 性能提升——Parallel Replicas 与多阶段分布式查询

**标题：JOIN性能提高26倍**
**副标题：Parallel Replicas 横向加算力，多阶段分布式查询纵向拆瓶颈**

**页面定位**：在性能实践（避免 JOIN）之后，作为“ClickHouse 原生分布式能力”的补充页，回应客户对“ClickHouse JOIN 弱”的顾虑，展示企业版在复杂查询与高并发下的架构级优化手段。

**核心信息**：两个功能从不同层面解决 JOIN 性能瓶颈——Parallel Replicas 把工作分摊到多个副本，多阶段分布式查询把 JOIN 和聚合拆分到多个阶段并消除协调节点瓶颈。

---

**左侧栏：Parallel Replicas——用副本算力换并行度**

**解决的问题**
- 单分片多副本集群中，副本平时仅用于高可用，查询算力未被充分利用
- 含 JOIN 的查询默认只在单一副本上执行，无法横向扩展

**如何提升 JOIN 与并发**
- 启用后，含 JOIN 的查询可将**最左侧表的读取**分摊到多个副本并行执行[citation:1]
- 通过 `parallel_replicas_custom_key` 按自定义整数表达式（优先主键）在副本间均匀切分工作负载[citation:1]
- 各副本独立读取自己负责的数据片段，减少单节点扫描压力，间接降低 JOIN 左侧输入的延迟
- 副本间并行意味着**同一时刻可服务更多并发查询**，因为单查询不再独占单一副本的全部资源

**适用边界（Architect 需说明）**
- JOIN 查询中，非最左侧一方会在每个副本上被完整读取[citation:1]——因此仅当左侧为大表、右侧为可复制的小表时收益最明显
- 需通过 `parallel_replicas_for_queries_with_multiple_tables` 显式启用 JOIN 查询的并行副本支持[citation:1]

---

**右侧栏：多阶段分布式查询——从执行计划层面消除 JOIN 与聚合瓶颈**

**解决的问题（两个经典瓶颈）**
- **JOIN 构建侧复制**：传统分布式 JOIN 中，每个节点需在内存中构建完整的右表哈希表，大表 JOIN 时内存压力集中
- **单节点最终聚合**：GROUP BY 后相同 key 的行可能分散在多个节点，最终合并被迫在单个协调节点完成，高基数场景下 CPU/内存成为瓶颈[citation:2][citation:4]

**如何提升 JOIN 性能（以 TPC-H 类查询为例）**
1. **小表广播**：将小表广播到所有 worker，各自构建本地哈希表
2. **按 JOIN key 重分区（Shuffle）**：将大表两侧按 join key 重新分布，每个 worker 只持有该 key 桶的两侧数据，**只需构建自己份额的哈希表**，无需完整右表副本[citation:2][citation:4]
3. **本地 JOIN**：各 worker 在自己的 key 桶内完成 JOIN，无额外网络交换
4. **按 GROUP BY key 重分区**：JOIN 输出按聚合 key 再次 Shuffle，每个 worker 拥有完整分组，**独立完成最终聚合**，无需协调节点合并部分聚合状态[citation:2]
5. **GatherExchange**：协调节点仅收集已排序、已聚合的最终行，不参与重计算

**关键 Exchange 算子**
- `BroadcastExchange`（1→N）：小表复制到所有 worker
- `ShuffleExchange`（M→N）：按 JOIN/GROUP BY key 重分区
- `GatherExchange`（N→1）：最终结果收集[citation:4]

**高并发支撑逻辑**
- 消除了“单节点构建完整哈希表”和“单节点合并全部聚合”两个串行瓶颈后，查询延迟不再随数据量线性恶化
- 协调节点从“重计算参与者”退化为“结果收集者”，可更快释放资源服务下一个查询
- 早期 TPC-H SF100 测试：8 节点运行完整基准套件 54.7 秒，单节点 117.6 秒，约 2x 提升[citation:14]

---

**底部收束（演讲要点）**

| 功能 | 解决什么 | 对 JOIN 的收益 | 对高并发的收益 |
|---|---|---|---|
| Parallel Replicas | 副本算力闲置 | 左侧大表扫描并行化 | 单查询资源占用降低，并发容量提升 |
| 多阶段分布式查询 | 构建侧复制 + 单节点聚合 | 消除大表 JOIN 内存瓶颈，聚合分布式化 | 协调节点不再成为串行瓶颈 |

**一句话**：Parallel Replicas 让“更多副本参与同一个查询”，多阶段分布式查询让“同一个查询的多个阶段在多个节点上各司其职”——前者横向加算力，后者纵向拆瓶颈。客户若担心 ClickHouse JOIN 能力，这页就是架构层面的回应：**不是靠单节点硬扛，而是靠分布式执行计划把 JOIN 的成本摊到集群上。**

## Backup 3：用 Timeplus 物化视图为 ClickHouse 构建大宽表

**标题：宽表在写入前打平，查询侧不再 JOIN**
**副标题：ClickHouse 物化视图是单表触发器；Timeplus 物化视图是持续运行的流式查询**

**页面定位**：在性能实践（避免 JOIN）与迁移策略之后，回应“宽表从哪来”的工程问题。定位为架构补充页，说明当宽表需要多流实时 JOIN 时，ClickHouse 原生物化视图的能力边界与 Timeplus 的补位价值。

**核心信息**：ClickHouse 物化视图是“单表插入触发器”，无法直接承接多流 JOIN；Timeplus 物化视图是“持续运行的流式查询”，可在写入 ClickHouse 之前完成多流 JOIN 与字段打平，结果直接写入 ClickHouse 宽表。

---

**左侧：为什么 ClickHouse 原生物化视图不够用**

**能力边界**
- ClickHouse 物化视图本质上是在**单张源表**的插入块上触发的后置计算[citation:1][citation:13]
- 若物化视图定义中包含 JOIN，只有**左侧源表**的插入会触发计算；右侧表的变更不会触发更新[citation:13]
- ClickHouse 自身不具备完整的流处理语义，无法基于时间窗口对多路流事件做持续 JOIN 与模式检测[citation:1]

**对宽表构建的影响**
- 游戏场景的宽表通常需要关联：玩家行为流 + 道具配置表 + 用户画像流 + 活动状态流
- 多流实时到达、时间乱序，ClickHouse 物化视图无法在写入侧完成这类关联
- 若在查询侧用 JOIN 弥补，则回到第12页已讨论的问题：Non-Join 比 Join 快 10–100 倍

---

**右侧：Timeplus 物化视图如何补位**

**定位**
- Timeplus Proton 是基于 ClickHouse 引擎构建的流处理引擎，物化视图是其核心能力[citation:1][citation:11]
- 物化视图创建后在后台**持续运行**，增量处理流入数据，结果持久化到内部流或外部系统[citation:3][citation:6]
- 通过 **ClickHouse External Table**，Timeplus 可直接向 ClickHouse 表写入数据[citation:5][citation:8]

**构建宽表的执行路径**

| 步骤 | 动作 | 说明 |
|---|---|---|
| 1 | 在 Timeplus 中定义多流 JOIN 查询 | 将游戏行为流、道具流、画像流按事件时间关联 |
| 2 | 将查询封装为物化视图 | 物化视图持续运行，增量输出打平后的宽表行 |
| 3 | 通过 External Table 写入 ClickHouse | 宽表数据直接落入 ClickHouse 目标表 |
| 4 | ClickHouse 侧只做扫描与聚合 | 查询侧无 JOIN，充分利用列式扫描与向量化优势 |

**针对高基数 JOIN 的内存策略（Architect 关注点）**
- Timeplus 支持**混合哈希表**（hybrid hash table）：热 key 驻留内存，冷 key 溢写磁盘（RocksDB）[citation:2]
- 通过 `max_hot_keys` 控制内存中保留的 key 数量，超出后按 LRU 溢写[citation:2]
- 适合游戏宽表中“少数活跃玩家 + 大量长尾玩家”的帕累托分布特征

---

**底部收束（演讲要点）**

**一句话**：ClickHouse 物化视图解决的是“单表写入后的预聚合”，Timeplus 物化视图解决的是“多流 JOIN 后的宽表打平”——前者在 ClickHouse 内部，后者在 ClickHouse 上游，两者互补而非替代。