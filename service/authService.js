/**
 * Created by felix_2 on 28.04.2017.
 */
'use strict';

function authentication(userName, password, callback) {
    callback(false, true);
}

module.exports = { authenticate: authentication };