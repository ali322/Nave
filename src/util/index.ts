export const clearCache = () => {
  window.localStorage.removeItem('server')
  window.localStorage.removeItem('setting')
}