const xhtml = new XMLHttpRequest()
const url = 'data/txnote.json'

xhtml.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
      var myArr = JSON.parse(this.responseText);
      show(myArr);
  }
};
xhtml.open("GET", url, true);
xhtml.send();

class NoteObj{
  constructor(){
    this.ud = '',
    this.da = '',
    this.cc = '',
    this.pi = '',
    this.location = {}
    this.io = {},
    this.dx = {},
    this.tx = {}
  }

  createUI(){
    this.createUd()
    this.createDa()
    // this.createCc()
    this.createIo()
  }

  createUd(){
    const div = document.createElement('div')
    let ui = ''
    this.ud.forEach(ud => {
      ui += (ud !== '' ? `<button>${ud}</button>` : '')
    })
    div.innerHTML = ui
    document.getElementById('ui').appendChild(div)
  }

  createDa(){
    const div = document.createElement('div')
    let ui = ''
    this.da.forEach(da => {
      ui += (da !== '' ? `<button>${da}</button>` : '')
    })
    div.innerHTML = ui
    document.getElementById('ui').appendChild(div)}

  createCc(){
    const div = document.createElement('div')
    let ui = ''
    this.cc.forEach(cc => {
      ui += (cc !== '' ? `<button>${cc}</button>` : '')
    })
    ui += `<input type="text" id="ccText"/>`
    div.innerHTML = ui
    document.getElementById('ui').appendChild(div)
  }

  createPi(){

  }

  createLocation(series){
    const div = document.createElement('div')
    let ui = `<h3 class="mb-2 font-semibold text-gray-900">Tooth</h3>
              <table class="mx-auto text-sm font-medium text-gray-900 bg-white rounded-md border border-r-0 border-gray-200">
              <tbody>
              <tr class="border-b">`
    this.location.tooth.forEach((tooth, index) => {
      ui += `
        <td class="border-r border-gray-200">
          <div class="flex flex-inline items-center pl-3">
            <input id="${series}-${tooth}" type="radio" value="${tooth}" name="tooth" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
              <label for="${series}-${tooth}" class="py-3 mx-2 flex text-sm font-medium text-gray-900">${tooth}</label>
          </div>
        </td>`
      ui += (index+1) % 16 == 0 ? '</tr><tr>' : ''
    })
    ui += '</tr></tbody></table>'
    ui += `<h3 class="mb-2 font-semibold text-gray-900">Surface</h3>
          <table class="text-sm font-medium text-gray-900 bg-white rounded-md border border-r-0 border-gray-200">
          <tbody>
          <tr>`
    this.location.surface.forEach(surface => {
      ui += `
      <td class="border-r border-gray-200">
          <div class="flex flex-inline items-center pl-3">
            <input id="${series}-${surface}" type="checkbox" value="${surface}" name="surface" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"">
              <label for="${series}-${surface}" class="py-3 mx-2 flex text-sm font-medium text-gray-900">${surface}</label>
          </div>
        </td>`
    })
    ui += '</tr></tbody></table>'
    div.innerHTML = ui
    document.getElementById('ui').appendChild(div)
  }

  createIo(){
    this.createLocation('io')

    const div = document.createElement('div')
    let ui = `
    <input type="hidden" checked value=" ">
    <h3 class="mb-2 font-semibold text-gray-900">Surface</h3>
    <table class="mx-auto text-sm font-medium text-gray-900 bg-white rounded-md border-gray-200">
    <tbody>
    <tr><td>Size</td>`
    this.io.size.forEach(io => {
      ui += `<td class="border border-gray-200">
              <div class="flex flex-inline items-center pl-3">
                <input id="size-${io}" type="checkbox" value="${io}" name="size-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                  <label for="size-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
              </div>
            </td>`
    })
    ui += '</tr><tr><td>Color</td>'
    this.io.color.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="color-${io}" type="checkbox" value="${io}" name="color-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="color-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Appearance</td>'
    this.io.appearance.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="appearance-${io}" type="checkbox" value="${io}" name="appearance-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="appearance-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Quality</td>'
    this.io.quality.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="quality-${io}" type="checkbox" value="${io}" name="quality-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="quality-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Extend</td>'
    this.io.extend.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="extend-${io}" type="checkbox" value="${io}" name="extend-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="extend-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Mobility</td>'
    this.io.mobility.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="mobility-${io}" type="checkbox" value=", mobility grade ${io}" name="mobility-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="mobility-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Airblowing</td>'
    this.io.airblowing.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="airblowing-${io}" type="checkbox" value=", ${io} to airblowing test" name="airblowing-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="airblowing-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Exploration</td>'
    this.io.exploration.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="exploration-${io}" type="checkbox" value=", ${io} to exploration" name="exploration-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="exploration-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Palpation</td>'
    this.io.palpation.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="palpation-${io}" type="checkbox" value=", ${io} to palpation" name="palpation-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="palpation-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Percussion</td>'
    this.io.percussion.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="percussion-${io}" type="checkbox" value=", ${io} to percussion " name="percussion-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="percussion-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr><td>Nearby</td>'
    this.io.nearby.forEach(io => {
      ui += `<td class="border border-gray-200">
            <div class="flex flex-inline items-center pl-3">
              <input id="nearby-${io}" type="checkbox" value=", ${io}" name="nearby-${io}" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2">
                <label for="nearby-${io}" class="mx-2 flex text-sm font-medium text-gray-900">${io}</label>
            </div>`
    })
    ui += '</tr><tr>'
    div.innerHTML = ui
    document.getElementById('ui').appendChild(div)
    
  }

  createDx(){
    this.createLocation('dx')

  }

  createTx(){
    this.createLocation('tx')

  }
    
}

class Note{
  constructor(){
    this.ud = '',
    this.da = '',
    this.cc = '',
    this.pi = '',
    this.location = {}
    this.io = {},
    this.dx = {},
    this.tx = {}
  }

  static createLocation(location){
    console.log(location)
  }
}

function show(obj) {
  let output = ''

  const note = new NoteObj()
  note.ud = obj.ud
  note.da = obj.da
  note.cc = obj.cc
  note.location = obj.location
  note.pi = obj.pi
  note.io = obj.io
  note.dx = obj.dx
  note.tx = obj.tx

  note.createUI()

  // document.getElementById("app").innerHTML = output;
}


function addOutput(){
  let text = ''
  const output = document.getElementById('output')
  const inputs = document.querySelectorAll('input')
  output.innerHTML = text
  for (const input of inputs) {
    if (input.checked) {
      text += input.value + (['tooth', 'surface'].includes(input.name) ? '' :' ');
      // break;
    }
  }
  output.innerHTML += text
}