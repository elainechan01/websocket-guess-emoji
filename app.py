'''
Server
TODO - models for the different event(s)
'''
import asyncio
import websockets
import json
import secrets

from charades import Charades

JOIN = {}

async def handler(websocket):
    game = Charades()
    # connected = {websocket}

    # join_key = secrets.token_urlsafe(12)
    # JOIN[join_key] = game, connected

    
    async for message in websocket:
        event = json.loads(message)
        assert event['type'] == 'play'
        act = event['act']

        try:
            verified_act = game.actor_validate_act(act)
        except ValueError as exc:
            event = {
                'type': 'error',
                'message': str(exc)
            }
            await websocket.send(json.dumps(event))
            continue
        event = {
            'type': 'play',
            'act': verified_act
        }
        await websocket.send(json.dumps(event))
    # finally:
    #     # del JOIN[join_key]
    #     pass
        
    
async def main():
    async with websockets.serve(handler, '', 8523):
        await asyncio.get_running_loop().create_future()


if __name__ == "__main__":
    asyncio.run(main())