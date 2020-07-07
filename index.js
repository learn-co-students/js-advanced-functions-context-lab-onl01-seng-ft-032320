/* Your Code Here */

let createEmployeeRecord = function(infoArray) {
  return {
    firstName: infoArray[0],
    familyName: infoArray[1],
    title: infoArray[2],
    payPerHour: infoArray[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(employeeInfo) {
  return employeeInfo.map(function(employee) {
    return createEmployeeRecord(employee);
  })
}

let createTimeInEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date
  })
  return this;
}

let createTimeOutEvent = function(dateStamp) {
  let [date, hour] = dateStamp.split(' ');
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date
  })
  return this;
}

let hoursWorkedOnDate = function(workDay) {
  let inTime = this.timeInEvents.find(function(e) {
    return e.date === workDay
  })

  let outTime = this.timeOutEvents.find(function(e) {
    return e.date === workDay
  })

  let hoursWorked = outTime.hour - inTime.hour;
  return hoursWorked / 100;
}

let wagesEarnedOnDate = function(dateSought){
  let rawWage = hoursWorkedOnDate.call(this, dateSought)
      * this.payPerHour
  return parseFloat(rawWage.toString())
}

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find(function(rec){
    return rec.firstName === firstName
  })
}

let calculatePayroll = function(arrayOfEmployeeRecords){
  return arrayOfEmployeeRecords.reduce(function(memo, rec){
      return memo + allWagesFor.call(rec)
  }, 0)
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}