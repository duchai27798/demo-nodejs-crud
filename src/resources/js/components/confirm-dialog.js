/**
 * confirm action, if yes then return true for callback action else return false
 */

let callbackFunc;

function confirmDialog(callback) {
    callbackFunc = callback;
    $('#confirm-dialog').modal('show');
}

/**
 * perform callback
 * true is confirm yes
 * @param status: true|false
 */
function emit(status) {
    if (callbackFunc) {
        callbackFunc(status);
        $('#confirm-dialog').modal('hide');
    }
}
