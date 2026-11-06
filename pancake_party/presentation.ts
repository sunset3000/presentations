import snapshot from '@/pancake_party/snapshot.png'
import type { PresentationMeta } from '@/src/lib/presentation'

const pancakeParty: PresentationMeta = {
  slug: 'pancake_party',
  title: '煎饼派对出海',
  subtitle: '阿里云 ClickHouse 企业版托管方案',
  description:
    '从自建 Doris 到 Agent 时代实时分析底座 — 客户画像、架构方案、迁移路径与验收记分卡。',
  date: '2026.11',
  slideCount: 17,
  tags: ['游戏出海', '实时分析', 'Doris → ClickHouse', '托管化演进'],
  thumbnail: snapshot,
  thumbnailAlt: '《煎饼派对出海》演示封面',
}

export default pancakeParty
