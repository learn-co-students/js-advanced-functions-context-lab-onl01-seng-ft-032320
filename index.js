/* Your Code Here */

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

function createEmployeeRecord(info) {
    return {firstName: info[0], familyName: info[1], title: info[2], payPerHour: info[3], timeInEvents: [], timeOutEvents: []}
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee))
}

function createTimeInEvent(event) {
    let hour = parseInt(event.split(" ")[1],10)
    let date = event.split(" ")[0]
    let timeIn = {type: "TimeIn", hour: hour, date: date}
    
    this.timeInEvents.push(timeIn)
    return this
}

function createTimeOutEvent(event) {
    let hour = parseInt(event.split(" ")[1],10)
    let date = event.split(" ")[0]
    let timeOut = {type: "TimeOut", hour: hour, date: date}
    
    this.timeOutEvents.push(timeOut)
    return this
}

function hoursWorkedOnDate(eventDate) {
    let timeIn = this.timeInEvents.find(shift => shift.date === eventDate).hour
    let timeOut = this.timeOutEvents.find(shift => shift.date === eventDate).hour
    return ((timeOut - timeIn)/100)
}

function wagesEarnedOnDate(eventDate) {
    return (hoursWorkedOnDate.call(this, eventDate) * this.payPerHour)
}

function allWagesFor() {
    return this.timeInEvents.reduce((total, shift) => (total + this.wagesEarnedOnDate(shift.date)),0)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}

function calculatePayroll(employees) {
    return employees.reduce((total,employee) => (total + allWagesFor.call(employee)),0)
}