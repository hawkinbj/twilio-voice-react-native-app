import * as app from '../app';
import * as token from '../voice/token';
import * as outgoingCall from '../voice/call/outgoingCall';
import * as activeCall from '../voice/call/activeCall';

let fetchMock: jest.Mock;
let voiceConnectMock: jest.Mock;
let MockCall: { Event: Record<string, string> };

jest.mock('../../../src/util/fetch', () => ({
  fetch: (fetchMock = jest.fn()),
}));

jest.mock('../../../src/util/voice', () => ({
  voice: {
    connect: (voiceConnectMock = jest.fn()),
  },
  callMap: new Map(),
}));

jest.mock('@twilio/voice-react-native-sdk', () => {
  MockCall = {
    Event: {
      Connected: 'connected',
      ConnectFailure: 'connectFailure',
      Disconnected: 'disconnected',
      Reconnecting: 'reconnecting',
      Reconnected: 'reconnected',
      Ringing: 'ringing',
      QualityWarningsChanged: 'qualityWarningsChanged',
    },
  };
  return { Call: MockCall };
});

it('works good', async () => {
  fetchMock.mockResolvedValueOnce({
    text: jest.fn().mockResolvedValueOnce('foo'),
  });
  const getTokenAction = token.getToken();
  await app.store.dispatch(getTokenAction);

  expect(app.store.getState().voice.token?.status).toEqual('fulfilled');

  voiceConnectMock.mockResolvedValueOnce({
    _uuid: 'mock uuid',
    on: jest.fn(),
    once: jest.fn(),
    getSid: jest.fn().mockReturnValue('sid'),
    getState: jest.fn().mockReturnValue('state'),
    getTo: jest.fn().mockReturnValue('to'),
    getFrom: jest.fn().mockReturnValue('from'),
    isMuted: jest.fn().mockReturnValue(false),
    isOnHold: jest.fn().mockReturnValue(false),
    mute: jest.fn(),
    hold: jest.fn(),
  });
  const makeOutgoingCallAction = outgoingCall.makeOutgoingCall({
    recipientType: 'client',
    to: 'bob',
  });
  await app.store.dispatch(makeOutgoingCallAction);

  expect(app.store.getState().voice.call.outgoingCall?.status).toEqual(
    'fulfilled',
  );

  const muteActiveCallAction = activeCall.muteActiveCall({ mute: true });
  await app.store.dispatch(muteActiveCallAction);
});
