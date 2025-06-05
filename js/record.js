const displayTime = setInterval(() => {
  const now = new Date()
  
  console.log(now)

  const year = ("0"+now.getFullYear()).slice(-4)
  const month = ("0"+(now.getMonth()+1)).slice(-2)
  const day = ("0"+now.getDate()).slice(-2)
  const hour = ("0"+now.getHours()).slice(-2)
  const minute = ("0"+now.getMinutes()).slice(-2)
  const second = ("0"+now.getSeconds()).slice(-2)

  document.getElementById('datetime').innerHTML = `<div>${year}-${month}-${day}</div><div>${hour}:${minute}:${second}</div>`
}, 1000)

class Record {
  constructor(start, end){
    this.ident = new Date(start).getTime()
    this.start = new Date(start)
    this.end = new Date(end)

    const distance = this.end.getTime() - this.start.getTime()
    const minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)))
    const seconds = Math.floor((distance % (1000 * 60) / 1000))

    this.elapse = `${minutes}m ${seconds}s`
  }
}

// UI Class
class UI {
  static displayRecords(){
    const records = Store.getRecords()

    records.forEach((record, index) => {
      UI.addRecordToList(record, index)
    })
  }

  static addRecordToList(record, index){
    const list = document.getElementById('timer-list')

    const row = document.createElement('tr')
    row.classList.add("bg-white")
    row.classList.add("border-b")


    const start = new Date(record.start)
    const end = new Date(record.end)
    const formatStart = `
      ${("0" + start.getHours()).slice(-2)}:${("0" + start.getMinutes()).slice(-2)}:${("0" + start.getSeconds()).slice(-2)}`
    const formatEnd = `
      ${("0" + end.getHours()).slice(-2)}:${("0" + end.getMinutes()).slice(-2)}:${("0" + end.getSeconds()).slice(-2)}`

    row.innerHTML = `
      <td class="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">${index+1}</td>
      <td class="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap">${record.elapse}</td>
      <td class="hidden">${record.ident}</td>
      <td class="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">${formatStart}</td>
      <td class="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap">${formatEnd}</td>
      <td class="px-6 py-4 text-sm font-light hover:font-bold cursor-pointer text-left text-gray-900 whitespace-nowrap remark">${record.remark || ''}</td>
      <td class="px-6 py-4 text-sm font-light text-gray-900 whitespace-nowrap"><button class="bg-red-400 text-white w-6 h-6 rounded-full delete">X</button></td>
    `

    list.appendChild(row)
  }

  static editRecord(el){
    if(el.classList.contains('remark')){
      const remark = el.innerHTML
      // console.log(remark)

      const input = prompt('Enter your remark', remark)
      el.innerHTML = input
    }
  }

  static deleteRecord(el){
    if(el.classList.contains('delete')){
      el.parentElement.parentElement.remove()
    }
  }

  static clearFiled(){
    document.getElementById('timer-start').innerHTML = ''
    document.getElementById('timer-stop').innerHTML = ''
  }

}


// Store CLass: Handler Storage
class Store {
  static getRecords() {
    let records
    if(localStorage.getItem('records') === null){
      records = []
    }else{
      records = JSON.parse(localStorage.getItem('records'))
    }

    return records
  }

  static addRecord(record){
    const records = Store.getRecords()
    records.push(record)
    localStorage.setItem('records', JSON.stringify(records))
  }

  static editRecord(el){
    if(el.classList.contains('remark')){
      const start = el.parentElement.childNodes[5].innerHTML
      const records = Store.getRecords()
      records.forEach((record) => {
        if(record.ident == start.toString()){
          record.remark = el.innerHTML
        }
      })
      localStorage.setItem('records', JSON.stringify(records))
    }
  }

  static removeRecord(el){
    if(el.classList.contains('delete')){

      const records = Store.getRecords()
      records.forEach((record, index) => {
          const start = el.parentElement.parentElement.querySelector('.hidden').innerHTML
          console.log(start)
          if(record.ident == start.toString()){
          records.splice(index, 1)
        }
      })
      localStorage.setItem('records', JSON.stringify(records))
    }
  }
}


// Event: Display Timers
document.addEventListener('DOMContentLoaded', UI.displayRecords)


// Event: Start timer
document.getElementById('start').addEventListener('click', () => {
  const timerStart = document.getElementById('timer-start')
  timerStart.innerHTML = new Date
})


// Event: Stop timer & Add a timer
document.getElementById('stop').addEventListener('click', () => {
  const timerStart = document.getElementById('timer-start')
  const timerStop = document.getElementById('timer-stop')
  timerStop.innerHTML = new Date

  const start = timerStart.innerHTML
  const stop = timerStop.innerHTML

  if(start !== ''){
    // Instantiate timer
    const record = new Record(start, stop)

    // Add timer to UI
    UI.addRecordToList(record)
    
    // Add timer to store
    Store.addRecord(record)
    
    // Clear filed
    UI.clearFiled()
  }
})

// Event: Add remark
document.getElementById('timer-list').addEventListener('click', (e) => {
  // Input remark from UI
  UI.editRecord(e.target)
  
  // Edit record in store
  Store.editRecord(e.target)
})


// Event: Delete a timer
document.getElementById('timer-list').addEventListener('click', (e) => {
  // Remove timer from UI
  UI.deleteRecord(e.target)

  // Remove timer from store
  Store.removeRecord(e.target)
  // console.log(e.target.parentElement.parentElement.childNodes[5].innerHTML)
})


// Clear
document.getElementById('clear').addEventListener('click', () => {
  if(confirm('Are you sure ?')){

    const el = document.getElementById('timer-list')
    el.innerHTML = ''
    
    const records = []
    localStorage.setItem('records', JSON.stringify(records))

    // Clear filed
    UI.clearFiled()
  }
})