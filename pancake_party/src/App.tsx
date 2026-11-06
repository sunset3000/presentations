import {
  Presentation,
  type SlideDefinition,
} from '@/src/components/Presentation'
import Cover from '@/pancake_party/src/slides/01-Cover'
import Customer from '@/pancake_party/src/slides/02-Customer'
import DataProfile from '@/pancake_party/src/slides/04-DataProfile'
import OpsRisks from '@/pancake_party/src/slides/05-OpsRisks'
import Spikes from '@/pancake_party/src/slides/06-Spikes'
import Objectives from '@/pancake_party/src/slides/07-Objectives'
import ClickHouseIntro from '@/pancake_party/src/slides/08-ClickHouseIntro'
import Architecture from '@/pancake_party/src/slides/09-Architecture'
import Analytics from '@/pancake_party/src/slides/10-Analytics'
import Migration from '@/pancake_party/src/slides/11-Migration'
import AvoidJoin from '@/pancake_party/src/slides/13-AvoidJoin'
import PreAggregationIndex from '@/pancake_party/src/slides/12-PreAggregationIndex'
import ValueScorecard from '@/pancake_party/src/slides/14-ValueScorecard'
import Ecosystem from '@/pancake_party/src/slides/15-Ecosystem'
import Customers from '@/pancake_party/src/slides/16-Customers'
import Closing from '@/pancake_party/src/slides/18-Closing'
import BackupComparison from '@/pancake_party/src/slides/17-BackupComparison'
import BackupJoinScaling from '@/pancake_party/src/slides/19-BackupJoinScaling'
import BackupTimeplus from '@/pancake_party/src/slides/20-BackupTimeplus'

const slides: SlideDefinition[] = [
  { component: Cover, title: '封面 · 煎饼派对出海' },
  { component: Customer, title: 'Customer & business context' },
  { component: DataProfile, title: 'Data profile' },
  { component: OpsRisks, title: '痛点一 · 运维成本高昂' },
  { component: Spikes, title: '痛点二 / 三 · 洪峰与时效' },
  { component: Objectives, title: 'Objectives · 五项验收标准' },
  { component: ClickHouseIntro, title: 'ClickHouse Enterprise 简介' },
  { component: Architecture, title: '方案架构总览' },
  { component: Analytics, title: '典型分析场景实现' },
  { component: Migration, title: '迁移策略 · 国内双跑五步 / 海外新建' },
  { component: AvoidJoin, title: '性能实践 · 避免 JOIN' },
  { component: PreAggregationIndex, title: '性能实践 · 预聚合与跳数索引' },
  { component: ValueScorecard, title: '方案价值一 · 验收记分卡' },
  { component: Ecosystem, title: '方案价值二 · 生态延展' },
  { component: Customers, title: '客户验证 · 游戏行业' },
  { component: Closing, title: 'Q&A' },
  { component: BackupComparison, title: 'Backup 1 · Doris / ClickHouse 对比' },
  { component: BackupJoinScaling, title: 'Backup 2 · JOIN 性能提升' },
  { component: BackupTimeplus, title: 'Backup 3 · Timeplus 宽表构建' },
]

export default function App() {
  const snapshot = new URLSearchParams(window.location.search).has('snapshot')

  return <Presentation slides={slides} chrome={!snapshot} />
}
