def body_fat_percent(total_mass, fat_mass):
    return (fat_mass / total_mass) * 100

def bone_mass(total_mass, fat_mass, lean_mass):
    return total_mass - (fat_mass + lean_mass)

if __name__ == "__main__":
    print("=== Simple DEXA Calculator ===")

    total_mass = float(input("Enter Total Mass (kg): "))
    fat_mass = float(input("Enter Fat Mass (kg): "))
    lean_mass = float(input("Enter Lean Mass (kg): "))
    bmd = float(input("Enter Bone Mineral Density (g/cm²): "))

    bf_percent = body_fat_percent(total_mass, fat_mass)
    bone_mass_val = bone_mass(total_mass, fat_mass, lean_mass)

    print("\n--- Results ---")
    print(f"Total Mass: {total_mass:.2f} kg")
    print(f"Fat Mass: {fat_mass:.2f} kg")
    print(f"Lean Mass: {lean_mass:.2f} kg")
    print(f"Bone Mass (derived): {bone_mass_val:.2f} kg")
    print(f"Body Fat %: {bf_percent:.1f}%")
    print(f"Bone Mineral Density: {bmd:.3f} g/cm²")
