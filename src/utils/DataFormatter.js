export default class DataFormatter {

    formatTime(time) {
        var interval = 1000 * 60 * 15;
        var date = new Date(time);
        return new Date(Math.floor(date.getTime()/interval)*interval);
    }

    formatLineChart(courseData, field) {

        // round the timestamps
        var data = courseData.map((course) => {
            var newCourse = course;
            newCourse.timestamp = this.formatTime(course.timestamp);
            return newCourse;
        })

        var dataCopy = JSON.parse(JSON.stringify(data));

        // create an x-axis point for every unique timestamp
        var formattedData = [];
        for (var index in dataCopy) {
            var roundedTime = this.formatTime(dataCopy[index].timestamp)
            if (!formattedData.includes(roundedTime.getTime())) {
                formattedData.push(roundedTime.getTime());
            }
        }
        formattedData = formattedData.map(function(item) {
            return {name: new Date(item)}
        })


        // match query results to rounded timestamp
        var formattedCopy = JSON.parse(JSON.stringify(formattedData));

        for (var i in data) {
            for (var j in formattedData) {
                if (data[i].timestamp.getTime() === formattedData[j].name.getTime()) {
                    if (formattedCopy[j][data[i].section_id] === undefined) {

                        // Unlimited courses
                        if (data[i][field] === -1)
                            formattedCopy[j][data[i].section_id] = 999;
                        else
                            formattedCopy[j][data[i].section_id] = data[i][field];
                    }
                }
            }
        }

        // set up the time
        var ref = formattedCopy.map(function(object) {
            var rObj = object;
            var date = new Date(object.name);

            // http://stackoverflow.com/questions/8935414/getminutes-0-9-how-to-with-two-numbers
            var stringDate = date.getMonth()+1 + '/' + date.getDate() + ' @' + date.getHours() + ':' + ((date.getMinutes()<10?'0':'') + date.getMinutes());
            rObj.name = stringDate;
            return rObj;
        });

        return ref;
    }
}