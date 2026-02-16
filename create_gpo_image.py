from PIL import Image, ImageDraw
import math

# Dimensions adaptées au rectangle
width = 500
height = 165

# Couleurs
bg_color = (8, 12, 30)  # Fond très sombre
cyan = (0, 220, 255)
cyan_glow = (100, 240, 255)
orange = (255, 140, 60)
orange_glow = (255, 180, 100)
pink = (255, 107, 184)
white = (200, 200, 200)
light_grid = (30, 50, 100)

# Créer l'image
img = Image.new('RGB', (width, height), bg_color)
draw = ImageDraw.Draw(img, 'RGBA')

# Ajouter des éléments de circuit en arrière-plan
for x in range(0, width, 50):
    draw.line([(x, 0), (x, height)], fill=light_grid, width=1)
for y in range(0, height, 50):
    draw.line([(0, y), (width, y)], fill=light_grid, width=1)

draw = ImageDraw.Draw(img, 'RGBA')

# Centre
cx = width // 2
cy = height // 2

# Dessiner l'hexagone central avec glow
hex_radius = 22
hex_points = []
for i in range(6):
    angle = i * 60 * math.pi / 180 - math.pi / 6
    x = cx + hex_radius * math.cos(angle)
    y = cy + hex_radius * math.sin(angle)
    hex_points.append((x, y))

# Glow effect (plusieurs couches)
for r in range(8, 1, -1):
    alpha = int(255 * (1 - r / 8) * 0.3)
    scaled_hex = [((x - cx) * (hex_radius + r) / hex_radius + cx, (y - cy) * (hex_radius + r) / hex_radius + cy) for x, y in hex_points]
    draw.polygon(scaled_hex, outline=(0, 220, 255, alpha))

# Hexagone principal
draw.polygon(hex_points, outline=cyan, width=2, fill=bg_color)
draw.polygon(hex_points, outline=pink, width=1)

# Texte du centre
draw.text((cx - 28, cy - 8), "GPO:", fill=cyan)
draw.text((cx - 48, cy + 5), "GROUP POLICY", fill=white)

# Nœuds avec leurs données
nodes = [
    # (angle, distance, label, color, x_offset)
    (0, 125, "COMPUTERS", cyan, -40),
    (60, 125, "SECURITY\nSETTINGS", pink, -45),
    (120, 125, "SOFTWARE\nINSTALLATION", orange, -55),
    (180, 125, "FOLDER\nREDIRECTION", cyan, -45),
    (240, 125, "SERVERS", orange, -20),
    (300, 125, "USER\nPREFERENCES", pink, -30),
]

for angle_deg, distance, label, color, text_offset in nodes:
    angle_rad = angle_deg * math.pi / 180
    node_x = cx + distance * math.cos(angle_rad)
    node_y = cy + distance * math.sin(angle_rad)
    
    # Dessiner les connexions en style circuit
    # Ligne principale avec effet neon
    for width_effect in range(3, 0, -1):
        alpha = int(255 * (1 - width_effect / 3) * 0.5)
        draw.line([(cx, cy), (node_x, node_y)], 
                 fill=(*color, alpha) if len(color) == 3 else color, 
                 width=width_effect)
    
    draw.line([(cx, cy), (node_x, node_y)], fill=color, width=1)
    
    # Ajouter des petits éléments de circuit le long de la ligne
    for i in range(1, 4):
        t = i / 4
        inter_x = cx + (node_x - cx) * t
        inter_y = cy + (node_y - cy) * t
        # Petits carrés
        draw.rectangle([inter_x - 2, inter_y - 2, inter_x + 2, inter_y + 2], 
                      outline=color, width=1)
    
    # Nœud circulaire avec double cercle
    node_r = 15
    # Cercle externe
    draw.ellipse([node_x - node_r, node_y - node_r, node_x + node_r, node_y + node_r],
                outline=color, width=2, fill=(25, 35, 60))
    # Cercle interne
    draw.ellipse([node_x - node_r + 3, node_y - node_r + 3, node_x + node_r - 3, node_y + node_r - 3],
                outline=color, width=1)
    
    # Label avec positionnement adapté
    draw.text((node_x + text_offset, node_y - 15), label, fill=color)

# Ajouter des points de lumière aléatoires
import random
random.seed(42)
for _ in range(20):
    x = random.randint(10, width - 10)
    y = random.randint(10, height - 10)
    r = random.randint(1, 2)
    colors = [cyan, orange, pink]
    color = random.choice(colors)
    draw.ellipse([x - r, y - r, x + r, y + r], fill=color)

# Sauvegarder
output_path = r'c:\Users\Home\Downloads\port\port\GPO_Diagram.png'
img.save(output_path)
print(f"Image GPO avancée créée: {output_path}")
