import shortid from 'shortid'
const { performance, PerformanceObserver } = require('perf_hooks')

const mergeObjects = (o, m) => {
  return o.map((x) => {
    const eduObj = m.find((a) => a.commonKey === x.commonKey)
    x.eduPercent = eduObj.eduPercent
    return x
  })
}

// const observer = new PerformanceObserver((list) =>
//   list.getEntries().forEach((entry) => console.info(entry))
// )
// observer.observe({ buffered: true, entryTypes: ['measure'] })

export const createCombinedData = (numObj) => {
  const arrOfNums = Array.from(Array(numObj).keys())
  const commonKeys = arrOfNums.map((x) => shortid.generate())

  const regionsWithSvg = arrOfNums.map((x) => ({
    id: `withSvg${x}`,
    commonKey: commonKeys[x]
  }))

  const regionsWithEduData = arrOfNums.map((x) => ({
    id: `withEdu${x}`,
    commonKey: commonKeys[x],
    eduPercent: Math.floor(Math.random() * (100 - 0) + 0)
  }))
  performance.mark('s1')
  mergeObjects(regionsWithSvg, regionsWithEduData)
  performance.mark('e1')
  performance.measure('merge using Object.find()', 's1', 'e1')
}
