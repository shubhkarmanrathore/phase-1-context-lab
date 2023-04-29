const createEmployeeRecord = function(empArray) {
    return {
        firstName: empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(empArrays) {
    return empArrays.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

const createTimeInEvent = function(dateStamp){

    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

const createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })

    return this
}

const hoursWorkedOnDate = function(date){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === date
    })
    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === date
    })
    return (outEvent.hour - inEvent.hour) / 100
}

const  wagesEarnedOnDate = function(date) {
    let wages = this.payPerHour * hoursWorkedOnDate.call(this, date)
    return wages
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!
 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0)

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(empObj){
        return empObj.firstName === firstName
    })
 }

const calculatePayroll = function(srcArray){
    return srcArray.reduce(function(memo, empObj) {
        return memo + allWagesFor.call(empObj)
    }, 0)
}