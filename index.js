/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(arr) {
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(employees) {
    return employees.map(function(e) { return createEmployeeRecord(e) } )
}

let createTimeInEvent = function(dateTime) {
    let timeIn = {
        type: "TimeIn",
        date: dateTime.split( ' ' )[0],
        hour: parseInt(dateTime.split( ' ' )[1])
    }
    this.timeInEvents.push(timeIn)
    return this
}

let createTimeOutEvent = function(dateTime) {
    let timeOut = {
        type: "TimeOut",
        date: dateTime.split( ' ' )[0],
        hour: parseInt(dateTime.split( ' ' )[1])
    }
    this.timeOutEvents.push(timeOut)
    return this
}

function hoursWorkedOnDate(date) {
    let eventOnDate = function(event) { return event.date === date },
        inTime = this.timeInEvents.find(eventOnDate).hour,
        outTime = this.timeOutEvents.find(eventOnDate).hour;
    return (outTime - inTime) / 100
}

function wagesEarnedOnDate(date) {
    return hoursWorkedOnDate.call(this, date) * this.payPerHour
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employees, name) {
    return employees.find(emp => {
        return emp.firstName === name
    });
}

function calculatePayroll(employees) {
    const reducer = (wagesTotal, emp) => {
        return wagesTotal + allWagesFor.call(emp)
    }
    return employees.reduce(reducer, 0)
}
