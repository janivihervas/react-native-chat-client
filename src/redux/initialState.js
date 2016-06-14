import {Map, List, fromJS} from 'immutable';
import {v4 as uuid} from 'uuid';
import {NAVIGATION} from '../modules/app/AppState';

const limit = 5;

let users = {};

for (let i = 0; i < limit; i++) {
  users[uuid()] = {name: `Name${i}`, threads: []};
}

const userIds = Object.keys(users);

users = fromJS(users);

let threads = {};
function exclusiveRandomInt(high, ...exclusives) {
  const result = Math.round(Math.random() * high);
  if (exclusives.indexOf(result) !== -1) {
    return exclusiveRandomInt(high, ...exclusives);
  }
  return result;
}

for (let i = 0; i < limit; i++) {
  const id0 = uuid();
  const id1 = uuid();

  const userPrivate = exclusiveRandomInt(limit - 1, i);
  threads[id0] = {
    participants: [userIds[i], userIds[userPrivate]],
    messages: []
  };
  const userGroup0 = exclusiveRandomInt(limit - 1, i);
  const userGroup1 = exclusiveRandomInt(limit - 1, i, userGroup0);
  threads[id1] = {
    participants: [userIds[i], userIds[userGroup0], userIds[userGroup1]],
    messages: []
  };

  users = users.updateIn(
    [userIds[i], 'threads'],
    () => List([id0, id1])
  );
  users = users.updateIn(
    [userIds[userPrivate], 'threads'],
    () => List([id0])
  );
  users = users.updateIn(
    [userIds[userGroup0], 'threads'],
    list => list.push(id1)
  );
  users = users.updateIn(
    [userIds[userGroup1], 'threads'],
    list => list.push(id1)
  );
}

const threadIds = Object.keys(threads);

threads = fromJS(threads);

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin varius sed elit quis auctor.';
let messages = {};

for (let i = 0; i < threadIds.length; i++) {
  const count = exclusiveRandomInt(10, 0, 1, 2);
  for (let j = 0; j < count; j++) {
    const participants = threads.getIn([threadIds[i], 'participants']).toArray();
    const id = uuid();
    let then = new Date();
    then = +then - 3 * 86400000;
    then = new Date(then);

    messages[id] = {
      author: participants[exclusiveRandomInt(participants.length - 1)],
      text: lorem,
      time: +randomDate(then, new Date())
    };
    /* eslint-disable */
    threads = threads.updateIn(
      [threadIds[i], 'messages'],
      list => list.push(id)
    );
    /* eslint-enable */
  }
}

messages = fromJS(messages);

const state = {
  users,
  threads,
  messages,
  appState: Map({
    currentUser: userIds[0],
    currentView: NAVIGATION.INDEX_VIEW
  })
};

export default state;
