def calculate_bia(impedance, body_fat_percent, muscle_mass, height=None):
    lean_mass_est = muscle_mass * 1.1
    fat_mass_est = (body_fat_percent / (100 - body_fat_percent)) * lean_mass_est
    weight_est = lean_mass_est + fat_mass_est

    fat_mass = (body_fat_percent / 100) * weight_est
    lean_mass = weight_est - fat_mass

    result = {
        "Impedance (Ω)": impedance,
        "Estimated Weight (kg)": round(weight_est, 2),
        "Fat Mass (kg)": round(fat_mass, 2),
        "Lean Mass (kg)": round(lean_mass, 2),
        "Muscle Mass (kg)": round(muscle_mass, 2),
        "Body Fat %": round(body_fat_percent, 1)
    }

    if height:
        height_m = height / 100
        result["FFMI"] = round(lean_mass / (height_m ** 2), 2)

    return result


if __name__ == "__main__":
    print("=== BIA Body Composition Calculator ===")
    impedance = float(input("Impedance (Ω): "))
    bf_percent = float(input("Body Fat %: "))
    muscle_mass = float(input("Muscle Mass (kg): "))
    height = input("Height (cm) [optional]: ")

    height_val = float(height) if height else None
    results = calculate_bia(impedance, bf_percent, muscle_mass, height_val)

    print("\n--- Results ---")
    for k, v in results.items():
        print(f"{k}: {v}")
