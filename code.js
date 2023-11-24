function _tsp_ls(dm) 
{
  let minDist = Infinity
  let improved = true
  while (improved)
  {
    improved = false
    let cities = dm.map((item,index) => index)

    if (cities.length <= 1) return 0

    let randomCities = getRandom(cities)
  
    let thisminDist = Infinity
  
    for (let i = 0; i < cities.length; i++)
    {
      for (let k = i + 1; k < cities.length; k++)
      {
        let route = optSwap(randomCities, i, k) // O(n)
        let sumDist = getPathDist(route, dm) // O(n) 
        thisminDist = Math.min(thisminDist, sumDist)        
      }
    }
    minDist = Math.min(minDist, thisminDist)
  }
  return minDist 
}

function tsp_ls(dm)
{
  let minDist = Infinity
  runtimes = 0
  while (runtimes < 2**(dm.length))
  {
    let sumDist = _tsp_ls(dm)
    minDist = Math.min(minDist, sumDist) 
    runtimes++
  }
  return minDist
}


function optSwap(route, i, k) 
{
  let p1 = route.slice(0, i)
  let p2 = (route.slice(i, k+1)).reverse()
  let p3 = route.slice(k+1, route.length)
  return [p1,p2,p3].flatMap(_ => _)
}

function getRandom(route)
{
  let randomRoute = route.slice()
  for (let i = 0; i < route.length; i++)
  {
    let rn = Math.floor(Math.random() * route.length);
    let tmp = randomRoute[rn]
    randomRoute[rn] = randomRoute[i];
    randomRoute[i] = tmp
  }
  return randomRoute
}

function getPathDist(cities, dm)
{
  let sumDist = 0
  for (let i = 0; i < cities.length-1; i++)
  {
    let a = cities[i]
    let b = cities[i+1]
    sumDist += dm[a][b]
  }
  return sumDist
}

