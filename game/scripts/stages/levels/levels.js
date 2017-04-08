
import Level5 from './level5.js';
import Level4 from './level4.js';
import Level3 from './level3.js';
import Level2 from './level2.js';
import Level1 from './level1.js';

const levelLayouts = [];

export const LevelLayout = { LV1: 1, LV2: 2, LV3: 3, LV4: 4, LV5: 5 };

export const storeLevel = lvl => {
  if(lvl) {
    levelLayouts.push(lvl);
  }
}

export const levelsStored = () => {
  return levelLayouts.length;
}

export const getLayout = ID => {
  if (ID >= levelLayouts.length) {
    return null;
  } else {
    return levelLayouts[ID - 1];
  }
}

export default app => {
  return [
    Level1(app),
    Level2(app),
    Level3(app),
    Level4(app),
    Level5(app)
  ]
}
