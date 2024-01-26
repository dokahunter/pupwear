export default function numberGrouper(number) {
    let stringNum = String(number)
    if (stringNum.length < 4) return number;

    let extraNums = stringNum.length % 3;
    let groupedNumber = stringNum.slice(0, extraNums);

    for (let i = 0; i < Math.floor(stringNum.length/3); i++) {
        if (i === 0 && stringNum.length % 3 === 0) {
            groupedNumber = stringNum.slice(extraNums+(i*3), extraNums+3+(i*3) )
        } else {
        groupedNumber = groupedNumber + "." + stringNum.slice(extraNums+(i*3), extraNums+3+(i*3) )
    }
    }

    return(
        groupedNumber
    )
}