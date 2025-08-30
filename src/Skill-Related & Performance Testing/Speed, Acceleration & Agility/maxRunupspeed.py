def calculate_max_speed(distance_m, time_s):
    """
    Calculate maximum run-up speed.
    
    Parameters:
        distance_m (float): Flying distance covered in meters
        time_s (float): Time taken in seconds
    
    Returns:
        dict: Speed in m/s and km/h
    """
    if distance_m <= 0 or time_s <= 0:
        raise ValueError("Distance and time must be positive values.")
    
    speed_mps = distance_m / time_s          
    speed_kmh = speed_mps * 3.6              
    
    return {
        "Distance (m)": distance_m,
        "Time (s)": time_s,
        "Max Speed (m/s)": round(speed_mps, 2),
        "Max Speed (km/h)": round(speed_kmh, 2)
    }


def main():
    print("=== Max Run-Up Speed Test ===")
    distance = float(input("Enter flying distance (m): "))
    time = float(input("Enter time taken (s): "))
    
    results = calculate_max_speed(distance, time)
    
    print("\n--- Results ---")
    for k, v in results.items():
        print(f"{k}: {v}")


if __name__ == "__main__":
    main()
