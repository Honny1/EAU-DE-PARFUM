function db_exists(db_name) {
    db = db.getSiblingDB('admin');
    db.runCommand('listDatabases').databases.forEach(function(db_entry){
        if (db_entry.name == db_name) {
            // quit with exit code zero if we found our db
            quit(0);
        }
    });

    // quit with exit code 1 if db was not found
    quit(1);
}
db_exists('MY_DATABASE');
