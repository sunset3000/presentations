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

**标题：自建 OLAP 的四类运维风险**

1. **存储可靠性**：On-prem管理的Doris，单盘故障可能引发分片级崩溃，部分项目长时间数据不可用；数据盘级联故障在高磁盘占用项目中并不罕见
2. **MinIO 运维**：在线升级风险高；扩容收效甚微；故障频繁导致 ETL 崩溃，Airflow 工程师大量时间用于排查恢复
3. **On-Prem Doris 运维负担**：升级、备份、故障排查均不轻松
4. **Doris 扩容复杂**：FE/BE 需分别扩容；BE 扩容后数据再平衡可能耗时数小时至数天，引发性能下降，影响业务稳定性

**演讲要点**：第4点是本页重点——扩容代价直接对应游戏“版本上线洪峰”的业务节奏。

---

## 第5页：痛点二与三——数据洪峰与实时决策

**标题：峰值 10–20 倍爆发，决策要求秒级响应**

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

（插入原文 PlantUML 架构图）

- **数据源**：Database、Data API、Game Log
- **数据集成**：LogHub；ETL（Flink 流式、Hive/Spark 批处理、SeaTunnel）
- **Lakehouse**：ODS（Iceberg/Hive）+ Doris 分层（DWD/DWS/ADS）
- **数据应用**：报表分析、日志检索、Ad-hoc、指标监控、用户画像
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

## 第10页：迁移策略——国内双跑、海外新建

**标题：结果完全一致后再切换**

**国内存量系统**
- 双系统并行运行一段时间，结果完全匹配后彻底切换
- Kafka 事件（如 CDC）双系统消费
- Flink 任务双路写入

**海外新系统**
- 阿里云上新建，所有数据源直接路由至 ClickHouse Enterprise

**演讲要点**：双跑是降低迁移风险的关键设计，不是可选项。

---

## 第11页：五步迁移法

**标题：从 DDL 适配到 Doris 下线的完整路径**

1. **DDL 解析与模型适配**：结构解析与性能推导
2. **任务复制与双路写入**：Hive/Kafka→Doris 任务无缝复制为 Hive/Kafka→ClickHouse；离线链路经阿里云 DTS 批量导入
3. **存量数据弹性补数**：缺失 Hive 历史时搭建 ClickHouse Dump 专有集群，HardLink 隔离线上读写，导出吞吐 1 GB/s；Hive 完整时用 Spark 调度重刷
4. **四阶段自动化数据校验**：行数统计 → 核心指标聚合 → 浮点精度阈值 → 真实业务 SQL 回放比对；偏差自动触发断路器
5. **正式下线 Doris 集群与写入任务**

**演讲要点**：第4步的“断路器”机制是 Architect 最应强调的工程严谨性。

---

## 第12页：性能实践——避免 JOIN

**标题：Non-Join 比 Join 快 10–100 倍**

- **原则**：避免不必要的 JOIN 或低效 JOIN
- **方法一**：预构建宽表，从模型层消除 JOIN
- **方法二**：右表转字典（Dictionary）或使用 Direct Join
- **方法三**：使用Join table engine

**演讲要点**：这是从 Doris（强 JOIN、CBO）迁移到 ClickHouse 时最需要转变的建模习惯，需提前与客户数据团队对齐。

---

## 第13页：方案价值（一）——自身收益与目标回扣

**标题：成本可比，收益数倍覆盖；五项 Objective 逐项达成**

**一、收益回扣 Objectives**

| Objective | 达成情况 | 说明 |
|---|---|---|
| 存储可靠性 | 100% | 关键组件（DB、S3）均纳入“服务”保障 |
| 运维可靠性 | 100% | 大量复杂运维任务卸载至托管服务 |
| 可扩展性 | 100% | 无停机、无数据再平衡，仅扩无状态计算节点，数分钟内 2x/5x/10x |
| 预算内最优成本 | 100% | 服务成本可比，且被收益数倍覆盖 |
| 易于维护 | 80–85% | 显著降低但未完全消除，结合投入看结果良好 |

**二、投入与回报**
- 投入：2 名工程师 3 个月 + 架构师 1 个月
- 回报：节省大量工程师时间，足以覆盖略增的服务成本

**三、复杂度降低**
- MinIO → Amazon S3
- 三套 Airflow 部署合并为一套，新硬件承载全部负载
- 清理大量旧服务器搭建与维护的冗余配置和脚本

**四、生态延展性（原第14页内容并入）**
- OpenTelemetry trace 分析：ClickStack、SigNoz
- 从单一 OLAP 引擎延展至可观测性、AI/ML 等场景，一套生态支撑多类负载

**五、成本现实（诚实呈现）**
- 迁云不上 SaaS：硬件更强但价格更高；240TB 数据双副本仅存储即数千美元额外支出
- 冷热分层可减半成本，但需大量规划、测试与资深工程师时间

**演讲要点**：先讲“达到了什么”（含生态延展），再讲“代价是什么”，最后讲“为什么仍然值得”——用节省的工程师时间解释成本合理性，用 80–85% 的诚实数据增强可信度。

---

## 第14页：方案价值（二）——游戏行业客户验证

**标题：头部游戏平台的选择，可复用的行业信心**

**客户证言**
- **Uken Games**：1 节点、170GB traces、成本降低 87%（配合 SigNoz/Prometheus/Grafana）
- **Suprema Gaming**：50 万用户、70 国、成本降低 62%
- **Azure Games**：大规模遥测数据支撑行为分析、变现优化与实验
- **Roblox**：行业头部游戏平台的选择

**证言与本次方案的对应关系**
- Uken / Suprema → 验证可观测性场景与成本优势
- Azure Games → 验证海量遥测数据下的实时分析能力
- Roblox → 验证超大规模游戏平台的承载能力

**收尾一句话（建议）**：对出海游戏而言，实时分析的竞争力不在“能不能查”，而在“峰值不塌、扩容不痛、成本可控、生态可延展”——这正是托管方案要交付的确定性。

**演讲要点**：本页只做信心建设，不展开技术细节；用“证言—场景—对应关系”的结构让客户看到与自己相似的已落地案例。

---

# Backup Slides（现场 Q&A 备用，不占正文页数）

## Backup 1：ClickHouse Enterprise vs. Doris / StarRocks

**定位**：消除客户“Doris 强于 ClickHouse”的顾虑。仅在客户现场提出对比质疑时调用，不在正文主动展开。

**核心论点**
1. Doris 优于**开源** ClickHouse，而非 ClickHouse **企业版**
2. Non-Join 始终快于 Join（正文第12页已展开）
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