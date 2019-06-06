var db = new Dexie('FakeInstagramDB');

db.version(1).stores({
    posts: "++id",
    users: "++id"
});

// Populate from AJAX:
db.on('ready', function () {
    return db.posts.count(function (count) {
        if (count > 0) {
            console.log("Already populated");
        } else {
            console.log("Database is empty. Populating from ajax call...");
            // We want framework to continue waiting, so we encapsulate
            // the ajax call in a Promise that we return here.
            return new Promise(function (resolve, reject) {
                $.ajax('get_posts', {
                    type: 'get',
                    dataType: 'json',
                    error: function (xhr, textStatus) {
                        // Rejecting promise to make db.open() fail.
                        reject(textStatus);
                    },
                    success: function (data) {
                        // Resolving Promise will launch then() below.
                        resolve(data.data);
                    }
                });
            }).then(function (data) {
                console.log("Got ajax response. We'll now add the objects.");
                // By returning the db.transaction() promise, framework will keep
                // waiting for this transaction to commit before resuming other
                // db-operations.
                return db.transaction('rw', db.posts, function () {
                    data.posts.forEach(function (item) {
                        console.log("Adding object: " + JSON.stringify(item));
                        db.posts.add(item);
                    });
                });
            }).then(function () {
                console.log("Transaction committed");
            });
        }
    });
});

// Populate from AJAX:
db.on('ready', function () {
    return db.users.count(function (count) {
        if (count > 0) {
            console.log("Already populated");
        } else {
            console.log("Database is empty. Populating from ajax call...");
            // We want framework to continue waiting, so we encapsulate
            // the ajax call in a Promise that we return here.
            return new Promise(function (resolve, reject) {
                $.ajax('get_users', {
                    type: 'get',
                    dataType: 'json',
                    error: function (xhr, textStatus) {
                        // Rejecting promise to make db.open() fail.
                        reject(textStatus);
                    },
                    success: function (data) {
                        // Resolving Promise will launch then() below.
                        resolve(data.data);
                    }
                });
            }).then(function (data) {
                console.log("Got ajax response. We'll now add the objects.");
                // By returning the db.transaction() promise, framework will keep
                // waiting for this transaction to commit before resuming other
                // db-operations.
                return db.transaction('rw', db.users, function () {
                    data.users.forEach(function (item) {
                        console.log("Adding object: " + JSON.stringify(item));
                        db.users.add(item);
                    });
                });
            }).then(function () {
                console.log("Transaction committed");
            });
        }
    });
});

db.open(); // Will resolve when data is fully populated (or fail if error)

// Following operation will be queued until we're finished populating data:
db.posts.each(function (obj) {
    // When we come here, data is fully populated and we can log all objects.
    console.log("Found object: " + JSON.stringify(obj));
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