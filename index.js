/* Your Code Here */

function createEmployeeRecord(testSubject) {
    const employee = {
        firstName: testSubject[0],
        familyName: testSubject[1],
        title: testSubject[2],
        payPerHour: testSubject[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
  }
  
  function createEmployeeRecords(rawEmployeeData){
      return rawEmployeeData.map(x => createEmployeeRecord(x));
  }
  
  let createTimeInEvent = function(timeStampIn){
    let timeObject = {}
    timeObject.type = "TimeIn"
    timeObject.date = timeStampIn.split(" ")[0]
    timeObject.hour = parseInt(timeStampIn.split(" ")[1])
    this.timeInEvents.push(timeObject)
  
    return this
  }
    
  let createTimeOutEvent = function(timeStampOut){
    let timeObject = {}
    timeObject.type = "TimeOut"
    timeObject.date = timeStampOut.split(" ")[0]
    timeObject.hour = parseInt(timeStampOut.split(" ")[1])
    this.timeOutEvents.push(timeObject)
  
    return this
  }
    
  let hoursWorkedOnDate = function(timeStamp){
    let timeInResult = this.timeInEvents.find((x) => x.date === timeStamp)
    let timeOutResult = this.timeOutEvents.find((x) => x.date === timeStamp)
    return (timeOutResult.hour - timeInResult.hour)/100
  }
  
  let wagesEarnedOnDate = function(date){
    let hours = hoursWorkedOnDate.call(this, date)
    return this.payPerHour * hours
  }
  
  let calculatePayroll = function(employees){
    let totalPayroll = 0
    employees.forEach((employee)=> totalPayroll += allWagesFor.call(employee))
    return totalPayroll

    // alternate code with reduction:
    // return employees.reduce(payrollSum, totalPayroll)
  
    // function payrollSum(totalPayroll, record) {
    //   return totalPayroll + allWagesFor.call(record);
    // }
  }
  
   let findEmployeeByFirstName = function(employees, data){
     let employee = employees.find( ({ firstName }) => firstName === data );
     return employee
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