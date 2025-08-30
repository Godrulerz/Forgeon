def calculate_vor_gain(eye_velocity_deg_s, head_velocity_deg_s):
    """
    Calculate VOR gain (eye velocity / head velocity).
    
    Parameters:
        eye_velocity_deg_s (float): Eye velocity (deg/s)
        head_velocity_deg_s (float): Head velocity (deg/s)
    
    Returns:
        dict: Results with interpretation
    """
    results = {}
    results["Eye Velocity (deg/s)"] = eye_velocity_deg_s
    results["Head Velocity (deg/s)"] = head_velocity_deg_s

    if head_velocity_deg_s == 0:
        results["VOR Gain"] = None
        results["Interpretation"] = ["Invalid: Head velocity cannot be zero"]
        return results

    vor_gain = eye_velocity_deg_s / head_velocity_deg_s
    results["VOR Gain"] = round(vor_gain, 2)

    # Interpretation
    interpretation = []
    if 0.8 <= vor_gain <= 1.0:
        interpretation.append("Normal VOR gain (compensated eye movement).")
    elif vor_gain < 0.8:
        interpretation.append("Reduced VOR gain – possible vestibular hypofunction.")
    elif vor_gain > 1.2:
        interpretation.append("High VOR gain – may indicate central adaptation or calibration issues.")
    else:
        interpretation.append("Borderline VOR values – monitor clinically.")
    
    results["Interpretation"] = interpretation
    return results


def main():
    print("=== Vestibulo-Ocular Reflex (VOR) Gain Calculator ===")
    try:
        eye_vel = float(input("Enter eye velocity (deg/s): "))
        head_vel = float(input("Enter head velocity (deg/s): "))

        analysis = calculate_vor_gain(eye_vel, head_vel)

        print("\n--- VOR Test Results ---")
        for k, v in analysis.items():
            if isinstance(v, list):
                print(f"{k}:")
                for item in v:
                    print(f"  - {item}")
            else:
                print(f"{k}: {v}")

    except ValueError:
        print("Invalid input. Please enter numeric values.")


if __name__ == "__main__":
    main()
