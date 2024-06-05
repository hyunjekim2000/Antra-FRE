// 1
const names = [
  { userid: 2, name: "Velen" },
  { userid: 56, name: "Illidan" },
  { userid: 23, name: "Muradin" },
  { userid: 12, name: "Sylvanas" },
  { userid: 44, name: "Cenarius" },
  { userid: 4, name: "Gul'Dan" },
];
const roles = [
  { userid: 2, role: "Mage" },
  { userid: 4, role: "Worlock" },
  { userid: 56, role: "Demon Hunter" },
  { userid: 66, role: "Druid" },
  { userid: 87, role: "Shaman" },
  { userid: 12, role: "Hunter" },
];

const arr = names.map(name => {
  // use userid to return merged name and roles
  const role = roles.find(role => role.userid === name.userid);
  return {
    userid: name.userid,
    name: name.name,
    role: role ? role.role : null // assign null if role is undefined
  };
});

console.log("merged array:", arr);


// 2
const callback1 = (a) => a + 2; // 6
const callback2 = (b) => b * 2; // 12
const callback3 = (c) => c - 2; // 10

console.log("run all:", runAll(4)(callback1, callback2, callback3)); // 10
function runAll(initNum) {
  return function(...args) {
    // use reduce to apply each callback in sequence
    return args.reduce((acc, callback) => {
      // call current callback with accumulated value
      console.log("calling:", callback);
      return callback(acc);
    }, initNum); // init
  };
}

// 3
source = [
  ['Foley', 'Chemicals', 'CHEM'],
  ['Foley', 'Chemicals', 'CTO'],
  ['Foley', 'Chemicals', 'LK'],
  ['Foley', 'Chemicals', 'R8'],
  ['Foley', 'Chemicals', 'WT'],
  ['Foley', 'Finishing', 'LB2'],
  ['Foley', 'Finishing', 'LB4'],
  ['Foley', 'Finishing', 'RW1'],
  ['Foley', 'Finishing', 'RW2'],
  ['Foley', 'Line 3', 'LN3'],
  ['Foley', 'Line 3', 'Production Process'],
  ['Foley', 'Line 4', 'LN4'],
  ['Foley', 'Line 4', 'Prod Process'],
  ['Foley', 'Mill General', 'Wastewater Treatment'],
  ['Foley', 'Powerhouse', 'BB1'],
  ['Foley', 'Powerhouse', 'BB2'],
  ['Foley', 'Powerhouse', 'EV5'],
  ['Foley', 'Powerhouse', 'FWE'],
  ['Foley', 'Powerhouse', 'PB1'],
  ['Foley', 'Powerhouse', 'PB2'],
  ['Foley', 'Powerhouse', 'RB2'],
  ['Foley', 'Powerhouse', 'RB3'],
  ['Foley', 'Powerhouse', 'RB4'],
  ['Foley', 'Powerhouse', 'TG2'],
  ['Foley', 'Powerhouse', 'TG3'],
  ['Foley', 'Powerhouse', 'TG4'],
];

function combine(data) {
  const root = [];

  // double for loop for array of arrays
  for (let i = 0; i < data.length; i++) {
    // start from root for each sub-array
    let currLevel = root;

    for (let j = 0; j < data[i].length; j++) {
      const nestedData = data[i][j];

      // check if directory path already exists
      let existingDirectory = currLevel.find(node => node.name === nestedData);

      // new node if doesn't exist
      if (!existingDirectory) {
        existingDirectory = { name: nestedData, children: [] };
        currLevel.push(existingDirectory);
      }

      // move to the children of the current node for the next element in the sub-array
      currLevel = existingDirectory.children;
    }
  }

  return root;
}

const result = combine(source);
console.log("structure:", result);
console.log("result", JSON.stringify(result, null, 2));