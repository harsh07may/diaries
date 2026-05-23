from PIL import Image

def remove_background(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    
    # Get pixel data
    pixels = img.load()
    width, height = img.size
    
    # Target color to replace (pure white)
    target_color = (255, 255, 255, 255)
    replacement_color = (255, 255, 255, 0)
    
    # We will do a flood fill from the corners
    # List of starting points (corners)
    starts = [(0, 0), (width-1, 0), (0, height-1), (width-1, height-1)]
    
    visited = set()
    stack = []
    
    for start in starts:
        if pixels[start[0], start[1]] == target_color:
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
                    # check if the color is white or very close to white
                    r, g, b, a = pixels[nx, ny]
                    if r > 240 and g > 240 and b > 240 and a > 0:
                        stack.append((nx, ny))

    img.save(output_path)
    print(f"Processed {image_path}")

images = ["public/hero/character_v2.png", "public/hero/laptop_v2.png", "public/hero/desk_items_v2.png"]
for img_path in images:
    # Output to _v3 to bust cache again
    out_path = img_path.replace("_v2.png", "_v3.png")
    remove_background(img_path, out_path)
