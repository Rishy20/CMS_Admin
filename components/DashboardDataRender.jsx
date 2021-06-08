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
        console.log(eventInfo.remaining)

        parsedData.eventInfo = eventInfo;
    }

    return parsedData;
}