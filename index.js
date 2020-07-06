/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(arr) {
    let result = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return result
}


function createEmployeeRecords(arr) {

    let result = []
    for (let i = 0; i < arr.length; i++) {
        result.push(createEmployeeRecord(arr[i]))
    }
    return result
}

function createTimeInEvent(dateStamp) {
    let dateArr = dateStamp.split(' ')
    let timeObj = {
        type: "TimeIn",
        hour: parseInt(dateArr[1]),
        date: dateArr[0]
    }

    this.timeInEvents.push(timeObj)
    return this
}

function createTimeOutEvent(dateStamp) {
    let dateArr = dateStamp.split(' ')
    let timeObj = {
        type: "TimeOut",
        hour: parseInt(dateArr[1]),
        date: dateArr[0]
    }

    this.timeOutEvents.push(timeObj)
    return this
}

function hoursWorkedOnDate(dateStamp) {
    let employeeTimeIn = this.timeInEvents.find(obj => obj.date === dateStamp)
    let employeeTimeOut = this.timeOutEvents.find(obj => obj.date === dateStamp)
    if (employeeTimeIn && employeeTimeOut) {
        let timeIn = employeeTimeIn.hour
        let timeOut = employeeTimeOut.hour
        return (timeOut - timeIn) / 100
    } else {
        return "No matches"
    }
}

function wagesEarnedOnDate(dateStamp) {
    let wage = this.payPerHour
    let hours = hoursWorkedOnDate.call(this, dateStamp)
    return wage * hours
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

function findEmployeeByFirstName(array, firstName) {
    return array.find(obj => obj.firstName === firstName)
}

function calculatePayroll(arr) {
    return arr.map(emp => allWagesFor.call(emp)).reduce((total, wage) => total + wage)
}