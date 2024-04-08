from PIL import Image

img = Image.open('app-store.png')
pixels = img.load() # create the pixel map

for i in range(img.size[0]):    # for every col:
    for j in range(img.size[1]):    # For every row
        if (pixels[i, j][-1] > 200):
            pixels[i,j] = (255, 255, 255, 255) # set the colour accordingly

img.save('app.png')