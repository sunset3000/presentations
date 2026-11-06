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
import FiveSteps from '@/pancake_party/src/slides/12-FiveSteps'
import AvoidJoin from '@/pancake_party/src/slides/13-AvoidJoin'
import ValueScorecard from '@/pancake_party/src/slides/14-ValueScorecard'
import CostEcosystem from '@/pancake_party/src/slides/15-CostEcosystem'
import Customers from '@/pancake_party/src/slides/16-Customers'
import Closing from '@/pancake_party/src/slides/18-Closing'
import BackupComparison from '@/pancake_party/src/slides/17-BackupComparison'

const slides: SlideDefinition[] = [
  { component: Cover, title: '封面 · 煎饼派对出海' },
  { component: Customer, title: '客户与业务背景' },
  { component: DataProfile, title: '数据画像' },
  { component: OpsRisks, title: '痛点一 · 四类运维风险' },
  { component: Spikes, title: '痛点二 / 三 · 洪峰与时效' },
  { component: Objectives, title: 'Objectives · 五项验收标准' },
  { component: ClickHouseIntro, title: 'ClickHouse Enterprise 简介' },
  { component: Architecture, title: '方案架构总览' },
  { component: Analytics, title: '典型分析场景实现' },
  { component: Migration, title: '迁移策略 · 国内双跑 / 海外新建' },
  { component: FiveSteps, title: '五步迁移法' },
  { component: AvoidJoin, title: '性能实践 · 避免 JOIN' },
  { component: ValueScorecard, title: '方案价值一 · 验收记分卡' },
  { component: CostEcosystem, title: '方案价值二 · 成本与生态' },
  { component: Customers, title: '客户验证 · 游戏行业' },
  { component: Closing, title: 'Q&A' },
  { component: BackupComparison, title: 'Backup · Doris / ClickHouse 对比' },
]

export default function App() {
  const snapshot = new URLSearchParams(window.location.search).has('snapshot')

  return <Presentation slides={slides} chrome={!snapshot} />
}
