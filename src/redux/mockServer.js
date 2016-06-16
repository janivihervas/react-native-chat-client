import {List, fromJS} from 'immutable';
import Promise from 'bluebird';

const limit = 5;

let users = {
  '0': {
    name: 'Current user',
    threads: []
  }
};

for (let i = 1; i < limit; i++) {
  users['' + i] = {name: `Name${i}`, threads: []};
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
let threadId = 0;
for (let i = 0; i < limit; i++) {
  const id0 = '' + threadId++;
  const id1 = '' + threadId++;

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
let messageId = 0;

for (let i = 0; i < threadIds.length; i++) {
  const count = exclusiveRandomInt(10, 0, 1, 2);
  for (let j = 0; j < count; j++) {
    const participants = threads.getIn([threadIds[i], 'participants']).toArray();
    const id = '' + messageId++;
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
  messages
};

export function fetchThreads(user) {
  return new Promise(resolve => {
    const _threads = state.threads
      .filter(d => d.get('participants').includes(user))
      .map((thread, id) => {
        const participants = thread.get('participants')
          .filter(participant => user !== participant)
          .map(participant => state.users.getIn([participant, 'name']))
          .toArray();

        const lastMessage = thread.get('messages')
          .map(message => state.messages.get(message))
          .sort((a, b) => a.get('time') < b.get('time'))
          .take(1)
          .map(message => message.set('author', state.users.getIn([message.get('author'), 'name'])))
          .map(message => ({
            author: message.get('author'),
            time: message.get('time'),
            text: message.get('text')
          }))
          .first();

        return {
          id,
          participants,
          lastMessage
        };
      })
      .toList()
      .toJS();

    setTimeout(() => {
      resolve(_threads);
    }, 1000);
  });
}

