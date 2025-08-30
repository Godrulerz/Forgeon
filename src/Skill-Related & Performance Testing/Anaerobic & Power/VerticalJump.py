import math

def cmj_outcomes(flight_time, body_mass, contact_time=None):
    """
    Calculate CMJ (Countermovement Jump) outcomes.
    
    Parameters:
        flight_time (float): Flight time in seconds
        body_mass (float): Athlete body mass in kg
        contact_time (float, optional): Ground contact time in seconds (for RSI)
        
    Returns:
        dict with jump height, peak power, relative power, and RSI (if contact_time given)
    """
    if flight_time <= 0 or body_mass <= 0:
        raise ValueError("Flight time and body mass must be positive values.")

    g = 9.81  # gravity constant m/s^2

    # Jump height from flight time
    jump_height = (g * (flight_time ** 2)) / 8  # meters

    # Peak power (Sayers regression, jump height in cm)
    peak_power = (60.7 * (jump_height * 100)) + (45.3 * body_mass) - 2055

    # Relative peak power
    relative_power = peak_power / body_mass

    results = {
        "Jump Height (m)": round(jump_height, 3),
        "Jump Height (cm)": round(jump_height * 100, 1),
        "Peak Power (W)": round(peak_power, 2),
        "Relative Peak Power (W/kg)": round(relative_power, 2),
    }

    if contact_time and contact_time > 0:
        rsi = jump_height / contact_time
        results["Reactive Strength Index (RSI)"] = round(rsi, 3)

    return results


def main():
    print("=== Vertical Jump (CMJ) Calculator ===")
    
    body_mass = float(input("Enter athlete body mass (kg): "))
    flight_time = float(input("Enter flight time (s): "))
    
    use_contact = input("Do you have ground contact time? (y/n): ").strip().lower()
    contact_time = None
    if use_contact == "y":
        contact_time = float(input("Enter ground contact time (s): "))

    results = cmj_outcomes(flight_time, body_mass, contact_time)

    print("\n--- Test Results ---")
    for k, v in results.items():
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
