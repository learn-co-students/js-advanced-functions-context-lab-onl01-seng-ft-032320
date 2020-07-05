/* Your Code Here */

let createEmployeeRecord = function (info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: [] 
    }
}

let createEmployeeRecords = function (employees){
    return employees.map(employee => { return createEmployeeRecord(employee)})
}

let createTimeInEvent = function (date){
    let event = {
        type: "TimeIn",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }

    this.timeInEvents.push(event)
    return this
}

let createTimeOutEvent = function (date){
    let event = {
        type: "TimeOut",
        hour: parseInt(date.split(" ")[1]),
        date: date.split(" ")[0]
    }

    this.timeOutEvents.push(event)
    return this
}

let hoursWorkedOnDate = function (date){
    let dayIn = this.timeInEvents.find(event => event.date === date.split(" ")[0])
    let dayOut = this.timeOutEvents.find(event => event.date === date.split(" ")[0])
    return (dayOut.hour - dayIn.hour) / 100
}

let wagesEarnedOnDate = function (date){
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let findEmployeeByFirstName = function (employees, name){
    return employees.find(employee => {return employee.firstName === name})
}

let calculatePayroll = function (employees){
    let wages = employees.map(employee => {
        return allWagesFor.call(employee)
     })
     return wages.reduce((wagesForEmployee,curr) => {
        return curr += wagesForEmployee
     })
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