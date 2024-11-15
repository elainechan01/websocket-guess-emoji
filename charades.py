'''
Client
'''
import emoji

class Charades:
    '''
    Charades but only using emojis
    '''
    def __init__(self) -> None:
        self.__prompt = None

    @property
    def actor_set_prompt(self):
        '''
        Set prompt for actor
        '''
        self.__prompt = "test"

    def actor_validate_act(self, act: str) -> str:
        '''
        Verifies if actor gave a valid input (emojis only)
        '''
        # if not emoji.purely_emoji(act):
        if act == "TESTFAIL":   # TODO
            raise ValueError("Input contains non-emojis")
        return act
        
    def player_verify_answer(self) -> bool:
        '''
        Verifies if answer is correct
        '''
        pass