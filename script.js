let baseValue;
let unpaintedText;
let unpaintedValue;
let itemType;
let dropType;
let blueprintText;
let blueprintPrice;
let cerificationType;
let text;

const typeValues = [10, undefined, 40, 75, 20, undefined, 10, 50, 75];
const certificationTiers = [undefined, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4];
const certificationData = [[/* Antenna */ 0.12, 0.07, 0.04, 0.02, 0.01],
    [/* Black Market Decal */ 0.5, 0.3, 0.16, 0.1, 0.04], [/* Boost */ 0.32, 0.19, 0.1, 0.06, 0.02],
    [/* Car */ 0.72, 0.44, 0.23, 0.13, 0.06], [/* Decal */ 0.42, 0.25, 0.13, 0.08, 0.03],
    [/* Goal Explosion */ 0.5, 0.3, 0.16, 0.1, 0.04], [/* Topper */ 0.26, 0.15, 0.08, 0.05, 0.02],
    [/* Trail */ 0.24, 0.15, 0.09, 0.05, 0.02], [/* Wheel */ 0.66, 0.42, 0.24, 0.12, 0.04]];

window.onload = function () {
    baseValue = document.getElementById('baseValue');
    unpaintedText = document.getElementById('unpaintedText');
    unpaintedValue = document.getElementById('unpaintedValue');
    itemType = document.getElementById('itemType');
    dropType = document.getElementById('dropType');
    blueprintText = document.getElementById('blueprintText');
    blueprintPrice = document.getElementById('blueprintPrice');
    cerificationType = document.getElementById('cerificationType');
    text = document.getElementById('value');
    update();
};

let onlyPaintedDrop = false;

function changeDropType() {
    onlyPaintedDrop = dropType.selectedIndex !== 0;
    unpaintedText.hidden = onlyPaintedDrop;
    unpaintedValue.hidden = onlyPaintedDrop;
    if (onlyPaintedDrop)
        isSpecialEdition = false;

    const isPremium = dropType.value === 'Premium Drop';
    blueprintText.hidden = isPremium;
    blueprintPrice.hidden = isPremium;
}

let isSpecialEdition = false;

function update() {
    const certificationMultiplier = certificationData[itemType.selectedIndex]
        [certificationTiers[cerificationType.selectedIndex]];

    let safeUnpaintedValue;
    if (unpaintedValue.value === '0' || onlyPaintedDrop) {
        const typeValue = typeValues[itemType.selectedIndex];
        safeUnpaintedValue = typeValue === undefined ? baseValue.value : typeValue;
    } else
        safeUnpaintedValue = unpaintedValue.value;

    let colorMultiplier = Math.pow(baseValue.value / safeUnpaintedValue, 0.182) - 1;
    if (colorMultiplier < 0)
        colorMultiplier = 0;
    else if (onlyPaintedDrop)
        colorMultiplier *= 0.25;
    let value = (certificationMultiplier === undefined ? baseValue.value : baseValue.value *
        (certificationMultiplier * (colorMultiplier + 1) + 1)) -
        blueprintPrice.value;

    value = Math.floor(value / 10) * 10;
    text.innerHTML = value + ' credits';
}