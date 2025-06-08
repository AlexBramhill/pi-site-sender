from enum import Enum


class ColourProfile(Enum):
    ONE_BIT = "one_bit"
    TWO_BIT = "two_bit"
    FOUR_BIT_PALETTE = "four_bit_palette"
    EIGHT_BIT_PALETTE = "eight_bit_palette"
    RGB332 = "rgb332"
    RGB565 = "rgb565"
    RGB888 = "rgb888"
