def broad_jump_outcomes(jump_distance, body_mass, height):
    """
    Calculate Broad Jump (Standing Long Jump) outcomes.
    
    Parameters:
        jump_distance (float): Jump distance in meters
        body_mass (float): Athlete body mass in kg
        height (float): Athlete height in cm
    
    Returns:
        dict with distance, relative distance, peak power, relative peak power
    """
    if jump_distance <= 0 or body_mass <= 0 or height <= 0:
        raise ValueError("All inputs must be positive values.")

    # Relative distance
    relative_distance = (jump_distance * 100) / body_mass  # cm/kg

    # Harman regression for peak power (W)
    peak_power = (21.9 * jump_distance) + (16.6 * body_mass) - (0.3 * height) - 1416

    # Relative peak power
    relative_power = peak_power / body_mass

    return {
        "Jump Distance (m)": round(jump_distance, 3),
        "Jump Distance (cm)": round(jump_distance * 100, 1),
        "Relative Distance (cm/kg)": round(relative_distance, 2),
        "Peak Power (W)": round(peak_power, 2),
        "Relative Peak Power (W/kg)": round(relative_power, 2),
    }


def main():
    print("=== Broad Jump (Standing Long Jump) Calculator ===")
    
    body_mass = float(input("Enter athlete body mass (kg): "))
    height = float(input("Enter athlete height (cm): "))
    jump_distance = float(input("Enter jump distance (m): "))

    results = broad_jump_outcomes(jump_distance, body_mass, height)

    print("\n--- Test Results ---")
    for k, v in results.items():
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
