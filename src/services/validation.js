
export default function validation(name, price) {

    let valid = true;

    if (name === "" || name === undefined) {
        valid = false;
    }
    else if(name.length < 2) {
        valid = false;
    }
    if(name !== "" && !isNaN(Number(name))) {
        valid = false;
    }
    if(price === "" || price === undefined) {
        valid = false;
    }
    else if(isNaN(Number(price))) {
        valid = false;
    }

    return valid;
}