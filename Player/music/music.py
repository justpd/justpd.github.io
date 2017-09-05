import os
import sys
import glob


def Main():
    # Сохранение в переменную списка mp3 файлов
    playlist = list(map(lambda x: x[:-4].strip(), sorted(glob.glob('*.mp3'))))
    text_list = ',\n'.join(playlist)
    with open('../playlist.txt', 'w') as file:
            file.write(text_list)


if __name__ == '__main__':
    Main()
