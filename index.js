function createEmployeeRecord(fourElmentArray){

    // Initialize an empty array to hold TimeInEvents
    let timeInEvents = [];
    let timeOutEvents = [];

    // create an empty object first 
    let record = {
        firstName: fourElmentArray[0],
        familyName: fourElmentArray[1],
        title: fourElmentArray[2],
        payPerHour: fourElmentArray[3],
        timeInEvents: timeInEvents,
        timeOutEvents: timeOutEvents
    };
    return record;
}



function createEmployeeRecords(arrayOfArrays){
    let arrayOfObjects = [];
    arrayOfArrays.forEach(record => {
      arrayOfObjects.push(createEmployeeRecord(record))  

    })
    return arrayOfObjects   
}

// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

// createEmployeeRecords(twoRows)


// sounds like the timeIn key holds an array of objects with type, hour and date as keys
function createTimeInEvent(date){
    this.timeInEvents.push({
        type: "TimeIn", 
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return this
}




// let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
// let updatedBpRecord = createTimeInEvent.call(bpRecord, "2014-02-28 1400")


function createTimeOutEvent(date){
    this.timeOutEvents.push({
        type: "TimeOut", 
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    })
    return this
}



function hoursWorkedOnDate(date){
    let inEvents = this.timeInEvents.find(inEvent => inEvent.date  === date )
    let outEvents = this.timeOutEvents.find(outEvent => outEvent.date === date )
    return (outEvents.hour - inEvents.hour) / 100 
}




    // cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
    // createTimeInEvent.call(cRecord, "44-03-15 0900")
    // createTimeOutEvent.call(cRecord, "44-03-15 1100")

    // hoursWorkedOnDate.call(cRecord, "44-03-15")

function wagesEarnedOnDate(date){
    // need to use hoursWorkedOnDate function the value from this multiply by the amount they make per hour will provide the answer
    this
    let hoursWorked = hoursWorkedOnDate.call(this, date);
    return (hoursWorked * this.payPerHour)
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// createTimeInEvent.call(cRecord, "44-03-15 0900")
// createTimeOutEvent.call(cRecord, "44-03-15 1100")
// wagesEarnedOnDate.call(cRecord, "44-03-15")

// wagesEarnedOnDate(cRecord, "0044-03-15")

function allWagesFor(){
    let allWages = 0;
    // need to be able to iterate based on how many records there is 
    this.timeInEvents.forEach(timeInEvent => {
        allWages = wagesEarnedOnDate.call(this, timeInEvent.date) + allWages
    })
    return allWages
}

// cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
// // Earns 324
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-14 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-14 2100")
// // Earns 54
// updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
// updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
// // 324 + 54

// allWagesFor(cRecord)



function findEmployeeByFirstName(arrayWithRecords, firstname){
  return  arrayWithRecords.find (record => record.firstName === firstname)
}

// let src = [
//     ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
//     ["Natalia", "Romanov", "CEO", 150]
//   ]
//   let emps = createEmployeeRecords(src)
//   let loki = findEmployeeByFirstName(emps, "Loki")








function calculatePayroll(employeeRecords){
    employeeRecords
    return employeeRecords.reduce((total, record) => total + allWagesFor.call(record), 0)
}

const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ]

  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-03 1700", "2018-01-05 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ]

  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-03 2300", "2018-01-05 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ]



  
let employeeRecords = createEmployeeRecords(csvDataEmployees)
employeeRecords.forEach(function (rec) {
  let timesInRecordRow = csvTimesIn.find(function (row) {
    return rec.firstName === row[0]
  })

  let timesOutRecordRow = csvTimesOut.find(function (row) {
    return rec.firstName === row[0]
  })

  timesInRecordRow[1].forEach(function(timeInStamp){
    createTimeInEvent.call(rec, timeInStamp)
  })

  timesOutRecordRow[1].forEach(function(timeOutStamp){
    createTimeOutEvent.call(rec, timeOutStamp)
  })
}) 
    
calculatePayroll(employeeRecords)
























/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// let allWagesFor = function () {
//     let eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     let payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }