# find-object-in-array-performance

```js
import shortid from 'shortid'

const numberOfObjects = 2999
// generate array to use with map
const arrayOfNumbers = Array.from(Array(2999).keys())

// generate array of keys to use for lookup
const commonKeys = arrayOfNumbers.map((x) => shortid.generate())

// create array of objects
const regionsWithSvg = arrayOfNumbers.map((x) => ({
  id: `withSvg${x}`,
  commonKey: commonKeys[x]
}))

// create array of objects
const regionsWithEduData = arrayOfNumbers.map((x) => ({
  id: `withEdu${x}`,
  commonKey: commonKeys[x],
  eduPercent: Math.floor(Math.random() * (100 - 0) + 0)
}))

// test that commonKeys match
// Will print TEST FAILED if there is a problem
for (let i = 0; i < commonKeys; i++) {
  if (regionsWithSvg[i.commonKey] !== regionsWithEduData[i.commonKey]) {
    console.log('TEST FAILED')
  }
}

const start = new Date().getTime()
// iterate over regionsWithSvg and add .eduPercent
const combinedData = regionsWithSvg.map((x) => {
  const eduObj = regionsWithEduData.find((a) => a.commonKey === x.commonKey)
  x.eduPercent = eduObj.eduPercent
  return x
})
const end = new Date().getTime()

// console.log(combinedData)

console.log('milliseconds', end - start)
```
