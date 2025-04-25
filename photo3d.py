import trimesh
import pyrender

# Load the GLTF file (adjust path)
gltf_scene = trimesh.load("C:/Users/Tauseef/OneDrive/Desktop/Zikra BSCIT/Home Interior/modern_house.glb", force='scene')

# Extract and concatenate meshes (ignoring textures)
if isinstance(gltf_scene, trimesh.Scene):
    mesh = trimesh.util.concatenate(list(gltf_scene.geometry.values()))
else:
    mesh = gltf_scene

# Create a Pyrender scene with just the geometry
scene = pyrender.Scene()
scene.add(pyrender.Mesh.from_trimesh(mesh))

# View the scene
pyrender.Viewer(scene, use_raymond_lighting=True)


# C:/Users/Tauseef/OneDrive/Desktop/Zikra BSCIT/Home Interior/modern_house.glb