/* global window itemType certificationType unpaintedValue baseValue blueprintPrice itemValue dropType unpaintedText blueprintText */
let isOnlyPaintedDrop = false;

window.addEventListener('load', () => {
  function update() {
    const typeValues = [
      // Antenna
      10,
      // Black market decal
      null,
      // Boost
      40,
      // Car
      75,
      // Decal
      20,
      // Goal explosion
      null,
      // Topper
      10,
      // Trail
      50,
      // Wheel
      75,
    ];
    const certificationTiers = [
      // None
      null,
      // Striker
      0,
      // Scorer
      1,
      // Victor
      1,
      // Goalkeeper
      2,
      // Sniper
      2,
      // Tactician
      2,
      // Sweeper
      3,
      // Playmaker
      3,
      // Guardian
      3,
      // Aviator
      3,
      // Acrobat
      4,
      // Turtle
      4,
      // Paragon
      4,
      // Show-off
      4,
      // Jugglar
      4,
    ];
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

    const certificationMultiplier = certificationData[itemType.selectedIndex][certificationTiers[certificationType.selectedIndex]];

    const safeUnpaintedValue = unpaintedValue.value === '0' || isOnlyPaintedDrop ? typeValues[itemType.selectedIndex] || baseValue.value : unpaintedValue.value;
    let colorMultiplier = Math.max(((baseValue.value / safeUnpaintedValue) ** 0.182) - 1, 0);
    if (isOnlyPaintedDrop) {
      colorMultiplier *= 0.25;
    }

    let value = baseValue.value * (certificationMultiplier ? certificationMultiplier * (colorMultiplier + 1) + 1 : 1);
    if (!blueprintPrice.hidden) {
      value -= blueprintPrice.value;
    }

    itemValue.innerHTML = `${Math.floor(value / 10) * 10} credits`;
  }

  [ itemType, baseValue, unpaintedValue, blueprintPrice, certificationType ].forEach((x) => x.addEventListener('change', update));
  dropType.addEventListener('change', () => {
    isOnlyPaintedDrop = dropType.selectedIndex !== 0;
    [ unpaintedText, unpaintedValue ].forEach((x) => { x.hidden = isOnlyPaintedDrop; });
    [ blueprintText, blueprintPrice ].forEach((x) => { x.hidden = dropType.value === 'Premium Drop'; });
    update();
  });

  update();
});
