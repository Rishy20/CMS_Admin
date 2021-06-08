export const DashboardDataRender = async url => {
    let parsedData = {};
    let fetched;

    // EVENT INFO
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
            parseInt(split[1], 10) - 1,
            parseInt(split[0], 10)
        );

        eventInfo.remaining = Math.floor((date - Date.now() ) / 86400000);
    }

    // Append event info to return
    parsedData.eventInfo = eventInfo;


    // TOTAL VALUES
    let pendingEdits = 0;
    let totalAttendees = 0;
    let totalPresenters = 0;
    let totalResearchers = 0;

    // Fetch and set total pending edits
    fetched = await fetch(`${url}/edits`).then(data => data.json());
    pendingEdits = fetched.filter(edit => edit.status === "pending").length;

    // Fetch and set total attendees
    fetched = await fetch(`${url}/attendees`).then(data => data.json());
    totalAttendees = fetched.length;

    // Fetch and set total presenters
    // fetched = await fetch(`${url}/workshops`).then(data => data.json());
    // totalPresenters = fetched.length;

    // Fetch and set total researchers
    fetched = await fetch(`${url}/researchers`).then(data => data.json());
    totalResearchers = fetched.length;

    // Append total values to return
    parsedData.pendingEdits = pendingEdits;
    parsedData.totalAttendees = totalAttendees;
    parsedData.totalPresenters = totalPresenters;
    parsedData.totalResearchers = totalResearchers;

    return parsedData;
}