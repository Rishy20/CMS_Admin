export const DashboardDataRender = async (url, role, userId) => {
    let parsedData = {};
    let fetched;


    // EVENT INFO | Common to all user types
    let eventInfo = {
        title: "",
        location: "",
        date: "",
        time: "",
        remaining: 0
    };

    // Fetch event info
    fetched = await fetch(`${url}/info`).then(data => data.json());
    fetched = fetched[0]

    // Parse and set event info
    if (fetched) {
        eventInfo.title = fetched.abbrevation;
        eventInfo.date = fetched.startDate;
        eventInfo.time = fetched.startTime;
        eventInfo.location = fetched.location;

        // Calculate remaining days
        let split = fetched.startDate.split("/");
        let date = new Date(
            parseInt(split[2], 10),
            parseInt(split[0], 10) - 1,
            parseInt(split[1], 10)
        );

        eventInfo.remaining = Math.floor((date - Date.now() ) / 86400000);
    }

    // Append event info to return
    parsedData.eventInfo = eventInfo;


    // ADMIN-SPECIFIC
    if (role === "admin") {
        // TOTAL VALUES
        let pendingEdits;
        let totalAttendees;
        let totalPresenters;
        let totalResearchers;

        // Fetch and set total pending edits
        fetched = await fetch(`${url}/edits`).then(data => data.json());
        pendingEdits = fetched.filter(edit => edit.status === "pending").length;

        // Fetch and set total attendees
        fetched = await fetch(`${url}/attendees`).then(data => data.json());
        totalAttendees = fetched.length;

        // Fetch and set total presenters
        fetched = await fetch(`${url}/workshops`).then(data => data.json());
        totalPresenters = fetched.length;

        // Fetch and set total researchers
        fetched = await fetch(`${url}/researchers`).then(data => data.json());
        totalResearchers = fetched.length;

        // Append total values to return
        parsedData.pendingEdits = pendingEdits;
        parsedData.totalAttendees = totalAttendees;
        parsedData.totalPresenters = totalPresenters;
        parsedData.totalResearchers = totalResearchers;


        // REVIEWERS INFO
        let reviewersInfo = {
            total: 0,
            pending: 0,
            accepted: 0,
            rejected: 0,
            chartData: []
        }

        // Fetch reviewers data
        fetched = await fetch(`${url}/reviewers`).then(data => data.json());

        // Set reviewers info
        if (fetched) {
            reviewersInfo.total = fetched.length;
            reviewersInfo.pending = fetched.filter(reviewer => reviewer.status === "pending").length;
            reviewersInfo.accepted = fetched.filter(reviewer => reviewer.status === "active").length;
            reviewersInfo.rejected = fetched.filter(reviewer => reviewer.status === "suspended").length;

            // Set chart data
            let date = new Date();
            // Get date of previous week
            date.setDate(date.getDate() - 6);

            // Get number of reviewers registered on each day from a week before to today
            for (let i = 0; i < 7; i++) {
                // Check if 'createdAt' date of reviewer is equal to current date, and if so, filter the reviewer into array
                // Then assign the length of the filtered array as 'value' for the corresponding day of the chart
                reviewersInfo.chartData.push(
                    {
                        day: date.getDate().toString(),
                        value: fetched
                            .filter(reviewer =>
                                new Date(reviewer.createdAt).toDateString() === date.toDateString()).length
                    }
                );
                date.setDate(date.getDate() + 1);
            }
        }

        parsedData.reviewersInfo = reviewersInfo;


        // RESEARCH PROPOSALS INFO
        let researchPropInfo = {
            total: 0,
            pending: 0,
            accepted: 0,
            rejected: 0,
            chartData: []
        }

        // Fetch research proposals data
        fetched = await fetch(`${url}/researchers`).then(data => data.json());

        // Set research proposals info
        if (fetched) {
            researchPropInfo.total = fetched.length;
            researchPropInfo.pending = fetched.filter(researcher => researcher.status === "pending").length;
            researchPropInfo.accepted = fetched.filter(researcher => researcher.status === "approved").length;
            researchPropInfo.rejected = fetched.filter(researcher => researcher.status === "rejected").length;

            // Set chart data
            let date = new Date();
            // Get date of previous week
            date.setDate(date.getDate() - 6);

            // Get number of research proposals registered on each day from a week before to today
            for (let i = 0; i < 7; i++) {
                // Check if 'createdAt' date of research proposal is equal to current date, and if so, filter the research proposal into array
                // Then assign the length of the filtered array as 'value' for the corresponding day of the chart
                researchPropInfo.chartData.push(
                    {
                        day: date.getDate().toString(),
                        value: fetched
                            .filter(researcher =>
                                new Date(researcher.createdAt).toDateString() === date.toDateString()).length
                    }
                );
                date.setDate(date.getDate() + 1);
            }
        }

        parsedData.researchPropInfo = researchPropInfo;


        // WORKSHOP PROPOSALS INFO
        let workshopPropInfo = {
            total: 0,
            pending: 0,
            accepted: 0,
            rejected: 0,
            chartData: []
        }

        // Fetch workshop proposals data
        fetched = await fetch(`${url}/workshops`).then(data => data.json());

        // Set workshop proposals info
        if (fetched) {
            workshopPropInfo.total = fetched.length;
            workshopPropInfo.pending = fetched.filter(workshop => workshop.status === "pending").length;
            workshopPropInfo.accepted = fetched.filter(workshop => workshop.status === "approved").length;
            workshopPropInfo.rejected = fetched.filter(workshop => workshop.status === "rejected").length;

            // Set chart data
            let date = new Date();
            // Get date of previous week
            date.setDate(date.getDate() - 6);

            // Get number of workshop proposals registered on each day from a week before to today
            for (let i = 0; i < 7; i++) {
                // Check if 'createdAt' date of workshop proposal is equal to current date, and if so, filter the workshop proposal into array
                // Then assign the length of the filtered array as 'value' for the corresponding day of the chart
                workshopPropInfo.chartData.push(
                    {
                        day: date.getDate().toString(),
                        value: fetched
                            .filter(workshop =>
                                new Date(workshop.createdAt).toDateString() === date.toDateString()).length
                    }
                );
                date.setDate(date.getDate() + 1);
            }
        }

        parsedData.workshopPropInfo = workshopPropInfo;


        // SUBMISSIONS INFO
        let submissionsInfo = {
            total: 0,
            pending: 0,
            accepted: 0,
            rejected: 0,
            chartData: []
        }

        // Set submissions info
        submissionsInfo.total = researchPropInfo.total + workshopPropInfo.total;
        submissionsInfo.pending = researchPropInfo.pending + workshopPropInfo.pending;
        submissionsInfo.accepted = researchPropInfo.accepted + workshopPropInfo.accepted;
        submissionsInfo.rejected = researchPropInfo.rejected + workshopPropInfo.rejected;

        // Combine values of research proposals and workshop proposals charts
        for (let i = 0; i < 7; i++) {
            submissionsInfo.chartData.push(
                {
                    day: researchPropInfo.chartData[i].day,
                    value: researchPropInfo.chartData[i].value + workshopPropInfo.chartData[i].value
                }
            );
        }

        parsedData.submissionsInfo = submissionsInfo;


        // REGISTRATION INFO
        let registrationInfo = {
            totalRevenue: 0,
            totalRegistrations: 0,
            chartData: []
        }

        // Fetch attendees info
        fetched = await fetch(`${url}/attendees`).then(data => data.json());
        // Fetch payment info
        let payments = await fetch(`${url}/payments`).then(data => data.json());

        // Set registrations info
        registrationInfo.totalRegistrations = fetched.length + researchPropInfo.total + workshopPropInfo.total;
        payments.map(payment => registrationInfo.totalRevenue += payment.amount);

        // Set chart data
        let date = new Date();
        date.setDate(date.getDate() - 6);

        // Combine values of submissions chart with attendees data
        for (let i = 0; i < 7; i++) {
            // Get no of attendees per each day
            let noOfAttendees = fetched.filter(attendee =>
                new Date(attendee.createdAt).toDateString() === date.toDateString()).length

            registrationInfo.chartData.push(
                {
                    day: submissionsInfo.chartData[i].day,
                    value: submissionsInfo.chartData[i].value + noOfAttendees
                }
            );

            date.setDate(date.getDate() + 1);
        }

        parsedData.registrationInfo = registrationInfo;
    }


    // REVIEWER-SPECIFIC
    if (role === "reviewer" && userId) {
        // TOTAL VALUES
        let myReviews;
        let pendingReviews;
        let approvedReviews;
        let rejectedReviews;

        // Fetch and set total pending reviews
        let pendingResearchers = await fetch(`${url}/researchers/pending`).then(data => data.json());
        let pendingWorkshops = await fetch(`${url}/workshops/pending`).then(data => data.json());
        pendingReviews = pendingResearchers.length + pendingWorkshops.length;

        // Fetch and set total approved reviews
        let approvedResearchers = await fetch(`${url}/researchers/approved/${userId}`).then(data => data.json());
        let approvedWorkshops = await fetch(`${url}/workshops/approved/${userId}`).then(data => data.json());
        approvedReviews = approvedResearchers.length + approvedWorkshops.length;

        // Fetch and set total rejected reviews
        let rejectedResearchers = await fetch(`${url}/researchers/rejected/${userId}`).then(data => data.json());
        let rejectedWorkshops = await fetch(`${url}/workshops/rejected/${userId}`).then(data => data.json());
        rejectedReviews = rejectedResearchers.length + rejectedWorkshops.length;

        // Set my reviews
        myReviews = approvedReviews + rejectedReviews;

        // Append total values to return
        parsedData.myReviews = myReviews;
        parsedData.pendingReviews = pendingReviews;
        parsedData.approvedReviews = approvedReviews;
        parsedData.rejectedReviews = rejectedReviews;
    }


    return parsedData;
}