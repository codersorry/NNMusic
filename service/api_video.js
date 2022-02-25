import SorryRequest from './index'

export function getTopMVs(offset, limit = 10) {
  return SorryRequest.get("/top/mv", {
    offset,
    limit
  })
}