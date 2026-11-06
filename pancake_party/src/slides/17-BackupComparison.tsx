import { Check, X } from 'lucide-react'
import { SlideLayout } from '@/src/components/Presentation'

interface ComparisonRow {
  category: string
  doris: string[]
  oss: string[]
  enterprise: string[]
}

const rows: ComparisonRow[] = [
  {
    category: 'Architecture & SQL',
    doris: ['Based on MPP architecture', 'Standard SQL, MySQL-compatible'],
    oss: [
      'Uses Scatter-Gather architecture',
      'SQL-like capabilities but with non-standard SQL',
    ],
    enterprise: [
      'Parallel replicas mitigate impact to high concurrent query by Scatter-Gather scheduling',
    ],
  },
  {
    category: 'Queries',
    doris: [
      'Distributed joins',
      'Cost-Based Optimization (CBO)',
      'Query rewrites and multi-table materialized views',
      'Higher concurrent performance',
      'Native ASOF JOIN, faster in all 11 scenarios',
    ],
    oss: [
      'Poor join implementation',
      'Lacks a Cost-Based Optimizer (CBO)',
      'Only supports single-table materialized views',
      'Lower concurrency performance',
      'ASOF JOIN 1.6x to 7x slower in the same tests',
    ],
    enterprise: [
      'Join is 26x faster since 22.4',
      'multi-stage distributed query',
      'Statistics-based join reordering',
      'Parallel replicas mitigate high concurrency impact',
    ],
  },
  {
    category: 'Real-time Updates',
    doris: [
      'Performance: Real-time updates 18-34x faster on SSB, 2.5-4.6x on ClickBench',
      'Built-in CDC for MySQL and PostgreSQL, no external pipeline',
      'Strong consistency: upserts and deletes visible to the next query',
      'Merge-on-write: primary key index with delete bitmap',
    ],
    oss: [
      'Query performance degrades as updates increase',
      'CDC changes land only as new row versions until a merge runs',
      'Old values readable until a background merge completes',
      'ReplacingMergeTree deduplicates at read time with FINAL or argMax',
    ],
    enterprise: ['the same as opensource version'],
  },
  {
    category: 'Data API',
    doris: [
      'Offers high-throughput read APIs based on Arrow-flight, facilitating integration with other engines such as data science/AI tools',
    ],
    oss: ['Only inefficient data reading via JDBC API'],
    enterprise: [
      'both Clickhouse Server/Client support Arrow Flight',
      'Server support Flight SQL as well',
    ],
  },
  {
    category: 'Building Open Lakehouse',
    doris: [
      'Serves as a Lakehouse SQL engine, supporting queries on Hive, Hudi, Iceberg, and Parquet data lake formats',
    ],
    oss: ['Limited Lakehouse integration capabilities'],
    enterprise: [
      'Serves as a Lakehouse SQL engine, supporting queries on Hive, Hudi, Iceberg, and Parquet data lake formats',
    ],
  },
  {
    category: 'Operations & Maintenance',
    doris: [
      'Supports automatic scaling in, scaling out, and replica balancing',
    ],
    oss: ['Requires manual rebalancing during scaling operations'],
    enterprise: [
      'Scale-in, Scale-out only involve stateless compute node, no data rebalance required',
    ],
  },
  {
    category: 'Performance',
    doris: [
      'In wide table benchmarks (ClickBench), Doris ranked top 1 or top 2 in October 2022 and October 2024, outperforming ClickHouse',
      'In large TPC-H and TPC-DS tests, Doris achieved leading performance',
    ],
    oss: [
      'In terms of ClickBench performance, ClickHouse and Doris have been taking turns leading',
      'Experiences many OOM (Out of Memory) queries in large TPC-H and TPC-DS tests',
    ],
    enterprise: [
      'As Clickhouse new version come out, the result is different.',
      'Join is 26x faster in TPC-H SF100 than 22.4',
    ],
  },
  {
    category: 'Deployment',
    doris: [
      'VeloDB, a commercial company with products based on Apache Doris, provides cloud-native services on AWS, Azure, and GCP, as well as mature SaaS and Bring Your Own Cloud (BYOC) versions',
      'VeloDB also offers an on-premises enterprise version',
    ],
    oss: [
      "Currently, ClickHouse's BYOC version is still in invite-only beta testing",
      'No on-premises enterprise version is available for ClickHouse',
    ],
    enterprise: ['Only support Cloud version'],
  },
]

export default function BackupComparison() {
  return (
    <SlideLayout
      eyebrow="BACKUP 1 · 竞争对比"
      title="ClickHouse Enterprise vs. Doris / StarRocks"
      subtitle="仅在客户现场提出对比质疑时调用，不在正文主动展开"
      bodyClassName="pt-4"
    >
      <div className="h-full overflow-hidden rounded-xl border border-white/10">
        <table className="h-full w-full table-fixed border-collapse text-left">
          <colgroup>
            <col className="w-[14%]" />
            <col className="w-[29%]" />
            <col className="w-[28.5%]" />
            <col className="w-[28.5%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                Category
              </th>
              <th className="px-3.5 py-2 text-[11.5px] font-medium text-white/60">
                Apache Doris
              </th>
              <th className="px-3.5 py-2 text-[11.5px] font-medium text-white/45">
                ClickHouse OpenSource
              </th>
              <th className="bg-ch-yellow px-3.5 py-2 text-[11.5px] font-semibold text-ch-bg">
                Clickhouse Enterprise
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.category}
                className={
                  i === rows.length - 1
                    ? ''
                    : 'border-b border-white/[0.07]'
                }
              >
                <td className="px-3.5 py-2 align-middle text-[11.5px] font-semibold leading-[1.4] text-white/80">
                  {row.category}
                </td>
                <Cell items={row.doris} />
                <Cell items={row.oss} dim />
                <Cell items={row.enterprise} enterprise />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SlideLayout>
  )
}

function Cell({
  items,
  dim = false,
  enterprise = false,
}: {
  items: string[]
  dim?: boolean
  enterprise?: boolean
}) {
  return (
    <td
      className={
        enterprise
          ? 'bg-ch-yellow/[0.055] px-3.5 py-2 align-middle'
          : 'px-3.5 py-2 align-middle'
      }
    >
      <div className="space-y-[3px]">
        {items.map((item) => (
          <div key={item} className="flex items-start gap-1.5">
            {dim ? (
              <X
                size={11}
                strokeWidth={2.4}
                className="mt-[3px] shrink-0 text-white/30"
                aria-hidden="true"
              />
            ) : (
              <Check
                size={11}
                strokeWidth={2.4}
                className="mt-[3px] shrink-0 text-emerald-400"
                aria-hidden="true"
              />
            )}
            <span
              className={
                enterprise
                  ? 'text-[11.5px] leading-[1.5] text-white/85'
                  : dim
                    ? 'text-[11.5px] leading-[1.5] text-white/45'
                    : 'text-[11.5px] leading-[1.5] text-white/60'
              }
            >
              {item}
            </span>
          </div>
        ))}
      </div>
    </td>
  )
}
