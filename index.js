/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function() {
    let eligibleDates = this.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d) {
            return memo + wagesEarnedOnDate.call(this, d)
        }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data) {
    return data.map(e => {
        return createEmployeeRecord(e)
    })
}

function createTimeInEvent(date) {
    let [d, hour] = date.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: d
    })
    return this
}

function createTimeOutEvent(date) {
    let [d, hour] = date.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: d
    })
    return this
}

function hoursWorkedOnDate(date) {
    let timeIn = this.timeInEvents.find(e => e.date === date)

    let timeOut = this.timeOutEvents.find(e => e.date === date)

    return (timeOut.hour - timeIn.hour) / 100
}

function wagesEarnedOnDate(date) {
    let wage = hoursWorkedOnDate.call(this, date) * this.payPerHour

    return parseFloat(wage)
}

function allWagesFor() {
    let dates = this.timeInEvents.map(e => e.date)

    let payable = eligibleDates.reduce((a, b) => a + wagesEarnedOnDate.call(this, b))

    return payable
}

function findEmployeeByFirstName(arr, name) {
    return arr.find(e => {
        return e.firstName === name
    })
}

function calculatePayroll(arr) {
    return arr.reduce((a, b) => a + allWagesFor.call(b), 0)
}