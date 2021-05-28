import shortid from 'shortid'
const { performance, PerformanceObserver } = require('perf_hooks')

const objToMap = (obj) => {
  const newMap = new Map()
  const a = Object.values(obj)
  a.forEach((o) => {
    newMap.set(o.commonKey, o)
  })
  return newMap
}

const mergeObjects = (o, m) => {
  return o.map((x) => {
    x.eduPercent = m.get(x.commonKey).eduPercent
    return x
  })
}

const observer = new PerformanceObserver((list) =>
  list.getEntries().forEach((entry) => console.info(entry))
)
observer.observe({ buffered: true, entryTypes: ['measure'] })

export const createCombinedDataUsingMap = (numObj) => {
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
  const regionsWithEduDataMap = objToMap(regionsWithEduData)
  performance.mark('e1')
  performance.measure('convert object to Map', 's1', 'e1')

  performance.mark('s2')
  mergeObjects(regionsWithSvg, regionsWithEduDataMap)
  performance.mark('e2')
  performance.measure('merge using Map.get()', 's2', 'e2')
}
