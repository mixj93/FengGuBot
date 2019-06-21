/*
movies - 📽 查看电影列表
tv - 📺 查看剧集列表
help - 🛎 查看帮助信息
*/
const COMMANDS = [
  {
    name: 'movies',
    description: '📽 查看电影列表'
  },
  {
    name: 'tv',
    description: '📺 查看剧集列表'
  },
  {
    name: 'help',
    description: '🛎 查看帮助信息'
  }
]

const ITEMS = [
  {
    title: '喜福会',
    originTitle: 'The Joy Luck Club',
    type: 'movie',
    url: 'https://www.fenggusub.com/the-joy-luck-club-1993/',
    year: '1993'
  },
  {
    title: '天鹅绒金矿',
    originTitle: 'Velvet Goldmine',
    type: 'movie',
    url: 'https://www.fenggusub.com/velvet-goldmine-1998/',
    year: '1998'
  },
  {
    title: '完美家庭',
    originTitle: 'The Perfect Family',
    type: 'movie',
    url: 'https://www.fenggusub.com/the-perfect-family-2012/',
    year: '2012'
  },
  {
    title: '乐高积木世界',
    originTitle: 'Beyond the Brick: A LEGO Brickumentary',
    type: 'movie',
    url: 'https://www.fenggusub.com/beyond-the-brick-a-lego-brickumentary-2014/',
    year: '2014'
  },
  {
    title: '泰格',
    originTitle: 'Tig',
    type: 'movie',
    url: 'https://www.fenggusub.com/tig-2015/',
    year: '2015'
  },
  {
    title: '英格丽向西行',
    originTitle: 'Ingrid Goes West',
    type: 'movie',
    url: 'https://www.fenggusub.com/ingrid-goes-west-2017/',
    year: '2017'
  },
  {
    title: '识骨寻踪 第一季',
    originTitle: 'Bones S1',
    type: 'tv',
    url: 'https://www.fenggusub.com/bones-season1/',
    year: ''
  },
  {
    title: '识骨寻踪 第二季',
    originTitle: 'Bones S2',
    type: 'tv',
    url: 'https://www.fenggusub.com/bones-season2/',
    year: ''
  },
  {
    title: '识骨寻踪 第十一季',
    originTitle: 'Bones S11',
    type: 'tv',
    url: 'https://www.fenggusub.com/bones-season11/',
    year: ''
  },
  {
    title: '识骨寻踪 第十二季',
    originTitle: 'Bones S12',
    type: 'tv',
    url: 'https://www.fenggusub.com/bones-season12/',
    year: ''
  },
  {
    title: '丛林中的莫扎特 四季全',
    originTitle: 'Mozart In The Jungle',
    type: 'tv',
    url: 'https://www.fenggusub.com/mozart-in-the-jungle/',
    year: ''
  },
  {
    title: '无为大师 第一季',
    originTitle: 'Master Of None S1',
    type: 'tv',
    url: 'https://www.fenggusub.com/master-of-none-season1/',
    year: ''
  },
  {
    title: '善缘医院 第一、二季',
    originTitle: 'The Good Karma Hospital S1 & S2',
    type: 'tv',
    url: 'https://www.fenggusub.com/the-good-karma-hospital/',
    year: ''
  },
  {
    title: '纽约客再现 第一季',
    originTitle: 'The New Yorker Presents S1',
    type: 'tv',
    url: 'https://www.fenggusub.com/the-new-yorker-presents-season1/',
    year: ''
  },
  {
    title: '硅谷发明家：吸血成金',
    originTitle: 'The Inventor: Out For Blood in Silicon Valley',
    type: 'movie',
    url: 'https://www.fenggusub.com/the-inventor-out-for-blood-in-silicon-valley-2019/',
    year: '2019'
  }
]

exports.HELP_MSG = COMMANDS.map(c => `/${c.name} - ${c.description}`).join('\n') + '\n🔎 输入关键字 @我 搜索影片信息'

exports.MOVIES_INFO = ITEMS.filter(i => i.type === 'movie')
  .map(i => getItemInfo(i)).join('\n')

exports.TV_INFO = ITEMS.filter(i => i.type === 'tv')
  .map(i => getItemInfo(i)).join('\n')

function getItemInfo (item) {
  let title = item.title
  if (item.originTitle) {
    title += ` ${item.originTitle}`
  }
  if (item.year) {
    title += ` (${item.year})`
  }
  
  return `${title}
👉 ${item.url}`
}

const search = (keyword) => {
  keyword = keyword.toLowerCase()
  const results = []
  ITEMS.forEach(i => {
    if (i.title.toLowerCase().indexOf(keyword) >= 0 || i.originTitle.toLowerCase().indexOf(keyword) >= 0) {
      results.push(i)
    }
  })

  return results
}

exports.getSearchRes = (keyword) => {
  const results = search(keyword)
  if (results.length === 0) {
    return '抱歉，没有找到相关影片信息'
  }
  return results.map(i => getItemInfo(i)).join('\n')
}
