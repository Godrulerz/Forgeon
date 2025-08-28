def waist_to_hip(waist, hip):
    return waist / hip if hip > 0 else None

def waist_to_chest(waist, chest):
    return waist / chest if chest > 0 else None

def arm_difference(relaxed, flexed):
    return flexed - relaxed

def us_navy_bodyfat(sex, waist, neck, hip=None, height=None):
    import math
    if sex.lower() == "male":
        return 86.010 * math.log10(waist - neck) - 70.041 * math.log10(height) + 36.76 if height else None
    elif sex.lower() == "female" and hip is not None:
        return 163.205 * math.log10(waist + hip - neck) - 97.684 * math.log10(height) - 78.387 if height else None
    else:
        return None

if __name__ == "__main__":
    print("=== Girth Measurements Calculator ===")

    waist = float(input("Waist (cm): "))
    hip = float(input("Hip (cm): "))
    neck = float(input("Neck (cm): "))
    chest = float(input("Chest (cm): "))
    arm_relaxed = float(input("Arm (Relaxed) (cm): "))
    arm_flexed = float(input("Arm (Flexed) (cm): "))
    thigh = float(input("Thigh (cm): "))

    sex = input("Sex (male/female): ")
    height = input("Height (cm) [optional, for body fat calc]: ")
    height_val = float(height) if height else None

    print("\n--- Results ---")
    print(f"Waist-to-Hip Ratio: {waist_to_hip(waist, hip):.2f}")
    print(f"Waist-to-Chest Ratio: {waist_to_chest(waist, chest):.2f}")
    print(f"Arm Difference (Flexed - Relaxed): {arm_difference(arm_relaxed, arm_flexed):.2f} cm")
    if height_val:
        bf = us_navy_bodyfat(sex, waist, neck, hip, height_val)
        if bf:
            print(f"Estimated Body Fat % (US Navy): {bf:.1f}%")
