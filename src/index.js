import { createCombinedData } from './useObjectDotFind'
import { createCombinedDataUsingMap } from './useMap'
const log = console.log

const numObjs = 999

console.group('Start tests')
createCombinedData(numObjs)
createCombinedDataUsingMap(numObjs)
console.groupEnd()
