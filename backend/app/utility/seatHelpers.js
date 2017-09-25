/**
 * Created by immanuelpelzer on 25.09.17.
 */
exports.pricesForType = function(type) {
    switch(type) {
        case "free":
            return 0;
            break;
        case 'window':
            return 10;
            break;
        case 'ailse':
            return 5
            break;
        case 'leg':
            return 20;
            break;
        default:
            return 0;
    }
};

exports.type = function(row,col, width, lenght) {
    if ((col % 5) == 0) { // Every fifth col is ailse
        return 'leg'
    } else if (row == 0 ||row == width -1) { // first and list is window
        return 'window';
    } else {
        return 'free';
    }
};

exports.charInAlphabet = function(index) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return alphabet.charAt(index);
};