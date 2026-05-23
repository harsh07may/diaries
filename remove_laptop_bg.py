from PIL import Image

def is_white(pixel):
    # Check if pixel is close to white
    r, g, b, a = pixel
    return r > 240 and g > 240 and b > 240 and a > 0

def remove_background(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    
    # Get pixel data
    pixels = img.load()
    width, height = img.size
    
    replacement_color = (255, 255, 255, 0)
    
    # We will do a flood fill from the corners
    starts = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    visited = set()
    stack = []
    
    for start in starts:
        if is_white(pixels[start[0], start[1]]):
            stack.append(start)
            visited.add(start)
            
    while stack:
        x, y = stack.pop()
        pixels[x, y] = replacement_color
        
        # Check neighbors
        for dx, dy in [(0, 1), (1, 0), (0, -1), (-1, 0)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    visited.add((nx, ny))
                    if is_white(pixels[nx, ny]):
                        stack.append((nx, ny))

    img.save(output_path)
    print(f"Processed {image_path}")

images = ["public/hero/kanaka-whiteboard.png"]
for img_path in images:
    # We will overwrite the file directly
    remove_background(img_path, img_path)
