function directive (el, binding) {
  unbind (el, binding)
  let oDiv = document.createElement('div')
  oDiv.innerHTML = binding.value.html
  el.dataset.tooltip = oDiv.innerText || oDiv.textContent
  el.dataset['tooltipLocation'] = binding.value.position
}
function unbind (el, binding) {
  el.removeAttribute('data-tooltip')
  el.removeAttribute('data-tooltip-location')
}
export default {
  bind: directive,
  updated: directive,
  componentUpdated: directive,
  unbind: unbind
}
