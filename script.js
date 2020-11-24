let onlyPaintedDrop = false;

window.addEventListener('load', () => {
  function update() {
    const typeValues = [ 10, null, 40, 75, 20, null, 10, 50, 75 ];
    const certificationTiers = [ null, 0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 4 ];
    const certificationData = [
      // Antenna
      [ 0.12, 0.07, 0.04, 0.02, 0.01 ],
      // Black Market Decal
      [ 0.5, 0.3, 0.16, 0.1, 0.04 ],
      // Boost
      [ 0.32, 0.19, 0.1, 0.06, 0.02 ],
      // Car
      [ 0.72, 0.44, 0.23, 0.13, 0.06 ],
      // Decal
      [ 0.42, 0.25, 0.13, 0.08, 0.03 ],
      // Goal Explosion
      [ 0.5, 0.3, 0.16, 0.1, 0.04 ],
      // Topper
      [ 0.26, 0.15, 0.08, 0.05, 0.02 ],
      // Trail
      [ 0.24, 0.15, 0.09, 0.05, 0.02 ],
      // Wheel
      [ 0.66, 0.42, 0.24, 0.12, 0.04 ],
    ];

    const certificationMultiplier = certificationData[itemType.selectedIndex][certificationTiers[cerificationType.selectedIndex]];

    const safeUnpaintedValue = unpaintedValue.value === '0' || onlyPaintedDrop ? typeValues[itemType.selectedIndex] || baseValue.value : unpaintedValue.value;
    let colorMultiplier = Math.max(((baseValue.value / safeUnpaintedValue) ** 0.182) - 1, 0);
    if (onlyPaintedDrop) {
      colorMultiplier *= 0.25;
    }

    let value = baseValue.value * (certificationMultiplier ? certificationMultiplier * (colorMultiplier + 1) + 1 : 1);
    if (!blueprintPrice.hidden) {
      value -= blueprintPrice.value;
    }

    itemValue.innerHTML = `${Math.floor(value / 10) * 10} credits`;
  }

  update();

  [ itemType, baseValue, unpaintedValue, blueprintPrice, cerificationType ].forEach((x) => x.addEventListener('change', update));
  dropType.addEventListener('change', () => {
    onlyPaintedDrop = dropType.selectedIndex !== 0;
    [ unpaintedText, unpaintedValue ].forEach((x) => { x.hidden = onlyPaintedDrop; });
    [ blueprintText, blueprintPrice ].forEach((x) => { x.hidden = dropType.value === 'Premium Drop'; });
    update();
  });
});
