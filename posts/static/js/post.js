function loadStartpageContent() {
    console.log(db);
    // Following operation will be queued until we're finished populating data:
    db.posts.each(function (obj) {
        // When we come here, data is fully populated and we can log all objects.
        console.log(obj);
        constructPost(obj);
    }).then(function () {
        console.log("Finished.");
    }).catch(function (error) {
        // In our each() callback above fails, OR db.open() fails due to any reason,
        // including our ajax call failed, this operation will fail and we will get
        // the error here!
        console.error(error.stack || error);
        // Note that we could also have catched it on db.open() but in this sample,
        // we show it here.
    });
}