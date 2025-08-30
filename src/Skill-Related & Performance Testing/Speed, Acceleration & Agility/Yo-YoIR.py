def calculate_yoyo_ir(distance_m, final_speed_kmh):
    """
    Calculate Yo-Yo Intermittent Recovery Test outcomes.
    
    Parameters:
        distance_m (int): Total distance covered (meters)
        final_speed_kmh (float): Final speed achieved before stopping (km/h)
    
    Returns:
        dict: Test outcomes including VO2max
    """
    if distance_m <= 0 or final_speed_kmh <= 0:
        raise ValueError("Distance and speed must be greater than zero.")
    
    # VO2max estimation formula (Bangsbo 2008)
    vo2max = (final_speed_kmh * 6.6) - 27.4
    
    return {
        "Total Distance (m)": distance_m,
        "Final Speed (km/h)": final_speed_kmh,
        "Estimated VO2max (ml/kg/min)": round(vo2max, 2)
    }


def main():
    print("=== Yo-Yo Intermittent Recovery Test ===")
    distance = int(input("Enter total distance covered (m): "))
    final_speed = float(input("Enter final speed achieved (km/h): "))
    
    results = calculate_yoyo_ir(distance, final_speed)
    
    print("\n--- Results ---")
    for k, v in results.items():
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
