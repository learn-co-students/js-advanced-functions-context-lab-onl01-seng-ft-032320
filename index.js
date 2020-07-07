"use-strict";

let createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
};

let createEmployeeRecords = (array) => {
  return array.map((e) => (createEmployeeRecord(e)))
};

let createTimeInEvent = function(dateStamp) {
  let date = dateStamp.split(" ")[0];
  let hour = parseInt(dateStamp.split(" ")[1], 10);

  this.timeInEvents.push({
    type: "TimeIn",
    hour,
    date
  });

  return this;
};

let createTimeOutEvent = function(dateStamp) {
  let date = dateStamp.split(" ")[0];
  let hour = parseInt(dateStamp.split(" ")[1], 10);

  this.timeOutEvents.push({
    type: "TimeOut",
    hour,
    date
  });

  return this;
};

let hoursWorkedOnDate = function(dateStamp) {
  let timeIn = this.timeInEvents.find((event) => (event.date === dateStamp));
  let timeOut = this.timeOutEvents.find((event) => (event.date === dateStamp));

  return (timeOut.hour - timeIn.hour)/100;
};

let wagesEarnedOnDate = function(dateStamp) {
  let hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
  return hoursWorked * this.payPerHour;
};

let findEmployeeByFirstName = function(srcArray, firstName) {
  return srcArray.find((employee) => (employee.firstName === firstName))
};

let calculatePayroll = function(employeeRecords) {
  return employeeRecords.reduce((totalPayedOwed, record) => (totalPayedOwed += allWagesFor.call(record)), 0)
};
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